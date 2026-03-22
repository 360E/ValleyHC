export function getSiteUrl(): string {
  const configuredSiteUrl = process.env.SITE_URL?.trim();
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const vercelPreviewUrl = process.env.VERCEL_URL?.trim();

  if (configuredSiteUrl) {
    return configuredSiteUrl;
  }

  if (vercelProductionUrl) {
    return `https://${vercelProductionUrl}`;
  }

  if (vercelPreviewUrl) {
    return `https://${vercelPreviewUrl}`;
  }

  return "http://localhost:3000";
}
