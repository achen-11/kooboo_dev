export function categorySlug(name: string): string {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryUrl(name: string): string {
  const slug = categorySlug(name);
  return slug ? `/templates/${slug}` : "/templates";
}

export function withWebpFormat(previewImage: string): string {
  if (!previewImage) return previewImage;
  const separator = previewImage.includes("?") ? "&" : "?";
  return `${previewImage}${separator}format=webp`;
}

export function buildTemplateAdminPath(templateId: string) {
  const trimmed = String(templateId || "").trim();
  const adminPath = trimmed
    ? `/template/detail?templateId=${encodeURIComponent(trimmed)}&lang=en`
    : "/templates?lang=en";

  return {
    AdminPath: adminPath,
    AdminHref: `/_Admin${adminPath}`,
  };
}

export interface TemplateGalleryItem {
  id: string;
  Name: string;
  PreviewImage: string;
  AltText: string;
  TemplateId: string;
  FilterKeys: string;
  AdminPath: string;
  AdminHref: string;
}

export function formatTemplateItem(item: any, categoryFilterKey: string): TemplateGalleryItem {
  const previewImage = String(item.PreviewImage || "");
  const { AdminPath, AdminHref } = buildTemplateAdminPath(item.TemplateId);

  return {
    id: item.id,
    Name: item.Name,
    PreviewImage: withWebpFormat(previewImage),
    AltText: item.AltText,
    TemplateId: item.TemplateId,
    FilterKeys: categoryFilterKey,
    AdminPath,
    AdminHref,
  };
}
