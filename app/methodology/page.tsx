import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = buildMetadata({
  title: "Methodology - How We Test Hosting",
  description: "Exactly how we benchmark hosting providers: test locations, metrics, scoring weights, and data freshness.",
  slug: "/methodology",
});

const metrics = [
  {
    title: "TTFB (Time to First Byte)",
    text: "Time from request to first byte from the origin server, measured from 12 global probe locations. We report the global median of 3 runs.",
  },
  {
    title: "Load time & LCP",
    text: "Full document load and Largest Contentful Paint, measured with headless Chromium at 4G throttling. We exclude CDN-only assets to isolate origin performance.",
  },
  {
    title: "Uptime",
    text: "HTTP(S) checks every 60 seconds over 30 and 90 day windows. We count any 5xx or timeout over 30 seconds as downtime.",
  },
  {
    title: "Latency by region",
    text: "Round-trip ICMP/TCP handshake latency from test nodes in India (Mumbai/Delhi), USA (NYC/LA), UK (London), plus 6 other regions.",
  },
];

const weights = [
  { label: "Performance (TTFB + load + LCP)", value: 40 },
  { label: "Value for money", value: 25 },
  { label: "Support quality", value: 20 },
  { label: "Features & ecosystem", value: 15 },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-container-max px-4 md:px-gutter">
      <div className="pt-10">
        <Breadcrumbs items={[{ label: "Methodology", slug: "/methodology" }]} />
      </div>
      <header className="mt-8 max-w-3xl">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Methodology</h1>
        <p className="mt-4 text-body-lg font-body-lg text-text-body">
          Every score on this site comes from the same repeatable process. If we can't reproduce a
          number, we don't publish it.
        </p>
      </header>

      <section className="mt-12">
        <SectionHeading title="What we measure" align="left" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {metrics.map((m) => (
            <div key={m.title} className="rounded-2xl border border-border-subtle bg-white p-6 shadow-card">
              <h2 className="text-headline-md font-headline-md text-text-heading">{m.title}</h2>
              <p className="mt-2 text-body-md font-body-md text-text-body">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading title="How the editorial score is weighted" align="left" />
        <div className="mt-6 rounded-2xl border border-border-subtle bg-white p-6 shadow-card">
          <div className="space-y-5">
            {weights.map((w) => (
              <div key={w.label}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-label-sm font-label-sm text-text-body">{w.label}</span>
                  <span className="text-label-md font-label-md font-semibold text-text-heading">{w.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-gradient-stop"
                    style={{ width: `${w.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading title="Data freshness" align="left" />
        <p className="mt-4 max-w-3xl leading-8 text-text-body">
          Benchmark figures refresh monthly; pricing and plan details are verified weekly against the
          provider's public pages. Prices shown are the provider's own advertised intro rates with renewal
          rates called out explicitly where they differ. We never accept payment to change a score, and
          affiliate links never influence rankings - see our{' '}
          <a href="/affiliate-disclosure" className="font-medium text-primary underline underline-offset-2">
            affiliate disclosure
          </a>
          .
        </p>
      </section>

      <section className="mt-12">
        <Newsletter />
      </section>
    </div>
  );
}
