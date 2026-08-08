import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Newsletter } from "@/components/sections/newsletter";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { TableOfContents } from "@/components/sections/toc";
import { listMdxSlugs, mdxExists, type MdxFrontmatter } from "@/lib/mdx";
import { comparisonLinks, categoryLinks, tutorialLinks } from "@/lib/linking";
import { buildMetadata, breadcrumbLd, howToLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return listMdxSlugs("tutorials").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!mdxExists("tutorials", slug)) return {};
  const mod = await import(`@/content/tutorials/${slug}.mdx`);
  const frontmatter = mod.frontmatter as MdxFrontmatter;
  return buildMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    slug: `/tutorials/${slug}`,
    keywords: frontmatter.tags,
  });
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!mdxExists("tutorials", slug)) notFound();
  const mod = await import(`@/content/tutorials/${slug}.mdx`);
  const { frontmatter, default: MDXContent } = mod as {
    frontmatter: MdxFrontmatter & { steps?: { title: string; text: string }[] };
    default: React.ComponentType<Record<string, unknown>>;
  };

  const crumbs = [
    { label: "Tutorials", href: "/tutorials" },
    { label: frontmatter.title, slug: `/tutorials/${slug}` },
  ];

  const tocItems = [
    { id: "tutorial", label: "Step-by-step", level: 2 },
    { id: "faq", label: "FAQ", level: 2 },
  ];

  const related = [
    ...tutorialLinks(listMdxSlugs("tutorials").filter((s) => s !== slug).slice(0, 3)),
    ...categoryLinks(frontmatter.categories as string[] | undefined ?? []),
    ...comparisonLinks(frontmatter.comparisons as string[] | undefined ?? []),
  ];

  return (
    <>
      {<JsonLd data={breadcrumbLd(crumbs)} />}
      {frontmatter.steps && <JsonLd data={howToLd({ title: frontmatter.title, slug: `/tutorials/${slug}`, steps: frontmatter.steps })} />}

      <div className="mx-auto max-w-container-max px-4 md:px-gutter">
        <div className="pt-10">
          <Breadcrumbs items={crumbs.slice(0, 2)} />
        </div>

        <header className="mt-8 max-w-3xl">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-label-sm font-label-sm font-semibold uppercase tracking-wider text-primary">
            Tutorial
          </span>
          <h1 className="mt-4 text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">{frontmatter.title}</h1>
          <p className="mt-4 text-body-lg font-body-lg text-text-body">{frontmatter.description}</p>
          <p className="mt-4 text-label-sm font-label-sm text-text-body">
            Updated: {frontmatter.dateModified ?? frontmatter.datePublished}
            {frontmatter.readingTime && <span className="mx-2">·</span>}
            {frontmatter.readingTime}
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} className="sticky top-24" />
          </aside>

          <div>
            <article id="tutorial" className="prose-hosting scroll-mt-24 max-w-none">
              <MDXContent />
            </article>

            <section id="faq" className="mt-12 scroll-mt-24">
              <Newsletter />
            </section>

            <section className="mt-12">
              <InternalLinkGrid title="More tutorials" links={related} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
