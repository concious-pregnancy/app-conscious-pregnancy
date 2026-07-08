// /llms.txt is the AEO counterpart to robots.txt and sitemap.xml.
//
// The llms.txt convention (https://llmstxt.org) gives answer engines a curated,
// link-rich map of the site in markdown, so a model can cite the right page
// without crawling the whole tree. Served from a route handler (not a static
// file) so it can later read live content from Sanity. See milestone
// app-build/07d-aeo.
//
// Keep this short, factual, and answer-first. Lead each line with the concrete
// fact a model would quote.

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://consciouspregnancy.care";

const BODY = `# Conscious Pregnancy

> Preconception and pregnancy care from Dr. Ashley Alden (DACM, L.Ac.) in Venice,
> California. A whole-body, whole-partnership approach that combines functional
> medicine, Traditional Chinese Medicine, somatic healing, and nutritional
> biochemistry. The guiding framework is "Prepping the Palace": preparing both
> partners' health before a new life takes up residence. Conscious Pregnancy is a
> sub-brand of Golden Life Wellness & Acupuncture.

## About

- [About Conscious Pregnancy](${BASE_URL}/about): Who Dr. Ashley Alden is, the five modalities she works across, and the bio-individuality philosophy ("you are not a national average").
- [The Prepping the Palace framework](${BASE_URL}/about): Why both partners prepare together before conception, and what whole-body readiness looks like.

## Services

- [Services](${BASE_URL}/services): Preconception preparation, pregnancy support, and postpartum care grounded in functional medicine and Traditional Chinese Medicine.

## Writing

- [Journal](${BASE_URL}/journal): Articles on prenatal nutrition (methylfolate, choline, DHA), blood-sugar regulation, thyroid and hormonal health, nervous-system support, toxic-load reduction, and physiological birth preparation.

## Approach

- Real food first, mechanism-driven nutrition, and root-cause thinking rather than symptom management.
- Integrative, not antagonistic toward conventional OB care. The goal is informed decisions, not fear.
- One-hour sessions, deep listening, and a small intentional patient community.
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
