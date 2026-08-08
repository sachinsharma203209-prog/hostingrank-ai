"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/site";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border-subtle bg-surface/80 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-margin-mobile md:px-gutter">
        <Link
          href="/"
          className="text-headline-md font-headline-md font-bold tracking-tight text-text-heading transition-transform hover:scale-100 active:scale-90"
        >
          HostingRank AI
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-label-md font-label-md transition-colors duration-200",
                  active ? "text-primary" : "text-text-body hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden items-center justify-center text-text-body transition-colors hover:text-primary md:flex"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/comparisons/hostinger-vs-bluehost"
            className="inline-flex items-center justify-center rounded-lg bg-primary-container px-4 py-2 text-label-md font-label-md text-on-primary shadow-sm transition-colors hover:bg-primary active:scale-90"
          >
            Compare Hosting
          </Link>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center text-text-body md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border-subtle bg-surface px-margin-mobile py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-label-md font-label-md text-text-body hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/comparisons/hostinger-vs-bluehost"
              className="inline-flex items-center justify-center rounded-lg bg-primary-container px-4 py-2.5 text-label-md font-label-md text-on-primary"
            >
              Compare Hosting
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
