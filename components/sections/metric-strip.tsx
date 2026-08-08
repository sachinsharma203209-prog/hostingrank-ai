import { Activity, TrendingUp, ShieldCheck, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Providers tested", value: "14", icon: Activity },
  { label: "Synthetic probes", value: "7,200", icon: TrendingUp },
  { label: "Best uptime", value: "99.99%", icon: ShieldCheck },
  { label: "Median TTFB", value: "362 ms", icon: Timer },
];

export function MetricStrip({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-gradient-to-b from-surface-container-low to-surface-container-lowest px-6 py-8",
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-2 text-center">
            <m.icon className="h-5 w-5 text-primary" />
            <p className="text-headline-md font-headline-md text-text-heading">{m.value}</p>
            <p className="text-label-sm font-label-sm uppercase tracking-wider text-text-body">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
