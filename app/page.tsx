import { Hero } from "@/components/sections/hero";
import { MetricStrip } from "@/components/sections/metric-strip";
import { CategoryGrid } from "@/components/sections/category-grid";
import { ProviderRankGrid } from "@/components/sections/category-grid";
import { BenchmarkChart } from "@/components/sections/benchmark-chart";
import { CTASection } from "@/components/sections/cta-section";
import { Newsletter } from "@/components/sections/newsletter";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getAllCategories, getAllPlatforms, getAllBudgets, getAllCountries, getProviders } from "@/lib/data";
import { comparisonLinks, tutorialLinks, categoryLinks, platformLinks } from "@/lib/linking";

const topProviderSlugs = ["hostinger", "cloudways", "siteground", "kinsta", "bluehost", "a2hosting"];

export default function HomePage() {
  const categories = getAllCategories();
  const platforms = getAllPlatforms();
  const budgets = getAllBudgets();
  const countries = getAllCountries();
  const providers = getProviders(topProviderSlugs).sort((a, b) => b.editorialScore - a.editorialScore);

  return (
    <>
      <Breadcrumbs items={[]} className="mx-auto max-w-container-max px-4 pt-8 md:px-gutter" />
      <Hero />

      <section id="compare" className="mx-auto max-w-container-max scroll-mt-24 px-4 py-12 md:px-gutter">
        <MetricStrip />
      </section>

      <section className="mx-auto max-w-container-max px-4 py-8 md:px-gutter">
        <SectionHeading
          overline="Categories"
          title="Best hosting by category"
          subtitle="Whether you're launching WordPress, need a VPS, or want managed support - we've benchmarked the leaders in every category."
        />
        <div className="mt-10">
          <CategoryGrid slugs={categories.map((c) => c.slug)} type="category" />
        </div>
      </section>

      <section id="rankings" className="mx-auto max-w-container-max px-4 py-12 md:px-gutter">
        <SectionHeading
          overline="2024 Rankings"
          title="Top ranked hosting providers"
          subtitle="Ranked by editorial score, a weighted composite of performance, value, and support."
        />
        <div className="mt-10">
          <ProviderRankGrid providerIds={providers.map((p) => p.slug)} highlightFirst />
        </div>
      </section>

      <section id="benchmarks" className="mx-auto max-w-container-max scroll-mt-24 px-4 py-12 md:px-gutter">
        <SectionHeading
          overline="Live Data"
          title="Real-world benchmarks"
          subtitle="Median results from our automated probe network across 12 global locations, refreshed monthly."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <BenchmarkChart kind="ttfb" providers={topProviderSlugs.slice(0, 6)} />
          <BenchmarkChart kind="uptime" providers={topProviderSlugs.slice(0, 6)} />
        </div>
      </section>

      <section className="mx-auto max-w-container-max px-4 py-8 md:px-gutter">
        <SectionHeading
          overline="By Platform & Budget"
          title="Hosting for your stack and budget"
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-headline-md font-headline-md text-text-heading">By platform</h3>
            <CategoryGrid slugs={platforms.map((p) => p.slug).slice(0, 4)} type="platform" />
          </div>
          <div>
            <h3 className="mb-4 text-headline-md font-headline-md text-text-heading">By budget</h3>
            <CategoryGrid slugs={budgets.map((b) => b.slug).slice(0, 4)} type="budget" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-container-max px-4 py-12 md:px-gutter">
        <CTASection />
      </section>

      <section className="mx-auto max-w-container-max px-4 py-8 md:px-gutter">
        <Newsletter />
      </section>

      <section className="mx-auto max-w-container-max px-4 py-12 md:px-gutter">
        <InternalLinkGrid
          title="Start exploring"
          links={[
            ...categoryLinks(categories.slice(0, 3).map((c) => c.slug)),
            ...platformLinks(platforms.slice(0, 2).map((p) => p.slug)),
            ...comparisonLinks(["hostinger-vs-bluehost", "cloudways-vs-siteground"]),
            ...tutorialLinks(["install-wordpress-on-hostinger", "deploy-nextjs-on-vps"]),
          ]}
        />
      </section>
    </>
  );
}
