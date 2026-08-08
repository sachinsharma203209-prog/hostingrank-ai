import type { Metadata } from "next";
import { getAllCategories, getAllPlatforms, getAllBudgets, getAllCountries } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CategoryGrid } from "@/components/sections/category-grid";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = buildMetadata({
  title: "Best Web Hosting 2026",
  description: "The best web hosting in 2026, ranked by real benchmark data. Compare by category, platform, budget, or country.",
  slug: "/best",
});

export default function BestIndex() {
  const categories = getAllCategories();
  const platforms = getAllPlatforms();
  const budgets = getAllBudgets();
  const countries = getAllCountries();

  return (
    <div className="mx-auto max-w-container-max px-4 md:px-gutter">
      <div className="pt-10">
        <Breadcrumbs items={[{ label: "Best Hosting", slug: "/best" }]} />
      </div>
      <header className="mt-8 max-w-3xl">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Best Web Hosting 2026</h1>
        <p className="mt-4 text-body-lg font-body-lg text-text-body">
          Every 'best hosting' list, ranked by our real benchmark data. Filter by category, your tech
          stack, budget, or region to find the provider that fits.
        </p>
      </header>

      <section className="mt-12">
        <SectionHeading overline="Categories" title="By hosting type" align="left" />
        <div className="mt-6">
          <CategoryGrid slugs={categories.map((c) => c.slug)} type="category" />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading overline="Platforms" title="By tech stack" align="left" />
        <div className="mt-6">
          <CategoryGrid slugs={platforms.map((p) => p.slug)} type="platform" />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading overline="Budgets" title="By budget" align="left" />
        <div className="mt-6">
          <CategoryGrid slugs={budgets.map((b) => b.slug)} type="budget" />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading overline="Regions" title="By country" align="left" />
        <div className="mt-6">
          <CategoryGrid slugs={countries.map((c) => c.slug)} type="country" />
        </div>
      </section>

      <section className="mt-12">
        <Newsletter />
      </section>
    </div>
  );
}
