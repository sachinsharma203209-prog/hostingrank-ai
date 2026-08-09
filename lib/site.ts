export const siteConfig = {
  name: "HostingRank AI",
  shortName: "HostingRank",
  url: "https://hostingrank-ai.pages.dev",
  description:
    "Precision hosting benchmarks, in-depth provider reviews, and data-driven comparisons. We test real TTFB, uptime, latency, and value across the world's leading web hosting providers.",
  tagline: "Technical precision in hosting reviews.",
  author: {
    name: "HostingRank AI Editorial Team",
    handle: "@hostingrank",
    avatar: "/images/team/editor.jpg",
  },
  keywords: [
    "web hosting",
    "best web hosting",
    "hosting reviews",
    "hosting benchmarks",
    "WordPress hosting",
    "cloud hosting",
    "VPS hosting",
    "hosting comparison",
    "cheap hosting",
    "managed hosting",
  ],
  socials: {
    twitter: "https://twitter.com/hostingranks",
    facebook: "https://facebook.com/hostingranks",
    linkedin: "https://linkedin.com/company/hostingranks",
  },
  contactEmail: "hello@hostingranks.in",
  locale: "en_US",
  updatedAt: "2026-08-07",
} as const;

export const navigation = [
  { label: "Reviews", href: "/reviews" },
  { label: "Comparisons", href: "/comparisons" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Best Hosting", href: "/best" },
  { label: "Guides", href: "/tutorials" },
] as const;
