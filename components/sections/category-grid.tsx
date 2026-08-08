import Link from "next/link";
import { ArrowRight, LayoutGrid, Globe, Coins, Cpu } from "lucide-react";
import { getProviders, getCategory, getPlatform, getBudget, getCountry, type Provider } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Stars } from "@/components/ui/stars";
import { cn } from "@/lib/utils";

const typeIcons = {
  category: LayoutGrid,
  platform: Cpu,
  budget: Coins,
  country: Globe,
} as const;

export function CategoryGrid({
  slugs,
  type = "category",
  className,
}: {
  slugs: string[];
  type?: keyof typeof typeIcons;
  className?: string;
}) {
  const Icon = typeIcons[type];

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {slugs.map((slug) => {
        const item =
          type === "category"
            ? getCategory(slug)
            : type === "platform"
              ? getPlatform(slug)
              : type === "budget"
                ? getBudget(slug)
                : getCountry(slug);
        if (!item) return null;
        return (
          <Link
            key={slug}
            href={`/best/${slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
          >
            <div>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-label-sm font-label-sm font-semibold uppercase tracking-wider text-primary">
                  {("overline" in item && item.overline ? item.overline : "Best")}
                </span>
              </div>
              <h3 className="mt-3 text-headline-md font-headline-md text-text-heading">
                {item.shortName}
              </h3>
              <p className="mt-2 line-clamp-2 text-body-md font-body-md text-text-body">
                {item.description}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-label-sm font-label-sm text-text-body">
                {item.providers.length} providers benchmarked
              </span>
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function ProviderRankGrid({
  providerIds,
  highlightFirst = false,
  className,
}: {
  providerIds: string[];
  highlightFirst?: boolean;
  className?: string;
}) {
  const providers = getProviders(providerIds);
  if (providers.length === 0) return null;

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {providers.map((provider, i) => (
        <ProviderRankCard key={provider.slug} provider={provider} rank={i + 1} highlight={highlightFirst && i === 0} />
      ))}
    </div>
  );
}

function ProviderRankCard({
  provider,
  rank,
  highlight,
}: {
  provider: Provider;
  rank: number;
  highlight: boolean;
}) {
  return (
    <Link
      href={`/reviews/${provider.reviewSlug}`}
      className={cn(
        "card-hover group flex flex-col rounded-2xl border bg-white p-5 shadow-card",
        highlight ? "border-primary/60 ring-2 ring-primary/20" : "border-border-subtle",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-label-sm font-label-sm font-bold",
            rank === 1 ? "bg-amber-100 text-amber-700" : "bg-primary/10 text-primary",
          )}
        >
          #{rank}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-headline-md font-headline-md text-text-heading">{provider.name}</h3>
          <Badge variant="default">{provider.badge}</Badge>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-container-low px-3 py-2.5">
        <Stars rating={provider.rating} />
        <span className="text-label-md font-label-md font-semibold text-text-heading">
          {provider.priceFrom}
          <span className="font-normal text-text-body">/mo</span>
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-body-md font-body-md text-text-body">{provider.tagline}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-label-md font-label-md font-medium text-primary">
        Full review <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
