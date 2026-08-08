import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { FAQSection } from "@/components/sections/faq-section";
import { ProviderRankGrid } from "@/components/sections/category-grid";
import { BenchmarkChart } from "@/components/sections/benchmark-chart";
import { CTASection } from "@/components/sections/cta-section";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { Newsletter } from "@/components/sections/newsletter";
import { TableOfContents } from "@/components/sections/toc";
import { buildMetadata, breadcrumbLd, faqLd, itemListLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import {
  getCategory,
  getPlatform,
  getBudget,
  getCountry,
  getProviders,
  getAllCategories as getAllCategoriesArr,
  getAllPlatforms as getAllPlatformsArr,
  getAllBudgets as getAllBudgetsArr,
  getAllCountries as getAllCountriesArr,
  type Category,
  type Platform,
  type Budget,
  type Country,
} from "@/lib/data";
import { categoryLinks, platformLinks, budgetLinks, countryLinks, comparisonLinks, tutorialLinks } from "@/lib/linking";

type ResolvedItem =
  | { kind: "category"; item: Category }
  | { kind: "platform"; item: Platform }
  | { kind: "budget"; item: Budget }
  | { kind: "country"; item: Country };

function resolve(slug: string): ResolvedItem | null {
  const category = getCategory(slug);
  if (category) return { kind: "category", item: category };
  const platform = getPlatform(slug);
  if (platform) return { kind: "platform", item: platform };
  const budget = getBudget(slug);
  if (budget) return { kind: "budget", item: budget };
  const country = getCountry(slug);
  if (country) return { kind: "country", item: country };
  return null;
}

export function generateStaticParams() {
  return [
    ...getAllCategoriesSlugs(),
    ...getAllPlatformsSlugs(),
    ...getAllBudgetsSlugs(),
    ...getAllCountriesSlugs(),
  ].map((slug) => ({ slug }));
}

function getAllCategoriesSlugs() {
  return getAllCategoriesArr().map((c) => c.slug);
}
function getAllPlatformsSlugs() {
  return getAllPlatformsArr().map((p) => p.slug);
}
function getAllBudgetsSlugs() {
  return getAllBudgetsArr().map((b) => b.slug);
}
function getAllCountriesSlugs() {
  return getAllCountriesArr().map((c) => c.slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) return {};
  const { kind, item } = resolved;
  return buildMetadata({
    title: item.h1,
    description: item.description,
    slug: `/best/${slug}`,
    keywords: [item.shortName, kind, "web hosting", "best hosting"],
  });
}

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) notFound();

  const { kind, item } = resolved;
  const providers = getProviders(item.providers).sort((a, b) => b.editorialScore - a.editorialScore);
  const typeLabel = kind.charAt(0).toUpperCase() + kind.slice(1);

  const breadcrumbs = [
    { label: "Best Hosting", href: "/best" },
    { label: item.shortName, slug: `/best/${slug}` },
  ];

  const tocItems = [
    { id: "overview", label: "Overview", level: 2 },
    { id: "rankings", label: "Rankings", level: 2 },
    { id: "benchmarks", label: "Benchmarks", level: 2 },
    ...(kind === "budget" ? [{ id: "tiers", label: "Plan tiers", level: 2 }] : []),
    ...(kind === "budget" ? [{ id: "tradeoffs", label: "Technical tradeoffs", level: 2 }] : []),
    { id: "faq", label: "FAQ", level: 2 },
  ];

  const related = [
    ...categoryLinks("relatedCategories" in item ? item.relatedCategories : []),
    ...platformLinks("relatedCategories" in item ? item.relatedCategories : []),
    ...budgetLinks("relatedCategories" in item ? item.relatedCategories : []),
    ...comparisonLinks(item.relatedComparisons),
    ...tutorialLinks(item.relatedTutorials),
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(breadcrumbs)} />
      <JsonLd data={faqLd(item.faqs)} />
      <JsonLd
        data={itemListLd(providers.map((p) => ({ name: p.name, slug: `/reviews/${p.reviewSlug}` })))}
      />

      <div className="mx-auto max-w-container-max px-4 md:px-gutter">
        <div className="pt-10">
          <Breadcrumbs items={breadcrumbs.slice(0, 2)} />
        </div>

        <header className="mt-8 max-w-3xl">
          <Badge variant="default">{typeLabel} Guide</Badge>
          <h1 className="mt-4 text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">{item.h1}</h1>
          <p className="mt-4 text-body-lg font-body-lg text-text-body">{item.intro}</p>
          <p className="mt-4 text-label-sm font-label-sm text-text-body">Updated: {item.updatedAt}</p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} className="sticky top-24" />
          </aside>

          <div>
            <section id="overview" className="scroll-mt-24">
              <SectionHeading overline="Overview" title="At a glance" align="left" />
              <p className="mt-4 text-body-md font-body-md leading-8 text-text-body">{item.description}</p>
            </section>

            <section id="rankings" className="mt-12 scroll-mt-24">
              <SectionHeading overline="Rankings" title="The ranked list" align="left" />
              <div className="mt-6">
                <ProviderRankGrid providerIds={providers.map((p) => p.slug)} highlightFirst />
              </div>
            </section>

            {kind === "budget" && item.tiers && (
              <section id="tiers" className="mt-12 scroll-mt-24">
                <SectionHeading overline="Pricing" title="Plan tiers compared" align="left" />
                <div className="mt-6 overflow-x-auto rounded-2xl border border-border-subtle bg-white shadow-card">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-container-low text-left">
                        <th className="px-4 py-3 font-medium text-text-heading">Provider</th>
                        <th className="px-4 py-3 font-medium text-text-heading">Plan</th>
                        <th className="px-4 py-3 font-medium text-text-heading">Intro price</th>
                        <th className="px-4 py-3 font-medium text-text-heading">Renewal</th>
                        <th className="px-4 py-3 font-medium text-text-heading">Storage</th>
                        <th className="px-4 py-3 font-medium text-text-heading">Uptime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.tiers.map((tier) => (
                        <tr key={tier.plan} className="border-b border-slate-100 last:border-0">
                          <td className="px-4 py-3 font-medium text-text-heading">
                            {providers.find((p) => p.slug === tier.providerId)?.name ?? tier.providerId}
                          </td>
                          <td className="px-4 py-3 text-text-body">{tier.plan}</td>
                          <td className="px-4 py-3 font-medium text-text-heading">{tier.introPrice}</td>
                          <td className="px-4 py-3 text-text-body">
                            {tier.renewalPrice}
                            <span className={`ml-1 text-xs ${tier.renewalJump === "0%" ? "text-success-emerald" : "text-red-500"}`}>
                              {tier.renewalJump}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-text-body">{tier.storage}</td>
                          <td className="px-4 py-3 text-success-emerald">{tier.uptime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {item.renewalWarning && (
                  <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-body-md font-body-md text-amber-700">
                    ⚠️ {item.renewalWarning}
                  </p>
                )}
              </section>
            )}

            {kind === "budget" && item.technicalTradeoffs && (
              <section id="tradeoffs" className="mt-12 scroll-mt-24">
                <SectionHeading overline="Analysis" title="Technical tradeoffs at this price" align="left" />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {item.technicalTradeoffs.map((t) => (
                    <div key={t.title} className="rounded-2xl border border-border-subtle bg-white p-5 shadow-card">
                      <h3 className="text-headline-md font-headline-md text-text-heading">{t.title}</h3>
                      <p className="mt-2 text-body-md font-body-md text-text-body">{t.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {kind === "country" && item.whyLocal && (
              <section className="mt-12">
                <SectionHeading overline="Why it matters" title="Why local hosting wins" align="left" />
                <ul className="mt-6 space-y-3">
                  {item.whyLocal.map((reason) => (
                    <li key={reason} className="flex items-start gap-3 rounded-xl border border-border-subtle bg-white p-4 text-body-md font-body-md leading-6 text-text-body shadow-card">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      {reason}
                    </li>
                  ))}
                </ul>
                {item.localLatency && (
                  <p className="mt-4 text-body-md font-body-md text-text-body">
                    Typical local latency: <span className="font-semibold text-text-heading">{item.localLatency}</span>
                  </p>
                )}
              </section>
            )}

            <section id="benchmarks" className="mt-12 scroll-mt-24">
              <SectionHeading overline="Data" title="Benchmarks" align="left" />
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <BenchmarkChart kind="ttfb" providers={providers.map((p) => p.slug).slice(0, 6)} />
                <BenchmarkChart kind="uptime" providers={providers.map((p) => p.slug).slice(0, 6)} />
              </div>
            </section>

            <FAQSection faqs={item.faqs} />

            <section className="mt-12">
              <CTASection
                title={`Find the best hosting for you`}
                subtitle="Read in-depth reviews or compare providers side by side before you commit."
                primaryCta={{ label: "Read Reviews", href: `/reviews/${providers[0]?.reviewSlug ?? "hostinger-review"}` }}
                secondaryCta={{ label: "Compare", href: "/comparisons" }}
              />
            </section>

            <section className="mt-12">
              <InternalLinkGrid title="Related guides & comparisons" links={related} />
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
