import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQSection } from "@/components/sections/faq-section";
import { ComparisonTable, DimensionTable, QuickVerdict, WinnerCallout } from "@/components/sections/comparison-table";
import { BenchmarkChart } from "@/components/sections/benchmark-chart";
import { CTASection } from "@/components/sections/cta-section";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { Newsletter } from "@/components/sections/newsletter";
import { TableOfContents } from "@/components/sections/toc";
import { getComparison, getComparisons, getProviders } from "@/lib/data";
import { comparisonLinks, categoryLinks, tutorialLinks } from "@/lib/linking";
import { buildMetadata, breadcrumbLd, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";

export function generateStaticParams() {
  return getComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};
  return buildMetadata({
    title: comparison.h1,
    description: comparison.description,
    slug: `/comparisons/${slug}`,
    keywords: [comparison.shortName, "hosting comparison", "compare hosting"],
  });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const providers = getProviders(comparison.providers);
  const crumbs = [
    { label: "Comparisons", href: "/comparisons" },
    { label: comparison.shortName, slug: `/comparisons/${slug}` },
  ];

  const tocItems = [
    { id: "verdict", label: "Quick verdict", level: 2 },
    { id: "table", label: "Side-by-side", level: 2 },
    { id: "dimensions", label: "Key dimensions", level: 2 },
    { id: "benchmarks", label: "Benchmarks", level: 2 },
    { id: "faq", label: "FAQ", level: 2 },
  ];

  const related = [
    ...comparisonLinks(comparison.relatedComparisons),
    ...categoryLinks(comparison.relatedCategories),
    ...tutorialLinks(comparison.relatedTutorials),
  ];

  return (
    <>
      {<JsonLd data={breadcrumbLd(crumbs)} />}
      {<JsonLd data={faqLd(comparison.faqs)} />}

      <div className="mx-auto max-w-container-max px-4 md:px-gutter">
        <div className="pt-10">
          <Breadcrumbs items={crumbs.slice(0, 2)} />
        </div>

        <header className="mt-8 max-w-3xl">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-label-sm font-label-sm font-semibold uppercase tracking-wider text-primary">
            Comparison
          </span>
          <h1 className="mt-4 text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">{comparison.h1}</h1>
          <p className="mt-4 text-body-lg font-body-lg text-text-body">{comparison.intro}</p>
          <p className="mt-4 text-label-sm font-label-sm text-text-body">Updated: {comparison.updatedAt}</p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} className="sticky top-24" />
          </aside>

          <div>
            <section id="verdict" className="scroll-mt-24">
              <QuickVerdict slug={slug} />
              <div className="mt-4">
                <WinnerCallout slug={slug} />
              </div>
            </section>

            <section id="table" className="mt-12 scroll-mt-24">
              <SectionHeading overline="Data" title="Side-by-side comparison" align="left" />
              <div className="mt-6">
                <ComparisonTable slug={slug} />
              </div>
            </section>

            <section id="dimensions" className="mt-12 scroll-mt-24">
              <SectionHeading overline="Analysis" title="How they compare dimension by dimension" align="left" />
              <div className="mt-6">
                <DimensionTable slug={slug} />
              </div>
            </section>

            <section id="benchmarks" className="mt-12 scroll-mt-24">
              <SectionHeading overline="Data" title="Benchmark comparison" align="left" />
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <BenchmarkChart kind="ttfb" providers={comparison.providers} />
                <BenchmarkChart kind="latency" providers={comparison.providers} />
              </div>
            </section>

            <section id="proscons" className="mt-12 scroll-mt-24">
              <SectionHeading overline="Pros & Cons" title="The quick summary" align="left" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {providers.map((p) => (
                  <div key={p.slug} className="rounded-2xl border border-border-subtle bg-white p-5 shadow-card">
                    <h3 className="text-headline-md font-headline-md text-text-heading">{p.name}</h3>
                    <ul className="mt-3 space-y-2">
                      {p.pros.slice(0, 3).map((pro) => (
                        <li key={pro} className="text-body-md font-body-md text-text-body">+ {pro}</li>
                      ))}
                    </ul>
                    <ul className="mt-3 space-y-2">
                      {p.cons.slice(0, 2).map((con) => (
                        <li key={con} className="text-body-md font-body-md text-text-body">− {con}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <FAQSection faqs={comparison.faqs} />

            <section className="mt-12">
              <CTASection
                title={`Still deciding?`}
                subtitle="Read both full reviews and test your site on each provider before committing."
                primaryCta={{ label: "Read Reviews", href: `/reviews/${providers[0]?.reviewSlug ?? "hostinger-review"}` }}
                secondaryCta={{ label: "All Comparisons", href: "/comparisons" }}
              />
            </section>

            <section className="mt-12">
              <InternalLinkGrid title="More comparisons & guides" links={related} />
            </section>

            <section className="mt-12">
              <Newsletter />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
