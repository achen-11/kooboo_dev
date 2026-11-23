export type JsonLdLanguage = "en" | "zh-CN";

export interface JsonLdLocalizedText {
  en: string;
  zh: string;
}

export interface JsonLdPageOptions {
  url: string;
  websiteId: string;
  name: JsonLdLocalizedText;
  description: JsonLdLocalizedText;
}

export const jsonLdLanguages: JsonLdLanguage[] = ["en", "zh-CN"];

function cleanText(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function currentCulture() {
  try {
    const culture = k.site.multilingual.currentCulture;
    if (culture) return String(culture);
  } catch {
    // Fall back to the request culture when multilingual metadata is unavailable.
  }
  return String(k.request.culture || "en");
}

function isChineseCulture(value: unknown) {
  const culture = String(value || "").trim().toLowerCase();
  return culture === "chinese" || culture === "cn" || culture === "zh" || culture.startsWith("zh-");
}

export function getJsonLdLanguage(): JsonLdLanguage {
  return isChineseCulture(currentCulture()) ? "zh-CN" : "en";
}

export function getJsonLdAlternateLanguage(): JsonLdLanguage {
  return getJsonLdLanguage() === "zh-CN" ? "en" : "zh-CN";
}

export function jsonLdText(english: string, chinese: string) {
  return getJsonLdLanguage() === "zh-CN" ? chinese : english;
}

export function jsonLdContent(value: unknown, englishFallback: string, chineseFallback: string) {
  const content = cleanText(value);
  if (!content) return jsonLdText(englishFallback, chineseFallback);

  const language = getJsonLdLanguage();
  const hasChinese = /[\u3400-\u9fff]/.test(content);
  if (language === "zh-CN" && !hasChinese) return chineseFallback;
  if (language === "en" && hasChinese) return englishFallback;
  return content;
}

function localizedLabel(name: string) {
  const culture = currentCulture();
  const isChinese = isChineseCulture(culture);
  const candidates: unknown[] = [];

  try {
    candidates.push(k.site.labels.getValue(name));
  } catch {
    // Continue with the structured label data.
  }

  try {
    const label = k.site.labels.get(name);
    if (label) {
      candidates.push(
        label[culture],
        label[culture.toLowerCase()],
        isChinese ? label.zh : label.en,
        isChinese ? label["zh-CN"] : undefined,
        isChinese ? label.chinese : undefined
      );
    }
  } catch {
    // Use the bilingual fallback.
  }

  for (const candidate of candidates) {
    const value = cleanText(candidate);
    if (!value || value === name) continue;
    if (isChinese ? /[\u3400-\u9fff]/.test(value) : /[A-Za-z]/.test(value)) {
      return value;
    }
  }

  return "";
}

export function jsonLdLabel(name: string, english: string, chinese: string) {
  return localizedLabel(name) || jsonLdText(english, chinese);
}

export function getJsonLdAlternateUrl() {
  try {
    const urls = k.site.multilingual.currentURLs() || [];
    const alternate = urls.find((item: any) => {
      const isActive = Boolean(item && (item.isActive === true || item.IsActive === true));
      return !isActive && cleanText(item && (item.URL || item.url));
    });
    return alternate ? cleanText(alternate.URL || alternate.url) : "";
  } catch {
    return "";
  }
}

export function createJsonLdPage(options: JsonLdPageOptions) {
  const language = getJsonLdLanguage();
  const alternateLanguage = getJsonLdAlternateLanguage();
  const currentKey = language === "zh-CN" ? "zh" : "en";
  const alternateKey = alternateLanguage === "zh-CN" ? "zh" : "en";
  const alternateUrl = getJsonLdAlternateUrl();
  const page: Record<string, any> = {
    name: cleanText(options.name[currentKey]),
    alternateName: cleanText(options.name[alternateKey]),
    description: cleanText(options.description[currentKey]),
    url: options.url,
    websiteId: options.websiteId,
    language,
    alternateLanguage,
  };

  if (alternateUrl) {
    page.workTranslation = {
      "@type": "WebPage",
      "@id": alternateUrl,
      url: alternateUrl,
      name: cleanText(options.name[alternateKey]),
      description: cleanText(options.description[alternateKey]),
      inLanguage: alternateLanguage,
    };
  }

  return page;
}
