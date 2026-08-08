import Link from "next/link";
import { siteConfig } from "@/lib/site";

const columns = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/about#contact" },
      { label: "Methodology", href: "/methodology" },
    ],
  },
  {
    heading: "Compare",
    links: [
      { label: "Best WordPress Hosting", href: "/best/wordpress-hosting" },
      { label: "Best VPS Hosting", href: "/best/vps-hosting" },
      { label: "Hostinger vs Bluehost", href: "/comparisons/hostinger-vs-bluehost" },
      { label: "Cloudways vs SiteGround", href: "/comparisons/cloudways-vs-siteground" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-unit-xl w-full border-t border-border-subtle bg-surface-container-lowest py-unit-xl">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 md:px-gutter">
        <div className="space-y-4">
          <div className="text-headline-md font-headline-md font-bold text-text-heading">
            {siteConfig.name}
          </div>
          <p className="text-body-md font-body-md text-text-body">
            Technical precision in hosting reviews.
          </p>
          <p className="mt-4 text-label-sm font-label-sm text-text-body">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h4 className="mb-4 text-label-sm font-label-sm font-bold uppercase tracking-wider text-text-heading">
              {col.heading}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-md font-body-md text-text-body transition-colors duration-200 hover:text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
