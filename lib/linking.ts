import {
  getAllProviders,
  getAllCategories,
  getAllPlatforms,
  getAllBudgets,
  getAllCountries,
  getComparisons,
  getProviders,
  getProviderNames,
  type Comparison,
} from "@/lib/data";

export interface InternalLink {
  label: string;
  slug: string;
  type: "category" | "platform" | "budget" | "comparison" | "review" | "tutorial" | "country";
}

const tutorialSlugs = [
  "install-wordpress-on-hostinger",
  "move-wordpress-to-new-host",
  "speed-up-wordpress",
  "deploy-nextjs-on-vps",
  "secure-ubuntu-vps",
  "migrate-wordpress-to-cloudways",
  "setup-email-ssl",
];

export function categoryLinks(slugs: string[]): InternalLink[] {
  return slugs
    .map((s) => getAllCategories().find((c) => c.slug === s))
    .filter(Boolean)
    .map((c) => ({ label: c!.name, slug: `/best/${c!.slug}`, type: "category" as const }));
}

export function platformLinks(slugs: string[]): InternalLink[] {
  return slugs
    .map((s) => getAllPlatforms().find((p) => p.slug === s))
    .filter(Boolean)
    .map((p) => ({ label: p!.name, slug: `/best/${p!.slug}`, type: "platform" as const }));
}

export function budgetLinks(slugs: string[]): InternalLink[] {
  return slugs
    .map((s) => getAllBudgets().find((b) => b.slug === s))
    .filter(Boolean)
    .map((b) => ({ label: b!.title, slug: `/best/${b!.slug}`, type: "budget" as const }));
}

export function countryLinks(slugs: string[]): InternalLink[] {
  return slugs
    .map((s) => getAllCountries().find((c) => c.slug === s))
    .filter(Boolean)
    .map((c) => ({ label: c!.name, slug: `/best/${c!.slug}`, type: "country" as const }));
}

export function comparisonLinks(slugs: string[]): InternalLink[] {
  return slugs
    .map((s) => getComparisons().find((c) => c.slug === s))
    .filter(Boolean)
    .map((c) => ({ label: c!.title, slug: `/comparisons/${c!.slug}`, type: "comparison" as const }));
}

export function tutorialLinks(slugs?: string[]): InternalLink[] {
  const source = slugs ?? tutorialSlugs;
  return source.map((s) => ({
    label: s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    slug: `/tutorials/${s}`,
    type: "tutorial" as const,
  }));
}

export function providerReviewLinks(slugs: string[]): InternalLink[] {
  return getProviders(slugs).map((p) => ({
    label: `${p.name} Review`,
    slug: `/reviews/${p.reviewSlug}`,
    type: "review" as const,
  }));
}

export function relatedLinksForComparison(comparison: Comparison): InternalLink[] {
  return [
    ...comparisonLinks(comparison.relatedComparisons),
    ...categoryLinks(comparison.relatedCategories),
    ...tutorialLinks(comparison.relatedTutorials),
  ];
}

export function providerContextLinks(providerSlug: string): InternalLink[] {
  const provider = getProviders([providerSlug])[0];
  if (!provider) return [];
  const providersByName = getProviderNames(
    getAllProviders()
      .filter((p) => p.slug !== providerSlug)
      .slice(0, 4)
      .map((p) => p.slug),
  );
  void providersByName;
  return [
    ...categoryLinks(provider.categories.slice(0, 2)),
    ...platformLinks(provider.platforms.slice(0, 2)),
    ...comparisonLinks(
      getComparisons()
        .filter((c) => c.providers.includes(providerSlug))
        .map((c) => c.slug)
        .slice(0, 3),
    ),
    ...tutorialLinks(provider.categories.slice(0, 1)),
  ];
}

export function recommendLinks(
  sourceCategories: string[],
  sourceProviders: string[],
  excludeProviders: string[] = [],
): InternalLink[] {
  const cats = getAllCategories().filter((c) => !sourceCategories.includes(c.slug));
  const providers = getAllProviders().filter(
    (p) => !excludeProviders.includes(p.slug) && !sourceProviders.includes(p.slug),
  );
  return [
    ...cats.slice(0, 2).map((c) => ({ label: c.name, slug: `/best/${c.slug}`, type: "category" as const })),
    ...providers
      .slice(0, 3)
      .map((p) => ({ label: `${p.name} Review`, slug: `/reviews/${p.reviewSlug}`, type: "review" as const })),
  ];
}
