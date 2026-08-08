"use client";

import * as React from "react";
import { Mail, Check } from "lucide-react";

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  return (
    <section className={`rounded-2xl border border-border-subtle bg-surface-container-low p-6 sm:p-8 ${className ?? ""}`}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </span>
          <div>
            <h3 className="text-headline-md font-headline-md text-text-heading">
              Get the monthly benchmark report
            </h3>
            <p className="mt-1 text-body-md font-body-md text-text-body">
              New TTFB and uptime data, price drops, and hosting deals. No spam.
            </p>
          </div>
        </div>
        {submitted ? (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-label-md font-label-md font-medium text-emerald-700">
            <Check className="h-4 w-4" /> You're subscribed. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2 sm:w-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 flex-1 rounded-lg border border-border-subtle bg-white px-4 text-sm text-text-heading placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary-container px-5 text-label-md font-label-md text-on-primary transition-colors hover:bg-primary"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
