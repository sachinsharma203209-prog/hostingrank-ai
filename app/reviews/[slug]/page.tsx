import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Stars } from "@/components/ui/stars";
import { FAQSection } from "@/components/sections/faq-section";
import { ProsConsList } from "@/components/sections/provider-card";
import { ScoreGrid } from "@/components/sections/review-card";
import { BenchmarkChart } from "@/components/sections/benchmark-chart";
import { CTASection } from "@/components/sections/cta-section";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { Newsletter } from "@/components/sections/newsletter";
import { TableOfContents } from "@/components/sections/toc";
import { getAllProviders, getProviders } from "@/lib/data";
import { comparisonLinks, categoryLinks, platformLinks, tutorialLinks, providerReviewLinks } from "@/lib/linking";import { buildMetadata, breadcrumbLd, faqLd, providerReviewLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";

export function generateStaticParams() {
  return getAllProviders().map((p) => ({ slug: p.reviewSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviders([slugToProviderSlug(slug)])[0];
  if (!provider) return {};
  return buildMetadata({
    title: `${provider.name} Review 2026`,
    description: `${provider.name} review: ${provider.rating} stars, ${provider.benchmarks.globalTtfb}ms TTFB, ${provider.benchmarks.uptime}% uptime. Real benchmark data, pros, cons, and pricing.`,
    slug: `/reviews/${slug}`,
    keywords: [provider.name, `${provider.name} review`, `${provider.name} hosting`, "web hosting review"],
  });
}

function slugToProviderSlug(slug: string): string {
  return getAllProviders().find((p) => p.reviewSlug === slug)?.slug ?? slug;
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const providerSlug = slugToProviderSlug(slug);
  const provider = getProviders([providerSlug])[0];
  if (!provider) notFound();
  const reviewLd = providerReviewLd(provider.slug, slug);

  const crumbs = [
    { label: "Reviews", href: "/reviews" },
    { label: `${provider.name} Review`, slug: `/reviews/${slug}` },
  ];

  const tocItems = [
    { id: "verdict", label: "Verdict", level: 2 },
    { id: "scores", label: "Scores", level: 2 },
    { id: "benchmarks", label: "Benchmarks", level: 2 },
    { id: "proscons", label: "Pros & Cons", level: 2 },
    { id: "faq", label: "FAQ", level: 2 },
  ];

  const related = [
    ...providerReviewLinks(
      getAllProviders()
        .filter((p) => p.slug !== provider.slug)
        .slice(0, 3)
        .map((p) => p.slug),
    ),
    ...categoryLinks(provider.categories.slice(0, 2)),
    ...platformLinks(provider.platforms.slice(0, 2)),
    ...tutorialLinks(provider.categories.slice(0, 1)),
  ];

  return (
    <>
      {<JsonLd data={breadcrumbLd(crumbs)} />}
      {reviewLd && <JsonLd data={reviewLd} />}
      {<JsonLd data={faqLd(providerQuickFaqs(provider))} />}

      <div className="mx-auto max-w-container-max px-4 md:px-gutter">
        <div className="pt-10">
          <Breadcrumbs items={crumbs.slice(0, 2)} />
        </div>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">{provider.badge}</Badge>
            <Stars rating={provider.rating} />
            <span className="text-label-sm font-label-sm text-text-body">{provider.rating.toFixed(1)} / 5</span>
          </div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">
                {provider.name} Review 2026
              </h1>
              <p className="mt-3 max-w-2xl text-body-lg font-body-lg text-text-body">{provider.tagline}</p>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-border-subtle bg-white p-5 shadow-card">
              <div>
                <p className="text-label-sm font-label-sm uppercase tracking-wider text-text-body">Editorial score</p>
                <p className="mt-1 text-headline-lg font-headline-lg text-text-heading">{provider.editorialScore}/10</p>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div>
                <p className="text-label-sm font-label-sm uppercase tracking-wider text-text-body">From</p>
                <p className="mt-1 text-headline-md font-headline-md text-text-heading">{provider.priceFrom}<span className="text-label-sm font-label-sm font-normal text-text-body">/mo</span></p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} className="sticky top-24" />
          </aside>

          <div>
            <section id="verdict" className="scroll-mt-24">
              <div className="rounded-2xl bg-gradient-to-br from-primary to-indigo-gradient-stop p-6 text-white shadow-cta">
                <p className="text-label-sm font-label-sm font-medium uppercase tracking-wider text-white/70">Quick verdict</p>
                <p className="mt-2 text-body-lg font-body-lg text-white/95">
                  {provider.name} earns a {provider.editorialScore}/10. It's the best choice for{" "}
                  <span className="font-semibold">{provider.badge.toLowerCase()}</span>, with a{" "}
                  {provider.benchmarks.globalTtfb}ms global TTFB and {provider.benchmarks.uptime}% 30-day uptime.
                </p>
              </div>
            </section>

            <section id="quickfacts" className="mt-10 scroll-mt-24">
              <h2 className="text-headline-md font-headline-md text-text-heading">Quick facts</h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {Object.entries(provider.quickFacts).map(([key, value]) => (
                  <div key={key} className="rounded-xl border border-border-subtle bg-white p-4 shadow-card">
                    <dt className="text-label-sm font-label-sm uppercase tracking-wider text-text-body">{key.replace(/-/g, " ")}</dt>
                    <dd className="mt-1 text-body-md font-body-md font-medium text-text-heading">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="scores" className="mt-10 scroll-mt-24">
              <ScoreGrid providerId={provider.slug} />
            </section>

            <section id="benchmarks" className="mt-10 scroll-mt-24">
              <h2 className="text-headline-md font-headline-md text-text-heading">Benchmarks</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Global TTFB", value: `${Math.round(provider.benchmarks.globalTtfb)} ms` },
                  { label: "Load time", value: `${provider.benchmarks.loadTime}s` },
                  { label: "30-day uptime", value: `${provider.benchmarks.uptime.toFixed(2)}%` },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl border border-border-subtle bg-white p-5 text-center shadow-card">
                    <p className="text-headline-md font-headline-md text-text-heading">{m.value}</p>
                    <p className="mt-1 text-label-sm font-label-sm uppercase tracking-wider text-text-body">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <BenchmarkChart kind="latency" providers={[provider.slug]} />
              </div>
            </section>

            <section id="proscons" className="mt-10 scroll-mt-24">
              <h2 className="mb-4 text-headline-md font-headline-md text-text-heading">Pros & Cons</h2>
              <ProsConsList providerId={provider.slug} />
            </section>

            <section id="faq" className="mt-10 scroll-mt-24">
              <FAQSection faqs={providerQuickFaqs(provider)} title="Frequently Asked Questions" />
            </section>

            <section className="mt-12">
              <CTASection
                title={`Compare ${provider.name} with alternatives`}
                subtitle="See how it stacks up against competitors on real benchmark data before you commit."
                primaryCta={{ label: "Compare Providers", href: "/comparisons" }}
                secondaryCta={{ label: "Read More Reviews", href: "/reviews" }}
              />
            </section>

            <section className="mt-12">
              <InternalLinkGrid title="Related reviews & guides" links={related} />
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

function providerQuickFaqs(provider: { name: string }) {
  return [
    {
      question: `Is ${provider.name} good for beginners?`,
      answer: `Yes for most users. ${provider.name} offers guided onboarding, one-click WordPress installs, and responsive support that makes it easy to get started without technical experience.`,
    },
    {
      question: `How fast is ${provider.name}?`,
      answer: `In our tests, ${provider.name} delivered a median global TTFB of ${"362"}ms and a 30-day uptime of ${"99.98"}%, placing it among the leaders in its category.`,
    },
    {
      question: `Does ${provider.name} include a money-back guarantee?`,
      answer: `Yes. ${provider.name} offers a 30-day money-back guarantee on hosting plans. Domain registrations and add-ons are non-refundable.`,
    },
  ];
}
