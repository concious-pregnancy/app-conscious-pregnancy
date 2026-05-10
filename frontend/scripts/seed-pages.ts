/* Seed Sanity with all content + images for the standalone /about,
 * /services, /journal pages. Idempotent — uses createOrReplace so
 * re-running the script reuses the same singleton ids. Images upload
 * to Sanity assets and the resulting asset _id gets folded into each
 * document's image-typed field.
 *
 * Run:  SANITY_API_TOKEN=... npx tsx scripts/seed-pages.ts
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
  if (!fs.existsSync(filePath)) {
    throw new Error(`Image not found: ${filePath}`);
  }
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

/* ── About page content ──────────────────────────────────────────── */
async function buildAboutPage() {
  const founderImage = await uploadImg("about/1OD7wXOtYnqOi7RvvRqTnSC8o.jpg");
  const pebblesImage = await uploadImg("about/RQK6FjdwGi88lXjfiA3iUnV5rvc.jpg");
  const storyImageBack = await uploadImg("about/0tyXlpa0soVzPMq44gbKMcP680.jpg");
  const storyImageFront = await uploadImg("about/wQLwxTlAvuy2tWEdKj8oaawUp0s.jpg");

  return {
    _type: "aboutPage",
    _id: "aboutPage-singleton",
    heroEyebrow: "About",
    heroTitleLine1: "Your Path,",
    heroTitleEm: "Our Purpose.",
    heroLead: "Find out who we are, what we stand for, and how we can support your journey.",

    introEyebrow: "The Way We Help",
    introTitle: "We start by",
    introTitleEm: "listening,",
    introBody:
      "At ClearPath, we believe every journey is unique, and so is the support it deserves. Our role is to walk beside you, offering clarity, compassion, and practical guidance as you navigate life's challenges. We start by listening, really listening, to understand your needs and pace. From there, we shape a path that's realistic, sustainable, and tailored to you. Every session is a safe space to explore, reflect, and grow without judgment.",

    founderEyebrow: "Meet our founder",
    founderTitle: "Meet",
    founderTitleEm: "Our Founder.",
    founderBody: [
      "ClearPath was founded by Anna Keller, a therapist with over 15 years of experience helping people navigate life's turning points. Her work is grounded in the belief that clarity and change come from small, intentional steps, and that no one should walk their path alone.",
      "Anna started ClearPath to create a welcoming, non-judgmental space where people could slow down, reflect, and find their next direction with confidence and care.",
    ],
    founderImage,
    founderQuote:
      "Therapy isn't about fixing people, it's about walking beside them as they discover their own way forward.",
    founderQuoteAttribution: "Anna Keller",

    teamEyebrow: "Our team",
    teamTitle: "The People Who",
    teamTitleEm: "Walk Beside You.",
    teamSub:
      "ClearPath is more than a service, each member of our team is here to listen, guide, and support you at your own pace.",

    approachTitle: "Support grounded in",
    approachTitleEm: "experience,",
    approachBody:
      "Our sessions create space for that change to happen. We take time to understand your needs, offer structure where it helps, and support your direction, not ours. Learn more about how we work and what to expect from the process.",

    pebblesEyebrow: "Real people. Real change.",
    pebblesQuote:
      "Every path is unique, the important thing is taking the next step, no matter how small.",
    pebblesAttribution: "Anna Keller · Therapist and Founder of ClearPath",
    pebblesCtaLabel: "Start your journey",
    pebblesImage,

    storyEyebrow: "Real people. Real change.",
    storyTitle: "Finding each other",
    storyTitleEm: "again.",
    storyBody:
      "When Daniel and Marisa first came in, they weren't on the verge of breaking up, but they felt more like roommates than partners. They missed the warmth they used to share, but neither knew how to bridge the distance.",
    storyCtaLabel: "Read full story",
    storyImageBack,
    storyImageFront,

    faqEyebrow: "FAQ",
    faqTitle: "Your questions.",
    faqTitleEm: "Answered.",
    faqSub:
      "Not sure what to expect? These answers might help you feel more confident as you begin.",
    faqFootnote: "Didn't find your answer? Send us a message, we'll respond with care and clarity.",
    faqs: [
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

    ctaEyebrow: "Begin Your Journey",
    ctaTitle: "Ready to find",
    ctaTitleEm: "your path?",
    ctaBody:
      "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes, it's about meaningful change, one clear step at a time.",
    ctaLabel: "Start your journey",
  };
}

/* ── Team members ────────────────────────────────────────────────── */
async function buildTeamMembers() {
  const sofiaImg = await uploadImg("about/qJCSWUUsykM3SrhtCmbKjBq9Q78.jpg");
  const marcusImg = await uploadImg("about/7eKCHVMVJdWT3yvzEza9J81fWk.jpg");
  const leilaImg = await uploadImg("about/TF67zgMSYINSD7dymhKX4rhrTM.jpg");

  return [
    {
      _type: "teamMember",
      _id: "teamMember-sofia",
      name: "Sofia Bennett",
      role: "Therapist",
      bio: "Relationship therapist supporting couples and individuals through communication, trust-building, and conflict resolution.",
      image: sofiaImg,
      order: 1,
    },
    {
      _type: "teamMember",
      _id: "teamMember-marcus",
      name: "Marcus Lee",
      role: "Therapist",
      bio: "Wellness coach focused on creating sustainable lifestyle changes for better physical and mental health.",
      image: marcusImg,
      order: 2,
    },
    {
      _type: "teamMember",
      _id: "teamMember-leila",
      name: "Leila Moreno",
      role: "Therapist",
      bio: "Mindfulness specialist guiding people to slow down, manage stress, and find clarity in daily life.",
      image: leilaImg,
      order: 3,
    },
  ];
}

/* ── Services page ───────────────────────────────────────────────── */
async function buildServicesPage() {
  const blockImages = await Promise.all([
    uploadImg("services/X1KAS3BPHbN4rR5FN8CCVsSUhM.jpg"),
    uploadImg("services/lZn0EEipDdK6TqFQ685W86d6r9M.jpg"),
    uploadImg("services/Ux4Is85LWxm9dXetoVhxJWLGhLI.jpg"),
    uploadImg("services/rQkdR79nheYY38OKZhh8pENppw.jpg"),
  ]);
  const storyImage = await uploadImg("services/92gLXvk1EhQjqbfE6arrIJRsBGY.jpg");

  return {
    _type: "servicesPage",
    _id: "servicesPage-singleton",
    heroEyebrow: "Services",
    heroTitleLine1: "Every Step",
    heroTitleEm: "of Your Journey.",
    heroLead: "Explore our therapy and coaching options tailored to your goals, pace, and needs.",

    serviceBlocks: [
      {
        _key: "block-1",
        eyebrow: "Service · 01",
        title: "Mindfulness &",
        titleEm: "Stress Support",
        image: blockImages[0],
        paragraphs: [
          "Stress, anxiety, and overwhelm can leave you feeling disconnected from yourself and your life. Our mindfulness-based sessions are designed to help you slow down, breathe, and reconnect. You'll learn practical techniques to build resilience, manage emotional triggers, and develop a calmer, more centered mind.",
          "We draw on proven practices like guided meditation, grounding exercises, and mindful reflection to help you find balance, both in the moment and in your daily life. Ideal for anyone seeking more peace, presence, and emotional stability.",
        ],
        ctaLabel: "Book a session",
      },
      {
        _key: "block-2",
        eyebrow: "Service · 02",
        title: "Individual",
        titleEm: "Therapy",
        image: blockImages[1],
        paragraphs: [
          "Sometimes you need a safe, private space to talk openly and work through what's on your mind. Our one-on-one therapy sessions focus on emotional clarity, deeper self-understanding, and healing. Whether you're facing life transitions, relationship difficulties, or personal challenges, we'll work together to explore patterns, process experiences, and strengthen your emotional well-being.",
          "Sessions are tailored to your pace and needs, blending evidence-based approaches with compassionate, practical support.",
        ],
        ctaLabel: "Book a session",
      },
      {
        _key: "block-3",
        eyebrow: "Service · 03",
        title: "Clarity",
        titleEm: "Consult",
        image: blockImages[2],
        paragraphs: [
          "When you need direction fast, a Clarity Consult offers a focused space to step back and reassess. In these short-term, goal-driven sessions, we help you pinpoint what's holding you back, clarify your priorities, and map a practical next step.",
          "Perfect for making a big decision, resetting your goals, or addressing a specific challenge without committing to long-term therapy. You'll leave with new insight, a clearer mind, and an actionable plan to move forward.",
        ],
        ctaLabel: "Book a session",
      },
      {
        _key: "block-4",
        eyebrow: "Service · 04",
        title: "Life",
        titleEm: "Coaching",
        image: blockImages[3],
        paragraphs: [
          "Life coaching is for those ready to create change and take action. Whether you want to build confidence, strengthen motivation, or find a stronger sense of direction, we work with you to set clear goals and break them into achievable steps. Coaching is future-focused, it's about moving forward, staying accountable, and unlocking your potential.",
          "Through guided reflection, strategic planning, and ongoing support, we'll help you create the momentum needed to reach the life you want.",
        ],
        ctaLabel: "Book a session",
      },
    ],

    statsTitle: "From first steps to",
    statsTitleEm: "lasting change,",
    statsBody:
      "Behind every number is a story of progress. These milestones capture the work, dedication, and care we bring to each step of the journey.",
    stats: [
      { _key: "s1", value: "450+", label: "Therapy sessions completed" },
      { _key: "s2", value: "80+", label: "Clients supported" },
      { _key: "s3", value: "9+", label: "Years of professional experience" },
      { _key: "s4", value: "25+", label: "Programs and tools offered" },
    ],

    pricingEyebrow: "Our prices",
    pricingTitle: "Support that fits",
    pricingTitleEm: "your pace.",
    pricingSub:
      "A first session is often just a conversation, a starting point. From there, you choose the pace and depth of support that feels right for you.",
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

    storyEyebrow: "Real people. Real change.",
    storyTitle: "Rewriting success on",
    storyTitleEm: "his own terms.",
    storyBody:
      "James was 38, thriving in a competitive field, at least on paper. Inside, he felt exhausted and disconnected from the life he'd worked so hard to build. Even when he hit his goals, the satisfaction was fleeting, quickly replaced by the pressure to reach the next milestone.",
    storyImage,
    storyCtaLabel: "Read full story",

    faqEyebrow: "FAQ",
    faqTitle: "Your questions.",
    faqTitleEm: "Answered.",
    faqSub:
      "Not sure what to expect? These answers might help you feel more confident as you begin.",
    faqFootnote: "Didn't find your answer? Send us a message, we'll respond with care and clarity.",
    faqs: [
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

    ctaEyebrow: "Book a session",
    ctaTitle: "Support starts with a",
    ctaTitleEm: "simple step.",
    ctaBody:
      "Whether you're starting fresh, returning for ongoing support, or simply exploring your options, we're here to meet you where you are. Use the form to book a session that feels right for you.",
    ctaLabel: "Book a session",
  };
}

/* ── Journal page + articles ─────────────────────────────────────── */
async function buildJournalPage() {
  return {
    _type: "journalPage",
    _id: "journalPage-singleton",
    heroEyebrow: "Journal",
    heroTitleLine1: "Insights",
    heroTitleEm: "That Matter.",
    heroLead:
      "Articles, tools, and insights to help you find clarity, balance, and direction. Our journal is where we share thoughts, stories, and practical tools to help you find clarity and balance, and keep moving toward the life you want.",
    featuredCount: 2,
    recentEyebrow: "Latest writing",
    recentTitle: "Recent",
    recentTitleEm: "articles.",
    ctaEyebrow: "Begin Your Journey",
    ctaTitle: "Ready to find",
    ctaTitleEm: "your path?",
    ctaBody:
      "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes, it's about meaningful change, one clear step at a time.",
    ctaLabel: "Start your journey",
  };
}

async function buildJournalArticles() {
  const images = await Promise.all([
    uploadImg("journal/LksF7zMOHE97HJPqXDmb7LSvWE.jpg"),
    uploadImg("journal/ZMX4xonC6WvSRyRzHHgOkTDzw4.jpg"),
    uploadImg("journal/2EIIgE63cU5md9VUpWNs5xhsM.jpg"),
    uploadImg("journal/LsGrGUWDWx4Ok7pTwhp0PXTTA.jpg"),
    uploadImg("journal/TF67zgMSYINSD7dymhKX4rhrTM.jpg"),
  ]);

  const articles = [
    {
      slug: "learning-to-pause-without-guilt",
      eyebrow: "Reflection · No. 01",
      title: "Learning to Pause Without Guilt.",
      excerpt:
        "Taking a break isn't failure, it's part of the process. Here's how to slow down with kindness.",
      image: images[0],
      order: 1,
    },
    {
      slug: "what-makes-therapy-work",
      eyebrow: "Practice · No. 02",
      title: "What Makes Therapy Work?",
      excerpt:
        "Beyond techniques or tools, therapy works best when it feels safe, real, and human.",
      image: images[1],
      order: 2,
    },
    {
      slug: "the-gentle-art-of-slowing-down",
      eyebrow: "Slowing down · No. 03",
      title: "The Gentle Art of Slowing Down",
      excerpt:
        "Slowing down is more than just taking a break, it's a conscious choice to live at a pace that allows space for reflection, connection, and clarity. In a world that celebrates speed, learning to slow down can feel radical, but it's a powerful way to reclaim presence and peace.",
      image: images[2],
      order: 3,
    },
    {
      slug: "finding-strength-in-release",
      eyebrow: "Release · No. 04",
      title: "Finding Strength in Release",
      excerpt:
        "Letting go is one of the hardest, and most transformative, things we do. It asks us to release control, loosen our grip, and trust that something better might come in its place.",
      image: images[3],
      order: 4,
    },
    {
      slug: "listening-to-yourself-again",
      eyebrow: "Self-knowledge · No. 05",
      title: "Listening to Yourself Again.",
      excerpt:
        "In a noisy world full of advice, opinions, and pressure, it's easy to lose touch with your own voice. We start living on autopilot, doing what's expected instead of what feels true.",
      image: images[4],
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

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("SANITY_API_TOKEN env var is required");
  }
  console.log("Seeding /about, /services, /journal page content...");
  console.log("\n[1/4] Building about page...");
  const aboutPage = await buildAboutPage();
  console.log("\n[2/4] Building team members...");
  const teamMembers = await buildTeamMembers();
  console.log("\n[3/4] Building services page...");
  const servicesPage = await buildServicesPage();
  console.log("\n[4/4] Building journal page + articles...");
  const journalPage = await buildJournalPage();
  const journalArticles = await buildJournalArticles();

  const allDocs = [aboutPage, ...teamMembers, servicesPage, journalPage, ...journalArticles];

  console.log(`\nWriting ${allDocs.length} documents (createOrReplace, idempotent)...`);
  const tx = client.transaction();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const doc of allDocs) tx.createOrReplace(doc as any);
  const result = await tx.commit();
  console.log(`Wrote ${result.results.length} documents.`);
  console.log(`Uploaded ${uploadCache.size} unique images.`);
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
