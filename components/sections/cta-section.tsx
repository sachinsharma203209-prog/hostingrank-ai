import Link from "next/link";
import { ArrowRight, FileText, BookOpen, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

export function CTASection({
  title = "Ready to find the fastest hosting?",
  subtitle = "Compare real benchmark data across all major providers, or read our full reviews before you commit.",
  primaryCta = { label: "Start Comparing", href: "/best/wordpress-hosting" },
  secondaryCta = { label: "Read Reviews", href: "/reviews/hostinger-review" },
  className,
}: {
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-container to-indigo-gradient-stop p-8 text-center text-white shadow-cta sm:p-12",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-headline-lg-mobile font-headline-lg-mobile text-white md:text-headline-lg md:font-headline-lg">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-body-md font-body-md text-white/85">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={primaryCta.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-label-md font-label-md font-semibold text-primary transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-label-md font-label-md font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

const resourceIcons = {
  article: FileText,
  guide: BookOpen,
  comparison: Scale,
} as const;

export function ResourceLinks({
  items,
  type = "article",
  className,
}: {
  items: { label: string; href: string; description?: string }[];
  type?: keyof typeof resourceIcons;
  className?: string;
}) {
  const Icon = resourceIcons[type];
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex items-center gap-4 rounded-xl border border-border-subtle bg-white p-4 shadow-card transition-all hover:border-primary/40 hover:shadow-card-hover"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </span>
          <span className="flex-1">
            <span className="block text-label-md font-label-md font-semibold text-text-heading group-hover:text-primary">
              {item.label}
            </span>
            {item.description && (
              <span className="mt-0.5 block text-label-sm font-label-sm text-text-body">{item.description}</span>
            )}
          </span>
          <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>
      ))}
    </div>
  );
}
