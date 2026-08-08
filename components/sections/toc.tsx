"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
  level: number;
}

export function TableOfContents({ items, className }: { items: TocItem[]; className?: string }) {
  const [activeId, setActiveId] = React.useState<string | null>(items[0]?.id ?? null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents" className={cn("rounded-2xl border border-border-subtle bg-white p-5 shadow-card", className)}>
      <p className="mb-3 text-label-sm font-label-sm font-bold uppercase tracking-wider text-text-heading">On this page</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block rounded-md px-3 py-1.5 text-label-md font-label-md transition-colors",
                item.level === 3 && "pl-6",
                activeId === item.id
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-text-body hover:bg-slate-50 hover:text-text-heading",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
