import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SearchForm, type SearchItem } from "@/components/sections/search-form";
import { getProviders, getAllCategories, getAllPlatforms, getAllBudgets, getAllCountries, getComparisons } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search all hosting reviews, comparisons, benchmarks, and tutorials on HostingRank AI.",
  slug: "/search",
});

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const p of getProviders([]).concat()) {
    items.push({
      label: `${p.name} Review`,
      href: `/reviews/${p.reviewSlug}`,
      meta: "Review",
      keywords: `${p.name} ${p.tagline} ${p.categories.join(" ")}`.toLowerCase(),
    });
  }
  for (const c of getAllCategories()) {
    items.push({
      label: c.shortName,
      href: `/best/${c.slug}`,
      meta: "Category",
      keywords: `${c.name} ${c.shortName} ${c.providers.join(" ")}`.toLowerCase(),
    });
  }
  for (const p of getAllPlatforms()) {
    items.push({
      label: p.shortName,
      href: `/best/${p.slug}`,
      meta: "Platform",
      keywords: `${p.name} ${p.shortName}`.toLowerCase(),
    });
  }
  for (const b of getAllBudgets()) {
    items.push({
      label: b.shortName,
      href: `/best/${b.slug}`,
      meta: "Budget",
      keywords: `${b.title} ${b.shortName}`.toLowerCase(),
    });
  }
  for (const c of getAllCountries()) {
    items.push({
      label: c.shortName,
      href: `/best/${c.slug}`,
      meta: "Country",
      keywords: `${c.name} ${c.shortName}`.toLowerCase(),
    });
  }
  for (const c of getComparisons()) {
    items.push({
      label: c.title,
      href: `/comparisons/${c.slug}`,
      meta: "Comparison",
      keywords: `${c.title} ${c.providers.join(" ")}`.toLowerCase(),
    });
  }
  return items;
}

export default function SearchPage() {
  const items = buildIndex();

  return (
    <div className="mx-auto max-w-container-max px-4 py-12 md:px-gutter">
      <div className="pt-4">
        <Breadcrumbs items={[{ label: "Search", slug: "/search" }]} />
      </div>
      <header className="mt-8 mb-10 text-center">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Search</h1>
        <p className="mx-auto mt-4 max-w-xl text-body-lg font-body-lg text-text-body">
          Find the review, comparison, or guide you're looking for.
        </p>
      </header>
      <SearchForm items={items} />
    </div>
  );
}
