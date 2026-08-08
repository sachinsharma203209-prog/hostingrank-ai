import * as React from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
  className,
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-2xl text-center" : "text-left",
        className,
      )}
    >
      {overline && (
        <p className="text-label-sm font-label-sm font-semibold uppercase tracking-wider text-primary">
          {overline}
        </p>
      )}
      <h2 className="text-headline-lg-mobile font-headline-lg-mobile text-text-heading tracking-tight md:text-headline-lg md:font-headline-lg">
        {title}
      </h2>
      {subtitle && <p className="text-body-lg font-body-lg leading-7 text-text-body">{subtitle}</p>}
    </div>
  );
}
