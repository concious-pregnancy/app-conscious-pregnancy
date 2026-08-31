import { createClient } from "@sanity/client";

// Consolidates the 7 old About-page singleton documents (aboutIntro, aboutFounder,
// aboutTeamSection, teamMember[], aboutPebbles, aboutStory, aboutFaq, aboutCta) into
// one aboutPage-singleton document matching the new aboutPage schema. Read-only against
// the old docs; writes a single new document via createOrReplace. Run with:
//   npx tsx scripts/migrate-about-consolidation.ts          (dry run, prints the payload)
//   npx tsx scripts/migrate-about-consolidation.ts --write   (writes to Sanity)
const client = createClient({
  projectId: "ih14cr70",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type Band = {
  eyebrow?: string;
  title?: string;
  body?: string;
  highlightedBody?: string;
  image?: unknown;
  surface?: string;
};

async function main() {
  const write = process.argv.includes("--write");

  const [intro, founder, teamSection, teamMembers, pebbles, story, faq, cta] = await Promise.all([
    client.fetch(`*[_type == "aboutIntro"][0]`),
    client.fetch(`*[_type == "aboutFounder"][0]`),
    client.fetch(`*[_type == "aboutTeamSection"][0]`),
    client.fetch(`*[_type == "teamMember"] | order(_createdAt asc) { name, role, bio, image }`),
    client.fetch(`*[_type == "aboutPebbles"][0]`),
    client.fetch(`*[_type == "aboutStory"][0]`),
    client.fetch(`*[_type == "aboutFaq"][0]`),
    client.fetch(`*[_type == "aboutCta"][0]`),
  ]);

  if (!intro && !founder && !teamSection && !pebbles && !story && !faq && !cta) {
    console.log("No old About-page documents found. Nothing to migrate.");
    return;
  }

  // Old aboutIntro.bands[] was a generic array. Band 0 rendered first (before Founder,
  // with credentials); band 1 rendered after Founder ("My Story"); any band 2 was being
  // silently dropped by the old page component and is intentionally NOT migrated.
  const bands: Band[] = intro?.bands ?? [];
  if (bands.length > 2) {
    console.warn(
      `aboutIntro had ${bands.length} bands; only the first two migrate (indexes 0 and 1). ` +
        `Index(es) ${bands
          .slice(2)
          .map((_, i) => i + 2)
          .join(", ")} are dropped, same as the old page's render behavior.`,
    );
  }

  const doc = {
    _id: "aboutPage-singleton",
    _type: "aboutPage",

    introEyebrow: intro?.eyebrow,
    introTitle: intro?.title,
    introTitleEm: intro?.titleEm,
    introBody: intro?.body,
    introBandBeforeFounder: bands[0]
      ? {
          _type: "object",
          eyebrow: bands[0].eyebrow,
          title: bands[0].title,
          body: bands[0].body,
          highlightedBody: bands[0].highlightedBody,
          image: bands[0].image,
          surface: bands[0].surface,
        }
      : undefined,
    introBandAfterFounder: bands[1]
      ? {
          _type: "object",
          eyebrow: bands[1].eyebrow,
          title: bands[1].title,
          body: bands[1].body,
          highlightedBody: bands[1].highlightedBody,
          image: bands[1].image,
          surface: bands[1].surface,
        }
      : undefined,

    founderEyebrow: founder?.eyebrow,
    founderTitle: founder?.title,
    founderTitleEm: founder?.titleEm,
    founderBody: founder?.body,
    founderChapters: founder?.chapters,

    teamEyebrow: teamSection?.eyebrow,
    teamTitle: teamSection?.title,
    teamTitleEm: teamSection?.titleEm,
    teamSub: teamSection?.sub,
    teamMembers: (teamMembers ?? []).map(
      (m: { name?: string; role?: string; bio?: string; image?: unknown }) => ({
        _type: "teamMember",
        _key: m.name ?? Math.random().toString(36).slice(2),
        name: m.name,
        role: m.role,
        bio: m.bio,
        image: m.image,
      }),
    ),

    pebblesEyebrow: pebbles?.eyebrow,
    pebblesQuote: pebbles?.quote,
    pebblesAttribution: pebbles?.attribution,
    pebblesCtaLabel: pebbles?.ctaLabel,
    pebblesImage: pebbles?.image,

    storyEyebrow: story?.eyebrow,
    storyTitle: story?.title,
    storyTitleEm: story?.titleEm,
    storyBody: story?.body,
    storyHighlightedBody: story?.highlightedBody,
    storyFacts: story?.facts,
    storyPullQuotes: story?.pullQuotes,
    storyOutsideClinic: story?.outsideClinic,

    faqEyebrow: faq?.eyebrow,
    faqTitle: faq?.title,
    faqTitleEm: faq?.titleEm,
    faqSub: faq?.sub,
    faqFootnote: faq?.footnote,
    faqItems: faq?.items,

    ctaEyebrow: cta?.eyebrow,
    ctaTitle: cta?.title,
    ctaTitleEm: cta?.titleEm,
    ctaBody: cta?.body,
    ctaLabel: cta?.ctaLabel,
  };

  console.log(JSON.stringify(doc, null, 2));

  if (!write) {
    console.log("\nDry run only. Re-run with --write to create aboutPage-singleton in Sanity.");
    return;
  }

  const result = await client.createOrReplace(doc);
  console.log(`\nWrote ${result._id}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
