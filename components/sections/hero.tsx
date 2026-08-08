import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProviders } from "@/lib/data";
import { ChartClient } from "@/components/sections/benchmark-chart-client";

function serializeProviders() {
  return getProviders(["hostinger", "siteground", "kinsta", "cloudways", "a2-hosting"]).map(
    (p) => ({
      name: p.name,
      globalTtfb: Math.round(p.benchmarks.globalTtfb),
      uptime: Number(p.benchmarks.uptime.toFixed(2)),
      performanceScore: p.benchmarks.performanceScore,
      latency: {
        india: Math.round(p.benchmarks.latency.india ?? 0),
        usa: Math.round(p.benchmarks.latency.usa ?? 0),
        uk: Math.round(p.benchmarks.latency.uk ?? 0),
      },
    }),
  );
}

export function Hero({
  eyebrow,
  title = "Find the Fastest & Most Reliable Web Hosting",
  subtitle = "Compare real performance benchmarks, uptime, TTFB, pricing, and speed across the world's leading hosting providers. Data-driven insights for technical professionals.",
  primaryCta = { label: "Compare Hosting", href: "#compare" },
  secondaryCta = { label: "View Benchmarks", href: "#benchmarks" },
  className,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}) {
  const providers = serializeProviders();

  return (
    <section className={cn("relative overflow-hidden pt-unit-xl pb-unit-xl", className)}>
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern opacity-60" />
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary-container/10 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-container-max px-margin-mobile text-center md:px-gutter">
        <div className="mx-auto max-w-3xl space-y-6">
          {eyebrow && (
            <p className="text-label-md font-label-md text-primary">{eyebrow}</p>
          )}
          <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-text-heading leading-tight tracking-tight md:text-display-xl md:font-display-xl">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-body-lg font-body-lg text-text-body">
            {subtitle}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-6 py-3 text-label-md font-label-md text-on-primary shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:shadow-cta-hover sm:w-auto"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex w-full items-center justify-center rounded-lg border border-border-subtle bg-surface-container-lowest px-6 py-3 text-label-md font-label-md text-text-heading transition-all duration-200 hover:border-outline-variant hover:bg-surface-container sm:w-auto"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute -inset-1 rounded-[20px] bg-gradient-to-r from-primary-container via-indigo-gradient-stop to-secondary-container opacity-20 blur" />
          <div className="glass-panel relative overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest/80 shadow-2xl">
            <div className="flex h-8 items-center space-x-2 border-b border-border-subtle bg-surface-container-low px-4">
              <div className="h-3 w-3 rounded-full bg-error/70" />
              <div className="h-3 w-3 rounded-full bg-tertiary-container/70" />
              <div className="h-3 w-3 rounded-full bg-success-emerald/70" />
            </div>
            <div className="p-6">
              <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div className="text-left">
                  <p className="text-headline-md font-headline-md text-text-heading">
                    Performance Benchmark
                  </p>
                  <p className="text-label-sm font-label-sm text-text-body">
                    Median TTFB across 12 global test locations
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-success-emerald/30 bg-emerald-50 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-emerald" />
                  <span className="text-label-sm font-label-sm font-bold text-emerald-700">
                    99.99% Uptime
                  </span>
                </div>
              </div>
              <div className="h-64 sm:h-72">
                <ChartClient kind="ttfb" providers={providers} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Providers", value: "40+" },
                  { label: "Best TTFB", value: "142ms" },
                  { label: "Avg Uptime", value: "99.97%" },
                  { label: "Data Centers", value: "120+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg bg-surface-container-low px-3 py-3 text-center"
                  >
                    <div className="text-headline-md font-headline-md text-text-heading">
                      {stat.value}
                    </div>
                    <div className="text-label-sm font-label-sm text-text-body">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
