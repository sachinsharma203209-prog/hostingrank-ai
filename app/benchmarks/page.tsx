import type { Metadata } from "next";
import { getProviders } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BenchmarkChart } from "@/components/sections/benchmark-chart";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = buildMetadata({
  title: "Hosting Benchmarks - TTFB, Uptime & Latency Data",
  description: "Live hosting benchmarks: global TTFB, 30-day uptime, and regional latency for the top 14 providers, refreshed monthly.",
  slug: "/benchmarks",
});

export default function BenchmarksPage() {
  const providers = getProviders(["hostinger", "cloudways", "siteground", "kinsta", "bluehost", "wp-engine"]);

  return (
    <div className="mx-auto max-w-container-max px-4 md:px-gutter">
      <div className="pt-10">
        <Breadcrumbs items={[{ label: "Benchmarks", slug: "/benchmarks" }]} />
      </div>
      <header className="mt-8 max-w-3xl">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Hosting Benchmarks</h1>
        <p className="mt-4 text-body-lg font-body-lg text-text-body">
          Automated synthetic probes run from 12 global locations against every provider. We report the
          median of 3 runs each month. Here's the raw data.
        </p>
      </header>

      <section className="mt-12">
        <SectionHeading title="Global TTFB & uptime" align="left" />
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <BenchmarkChart kind="ttfb" providers={providers.map((p) => p.slug)} />
          <BenchmarkChart kind="uptime" providers={providers.map((p) => p.slug)} />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading title="Latency by region" align="left" />
        <div className="mt-6">
          <BenchmarkChart kind="latency" providers={providers.map((p) => p.slug)} />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading title="Performance scores" align="left" />
        <div className="mt-6">
          <BenchmarkChart kind="performance" providers={providers.map((p) => p.slug)} />
        </div>
      </section>

      <section className="mt-12">
        <Newsletter />
      </section>
    </div>
  );
}
