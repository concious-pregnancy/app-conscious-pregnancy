import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity/client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://consciouspregnancy.care";

export const dynamic = "force-dynamic";

type SlugRow = { slug: string; _updatedAt?: string };

const allServiceSlugsForSitemap = groq`*[_type == "service" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

const allJournalSlugsForSitemap = groq`*[_type == "journalArticle" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

function abs(path: string): string {
  if (path === "/") return BASE_URL;
  return `${BASE_URL}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [services, journal] = await Promise.all([
    client.fetch<SlugRow[]>(allServiceSlugsForSitemap).catch(() => []),
    client.fetch<SlugRow[]>(allJournalSlugsForSitemap).catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: abs("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: abs("/journal"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: abs(`/services/${s.slug}`),
    lastModified: s._updatedAt ? new Date(s._updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journal.map((p) => ({
    url: abs(`/journal/${p.slug}`),
    lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...journalRoutes];
}
