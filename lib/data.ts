import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function loadJson<T>(filename: string): T[] {
  const filePath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T[];
}

export interface Provider {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  rating: number;
  editorialScore: number;
  priceFrom: string;
  currency: string;
  badge: string;
  categories: string[];
  platforms: string[];
  countries: string[];
  budgets: string[];
  features: string[];
  benchmarks: {
    globalTtfb: number;
    loadTime: number;
    lcp: number;
    uptime: number;
    performanceScore: number;
    valueScore: number;
    supportScore: number;
    latency: Record<string, number>;
  };
  pros: string[];
  cons: string[];
  quickFacts: Record<string, string>;
  affiliateUrl: string;
  reviewSlug: string;
}

interface RawProvider {
  slug: string;
  name: string;
  monogram?: string;
  tagline: string;
  rating: number;
  editorialScore: number;
  priceFrom: number;
  priceCurrency: string;
  badge?: string;
  categories?: string[];
  platforms?: string[];
  countries?: string[];
  budgets?: string[];
  features?: string[];
  benchmarks: {
    ttfb: number;
    loadTime: number;
    uptime: number;
    performanceScore: number;
    valueScore: number;
    supportScore: number;
    latency: Record<string, number>;
  };
  pros: string[];
  cons: string[];
  quickFacts?: { label: string; value: string }[];
  affiliateUrl: string;
  reviewSlug: string;
}

const currencySymbols: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
};

function normalizeProvider(raw: RawProvider): Provider {
  return {
    slug: raw.slug,
    name: raw.name,
    tagline: raw.tagline,
    logo: raw.monogram ?? raw.name.charAt(0),
    rating: raw.rating,
    editorialScore: raw.editorialScore,
    priceFrom: `${currencySymbols[raw.priceCurrency] ?? ""}${raw.priceFrom}`,
    currency: raw.priceCurrency,
    badge: raw.badge ?? "",
    categories: raw.categories ?? [],
    platforms: raw.platforms ?? [],
    countries: raw.countries ?? [],
    budgets: raw.budgets ?? [],
    features: raw.features ?? [],
    benchmarks: {
      globalTtfb: raw.benchmarks.ttfb,
      loadTime: raw.benchmarks.loadTime,
      lcp: raw.benchmarks.loadTime,
      uptime: raw.benchmarks.uptime,
      performanceScore: raw.benchmarks.performanceScore,
      valueScore: raw.benchmarks.valueScore,
      supportScore: raw.benchmarks.supportScore,
      latency: raw.benchmarks.latency,
    },
    pros: raw.pros,
    cons: raw.cons,
    quickFacts: Object.fromEntries((raw.quickFacts ?? []).map((f) => [f.label, f.value])),
    affiliateUrl: raw.affiliateUrl,
    reviewSlug: raw.reviewSlug,
  };
}

let cache: Record<string, unknown> = {};

export function getAllProviders(): Provider[] {
  if (!cache.providers) {
    const raw = loadJson<RawProvider>("providers.json");
    cache.providers = raw.map(normalizeProvider);
  }
  return cache.providers as Provider[];
}

export interface Category {
  slug: string;
  name: string;
  h1: string;
  shortName: string;
  overline: string;
  description: string;
  intro: string;
  providers: string[];
  faqs: { question: string; answer: string }[];
  childrenTopics: string[];
  relatedCategories: string[];
  relatedComparisons: string[];
  relatedTutorials: string[];
  updatedAt: string;
}

interface RawCategory {
  slug: string;
  title?: string;
  name?: string;
  h1: string;
  shortName: string;
  overline: string;
  description: string;
  intro: string;
  providers: string[];
  faqs: { question: string; answer: string }[];
  childrenTopics: string[];
  relatedCategories: string[];
  relatedComparisons: string[];
  relatedTutorials: string[];
  updatedAt: string;
}

export interface Platform {
  slug: string;
  name: string;
  h1: string;
  shortName: string;
  overline: string;
  description: string;
  intro: string;
  providers: string[];
  keyFeatures: string[];
  faqs: { question: string; answer: string }[];
  relatedCategories: string[];
  relatedComparisons: string[];
  relatedTutorials: string[];
  relatedPlatforms: string[];
  updatedAt: string;
}

interface RawPlatform {
  slug: string;
  platform?: string;
  title?: string;
  h1: string;
  shortName: string;
  overline: string;
  description: string;
  intro: string;
  providers: string[];
  keyFeatures: string[];
  faqs: { question: string; answer: string }[];
  relatedCategories: string[];
  relatedComparisons: string[];
  relatedTutorials: string[];
  relatedPlatforms: string[];
  updatedAt: string;
}

export interface Country {
  slug: string;
  name: string;
  flag: string;
  h1: string;
  shortName: string;
  description: string;
  intro: string;
  providers: string[];
  localLatency: string;
  whyLocal: string[];
  faqs: { question: string; answer: string }[];
  relatedCategories: string[];
  relatedComparisons: string[];
  relatedTutorials: string[];
  updatedAt: string;
}

