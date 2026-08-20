function trimTrailingSlash(url: string) {
  return (url || "").replace(/\/+$/, "");
}
function parseJwtPayloadResult(token: string) {
  if (!token) return null;
  const parsed = k.security.jwt.parsePayload(token);
  let result: any = parsed;
  if (typeof parsed === "string") {
    try {
      result = JSON.parse(parsed);
    } catch {
      return null;
    }
  }
  const code = result?.code ?? result?.Code;
  const value = result?.value ?? result?.Value;
  if (code !== 0 || !value) return null;
  return value;
}
export function redirectDomainFromToken(token: string) {
  const payload = parseJwtPayloadResult(token);
  const domain = payload?.redirect;
  if (!domain) return "";
  return String(domain).trim();
}
export function serverOriginFromRedirect(domain: string) {
  if (!domain) return "";
  const value = String(domain).trim();
  const lower = value.toLowerCase();
  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    return trimTrailingSlash(value);
  }
  if (lower.startsWith("localhost") || lower.startsWith("127.0.0.1")) {
    return `http://${trimTrailingSlash(value)}`;
  }
  return `https://${trimTrailingSlash(value.toLowerCase())}`;
}
export function resolveAdminBaseFromToken(token: string) {
  const domain = redirectDomainFromToken(token);
  const origin = serverOriginFromRedirect(domain);
  return origin ? `${origin}/_Admin/` : "";
}
export function resolveStartNowUrl(
  token: string,
  isLoggedIn: boolean,
  loggedOutUrl = "https://www.kooboo.com/en/_start/login?lang=en",
  lang = "en"
) {
  if (!isLoggedIn) {
    return loggedOutUrl;
  }

  const resolvedAdminBaseUrl = resolveAdminBaseFromToken(token) || "/_Admin";
  const adminBaseUrl = trimTrailingSlash(resolvedAdminBaseUrl) || "/_Admin";
  return `${adminBaseUrl}/?lang=${encodeURIComponent(lang)}`;
}
export function userDisplayFromToken(token: string) {
  const payload = parseJwtPayloadResult(token);
  if (!payload) {
    return {
      displayName: "",
      initials: ""
    };
  }
  const fullName = `${payload.firstName || ""} ${payload.lastName || ""}`.trim();
  const displayName = fullName || payload.userName || payload.UserName || payload.email || payload.Email || "";
  return {
    displayName,
    initials: (displayName || "?").substring(0, 2).toUpperCase()
  };
}
