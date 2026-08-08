import type { Metadata } from "next";
import { getAllProviders, getComparison } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { ProviderRankGrid } from "@/components/sections/category-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = buildMetadata({
  title: "Web Hosting Reviews 2026",
  description: "In-depth hosting reviews with real benchmark data. Read honest pros, cons, pricing, and performance scores for 14 providers.",
  slug: "/reviews",
});

export default function ReviewsIndex() {
  const providers = getAllProviders().sort((a, b) => b.editorialScore - a.editorialScore);

  return (
    <div className="mx-auto max-w-container-max px-4 md:px-gutter">
      <div className="pt-10">
        <Breadcrumbs items={[{ label: "Reviews", slug: "/reviews" }]} />
      </div>
      <header className="mt-8 max-w-3xl">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Hosting Reviews</h1>
        <p className="mt-4 text-body-lg font-body-lg text-text-body">
          Honest, benchmark-driven reviews of the leading hosting providers. Every score is backed by
          our probe network data - not sponsored filler.
        </p>
      </header>

      <section className="mt-12">
        <SectionHeading title="All reviews, ranked" align="left" />
        <div className="mt-6">
          <ProviderRankGrid providerIds={providers.map((p) => p.slug)} highlightFirst />
        </div>
      </section>

      <section className="mt-12">
        <Newsletter />
      </section>
    </div>
  );
}
