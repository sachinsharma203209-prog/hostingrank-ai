import { redirect } from "next/navigation";
import { getAllProviders } from "@/lib/data";

export function generateStaticParams() {
  return getAllProviders().map((p) => ({ slug: p.slug }));
}

export default async function HostingAlias({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getAllProviders().find((p) => p.slug === slug || p.reviewSlug === slug);
  redirect(provider ? `/reviews/${provider.reviewSlug}` : "/reviews");
}
