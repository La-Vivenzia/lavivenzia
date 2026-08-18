import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/for-host", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/for-travellers", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
