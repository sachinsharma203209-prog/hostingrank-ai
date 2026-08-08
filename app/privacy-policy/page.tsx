import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How HostingRank AI collects, uses, and protects your data.",
  slug: "/privacy-policy",
});

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-gutter">
      <div className="pt-4">
        <Breadcrumbs items={[{ label: "Privacy Policy", slug: "/privacy-policy" }]} />
      </div>
      <header className="mt-8">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Privacy Policy</h1>
        <p className="mt-2 text-label-sm font-label-sm text-text-body">Last updated: August 7, 2026</p>
      </header>

      <div className="prose-hosting mt-8 max-w-none">
        <h2>Information we collect</h2>
        <ul>
          <li>Contact information you submit through forms (e.g. email address for the newsletter).</li>
          <li>Anonymous analytics data such as pages visited, referrer, and approximate location.</li>
          <li>Cookies and local storage used for core site functionality.</li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To deliver and improve the content you asked for.</li>
          <li>To send the newsletter only if you opted in - every email has an unsubscribe link.</li>
          <li>To measure which content performs so we can publish more of it.</li>
        </ul>
        <h2>Affiliate links</h2>
        <p>
          When you click an affiliate link on this site we may earn a commission if you purchase. Our
          partners may use cookies to attribute that referral. This never affects our scores or your price.
        </p>
        <h2>Data retention & rights</h2>
        <p>
          We keep newsletter data until you unsubscribe. You may request deletion of your data at any time
          by emailing <a href="mailto:hello@hostingranks.in">hello@hostingranks.in</a>.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy: <a href="mailto:hello@hostingranks.in">hello@hostingranks.in</a>
        </p>
      </div>
    </div>
  );
}
