import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.seo.siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...siteConfig.footer.links.map((link) => ({
      url: `${siteConfig.seo.siteUrl}${link.href}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
