import Link from "next/link";
import { ArrowRight, FileText, BookOpen, Scale, MonitorPlay } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InternalLink } from "@/lib/linking";

const typeMeta = {
  category: { icon: FileText, label: "Guide" },
  platform: { icon: MonitorPlay, label: "Platform" },
  budget: { icon: FileText, label: "Budget" },
  country: { icon: FileText, label: "Country" },
  comparison: { icon: Scale, label: "Comparison" },
  review: { icon: BookOpen, label: "Review" },
  tutorial: { icon: MonitorPlay, label: "Tutorial" },
} as const;

export function InternalLinkGrid({
  title = "Explore more",
  links,
  className,
}: {
  title?: string;
  links: InternalLink[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="text-headline-md font-headline-md text-text-heading">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => {
          const meta = typeMeta[link.type];
          const Icon = meta.icon;
          return (
            <Link
              key={link.slug}
              href={link.slug}
              className="group flex items-center gap-3 rounded-xl border border-border-subtle bg-white p-4 shadow-card transition-all hover:border-primary/40 hover:shadow-card-hover"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-label-md font-label-md font-semibold text-text-heading group-hover:text-primary">
                  {link.label}
                </span>
                <span className="text-label-sm font-label-sm text-text-body">{meta.label}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
