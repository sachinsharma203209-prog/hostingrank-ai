import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllRoutes, getAllProviders } from "@/lib/data";
import { listMdxSlugs } from "@/lib/mdx";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/reviews",
    "/comparisons",
    "/best",
    "/tutorials",
    "/benchmarks",
    "/methodology",
    "/search",
    "/about",
    "/privacy-policy",
    "/terms-of-service",
    "/affiliate-disclosure",
  ];

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: siteConfig.updatedAt,
      changeFrequency: "daily",
      priority: 1,
    },
    ...getAllRoutes()
      .filter((r) => r !== "/")
      .map((r) => ({
        url: `${siteConfig.url}${r}`,
        lastModified: siteConfig.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ...staticRoutes.map((r) => ({
      url: `${siteConfig.url}${r}`,
      lastModified: siteConfig.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...listMdxSlugs("tutorials").map((slug) => ({
      url: `${siteConfig.url}/tutorials/${slug}`,
      lastModified: siteConfig.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...getAllProviders().map((p) => ({
      url: `${siteConfig.url}/reviews/${p.reviewSlug}`,
      lastModified: siteConfig.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return entries;
}
