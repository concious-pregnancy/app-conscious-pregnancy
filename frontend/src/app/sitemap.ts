import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://consciouspregnancy.care";

function abs(path: string): string {
  if (path === "/") return BASE_URL;
  return `${BASE_URL}${path}`;
}

// Only the four top-level pages the nav routes people to. The journal is held
// back from search (noindex, see (site)/journal/layout.tsx).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: abs("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
