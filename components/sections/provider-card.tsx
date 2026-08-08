import Link from "next/link";
import { Check, X, Star } from "lucide-react";
import { getProvider } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProviderCard({
  providerId,
  rank,
  highlight = false,
  showPros = true,
  className,
}: {
  providerId: string;
  rank?: number;
  highlight?: boolean;
  showPros?: boolean;
  className?: string;
}) {
  const provider = getProvider(providerId);
  if (!provider) return null;

  return (
    <article
      className={cn(
        "card-hover flex flex-col overflow-hidden rounded-2xl border bg-surface-container-lowest shadow-card md:flex-row",
        highlight ? "border-primary/60 ring-2 ring-primary/20" : "border-border-subtle",
        className,
      )}
    >
      <div className="flex-1 border-b border-border-subtle p-unit-lg md:border-b-0 md:border-r">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-headline-md font-headline-md text-text-heading">
            {rank !== undefined ? `${rank}. ` : ""}
            {provider.name}
          </h3>
          <span className="flex items-center gap-1 rounded-sm bg-secondary-fixed px-2 py-1 text-label-sm font-label-sm font-bold text-on-secondary-fixed-variant">
            <Star className="h-3.5 w-3.5" /> {provider.rating.toFixed(1)}
          </span>
        </div>

        <p className="mb-6 text-body-md font-body-md text-text-body">{provider.tagline}</p>

        {showPros && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-2 text-label-sm font-label-sm text-text-heading">Pros</h4>
              <ul className="space-y-1 text-label-md font-label-md text-text-body">
                {provider.pros.slice(0, 2).map((pro) => (
                  <li key={pro} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-success-emerald" /> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-label-sm font-label-sm text-text-heading">Cons</h4>
              <ul className="space-y-1 text-label-md font-label-md text-text-body">
                {provider.cons.slice(0, 2).map((con) => (
                  <li key={con} className="flex items-center gap-2">
                    <X className="h-4 w-4 shrink-0 text-error" /> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-surface p-unit-lg text-center md:w-64">
        <div className="mb-1 text-label-sm font-label-sm text-text-body">Starting from</div>
        <div className="mb-4 text-headline-lg font-headline-lg text-text-heading">
          {provider.priceFrom}
          <span className="text-label-md font-label-md font-normal text-text-body">/mo</span>
        </div>
        <Link
          href={`/reviews/${provider.reviewSlug}`}
          className="mb-2 w-full rounded bg-gradient-to-r from-[#F97316] to-[#EA580C] py-3 text-label-md font-label-md font-bold text-on-primary transition-opacity hover:opacity-90"
        >
          Read Full Review
        </Link>
      </div>
    </article>
  );
}

export function ProviderTableRow({
  providerId,
  columns = ["rating", "price", "ttfb", "uptime", "score"],
  className,
}: {
  providerId: string;
  columns?: string[];
  className?: string;
}) {
  const provider = getProvider(providerId);
  if (!provider) return null;

  const cell = (col: string) => {
    switch (col) {
      case "name":
        return (
          <td className="px-4 py-4">
            <Link href={`/reviews/${provider.reviewSlug}`} className="font-semibold text-text-heading hover:text-primary">
              {provider.name}
            </Link>
          </td>
        );
      case "rating":
        return (
          <td className="px-4 py-4">
            <div className="flex items-center gap-2">
              <span className="text-body-md font-body-md text-text-body">{provider.rating.toFixed(1)}</span>
              <Star className="h-4 w-4 text-amber-400" />
            </div>
          </td>
        );
      case "price":
        return (
          <td className="px-4 py-4 text-body-md font-body-md font-medium text-text-heading">
            {provider.priceFrom}
            <span className="text-text-body">/mo</span>
          </td>
        );
      case "ttfb":
        return <td className="px-4 py-4 text-body-md font-body-md text-text-body">{Math.round(provider.benchmarks.globalTtfb)} ms</td>;
      case "uptime":
        return (
          <td className="px-4 py-4 text-body-md font-body-md font-medium text-success-emerald">
            {provider.benchmarks.uptime.toFixed(2)}%
          </td>
        );
      case "score":
        return <td className="px-4 py-4 text-body-md font-body-md font-semibold text-text-heading">{provider.editorialScore}/10</td>;
      default:
        return <td key={col} />;
    }
  };

  return <tr className="border-b border-slate-100 last:border-0">{columns.map((c) => cell(c))}</tr>;
}

export function ProsConsList({ providerId }: { providerId: string }) {
  const provider = getProvider(providerId);
  if (!provider) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
        <h4 className="mb-2 flex items-center gap-2 text-label-sm font-label-sm font-semibold text-emerald-700">
          <Check className="h-4 w-4" /> Pros
        </h4>
        <ul className="space-y-2">
          {provider.pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2 text-body-md font-body-md text-text-body">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-emerald" />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
        <h4 className="mb-2 flex items-center gap-2 text-label-sm font-label-sm font-semibold text-red-700">
          <X className="h-4 w-4" /> Cons
        </h4>
        <ul className="space-y-2">
          {provider.cons.map((con) => (
            <li key={con} className="flex items-start gap-2 text-body-md font-body-md text-text-body">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
