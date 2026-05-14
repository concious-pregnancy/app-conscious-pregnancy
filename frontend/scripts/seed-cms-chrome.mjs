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
    _id: "servicesSection-singleton",
    _type: "servicesSection",
    eyebrow: "The Work",
    headingLine1: "Four lenses on",
    headingLine2Em: "one preparation.",
    sub: "Each practice stands on its own. Together, they meet you at every layer, cellular, energetic, emotional, in the window before you conceive.",
  },
  {
    _id: "philosophySection-singleton",
    _type: "philosophySection",
    eyebrow: "Prepping the Palace",
    heading:
      "These are not separate modalities stitched together. They are four lenses on the same truth: your whole self, physical, energetic, and emotional, shapes the life you are about to create.",
    ctaLabel: "How We Work Together",
    footnote: "Real People. Real Change.",
  },
  {
    _id: "readySection-singleton",
    _type: "readySection",
    headingLine1: "Ready to find",
    headingEm: "your path?",
    sub: "Every step is flexible, we adapt to your needs, pace, and comfort level. Whether you're here for a short chapter or a longer journey, we'll walk it together.",
    ctaLabel: "Start Your Journey",
    trustLabel: "Trusted by 80+ clients",
    ratingText: "Excellent 4.9 out of 5",
    chatIntro: "Prefer to chat first?",
    chatEmail: "#contact",
  },
  {
    _id: "pricingSection-singleton",
    _type: "pricingSection",
    eyebrow: "The Program",
    headingLine1: "This is not just",
    headingLine2: "her journey.",
    sub: "A first session is often just a conversation, a starting point. From there, you choose the pace and depth of support that feels right for you.",
    ctaLabel: "Get Started",
  },
  {
    _id: "approachSection-singleton",
    _type: "approachSection",
    heading: "Support grounded in experience, guided by clarity, and",
    headingEm: "built for lasting change.",
    sub: "Our sessions create space for that change to happen. We take time to understand your needs, offer structure where it helps, and support your direction, not ours. Learn more about how we work and what to expect from the process.",
  },
  {
    _id: "journalSection-singleton",
    _type: "journalSection",
    eyebrow: "Our Journal",
    headingLine1: "Evidence, not",
    headingLine2Em: "opinion.",
    sub: "Reflections, research, and practical tools grounded in functional medicine and Chinese medicine. Written for women who want to understand, not just follow.",
    ctaLabel: "Browse Insights",
  },
  {
    _id: "faqSection-singleton",
    _type: "faqSection",
    headingLine1: "Your questions.",
    headingLine2Em: "Answered.",
  },
  {
    _id: "contactSection-singleton",
    _type: "contactSection",
    label: "Begin Your Journey",
    headingLine1: "Your preparation",
    headingLine2: "starts here.",
    sub: "Fill out the form and we will reach out within 24 hours to schedule your discovery call. We will talk through where you are, what you want to optimize, and whether this program is the right fit.",
    formHeading: "Tell us about you.",
    trustLine: "Trusted by 80+ clients",
    submitLabel: "Request a Discovery Call",
  },
  {
    _id: "servicePage-singleton",
    _type: "servicePage",
    backLinkLabel: "← All services",
    bodyPlaceholder: "Details for this service are being written. Check back soon.",
    relatedEyebrow: "Continue exploring",
    relatedHeading: "More ways we work together.",
    relatedReadLabel: "Learn more",
    ctaEyebrow: "Begin Your Journey",
    ctaTitle: "Ready to begin",
    ctaTitleEm: "your work?",
    ctaBody:
      "Discovery calls are free, hour-long, and unhurried. We talk about where you are, what you've tried, and whether this is the right fit before anything is booked.",
    ctaLabel: "Book a discovery call",
    ctaHref: "/#contact",
    metaTitleSuffix: " | Services | Conscious Pregnancy",
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
