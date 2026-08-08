import { getProviders, getAllProviders, type Provider } from "@/lib/data";
import { ChartClient, type ChartKind } from "./benchmark-chart-client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type { ChartKind } from "./benchmark-chart-client";

interface SerializableProvider {
  name: string;
  globalTtfb: number;
  uptime: number;
  performanceScore: number;
  latency: { india: number; usa: number; uk: number };
}

function serialize(provider: Provider): SerializableProvider {
  return {
    name: provider.name,
    globalTtfb: provider.benchmarks.globalTtfb,
    uptime: provider.benchmarks.uptime,
    performanceScore: provider.benchmarks.performanceScore,
    latency: {
      india: provider.benchmarks.latency.india ?? 0,
      usa: provider.benchmarks.latency.usa ?? 0,
      uk: provider.benchmarks.latency.uk ?? 0,
    },
  };
}

const chartMeta: Record<ChartKind, { title: string; description: string }> = {
  ttfb: { title: "Global TTFB", description: "Median Time to First Byte across 12 test locations." },
  uptime: { title: "30-Day Uptime", description: "Observed uptime over the last 30 days." },
  latency: { title: "Latency by Region", description: "Round-trip latency from India, USA, and UK test nodes." },
  performance: {
    title: "Performance Score",
    description: "Composite score of TTFB, load time, and LCP (0-100).",
  },
};

export function BenchmarkChart({
  kind,
  providers: providerSlugs,
  className,
}: {
  kind: ChartKind;
  providers?: string[];
  className?: string;
}) {
  const providers = providerSlugs?.length ? getProviders(providerSlugs) : getAllProviders();
  if (providers.length === 0) return null;

  const data = providers.map(serialize);
  const meta = chartMeta[kind];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{meta.title}</CardTitle>
        <CardDescription>{meta.description}</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartClient kind={kind} providers={data} />
      </CardContent>
    </Card>
  );
}
