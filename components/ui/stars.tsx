import * as React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
      {half && <StarHalf className="h-4 w-4 fill-amber-400 text-amber-400" />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star key={`e-${i}`} className="h-4 w-4 text-slate-200" />
      ))}
    </span>
  );
}

export function ScoreBar({
  score,
  max = 10,
  className,
}: {
  score: number;
  max?: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.round((score / max) * 100));
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-gradient-stop"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right text-label-sm font-label-sm font-semibold text-text-heading">{score}</span>
    </div>
  );
}
