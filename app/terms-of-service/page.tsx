import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing your use of HostingRank AI.",
  slug: "/terms-of-service",
});

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-gutter">
      <div className="pt-4">
        <Breadcrumbs items={[{ label: "Terms of Service", slug: "/terms-of-service" }]} />
      </div>
      <header className="mt-8">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Terms of Service</h1>
        <p className="mt-2 text-label-sm font-label-sm text-text-body">Last updated: August 7, 2026</p>
      </header>

      <div className="prose-hosting mt-8 max-w-none">
        <h2>Use of content</h2>
        <p>
          Content on HostingRank AI is for informational purposes. You may reference and link to our pages
          freely. Republishing full articles or scraping benchmark data without attribution is not
          permitted.
        </p>
        <h2>No warranty</h2>
        <p>
          Hosting benchmarks, prices, and plan details change over time and are provided "as is" without
          warranty of any kind. Always verify pricing and features with the provider before purchasing.
        </p>
        <h2>Affiliate relationships</h2>
        <p>
          HostingRank AI participates in affiliate programs. We may earn a commission on purchases made
          through links on this site. This does not affect the information we publish.
        </p>
        <h2>Liability</h2>
        <p>
          To the maximum extent permitted by law, HostingRank AI is not liable for decisions made based on
          content on this site, including purchases or migrations.
        </p>
        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the site constitutes acceptance of
          the current terms.
        </p>
        <h2>Contact</h2>
        <p>
          Questions: <a href="mailto:hello@hostingranks.in">hello@hostingranks.in</a>
        </p>
      </div>
    </div>
  );
}
