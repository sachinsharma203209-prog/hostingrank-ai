"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  value: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest transition-colors hover:border-primary/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-headline-md font-headline-md text-text-heading">{question}</span>
        <ChevronDown
          className={cn("h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <div
        ref={contentRef}
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 leading-7 text-text-body">{answer}</p>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
  className?: string;
  defaultOpenFirst?: boolean;
}

export function Accordion({ items, className, defaultOpenFirst = true }: AccordionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={item.question}
          value={item.question}
          question={item.question}
          answer={item.answer}
          defaultOpen={defaultOpenFirst && i === 0}
        />
      ))}
    </div>
  );
}
