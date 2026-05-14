/**
 * Seeds the site-wide and page-level "chrome" singletons used by the new CMS
 * model: navSection, footerSection, journalIndexPage, journalArticlePage.
 *
 * Re-runnable. Uses createIfNotExists for the document, then setIfMissing
 * for individual fields so editor changes are never clobbered.
 *
 * Run: node scripts/seed-cms-chrome.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const raw = readFileSync(join(ROOT, ".env.local"), "utf8");
const env = {};
for (const line of raw.split("\n")) {
  const [k, ...rest] = line.split("=");
  if (k && rest.length) env[k.trim()] = rest.join("=").trim();
}

const client = createClient({
  projectId: env["NEXT_PUBLIC_SANITY_PROJECT_ID"],
  dataset: "production",
  apiVersion: "2024-01-01",
  token: env["SANITY_API_TOKEN"],
  useCdn: false,
});

const docs = [
  {
    _id: "navSection-singleton",
    _type: "navSection",
    brandWordPrimary: "conscious",
    brandWordItalic: "pregnancy",
    brandAriaLabel: "Conscious Pregnancy home",
    navLinks: [
      { _key: "n1", label: "About", href: "/about" },
      { _key: "n2", label: "Services", href: "/services" },
      { _key: "n3", label: "Journal", href: "/journal" },
    ],
    ctaLabel: "Begin Your Journey",
    ctaHref: "/#contact",
    mobileMenuLabel: "Menu",
  },
  {
    _id: "footerSection-singleton",
    _type: "footerSection",
    signupHeadline: "Begin where you",
    signupHeadlineEm: "actually are.",
    signupSub:
      "A monthly note from Dr. Alden, slow reading on conscious conception, the body, and the work between knowing and changing.",
    signupPlaceholder: "your email address",
    signupButtonLabel: "Subscribe",
    signupSubmittingLabel: "Subscribing...",
    signupSuccessMessage: "You're on the list. Thank you.",
    signupFineprint: "By signing up you agree to our {{privacy}}.",
    privacyHref: "#",
    sitemapColumn1: [
      { _key: "s1a", label: "Approach", href: "#about" },
      { _key: "s1b", label: "Services", href: "#services" },
      { _key: "s1c", label: "Programs", href: "#pricing" },
      { _key: "s1d", label: "Process", href: "#process" },
      { _key: "s1e", label: "Discovery Call", href: "#contact" },
      { _key: "s1f", label: "Patient Portal", href: "#" },
    ],
    sitemapColumn2: [
      { _key: "s2a", label: "Contact", href: "#contact" },
      { _key: "s2b", label: "Instagram", href: "#" },
      { _key: "s2c", label: "Dr. Ashley Alden", href: "#credentials" },
      { _key: "s2d", label: "Golden Life Wellness", href: "#" },
      { _key: "s2e", label: "Press", href: "#" },
      { _key: "s2f", label: "Privacy Policy", href: "#" },
    ],
    brandWordPrimary: "conscious",
    brandWordItalic: "pregnancy",
    copyrightTemplate:
      "© {{year}} Conscious Pregnancy. A Golden Life Wellness practice. Venice, CA.",
  },
  {
    _id: "journalIndexPage-singleton",
    _type: "journalIndexPage",
    heroEyebrow: "Journal",
    heroTitleLine1: "Insights",
    heroTitleEm: "That Matter.",
    heroLead: "Articles, tools, and insights to help you find clarity, balance, and direction.",
    featuredCount: 2,
    gridEyebrow: "Latest writing",
    gridTitle: "Recent",
    gridTitleEm: "articles.",
    readMoreLabel: "Read more",
    ctaEyebrow: "Begin Your Journey",
    ctaTitle: "Ready to find",
    ctaTitleEm: "your path?",
    ctaBody:
      "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes.",
    ctaLabel: "Start your journey",
    ctaHref: "/#contact",
    metaTitle: "Journal | Conscious Pregnancy",
    metaDescription:
      "Articles, tools, and insights to help you find clarity, balance, and direction.",
  },
  {
    _id: "journalArticlePage-singleton",
    _type: "journalArticlePage",
    backLinkLabel: "← All articles",
    bylineFallbackAuthor: "Dr. Ashley Alden",
    readingTimeSuffix: "min read",
    bodyPlaceholder: "This article is being written. Check back soon.",
    relatedEyebrow: "Continue reading",
    relatedHeading: "More from the journal.",
    relatedReadLabel: "Read more",
    ctaEyebrow: "Begin Your Journey",
    ctaTitle: "Ready to begin",
    ctaTitleEm: "your work?",
    ctaBody:
      "Discovery calls are free, hour-long, and unhurried. We talk about where you are, what you've tried, and whether this is the right fit before anything is booked.",
    ctaLabel: "Book a discovery call",
    ctaHref: "/#contact",
    metaTitleSuffix: " | Journal | Conscious Pregnancy",
  },
];

async function main() {
  for (const doc of docs) {
    const { _id, _type, ...fields } = doc;
    await client.createIfNotExists({ _id, _type, ...fields });
    await client.patch(_id).setIfMissing(fields).commit();
    // eslint-disable-next-line no-console
    console.log(`  ✓ ${_type}/${_id}`);
  }
  // eslint-disable-next-line no-console
  console.log("\n✅ CMS chrome seeded.\n");
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
