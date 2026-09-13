import { createClient, type QueryParams } from "next-sanity";

// VERCEL_ENV is set automatically by Vercel: "production" | "preview" | "development"
// Locally it's undefined, so fall back to NODE_ENV check.
const isPreview =
  process.env.VERCEL_ENV === "preview" ||
  process.env.VERCEL_ENV === "development" ||
  (process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === "development");

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  // Off on purpose. The Next.js data cache below is the cache layer, and the
  // Sanity CDN can hand back pre-publish content right after a webhook fires.
  useCdn: false,
  perspective: isPreview ? "previewDrafts" : "published",
  token: isPreview ? process.env.SANITY_API_TOKEN : undefined,
});

export const SANITY_CACHE_TAG = "sanity";

// Production: stale-while-revalidate via the Next.js data cache. Pages are
// served from cache; once REVALIDATE_SECONDS passes, the next request gets the
// cached page while a background render refetches. Publishing in Sanity hits
// /api/revalidate, which expires SANITY_CACHE_TAG right away.
// Preview (staging, branch deploys, local dev): never cached so drafts show live.
const REVALIDATE_SECONDS = 3600;

const fetchOptions = isPreview
  ? ({ cache: "no-store" } as const)
  : { next: { revalidate: REVALIDATE_SECONDS, tags: [SANITY_CACHE_TAG] } };

// oxlint-disable-next-line no-explicit-any -- mirrors client.fetch's default result type
export function sanityFetch<R = any>(query: string, params: QueryParams = {}): Promise<R> {
  return client.fetch<R>(query, params, fetchOptions);
}
