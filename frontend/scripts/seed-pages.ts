/* Seed Sanity with all content + images for the standalone /about,
 * /services, /journal pages. Idempotent — uses createOrReplace with
 * deterministic _ids so re-runs converge on the same docs.
 *
 * Each visual section is its own document, mirroring the homepage
 * pattern (heroSection, balanceSection, etc.). The pages compose the
 * sections via Promise.all of per-section queries.
 *
 * Run:  SANITY_API_TOKEN=... npm run seed:pages
 */
import { createClient } from "@sanity/client";
import * as fs from "node:fs";
import * as path from "node:path";

const client = createClient({
  projectId: "ih14cr70",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const PUBLIC_REF = path.resolve(__dirname, "..", "public", "clearpath-ref");

type ImgRef = { _type: "image"; asset: { _type: "reference"; _ref: string } };
const uploadCache = new Map<string, ImgRef>();

async function uploadImg(rel: string): Promise<ImgRef> {
  if (uploadCache.has(rel)) return uploadCache.get(rel)!;
  const filePath = path.join(PUBLIC_REF, rel);
  if (!fs.existsSync(filePath)) throw new Error(`Image not found: ${filePath}`);
  const stream = fs.createReadStream(filePath);
  const filename = path.basename(filePath);
  const asset = await client.assets.upload("image", stream, { filename });
  const ref: ImgRef = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
  uploadCache.set(rel, ref);
  console.log(`  uploaded ${rel} -> ${asset._id}`);
  return ref;
}

/* ── About sections (9 singletons) ───────────────────────────────── */
async function buildAboutSections() {
  const founderImage = await uploadImg("about/1OD7wXOtYnqOi7RvvRqTnSC8o.jpg");
  const pebblesImage = await uploadImg("about/RQK6FjdwGi88lXjfiA3iUnV5rvc.jpg");
  const storyImageBack = await uploadImg("about/0tyXlpa0soVzPMq44gbKMcP680.jpg");
  const storyImageFront = await uploadImg("about/wQLwxTlAvuy2tWEdKj8oaawUp0s.jpg");

  return [
    {
      _type: "aboutHero",
      _id: "aboutHero-singleton",
      eyebrow: "About",
      titleLine1: "Your Path,",
      titleEm: "Our Purpose.",
      lead: "Find out who we are, what we stand for, and how we can support your journey.",
    },
    {
      _type: "aboutIntro",
      _id: "aboutIntro-singleton",
      eyebrow: "The Way We Help",
      title: "We start by",
      titleEm: "listening,",
      body: "At ClearPath, we believe every journey is unique, and so is the support it deserves. Our role is to walk beside you, offering clarity, compassion, and practical guidance as you navigate life's challenges. We start by listening, really listening, to understand your needs and pace. From there, we shape a path that's realistic, sustainable, and tailored to you. Every session is a safe space to explore, reflect, and grow without judgment.",
    },
    {
      _type: "aboutFounder",
      _id: "aboutFounder-singleton",
      eyebrow: "Meet our founder",
      title: "Meet",
      titleEm: "Our Founder.",
      body: [
        "ClearPath was founded by Anna Keller, a therapist with over 15 years of experience helping people navigate life's turning points. Her work is grounded in the belief that clarity and change come from small, intentional steps, and that no one should walk their path alone.",
        "Anna started ClearPath to create a welcoming, non-judgmental space where people could slow down, reflect, and find their next direction with confidence and care.",
      ],
      image: founderImage,
      quote:
        "Therapy isn't about fixing people, it's about walking beside them as they discover their own way forward.",
      quoteAttribution: "Anna Keller",
    },
    {
      _type: "aboutTeamSection",
      _id: "aboutTeamSection-singleton",
      eyebrow: "Our team",
      title: "The People Who",
      titleEm: "Walk Beside You.",
      sub: "ClearPath is more than a service, each member of our team is here to listen, guide, and support you at your own pace.",
    },
    {
      _type: "aboutApproach",
      _id: "aboutApproach-singleton",
      title: "Support grounded in",
      titleEm: "experience,",
      body: "Our sessions create space for that change to happen. We take time to understand your needs, offer structure where it helps, and support your direction, not ours. Learn more about how we work and what to expect from the process.",
    },
    {
      _type: "aboutPebbles",
      _id: "aboutPebbles-singleton",
      eyebrow: "Real people. Real change.",
      quote:
        "Every path is unique, the important thing is taking the next step, no matter how small.",
      attribution: "Anna Keller · Therapist and Founder of ClearPath",
      ctaLabel: "Start your journey",
      image: pebblesImage,
    },
    {
      _type: "aboutStory",
      _id: "aboutStory-singleton",
      eyebrow: "Real people. Real change.",
      title: "Finding each other",
      titleEm: "again.",
      body: "When Daniel and Marisa first came in, they weren't on the verge of breaking up, but they felt more like roommates than partners. They missed the warmth they used to share, but neither knew how to bridge the distance.",
      ctaLabel: "Read full story",
      imageBack: storyImageBack,
      imageFront: storyImageFront,
    },
    {
      _type: "aboutFaq",
      _id: "aboutFaq-singleton",
      eyebrow: "FAQ",
      title: "Your questions.",
      titleEm: "Answered.",
      sub: "Not sure what to expect? These answers might help you feel more confident as you begin.",
      footnote: "Didn't find your answer? Send us a message, we'll respond with care and clarity.",
      items: [
        {
          q: "How do I know if therapy is right for me?",
          a: "Therapy isn't just for crises. It's for anyone curious about growth, clarity, or navigating life's changes with more support and self-awareness.",
        },
        {
          q: "What can I expect from the first session?",
          a: "The first session is a gentle starting point. You'll talk with your therapist about what brings you here, what you're hoping for, and what feels comfortable for you right now.",
        },
        {
          q: "Do you offer both online and in-person sessions?",
          a: "Yes. Whether you prefer meeting face-to-face or from the comfort of home, we offer flexible options to meet you where you are.",
        },
        {
          q: "How often should I come to therapy?",
          a: "There's no one-size-fits-all answer. Some people come weekly, others bi-weekly or monthly. You and your therapist will decide what feels right based on your needs and pace.",
        },
        {
          q: "Is everything I share kept private?",
          a: "Yes. Your sessions are completely confidential, except in very rare cases related to safety. Your privacy is always a priority.",
        },
        {
          q: "What if I don't know what to talk about?",
          a: "That's okay. You don't need to have it all figured out. Sometimes just showing up is the most important first step, and your therapist will guide you from there.",
        },
      ],
    },
    {
      _type: "aboutCta",
      _id: "aboutCta-singleton",
      eyebrow: "Begin Your Journey",
      title: "Ready to find",
      titleEm: "your path?",
      body: "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes, it's about meaningful change, one clear step at a time.",
      ctaLabel: "Start your journey",
    },
  ];
}

/* ── Team members (3 docs) ──────────────────────────────────────── */
async function buildTeamMembers() {
  const sofia = await uploadImg("about/qJCSWUUsykM3SrhtCmbKjBq9Q78.jpg");
  const marcus = await uploadImg("about/7eKCHVMVJdWT3yvzEza9J81fWk.jpg");
  const leila = await uploadImg("about/TF67zgMSYINSD7dymhKX4rhrTM.jpg");
  return [
    {
      _type: "teamMember",
      _id: "teamMember-sofia",
      name: "Sofia Bennett",
      role: "Therapist",
      bio: "Relationship therapist supporting couples and individuals through communication, trust-building, and conflict resolution.",
      image: sofia,
      order: 1,
    },
    {
      _type: "teamMember",
      _id: "teamMember-marcus",
      name: "Marcus Lee",
      role: "Therapist",
      bio: "Wellness coach focused on creating sustainable lifestyle changes for better physical and mental health.",
      image: marcus,
      order: 2,
    },
    {
      _type: "teamMember",
      _id: "teamMember-leila",
      name: "Leila Moreno",
      role: "Therapist",
      bio: "Mindfulness specialist guiding people to slow down, manage stress, and find clarity in daily life.",
      image: leila,
      order: 3,
    },
  ];
}

/* ── Services sections ───────────────────────────────────────────── */
async function buildServicesSections() {
  return [
    {
      _type: "servicesHero",
      _id: "servicesHero-singleton",
      eyebrow: "Services",
      titleLine1: "Every Step",
      titleEm: "of Your Journey.",
      lead: "Explore our therapy and coaching options tailored to your goals, pace, and needs.",
    },
    {
      _type: "servicesStats",
      _id: "servicesStats-singleton",
      title: "From first steps to",
      titleEm: "lasting change,",
      body: "Behind every number is a story of progress. These milestones capture the work, dedication, and care we bring to each step of the journey.",
      stats: [
        { _key: "s1", value: "450+", label: "Therapy sessions completed" },
        { _key: "s2", value: "80+", label: "Clients supported" },
        { _key: "s3", value: "9+", label: "Years of professional experience" },
        { _key: "s4", value: "25+", label: "Programs and tools offered" },
      ],
    },
    {
      _type: "servicesPricing",
      _id: "servicesPricing-singleton",
      eyebrow: "Our prices",
      title: "Support that fits",
      titleEm: "your pace.",
      sub: "A first session is often just a conversation, a starting point. From there, you choose the pace and depth of support that feels right for you.",
      tiers: [
        {
          _key: "t1",
          name: "Starter",
          blurb: "Explore therapy at your own pace.",
          features: [
            "Dedicated therapist",
            "Online or in-person",
            "Personalized goal-setting",
            "Client portal access",
          ],
        },
        {
          _key: "t2",
          name: "Growth",
          blurb: "Ongoing support for continued growth.",
          features: [
            "Everything in Starter",
            "More flexible scheduling",
            "Progress tracking",
            "Extra resources",
          ],
        },
        {
          _key: "t3",
          name: "Complete",
          blurb: "Consistent support with full access.",
          features: [
            "All Growth features",
            "Extended sessions",
            "Priority booking",
            "Direct therapist messaging",
          ],
        },
      ],
    },
    {
      _type: "servicesStory",
      _id: "servicesStory-singleton",
      eyebrow: "Real people. Real change.",
      title: "Rewriting success on",
      titleEm: "his own terms.",
      body: "James was 38, thriving in a competitive field, at least on paper. Inside, he felt exhausted and disconnected from the life he'd worked so hard to build. Even when he hit his goals, the satisfaction was fleeting, quickly replaced by the pressure to reach the next milestone.",
      image: await uploadImg("services/92gLXvk1EhQjqbfE6arrIJRsBGY.jpg"),
      ctaLabel: "Read full story",
    },
    {
      _type: "servicesFaq",
      _id: "servicesFaq-singleton",
      eyebrow: "FAQ",
      title: "Your questions.",
      titleEm: "Answered.",
      sub: "Not sure what to expect? These answers might help you feel more confident as you begin.",
      footnote: "Didn't find your answer? Send us a message, we'll respond with care and clarity.",
      items: [
        {
          q: "How do I know if therapy is right for me?",
          a: "Therapy isn't just for crises. It's for anyone curious about growth, clarity, or navigating life's changes with more support and self-awareness.",
        },
        {
          q: "What can I expect from the first session?",
          a: "The first session is a gentle starting point. You'll talk with your therapist about what brings you here, what you're hoping for, and what feels comfortable for you right now.",
        },
        {
          q: "Do you offer both online and in-person sessions?",
          a: "Yes. Whether you prefer meeting face-to-face or from the comfort of home, we offer flexible options to meet you where you are.",
        },
        {
          q: "How often should I come to therapy?",
          a: "There's no one-size-fits-all answer. Some people come weekly, others bi-weekly or monthly. You and your therapist will decide what feels right based on your needs and pace.",
        },
        {
          q: "Is everything I share kept private?",
          a: "Yes. Your sessions are completely confidential, except in very rare cases related to safety. Your privacy is always a priority.",
        },
        {
          q: "What if I don't know what to talk about?",
          a: "That's okay. You don't need to have it all figured out. Sometimes just showing up is the most important first step, and your therapist will guide you from there.",
        },
      ],
    },
    {
      _type: "servicesCta",
      _id: "servicesCta-singleton",
      eyebrow: "Book a session",
      title: "Support starts with a",
      titleEm: "simple step.",
      body: "Whether you're starting fresh, returning for ongoing support, or simply exploring your options, we're here to meet you where you are. Use the form to book a session that feels right for you.",
      ctaLabel: "Book a session",
    },
  ];
}

async function buildServicesBlocks() {
  const a = await uploadImg("services/X1KAS3BPHbN4rR5FN8CCVsSUhM.jpg");
  const b = await uploadImg("services/lZn0EEipDdK6TqFQ685W86d6r9M.jpg");
  const c = await uploadImg("services/Ux4Is85LWxm9dXetoVhxJWLGhLI.jpg");
  const d = await uploadImg("services/rQkdR79nheYY38OKZhh8pENppw.jpg");
  return [
    {
      _type: "servicesBlock",
      _id: "servicesBlock-mindfulness",
      eyebrow: "Service · 01",
      title: "Mindfulness &",
      titleEm: "Stress Support",
      image: a,
      paragraphs: [
        "Stress, anxiety, and overwhelm can leave you feeling disconnected from yourself and your life. Our mindfulness-based sessions are designed to help you slow down, breathe, and reconnect. You'll learn practical techniques to build resilience, manage emotional triggers, and develop a calmer, more centered mind.",
        "We draw on proven practices like guided meditation, grounding exercises, and mindful reflection to help you find balance, both in the moment and in your daily life. Ideal for anyone seeking more peace, presence, and emotional stability.",
      ],
      ctaLabel: "Book a session",
      order: 1,
    },
    {
      _type: "servicesBlock",
      _id: "servicesBlock-individual-therapy",
      eyebrow: "Service · 02",
      title: "Individual",
      titleEm: "Therapy",
      image: b,
      paragraphs: [
        "Sometimes you need a safe, private space to talk openly and work through what's on your mind. Our one-on-one therapy sessions focus on emotional clarity, deeper self-understanding, and healing. Whether you're facing life transitions, relationship difficulties, or personal challenges, we'll work together to explore patterns, process experiences, and strengthen your emotional well-being.",
        "Sessions are tailored to your pace and needs, blending evidence-based approaches with compassionate, practical support.",
      ],
      ctaLabel: "Book a session",
      order: 2,
    },
    {
      _type: "servicesBlock",
      _id: "servicesBlock-clarity-consult",
      eyebrow: "Service · 03",
      title: "Clarity",
      titleEm: "Consult",
      image: c,
      paragraphs: [
        "When you need direction fast, a Clarity Consult offers a focused space to step back and reassess. In these short-term, goal-driven sessions, we help you pinpoint what's holding you back, clarify your priorities, and map a practical next step.",
        "Perfect for making a big decision, resetting your goals, or addressing a specific challenge without committing to long-term therapy. You'll leave with new insight, a clearer mind, and an actionable plan to move forward.",
      ],
      ctaLabel: "Book a session",
      order: 3,
    },
    {
      _type: "servicesBlock",
      _id: "servicesBlock-life-coaching",
      eyebrow: "Service · 04",
      title: "Life",
      titleEm: "Coaching",
      image: d,
      paragraphs: [
        "Life coaching is for those ready to create change and take action. Whether you want to build confidence, strengthen motivation, or find a stronger sense of direction, we work with you to set clear goals and break them into achievable steps. Coaching is future-focused, it's about moving forward, staying accountable, and unlocking your potential.",
        "Through guided reflection, strategic planning, and ongoing support, we'll help you create the momentum needed to reach the life you want.",
      ],
      ctaLabel: "Book a session",
      order: 4,
    },
  ];
}

/* ── Journal sections + articles ─────────────────────────────────── */
async function buildJournalSections() {
  return [
    {
      _type: "journalHero",
      _id: "journalHero-singleton",
      eyebrow: "Journal",
      titleLine1: "Insights",
      titleEm: "That Matter.",
      lead: "Articles, tools, and insights to help you find clarity, balance, and direction. Our journal is where we share thoughts, stories, and practical tools to help you find clarity and balance, and keep moving toward the life you want.",
    },
    {
      _type: "journalRecent",
      _id: "journalRecent-singleton",
      eyebrow: "Latest writing",
      title: "Recent",
      titleEm: "articles.",
      featuredCount: 2,
    },
    {
      _type: "journalCta",
      _id: "journalCta-singleton",
      eyebrow: "Begin Your Journey",
      title: "Ready to find",
      titleEm: "your path?",
      body: "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes, it's about meaningful change, one clear step at a time.",
      ctaLabel: "Start your journey",
    },
  ];
}

async function buildJournalArticles() {
  const a = await uploadImg("journal/LksF7zMOHE97HJPqXDmb7LSvWE.jpg");
  const b = await uploadImg("journal/ZMX4xonC6WvSRyRzHHgOkTDzw4.jpg");
  const c = await uploadImg("journal/2EIIgE63cU5md9VUpWNs5xhsM.jpg");
  const d = await uploadImg("journal/LsGrGUWDWx4Ok7pTwhp0PXTTA.jpg");
  const e = await uploadImg("journal/TF67zgMSYINSD7dymhKX4rhrTM.jpg");

  const articles = [
    {
      slug: "learning-to-pause-without-guilt",
      eyebrow: "Reflection · No. 01",
      title: "Learning to Pause Without Guilt.",
      excerpt:
        "Taking a break isn't failure, it's part of the process. Here's how to slow down with kindness.",
      image: a,
      order: 1,
    },
    {
      slug: "what-makes-therapy-work",
      eyebrow: "Practice · No. 02",
      title: "What Makes Therapy Work?",
      excerpt:
        "Beyond techniques or tools, therapy works best when it feels safe, real, and human.",
      image: b,
      order: 2,
    },
    {
      slug: "the-gentle-art-of-slowing-down",
      eyebrow: "Slowing down · No. 03",
      title: "The Gentle Art of Slowing Down",
      excerpt:
        "Slowing down is more than just taking a break, it's a conscious choice to live at a pace that allows space for reflection, connection, and clarity.",
      image: c,
      order: 3,
    },
    {
      slug: "finding-strength-in-release",
      eyebrow: "Release · No. 04",
      title: "Finding Strength in Release",
      excerpt:
        "Letting go is one of the hardest, and most transformative, things we do. It asks us to release control, loosen our grip, and trust that something better might come in its place.",
      image: d,
      order: 4,
    },
    {
      slug: "listening-to-yourself-again",
      eyebrow: "Self-knowledge · No. 05",
      title: "Listening to Yourself Again.",
      excerpt:
        "In a noisy world full of advice, opinions, and pressure, it's easy to lose touch with your own voice. We start living on autopilot, doing what's expected instead of what feels true.",
      image: e,
      order: 5,
    },
  ];

  return articles.map((a) => ({
    _type: "journalArticle",
    _id: `journalArticle-${a.slug}`,
    title: a.title,
    eyebrow: a.eyebrow,
    excerpt: a.excerpt,
    image: a.image,
    slug: { _type: "slug", current: a.slug },
    order: a.order,
  }));
}

async function deleteOldMonoliths() {
  // Clean up the singleton docs from the previous (monolithic) schema shape
  // so they don't show as orphaned in Studio.
  const oldIds = ["aboutPage-singleton", "servicesPage-singleton", "journalPage-singleton"];
  console.log(`\nDeleting old monolith docs: ${oldIds.join(", ")}`);
  for (const id of oldIds) {
    try {
      await client.delete(id);
      console.log(`  deleted ${id}`);
    } catch (e) {
      console.log(`  skipped ${id} (likely already absent): ${e instanceof Error ? e.message : e}`);
    }
  }
}

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("SANITY_API_TOKEN env var is required");
  }
  console.log("Seeding per-section docs for /about, /services, /journal...");
  console.log("\n[1/5] About sections...");
  const aboutSections = await buildAboutSections();
  console.log("\n[2/5] Team members...");
  const teamMembers = await buildTeamMembers();
  console.log("\n[3/5] Services sections + blocks...");
  const servicesSections = await buildServicesSections();
  const servicesBlocks = await buildServicesBlocks();
  console.log("\n[4/5] Journal sections + articles...");
  const journalSections = await buildJournalSections();
  const journalArticles = await buildJournalArticles();

  const allDocs = [
    ...aboutSections,
    ...teamMembers,
    ...servicesSections,
    ...servicesBlocks,
    ...journalSections,
    ...journalArticles,
  ];

  console.log(`\nWriting ${allDocs.length} documents (createOrReplace, idempotent)...`);
  const tx = client.transaction();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const doc of allDocs) tx.createOrReplace(doc as any);
  const result = await tx.commit();
  console.log(`Wrote ${result.results.length} documents.`);

  console.log("\n[5/5] Cleanup...");
  await deleteOldMonoliths();

  console.log(`\nDone. Uploaded ${uploadCache.size} unique images.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
