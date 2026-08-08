import type { Metadata } from "next";
import { listMdxSlugs, type MdxFrontmatter } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = buildMetadata({
  title: "Hosting Tutorials & Guides",
  description: "Step-by-step hosting tutorials: install WordPress, deploy Next.js, speed up your site, migrate hosts, and harden a VPS.",
  slug: "/tutorials",
});

async function getAllTutorials(): Promise<{ slug: string; frontmatter: MdxFrontmatter }[]> {
  const slugs = listMdxSlugs("tutorials");
  const tutorials = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await import(`@/content/tutorials/${slug}.mdx`);
      return { slug, frontmatter: mod.frontmatter as MdxFrontmatter };
    }),
  );
  return tutorials.sort((a, b) => b.frontmatter.datePublished.localeCompare(a.frontmatter.datePublished));
}

export default async function TutorialsIndex() {
  const tutorials = await getAllTutorials();

  return (
    <div className="mx-auto max-w-container-max px-4 md:px-gutter">
      <div className="pt-10">
        <Breadcrumbs items={[{ label: "Tutorials", slug: "/tutorials" }]} />
      </div>
      <header className="mt-8 max-w-3xl">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile tracking-tight text-text-heading md:text-display-xl md:font-display-xl">Hosting Tutorials & Guides</h1>
        <p className="mt-4 text-body-lg font-body-lg text-text-body">
          Copy-paste guides for the most common hosting tasks, tested end-to-end before publication.
        </p>
      </header>

      <section className="mt-12">
        <SectionHeading title="Latest guides" align="left" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((t) => (
            <a
              key={t.slug}
              href={`/tutorials/${t.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
            >
              <div>
                <p className="text-label-sm font-label-sm uppercase tracking-wider text-primary">{t.frontmatter.readingTime}</p>
                <h2 className="mt-2 text-headline-md font-headline-md leading-6 text-text-heading group-hover:text-primary">
                  {t.frontmatter.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-body-md font-body-md text-text-body">{t.frontmatter.description}</p>
              </div>
              <p className="mt-4 text-label-sm font-label-sm text-text-body">
                {new Date(t.frontmatter.dateModified ?? t.frontmatter.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Newsletter />
      </section>
    </div>
  );
}
