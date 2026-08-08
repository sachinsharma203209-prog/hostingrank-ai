import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: "HostingRank AI publishes independent, benchmark-driven hosting reviews. Learn who we are and how we stay unbiased.",
  slug: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-gutter">
      <div className="pt-4">
        <Breadcrumbs items={[{ label: "About", slug: "/about" }]} />
      </div>
      <header className="mt-8">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">About HostingRank AI</h1>
      </header>

      <div className="prose-hosting mt-8 max-w-none">
        <p>
          HostingRank AI exists because most hosting reviews are written from affiliate commissions, not
          data. We built an automated probe network that measures real TTFB, uptime, and latency across 12
          global locations, then we write our recommendations from those numbers.
        </p>
        <h2>What we do</h2>
        <ul>
          <li>Run monthly synthetic benchmarks against every major provider.</li>
          <li>Verify pricing and plan details weekly, including renewal rates.</li>
          <li>Test support response times with real tickets, not marketing claims.</li>
          <li>Rank providers with a weighted editorial score - never pay-to-play.</li>
        </ul>
        <h2>How we stay independent</h2>
        <p>
          Rankings are calculated from measured data before we look at any commission. Affiliate links
          never change a score, and a provider can't buy placement. You can read the full rules in our{" "}
          <a href="/affiliate-disclosure">affiliate disclosure</a> and the exact test process in our{" "}
          <a href="/methodology">methodology</a>.
        </p>
        <h2>Contact</h2>
        <p>
          Found an outdated price or a test result that looks wrong? Email us at{" "}
          <a href="mailto:hello@hostingranks.in">hello@hostingranks.in</a> - we re-test everything that gets
          flagged.
        </p>
      </div>

      <section className="mt-12" id="contact">
        <Newsletter />
      </section>
    </div>
  );
}
