import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
  slug?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-label-md font-label-md text-text-body", className)}>
      <Link href="/" className="flex items-center gap-1 hover:text-primary">
        <Home className="h-3.5 w-3.5" />
        Home
      </Link>
      {items.map((item) => {
        const href = item.href ?? item.slug;
        return (
          <span key={item.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            {href ? (
              <Link href={href} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="truncate text-slate-700" aria-current="page">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
