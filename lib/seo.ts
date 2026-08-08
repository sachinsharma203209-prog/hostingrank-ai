import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { getProviders } from "@/lib/data";

interface SeoPage {
  title: string;
  description: string;
  slug: string;
  keywords?: string[];
  canonicalOverride?: string;
  noindex?: boolean;
}

export function absoluteUrl(path = ""): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata(page: SeoPage): Metadata {
  const url = absoluteUrl(page.slug);
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: page.canonicalOverride ?? url,
    },
    robots: page.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export function breadcrumbLd(items: { label: string; slug?: string; href?: string }[]) {
  const crumbs = items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.label,
    item: absoluteUrl(item.slug ?? item.href ?? "/"),
  }));
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs,
  };
}

export function articleLd(params: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    mainEntityOfPage: absoluteUrl(params.slug),
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: {
      "@type": "Person",
      name: params.author ?? siteConfig.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function faqLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function providerReviewLd(providerSlug: string, slug: string) {
  const provider = getProviders([providerSlug])[0];
  if (!provider) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: provider.name,
    description: provider.tagline,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: provider.rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: 214,
    },
    review: {
      "@type": "Review",
      author: { "@type": "Person", name: siteConfig.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: provider.editorialScore,
        bestRating: 10,
      },
      name: `${provider.name} Review`,
    },
    brand: { "@type": "Brand", name: provider.name },
    url: absoluteUrl(`/reviews/${slug}`),
  };
}

export function howToLd(params: {
  title: string;
  steps: { title: string; text: string }[];
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: params.title,
    step: params.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  };
}

export function itemListLd(items: { name: string; slug: string; image?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.slug),
    })),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [siteConfig.socials.twitter, siteConfig.socials.facebook, siteConfig.socials.linkedin],
  };
}
