import Link from "next/link";
import { ArrowRight, Trophy, X, Minus } from "lucide-react";
import { getComparison, getProviders } from "@/lib/data";
import { Stars } from "@/components/ui/stars";
import { cn } from "@/lib/utils";

export function ComparisonTable({ slug, className }: { slug: string; className?: string }) {
  const comparison = getComparison(slug);
  if (!comparison) return null;

  const providers = getProviders(comparison.providers);

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border-subtle shadow-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-border-subtle bg-surface-container-low">
              <th className="px-4 py-4 text-left text-label-sm font-label-sm font-medium text-text-heading">Compare</th>
              {providers.map((p) => (
                <th key={p.slug} className="px-4 py-4 text-left">
                  <Link href={`/reviews/${p.reviewSlug}`} className="text-label-md font-label-md font-semibold text-text-heading hover:text-primary">
                    {p.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-4 text-body-md font-body-md text-text-body">Rating</td>
              {providers.map((p) => (
                <td key={p.slug} className="px-4 py-4">
                  <Stars rating={p.rating} />
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-4 text-body-md font-body-md text-text-body">Starting price</td>
              {providers.map((p) => (
                <td key={p.slug} className="px-4 py-4 text-body-md font-body-md font-semibold text-text-heading">
                  {p.priceFrom}
                  <span className="font-normal text-text-body">/mo</span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-4 text-body-md font-body-md text-text-body">Global TTFB</td>
              {providers.map((p) => (
                <td key={p.slug} className="px-4 py-4 text-body-md font-body-md text-text-body">
                  {Math.round(p.benchmarks.globalTtfb)} ms
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-4 text-body-md font-body-md text-text-body">Uptime (30d)</td>
              {providers.map((p) => (
                <td key={p.slug} className="px-4 py-4 text-body-md font-body-md font-medium text-success-emerald">
                  {p.benchmarks.uptime.toFixed(2)}%
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-4 text-body-md font-body-md text-text-body">Editorial score</td>
              {providers.map((p) => (
                <td key={p.slug} className="px-4 py-4 text-body-md font-body-md font-semibold text-text-heading">
                  {p.editorialScore}/10
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-4 text-body-md font-body-md text-text-body">Best for</td>
              {providers.map((p) => (
                <td key={p.slug} className="px-4 py-4 text-label-sm font-label-sm text-text-body">{p.badge}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-border-subtle bg-surface-container-low p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          <p className="text-body-md font-body-md text-text-heading">
            <span className="font-semibold">{comparison.verdictWinner}</span> wins this comparison.
          </p>
        </div>
        {providers.slice(0, 2).map((p) => (
          <Link
            key={p.slug}
            href={`/reviews/${p.reviewSlug}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container px-4 py-2 text-label-md font-label-md text-on-primary transition-colors hover:bg-primary"
          >
            Read {p.name} Review
            <ArrowRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function DimensionTable({ slug, className }: { slug: string; className?: string }) {
  const comparison = getComparison(slug);
  if (!comparison) return null;

  const providers = getProviders(comparison.providers);

  return (
    <div className={cn("space-y-6", className)}>
      {comparison.dimensions.map((dim) => {
        const winnerSlug = dim.winner;
        return (
          <div key={dim.label} className="rounded-2xl border border-border-subtle bg-white p-5 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-headline-md font-headline-md text-text-heading">{dim.label}</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-label-sm font-label-sm font-medium text-primary">
                <Trophy className="h-3.5 w-3.5" /> {providers.find((p) => p.slug === winnerSlug)?.name ?? winnerSlug}
              </span>
            </div>
            <p className="mt-2 text-body-md font-body-md text-text-body">{dim.explanation}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {dim.scores.map((score) => {
                const p = providers.find((pr) => pr.slug === score.providerId);
                if (!p) return null;
                const isWinner = score.providerId === winnerSlug;
                return (
                  <div
                    key={score.providerId}
                    className={cn(
                      "rounded-xl border p-4",
                      isWinner ? "border-primary/40 bg-primary/5" : "border-slate-100 bg-surface-container-low/50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-label-md font-label-md font-medium text-text-heading">
                        {p.name}
                        {isWinner && (
                          <span className="ml-2 inline-flex items-center gap-0.5 text-label-sm font-label-sm text-primary">
                            <Trophy className="h-3 w-3" /> Winner
                          </span>
                        )}
                      </span>
                      <span className="text-label-md font-label-md font-bold text-text-heading">{score.score}/10</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function QuickVerdict({ slug, className }: { slug: string; className?: string }) {
  const comparison = getComparison(slug);
  if (!comparison) return null;
  const winner = getProviders([comparison.verdictWinner])[0];
  if (!winner) return null;

  return (
    <div className={cn("flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-primary to-indigo-gradient-stop p-6 text-white shadow-cta sm:flex-row sm:items-center", className)}>
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
        <Trophy className="h-7 w-7" />
      </div>
      <div className="flex-1">
        <p className="text-label-sm font-label-sm font-medium uppercase tracking-wider text-white/70">Our Verdict</p>
        <h3 className="mt-1 text-headline-md font-headline-md">{comparison.verdictWinner} wins</h3>
        <p className="mt-1 text-body-md font-body-md text-white/85">{comparison.verdictText}</p>
      </div>
      <Link
        href={`/reviews/${winner.reviewSlug}`}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-label-md font-label-md font-semibold text-primary transition-transform hover:-translate-y-0.5"
      >
        Read Review <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function WinnerCallout({ slug }: { slug: string }) {
  const comparison = getComparison(slug);
  if (!comparison) return null;
  const winner = getProviders([comparison.verdictWinner])[0];
  if (!winner) return null;

  return (
    <aside className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
      <div>
        <p className="text-label-md font-label-md font-semibold text-amber-800">
          Winner: {winner.name} - {winner.priceFrom}/mo
        </p>
        <p className="mt-1 text-body-md font-body-md text-amber-700">{comparison.verdictText}</p>
      </div>
    </aside>
  );
}
