import { getProviders } from "@/lib/data";
import { ScoreBar, Stars } from "@/components/ui/stars";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ReviewCard({
  providerId,
  className,
}: {
  providerId: string;
  className?: string;
}) {
  const provider = getProviders([providerId])[0];
  if (!provider) return null;

  return (
    <Card className={cn("card-hover", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-headline-md font-headline-md">{provider.name}</CardTitle>
            <div className="mt-1 flex items-center gap-2">
              <Stars rating={provider.rating} />
              <span className="text-label-sm font-label-sm text-text-body">{provider.rating.toFixed(1)} / 5</span>
            </div>
          </div>
          <Badge variant="primary">{provider.editorialScore}/10</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-body-md font-body-md text-text-body">{provider.tagline}</p>
        <div className="space-y-3">
          <ScoreRow label="Performance" value={provider.benchmarks.performanceScore} />
          <ScoreRow label="Value for money" value={provider.benchmarks.valueScore} />
          <ScoreRow label="Support" value={provider.benchmarks.supportScore} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {provider.pros.slice(0, 3).map((pro) => (
            <Badge key={pro} variant="success">
              {pro}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-label-sm font-label-sm text-text-body">{label}</span>
      </div>
      <ScoreBar score={value} />
    </div>
  );
}

export function ScoreGrid({ providerId, className }: { providerId: string; className?: string }) {
  const provider = getProviders([providerId])[0];
  if (!provider) return null;

  const metrics = [
    { label: "Performance", value: provider.benchmarks.performanceScore },
    { label: "Value for money", value: provider.benchmarks.valueScore },
    { label: "Support", value: provider.benchmarks.supportScore },
    { label: "TTFB (lower is better)", value: Math.max(0, Math.min(10, Math.round(10 - provider.benchmarks.globalTtfb / 100))) },
    { label: "Uptime", value: Math.round((provider.benchmarks.uptime - 99) * 10) },
  ];

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-headline-md font-headline-md">Scores</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-label-sm font-label-sm text-text-body">{m.label}</span>
            </div>
            <ScoreBar score={m.value} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
