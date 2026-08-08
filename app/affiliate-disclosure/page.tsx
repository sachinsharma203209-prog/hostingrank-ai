import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: "HostingRank AI's affiliate disclosure: how links work, what changes, and what never does.",
  slug: "/affiliate-disclosure",
});

export default function AffiliateDisclosure() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-gutter">
      <div className="pt-4">
        <Breadcrumbs items={[{ label: "Affiliate Disclosure", slug: "/affiliate-disclosure" }]} />
      </div>
      <header className="mt-8">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Affiliate Disclosure</h1>
        <p className="mt-2 text-label-sm font-label-sm text-text-body">Last updated: August 7, 2026</p>
      </header>

      <div className="prose-hosting mt-8 max-w-none">
        <p>
          HostingRank AI is reader-supported. We currently do not use any affiliate or outbound links to
          hosting providers. All links on this site point to our own reviews, comparisons, and guides.
        </p>
        <h2>What never changes</h2>
        <ul>
          <li>Our benchmark data - it comes from our own probe network, not from providers.</li>
          <li>Editorial scores - calculated from measured performance before any consideration.</li>
          <li>Rankings - a provider cannot buy a higher position or a better review.</li>
          <li>Pros and cons - we publish what we find, including reasons not to buy.</li>
        </ul>
        <h2>If we add affiliate links later</h2>
        <p>
          If we ever introduce affiliate links, they will be marked with <code>rel="sponsored"</code>, and
          this policy will be updated in advance.
        </p>
        <h2>How we stay independent</h2>
        <p>
          Our rankings are based purely on measured data. If we recommend a host, it's because the data
          says so.
        </p>
        <p>
          Read more about exactly how we test in our <a href="/methodology">methodology</a>.
        </p>
      </div>
    </div>
  );
}
