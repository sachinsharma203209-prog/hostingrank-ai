"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export interface SearchItem {
  label: string;
  href: string;
  meta: string;
  keywords: string;
}

export function SearchForm({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return items
      .filter((item) => item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query, items]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search providers, guides, comparisons..."
          className="h-14 w-full rounded-2xl border border-border-subtle bg-white pl-12 pr-4 text-base text-text-heading shadow-card placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="mt-6 space-y-3">
        {query.length >= 2 && results.length === 0 && (
          <p className="rounded-xl border border-border-subtle bg-white p-6 text-center text-body-md font-body-md text-text-body">
            No results for "{query}". Try "hostinger", "vps", or "wordpress".
          </p>
        )}
        {results.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group flex items-center justify-between rounded-xl border border-border-subtle bg-white px-5 py-4 shadow-card transition-all hover:border-primary/40 hover:shadow-card-hover"
          >
            <div>
              <p className="text-label-md font-label-md font-semibold text-text-heading group-hover:text-primary">{r.label}</p>
              <p className="mt-0.5 text-label-sm font-label-sm uppercase tracking-wider text-text-body">{r.meta}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
