import type { Metadata } from "next";

const SITE_NAME = "Conscious Pregnancy";
// Google truncates meta descriptions around 155-160 characters.
const DESCRIPTION_MAX = 160;

// Shared social preview image, used by any page without its own.
export const OG_IMAGE = {
  url: "/og-heart-hands.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Hands forming a heart over a pregnant belly, held from behind by a partner",
};

type ShareImage = { url: string; width?: number; height?: number; type?: string; alt: string };

function clip(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= DESCRIPTION_MAX) return flat;
  const cut = flat.slice(0, DESCRIPTION_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

// Title, canonical, Open Graph, and X metadata for one page. Every page needs
// this: Next.js merges metadata shallowly, so a page without its own values
// inherits the layout's canonical and og:url, which both point at the homepage.
// `title` is the full title; it bypasses the layout's "%s | Conscious Pregnancy"
// template because CMS titles already carry their own suffix.
export function pageMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
  type = "website",
  publishedTime,
}: {
  title: string;
  description?: string;
  path: string;
  image?: ShareImage;
  type?: "website" | "article";
  /** Only emitted when `type` is "article". */
  publishedTime?: string;
}): Metadata {
  const desc = description ? clip(description) : undefined;
  const base = {
    url: path,
    siteName: SITE_NAME,
    locale: "en_US",
    title,
    description: desc,
    images: [image],
  };
  return {
    title: { absolute: title },
    description: desc,
    alternates: { canonical: path },
    openGraph: type === "article" ? { ...base, type, publishedTime } : { ...base, type },
    twitter: { card: "summary_large_image", title, description: desc, images: [image] },
  };
}
