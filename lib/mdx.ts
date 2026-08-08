import fs from "fs";
import path from "path";

export interface MdxFrontmatter {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  tags?: string[];
  readingTime?: string;
  providerSlug?: string;
  [key: string]: unknown;
}

export interface MdxModule<TFrontmatter = MdxFrontmatter> {
  frontmatter: TFrontmatter;
  default: React.ComponentType<Record<string, unknown>>;
}

export type MdxComponent = React.ComponentType<Record<string, unknown>>;

const contentRoot = path.join(process.cwd(), "content");

export function listMdxSlugs(dir: string): string[] {
  const fullDir = path.join(contentRoot, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function mdxPath(dir: string, slug: string): string {
  return path.join(contentRoot, dir, `${slug}.mdx`);
}

export async function loadMdxModule<TFrontmatter = MdxFrontmatter>(
  dir: string,
  slug: string,
): Promise<MdxModule<TFrontmatter>> {
  const mod = (await import(`@/content/${dir}/${slug}.mdx`)) as {
    frontmatter: TFrontmatter;
    default: React.ComponentType<Record<string, unknown>>;
  };
  return mod;
}

export async function loadAllMdxModules<TFrontmatter = MdxFrontmatter>(
  dir: string,
): Promise<MdxModule<TFrontmatter>[]> {
  const slugs = listMdxSlugs(dir);
  return Promise.all(slugs.map((slug) => loadMdxModule<TFrontmatter>(dir, slug)));
}

export function mdxExists(dir: string, slug: string): boolean {
  return fs.existsSync(mdxPath(dir, slug));
}
