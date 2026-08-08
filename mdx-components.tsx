import type { MDXComponents } from "mdx/types";

const headingClass = "scroll-mt-24 font-semibold tracking-tight text-slate-900";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className={`${headingClass} text-3xl sm:text-4xl`}>{children}</h1>,
    h2: ({ children }) => <h2 className={`${headingClass} mt-10 text-2xl`}>{children}</h2>,
    h3: ({ children }) => <h3 className={`${headingClass} mt-8 text-xl`}>{children}</h3>,
    h4: ({ children }) => <h4 className={`${headingClass} mt-6 text-lg`}>{children}</h4>,
    p: ({ children }) => <p className="leading-7 text-slate-600">{children}</p>,
    ul: ({ children }) => <ul className="my-6 list-disc space-y-2 pl-6 text-slate-600">{children}</ul>,
    ol: ({ children }) => (
      <ol className="my-6 list-decimal space-y-2 pl-6 text-slate-600">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-primary underline decoration-2 underline-offset-2 hover:text-primary-container"
        rel={href?.startsWith("http") ? "noopener noreferrer sponsored" : undefined}
        target={href?.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-slate-600">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-primary">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-left font-medium text-slate-900">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="border-b border-slate-100 px-4 py-3 text-slate-600">{children}</td>,
    hr: () => <hr className="my-8 border-slate-200" />,
    strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
    ...components,
  };
}
