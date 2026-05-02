import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ih14cr70",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const faqs = [
  {
    _type: "faq",
    question: "When should we start preconception preparation?",
    answer:
      "Ideally 3 to 6 months before you plan to conceive. Sperm take about 74 days to fully mature, and egg quality reflects the environment it develops in over the preceding months. Starting earlier means more time to address anything the labs reveal.",
    order: 1,
  },
  {
    _type: "faq",
    question: "Is this program for both partners?",
    answer:
      "Yes. Paternal factors account for roughly 50% of fertility challenges, and sperm quality is directly shaped by nutrition, stress, sleep, and toxin exposure. Both partners preparing together produces meaningfully better outcomes than one partner going it alone.",
    order: 2,
  },
  {
    _type: "faq",
    question: "What does the functional lab work include?",
    answer:
      "Comprehensive hormone panels using pregnancy-specific reference ranges, micronutrient status, thyroid function, gut health markers, immune function, toxin burden, and relevant genetic markers including MTHFR. We look at the full picture, not just fertility hormones.",
    order: 3,
  },
  {
    _type: "faq",
    question: "Do I need to have a fertility diagnosis to work with you?",
    answer:
      "No. Most of our clients are healthy people who want to optimize before trying. You do not need a diagnosis to benefit from understanding your biology and preparing intentionally.",
    order: 4,
  },
  {
    _type: "faq",
    question: "How does acupuncture fit into preconception care?",
    answer:
      "TCM has mapped the body's energetic patterns for thousands of years. In preconception care, acupuncture supports hormonal regulation, uterine blood flow, stress response, and the energetic qualities that TCM associates with a receptive environment for conception.",
    order: 5,
  },
  {
    _type: "faq",
    question: "What is psychedelic integration and who is it for?",
    answer:
      "Psychedelic integration supports people in processing insights from prior psychedelic experiences, particularly around deep emotional or ancestral patterns. We offer this for preconception and postpartum work only, and it is one option within a broader program, not a requirement.",
    order: 6,
  },
];

const pricingTiers = [
  {
    _type: "pricingTier",
    name: "Hers",
    description: "Explore therapy at your own pace.",
    price: "$49",
    unit: "/ month",
    featured: false,
    features: [
      "Dedicated therapist",
      "Online or in-person",
      "Personalized goal-setting",
      "Client portal access",
    ],
    order: 1,
  },
  {
    _type: "pricingTier",
    name: "His",
    description: "Ongoing support for continued growth.",
    price: "$89",
    unit: "/ month",
    featured: true,
    features: [
      "Everything in Starter",
      "More flexible scheduling",
      "Progress tracking",
      "Extra resources",
    ],
    order: 2,
  },
  {
    _type: "pricingTier",
    name: "Theirs",
    description: "Consistent support with full access.",
    price: "$229",
    unit: "/ month",
    featured: false,
    features: [
      "All Growth features",
      "Extended sessions",
      "Priority booking",
      "Direct therapist messaging",
    ],
    order: 3,
  },
];

const services = [
  {
    _type: "service",
    title: "Functional Medicine",
    titleLine2: "+ Western Labs",
    body: "Comprehensive functional lab work: hormones at pregnancy-specific reference ranges, micronutrient status, toxin burden, immune function, gut health, and genetic markers.",
    imagePath: "/hero/hero-water.jpeg",
    trigram: "☵",
    order: 1,
  },
  {
    _type: "service",
    title: "Traditional Chinese Medicine",
    titleLine2: "+ Acupuncture",
    body: "TCM has mapped the body's energetic landscape for thousands of years. We use this wisdom to identify where energy is blocked, depleted, or out of balance.",
    imagePath: "/hero/hero-flame.jpeg",
    trigram: "☰",
    order: 2,
  },
  {
    _type: "service",
    title: "Somatic Healing Therapy",
    body: "The body holds memory. Stress, trauma, and unprocessed emotion live in the tissues, and they can shape the environment your baby develops in.",
    imagePath: "/hero/hero-eye.jpeg",
    trigram: "☷",
    order: 3,
  },
  {
    _type: "service",
    title: "Pre-Conception Healing & Integration",
    body: "For those ready to go deeper, this work offers a pathway to profound clearing of patterns, beliefs, and emotional or ancestral material before you conceive.",
    imagePath: "/hero/hero-leaves.jpeg",
    trigram: "☲",
    order: 4,
  },
];

const serviceExtras = [
  {
    _type: "serviceExtra",
    trigram: "☶",
    title: "Comprehensive Lab Work",
    body: "Advanced panels that go beyond standard bloodwork: methylation, full thyroid, toxin burden, and reproductive hormones for both partners.",
    order: 1,
  },
  {
    _type: "serviceExtra",
    trigram: "☴",
    title: "Nutritional Biochemistry",
    body: "A personalized nutrition plan built around your labs and physiology, not a one-size protocol. From preconception through postpartum.",
    order: 2,
  },
  {
    _type: "serviceExtra",
    trigram: "☱",
    title: "Medical-Grade Supplementation",
    body: "Evidence-backed protocols, third-party tested, specific to your biology. You will understand why every piece is in your plan.",
    order: 3,
  },
  {
    _type: "serviceExtra",
    trigram: "☳",
    title: "Functional Lifestyle Strategies",
    body: "Sleep, toxic load reduction, movement, and circadian rhythm — the daily rhythms that make everything else in your care plan more effective.",
    order: 4,
  },
  {
    _type: "serviceExtra",
    trigram: "☷",
    title: "Community Resources",
    body: "Your full care ecosystem, built with intention: midwives, doulas, lactation, pelvic floor PT, and pediatric referrals aligned with your values.",
    order: 5,
  },
];

const journalArticles = [
  {
    _type: "journalArticle",
    title: "Methylfolate vs. Folic Acid: Why the Difference Matters.",
    excerpt:
      "Up to 60% of people carry an MTHFR variant that limits their ability to convert synthetic folic acid into the active form the body can use. Here is what to take instead and why.",
    order: 1,
  },
  {
    _type: "journalArticle",
    title: "Your Microbiome Shapes Your Baby's Immune System.",
    excerpt:
      "The bacteria colonizing your gut and birth canal are the first organisms your baby encounters. What the research shows about maternal microbiome and infant health outcomes.",
    order: 2,
  },
  {
    _type: "journalArticle",
    title: "The 90-Day Window: Why Preconception Prep Starts Now.",
    excerpt:
      "Sperm take 74 days to mature. Egg quality is influenced by the environment it develops in months before ovulation. The foundation of your child's health is built before the pregnancy test.",
    order: 3,
  },
];

const testimonial = {
  _type: "testimonial",
  eyebrow: "Real Stories.",
  heading: "She came in thinking her hormones were fine.",
  body: "Standard bloodwork had flagged nothing. A full functional panel told a different story. Subclinical hypothyroidism, low vitamin D, an MTHFR variant she had never heard of. Three months later her numbers and her energy had both shifted.",
  ctaLabel: "Read the full story",
};

async function seed() {
  console.log("Seeding Sanity...");

  const allDocs = [
    ...faqs,
    ...pricingTiers,
    ...services,
    ...serviceExtras,
    ...journalArticles,
    testimonial,
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mutations = allDocs.map((doc) => ({ create: doc as any }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await client.mutate(mutations) as any;
  console.log(`Created ${result.results.length} documents.`);
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
