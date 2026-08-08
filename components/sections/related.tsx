import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InternalLink } from "@/lib/linking";

export function RelatedCard({
  title,
  link,
  meta,
  className,
}: {
  title: string;
  link: string;
  meta?: string;
  className?: string;
}) {
  return (
    <Link
      href={link}
      className={cn(
        "group flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover",
        className,
      )}
    >
      <h3 className="text-label-md font-label-md font-semibold leading-6 text-text-heading group-hover:text-primary">
        {title}
      </h3>
      <div className="mt-4 flex items-center justify-between">
        {meta && <span className="text-label-sm font-label-sm text-text-body">{meta}</span>}
        <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </Link>
  );
}

export function RelatedLinks({
  title = "Keep exploring",
  items,
  className,
}: {
  title?: string;
  items: { label: string; href: string; meta?: string }[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className={className}>
      <h2 className="text-headline-md font-headline-md text-text-heading">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <RelatedCard key={item.href} title={item.label} link={item.href} meta={item.meta} />
        ))}
      </div>
    </section>
  );
}
