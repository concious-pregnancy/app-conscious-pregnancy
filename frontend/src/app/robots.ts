import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://consciouspregnancy.care";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Never disallow /_next/static/ or /_next/image. Googlebot renders pages like a
      // browser, so blocking the JS/CSS chunks or the image optimizer makes it evaluate
      // a stripped-down version of the site. Only block routes with no search value.
      disallow: ["/api/", "/studio", "/design-system"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