interface RawCountry {
  slug: string;
  country?: string;
  name?: string;
  flag?: string;
  h1: string;
  shortName: string;
  description: string;
  intro: string;
  providers: string[];
  localLatency?:
    | string
    | {
        mumbaiTtfb?: number;
        bangaloreLatency?: number;
        delhiRouting?: string;
        improvementNote?: string;
      };
  whyLocal?: string[] | { icon?: string; title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  relatedCategories: string[];
  relatedComparisons: string[];
  relatedTutorials: string[];
  updatedAt: string;
}

export interface Budget {
  slug: string;
  amount: number;
  currency: string;
  symbol: string;
  title: string;
  h1: string;
  shortName: string;
  overline: string;
  description: string;
  intro: string;
  providers: string[];
  renewalWarning: string;
  tiers: {
    providerId: string;
    plan: string;
    introPrice: string;
    renewalPrice: string;
    renewalJump: string;
    storage: string;
    uptime: string;
    budget: boolean;
  }[];
  technicalTradeoffs: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  relatedCategories: string[];
  relatedComparisons: string[];
  relatedTutorials: string[];
  relatedProviders: string[];
  updatedAt: string;
}

export interface Feature {
  slug: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  explanation: string;
  providers: string[];
  faq: { question: string; answer: string }[];
}

export interface Audience {
  slug: string;
  name: string;
  title: string;
  description: string;
  whyThisAudience: string;
  topProviders: { providerId: string; reason: string }[];
  avoidAdvice: string;
  recommendedCategories: string[];
  relatedTutorials: string[];
  faqs: { question: string; answer: string }[];
}

export interface Comparison {
  slug: string;
  title: string;
  h1: string;
  shortName: string;
  overline: string;
  description: string;
  intro: string;
  providers: string[];
  verdictWinner: string;
  verdictText: string;
  dimensions: {
    label: string;
    explanation: string;
    winner: string;
    scores: { providerId: string; score: number }[];
  }[];
  faqs: { question: string; answer: string }[];
  relatedCategories: string[];
  relatedComparisons: string[];
  relatedTutorials: string[];
  updatedAt: string;
}

export function getProvider(slug: string): Provider | undefined {
  return getAllProviders().find((p) => p.slug === slug);
}

export function getProviders(slugs: string[]): Provider[] {
  return slugs
    .map((s) => getProvider(s))
    .filter((p): p is Provider => Boolean(p));
}

export function getProviderNames(slugs: string[]): string[] {
  return getProviders(slugs).map((p) => p.name);
}

export function getAllCategories(): Category[] {
  if (!cache.categories) {
    const raw = loadJson<RawCategory>("categories.json");
    cache.categories = raw.map((c) => ({ ...c, name: c.name ?? c.title ?? c.shortName }));
  }
  return cache.categories as Category[];
}

export function getCategory(slug: string): Category | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}

export function getAllPlatforms(): Platform[] {
  if (!cache.platforms) {
    const raw = loadJson<RawPlatform>("platforms.json");
    cache.platforms = raw.map((p) => ({ ...p, name: p.platform ?? p.title ?? p.shortName }));
  }
  return cache.platforms as Platform[];
}

export function getPlatform(slug: string): Platform | undefined {
  return getAllPlatforms().find((p) => p.slug === slug);
}

export function getAllCountries(): Country[] {
  if (!cache.countries) {
    const raw = loadJson<RawCountry>("countries.json");
    cache.countries = raw.map((c) => {
      const lat = c.localLatency;
      const whyLocal = Array.isArray(c.whyLocal)
        ? c.whyLocal.map((r) => (typeof r === "string" ? r : `${r.title}: ${r.text}`))
        : c.whyLocal ?? [];
      const localLatency =
        typeof lat === "string"
          ? lat
          : lat
            ? `Mumbai TTFB ${lat.mumbaiTtfb ?? "—"}ms · Bangalore latency ${lat.bangaloreLatency ?? "—"}ms`
            : "";
      return {
        ...c,
        name: c.country ?? c.name ?? c.shortName,
        flag: c.flag ?? "",
        localLatency,
        whyLocal,
      };
    });
  }
  return cache.countries as Country[];
}

export function getCountry(slug: string): Country | undefined {
  return getAllCountries().find((c) => c.slug === slug);
}

export function getAllBudgets(): Budget[] {
  if (!cache.budgets) cache.budgets = loadJson<Budget>("budgets.json");
  return cache.budgets as Budget[];
}

export function getBudget(slug: string): Budget | undefined {
  return getAllBudgets().find((b) => b.slug === slug);
}

export function getAllFeatures(): Feature[] {
  if (!cache.features) cache.features = loadJson<Feature>("features.json");
  return cache.features as Feature[];
}

export function getFeature(slug: string): Feature | undefined {
  return getAllFeatures().find((f) => f.slug === slug);
}

export function getAllAudiences(): Audience[] {
  if (!cache.audiences) cache.audiences = loadJson<Audience>("audiences.json");
  return cache.audiences as Audience[];
}

export function getAudience(slug: string): Audience | undefined {
  return getAllAudiences().find((a) => a.slug === slug);
}

export function getComparisons(): Comparison[] {
  if (!cache.comparisons) cache.comparisons = loadJson<Comparison>("comparisons.json");
  return cache.comparisons as Comparison[];
}

export function getComparison(slug: string): Comparison | undefined {
  return getComparisons().find((c) => c.slug === slug);
}

export function getAllRoutes(): string[] {
  const routes: string[] = ["/"];
  for (const c of getAllCategories()) routes.push(`/best/${c.slug}`);
  for (const p of getAllPlatforms()) routes.push(`/best/${p.slug}`);
  for (const b of getAllBudgets()) routes.push(`/best/${b.slug}`);
  for (const c of getComparisons()) routes.push(`/comparisons/${c.slug}`);
  for (const p of getAllProviders()) routes.push(`/reviews/${p.reviewSlug}`);
  return routes;
}
