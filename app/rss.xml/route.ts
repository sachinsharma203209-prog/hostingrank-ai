import { siteConfig } from "@/lib/site";
import { getAllProviders } from "@/lib/data";
import { listMdxSlugs } from "@/lib/mdx";

export const dynamic = "force-static";

function rssItem(title: string, slug: string, description: string, date: string) {
  return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${siteConfig.url}${slug}</link>
      <guid isPermaLink="true">${siteConfig.url}${slug}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
    </item>`;
}

export async function GET() {
  const items: string[] = [];

  for (const provider of getAllProviders()) {
    items.push(
      rssItem(
        `${provider.name} Review`,
        `/reviews/${provider.reviewSlug}`,
        `${provider.name} review: ${provider.rating} stars, ${provider.benchmarks.globalTtfb}ms TTFB, ${provider.benchmarks.uptime}% uptime.`,
        siteConfig.updatedAt,
      ),
    );
  }

  for (const slug of listMdxSlugs("tutorials")) {
    const mod = await import(`@/content/tutorials/${slug}.mdx`);
    const fm = mod.frontmatter as { title: string; description: string; datePublished: string };
    items.push(rssItem(fm.title, `/tutorials/${slug}`, fm.description, fm.datePublished));
  }

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(siteConfig.updatedAt).toUTCString()}</lastBuildDate>
    ${items.join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
