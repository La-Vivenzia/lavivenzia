/**
 * Canonical origin for the site. Override per-environment with
 * NEXT_PUBLIC_SITE_URL (e.g. a Vercel preview URL) so canonical links,
 * OG tags, and the sitemap all point at the right host.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lavivenzia.com";
