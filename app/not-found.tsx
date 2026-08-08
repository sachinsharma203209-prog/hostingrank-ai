import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center md:px-gutter">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <SearchX className="h-8 w-8 text-primary" />
      </span>
      <h1 className="mt-6 text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Page not found</h1>
      <p className="mt-4 text-body-lg font-body-lg text-text-body">
        The page you're looking for doesn't exist or has moved. Try a search, or start from our best
        hosting rankings.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary-container px-6 py-3 text-label-md font-label-md text-on-primary transition-colors hover:bg-primary"
        >
          Back to Home
        </Link>
        <Link
          href="/best"
          className="inline-flex items-center justify-center rounded-lg border border-border-subtle bg-white px-6 py-3 text-label-md font-label-md text-text-heading transition-colors hover:bg-surface-container"
        >
          Best Hosting
        </Link>
      </div>
    </div>
  );
}
