import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { getComparisons, getProviders } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = buildMetadata({
  title: "Hosting Comparisons - Side by Side",
  description: "Head-to-head hosting comparisons with real benchmark data. See which provider wins on TTFB, uptime, value, and support.",
  slug: "/comparisons",
});

export default function ComparisonsIndex() {
  const comparisons = getComparisons();

  return (
    <div className="mx-auto max-w-container-max px-4 md:px-gutter">
      <div className="pt-10">
        <Breadcrumbs items={[{ label: "Comparisons", slug: "/comparisons" }]} />
      </div>
      <header className="mt-8 max-w-3xl">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Hosting Comparisons</h1>
        <p className="mt-4 text-body-lg font-body-lg text-text-body">
          We pit the leading providers head-to-head across performance, value, and support - then tell you
          exactly who wins and why.
        </p>
      </header>

      <section className="mt-12">
        <SectionHeading title="All comparisons" align="left" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {comparisons.map((c) => {
            const providers = getProviders(c.providers);
            const winner = getProviders([c.verdictWinner])[0];
            return (
              <Link
                key={c.slug}
                href={`/comparisons/${c.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 text-label-sm font-label-sm font-semibold uppercase tracking-wider text-primary">
                    <Scale className="h-4 w-4" /> Comparison
                  </span>
                  <h2 className="mt-3 text-headline-md font-headline-md text-text-heading group-hover:text-primary">
                    {c.title}
                  </h2>
                  <p className="mt-2 text-body-md font-body-md text-text-body">{c.description}</p>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-label-sm font-label-sm text-text-body">
                    <span className="font-semibold text-text-heading">{providers.map((p) => p.name).join(" vs ")}</span>
                    {winner && <span> · Winner: {winner.name}</span>}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <Newsletter />
      </section>
    </div>
  );
}
