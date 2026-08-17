/* Seeds the 9 real Conscious Pregnancy services for the redesigned
 * /services page: patches the 4 existing `service` docs with panel +
 * detail-page fields, creates 5 new `service` docs for the promoted
 * serviceExtra topics, retires the 8 orphaned Stats/Pricing/Story/FAQ/
 * Block docs, and gives the servicesHero/servicesCta singletons real
 * copy. Standalone script (mirrors seed-about-redesign.ts) so it never
 * touches the shared seed-pages.ts content builders.
 *
 * Run:  SANITY_API_TOKEN=... npx tsx scripts/seed-services-redesign.ts
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

const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

type ImgRef = { _type: "image"; asset: { _type: "reference"; _ref: string } };
const uploadCache = new Map<string, ImgRef>();

async function uploadImg(rel: string): Promise<ImgRef> {
  if (uploadCache.has(rel)) return uploadCache.get(rel)!;
  const filePath = path.join(PUBLIC_DIR, rel);
  if (!fs.existsSync(filePath)) throw new Error(`Image not found: ${filePath}`);
  const stream = fs.createReadStream(filePath);
  const filename = path.basename(filePath);
  const asset = await client.assets.upload("image", stream, { filename });
  const ref: ImgRef = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  uploadCache.set(rel, ref);
  console.log(`  uploaded ${rel} -> ${asset._id}`);
  return ref;
}

type Block = {
  _type: "block";
  _key: string;
  style: "normal";
  children: Array<{ _type: "span"; _key: string; text: string }>;
};

function pt(id: string, paragraphs: string[]): Block[] {
  return paragraphs.map((text, i) => ({
    _type: "block" as const,
    _key: `${id}-b${i}`,
    style: "normal" as const,
    children: [{ _type: "span" as const, _key: `${id}-b${i}-s0`, text }],
  }));
}

const TELEHEALTH_LINE = "Available for patients in Los Angeles, the Bay Area, and via telehealth.";

/* ── The 4 existing `service` docs, patched in place ─────────────── */
const existingPatches = [
  {
    id: "GJusG3cF3viLZ1vVgTnQEp",
    slug: "functional-eastern-medicine",
    eyebrow: "Service · 01",
    order: 1,
    lead: "Root-cause diagnostics meet the body's constitution and energetics.",
    body: "Root-cause methodology meets diagnostic depth. Functional Medicine surfaces what standard panels miss (thyroid patterns, MTHFR variants, nutrient gaps) while Eastern Medicine reads the body's constitution and energetics. Together, both partners arrive at conception as the healthiest versions of themselves.",
    points: [
      "Advanced labs beyond standard prenatal panels",
      "Prepping the Palace: cultivating the womb environment before conception",
      "Kidney system support and Blood nourishment, TCM's reproductive foundation",
      "Care for both partners, in Los Angeles, the Bay Area, and via telehealth",
    ],
    detailBody: pt("svc-1", [
      "Functional Medicine and Eastern Medicine ask a similar question from two different traditions: what is actually happening underneath the symptom. Functional Medicine looks at root-cause physiology through advanced labs, methylation status, thyroid function beyond the standard TSH-only screen, reproductive hormones, and nutrient sufficiency. Eastern Medicine reads the body through its own framework, the state of Kidney essence, Blood, and Qi, the constitutional pattern that shapes fertility and pregnancy resilience.",
      "In practice, this means a fertility or pre-conception plan built from both lenses at once. A lab result that looks 'normal' on a standard panel might still reflect a pattern of depletion that Eastern Medicine has language for and treatment protocols to address. Acupuncture, herbal formulas, and targeted nutrient repletion work together rather than in separate silos.",
      "This is the foundation of Prepping the Palace, the idea that before a new life takes up residence, you prepare the home for it. That preparation is physical and energetic, and it involves both partners, not just the one who will carry the pregnancy.",
      TELEHEALTH_LINE,
    ]),
  },
  {
    id: "GJusG3cF3viLZ1vVgTnQIv",
    title: "Acupuncture",
    titleLine2: "",
    slug: "acupuncture",
    eyebrow: "Service · 02",
    order: 2,
    lead: "Three thousand years of clinical use, with measurable effects on reproductive hormones.",
    body: "Three thousand years of clinical use, now with measurable effects on reproductive hormones, ovarian response, and sperm parameters. Acupuncture regulates the hormonal axis before conception and supports the whole-body pattern beneath any presenting symptom, not just the symptom itself.",
    points: [
      "Regulates cycles and supports sperm motility and morphology",
      "Reduces first-trimester nausea and pelvic girdle pain",
      "Supports cervical ripening and fetal positioning in late pregnancy",
      "Woven into every in-person session, in LA and the Bay Area",
    ],
    detailBody: pt("svc-2", [
      "Acupuncture is one of the oldest continuously practiced medical systems in the world, and modern research has started to describe mechanisms for effects clinicians have observed for centuries: regulation of the hypothalamic-pituitary-ovarian axis, improved blood flow to the uterine lining, and measurable changes in stress hormone levels that influence conception.",
      "Through pregnancy, acupuncture point protocols shift with each trimester. Early on, the focus is often nausea, fatigue, and threatened miscarriage support. In the second and third trimesters, it turns to pelvic girdle pain, sleep, and positioning work, including moxibustion for breech presentation. Near term, acupuncture is commonly used to support cervical ripening and labor readiness.",
      "For partners contributing sperm to conception, acupuncture has shown benefit for motility and morphology over a full spermatogenesis cycle, roughly three months, which is why treatment often starts well before a conception timeline begins.",
      TELEHEALTH_LINE,
    ]),
  },
  {
    id: "GJusG3cF3viLZ1vVgTnQN1",
    slug: "somatic-healing-therapy",
    eyebrow: "Service · 03",
    order: 3,
    lead: "The nervous system you bring into pregnancy is the one your baby develops inside.",
    body: "The nervous system you bring into pregnancy is the one your baby develops inside. Stress hormones cross the placenta, so this body-centered work processes what talk therapy alone can't reach and builds a regulated baseline you can actually draw on at birth.",
    points: [
      "Acupuncture point holding to support nervous system downregulation",
      "Guided Qi Gong breath practices for both partners",
      "Processes stored stress and unresolved emotional patterns",
      "For fathers too: your regulation shapes her sense of safety",
    ],
    detailBody: pt("svc-3", [
      "Cortisol and adrenaline cross the placenta and shape fetal brain development. That single fact reframes nervous system regulation from a nice-to-have into core prenatal care. Somatic Healing Therapy works with the body directly, through acupuncture point holding, breathwork, and guided Qi Gong, to process stress and stored emotional patterns that talk therapy alone often can't reach.",
      "Many patients arrive carrying more than pregnancy-specific anxiety: grief, past medical trauma, family patterns around parenthood. Somatic work doesn't require narrating every detail of that history to be effective. The nervous system holds patterns in the body, and working with the body directly can shift them.",
      "This work includes both partners. A father or co-parent's own regulation shapes the felt sense of safety in the household, for the pregnant partner and eventually for the baby. Sessions are offered individually or as a couple.",
      TELEHEALTH_LINE,
    ]),
  },
  {
    id: "GJusG3cF3viLZ1vVgTnQR7",
    slug: "pre-conception-healing-and-integration",
    eyebrow: "Service · 04",
    order: 4,
    lead: "Becoming a parent is one of the most profound identity shifts a person goes through.",
    body: "Becoming a parent is one of the most profound identity shifts a person goes through. This work draws from functional medicine, somatic therapy, and acupuncture to clear what you're carrying and strengthen the foundation you're building from, before conception begins.",
    points: [
      "Addresses grief, relational wounds, and inherited family patterns",
      "Preparation and integration support for psychedelic-assisted therapy, where appropriate",
      "Available to both partners, not appropriate during pregnancy itself",
      "In Los Angeles, the Bay Area, and via telehealth",
    ],
    detailBody: pt("svc-4", [
      "Pre-Conception Healing and Integration draws on functional medicine, somatic therapy, and acupuncture together, aimed specifically at what a person carries into parenthood: grief, relational wounds, inherited family patterns, unresolved trauma. This work happens before conception, not during pregnancy, and is offered to both partners.",
      "For some patients, this includes preparation and integration support around psychedelic-assisted therapy pursued through a licensed provider elsewhere. That support means helping set intention beforehand and make sense of the experience afterward, within the context of a pre-conception healing plan. This is preparation and integration work, not administration of any substance, and is not appropriate once pregnancy has begun.",
      "The goal isn't perfection before parenthood. It's arriving with more clarity about what's yours to carry forward and what you're ready to set down.",
      TELEHEALTH_LINE,
    ]),
  },
];

/* ── The 5 promoted `serviceExtra` topics, created as new `service` docs ── */
const newServices = [
  {
    id: "service-comprehensive-lab-work",
    title: "Comprehensive",
    titleLine2: "Lab Work",
    slug: "comprehensive-lab-work",
    eyebrow: "Service · 05",
    order: 5,
    trigram: "☶",
    imgFile: "hero/hero-eye.jpeg",
    imageAlt: "Close, quiet portrait, representing careful diagnostic attention",
    lead: "Standard prenatal bloodwork screens for risk, not for whether your body is resourced for what's ahead.",
    body: "Standard prenatal bloodwork screens for risk, not for whether your body is well-resourced for what's ahead. These labs go further: methylation markers, a full thyroid panel, reproductive hormones for both partners, and everyday toxin exposures most people never think to test for.",
    points: [
      "Full thyroid panel, tuned to pregnancy's narrower reference ranges",
      "Methylation and often-overlooked nutrient factors",
      "Reproductive hormones tested for both partners",
      "Environmental toxin panel: plastics, pesticides, mold, heavy metals",
    ],
    detailBody: pt("svc-5", [
      "A standard prenatal panel is built to screen for a narrow list of risks, not to describe how well-resourced your body actually is. Comprehensive Lab Work goes further: a full thyroid panel read against pregnancy's tighter reference ranges (subclinical hypothyroidism is commonly missed when standard ranges are used), methylation markers including MTHFR status, and nutrient levels that standard panels routinely skip.",
      "Reproductive hormones are tested for both partners, not just the one carrying the pregnancy. Environmental exposure testing covers the everyday sources people rarely think to check: plastics, pesticide residue, mold, and heavy metals like mercury and lead.",
      "The point isn't to generate anxiety about numbers. It's to build a plan grounded in what your body is actually telling you, addressed with food, targeted supplementation, and lifestyle changes, not fear.",
      TELEHEALTH_LINE,
    ]),
  },
  {
    id: "service-nutritional-biochemistry",
    title: "Nutritional",
    titleLine2: "Biochemistry",
    slug: "nutritional-biochemistry",
    eyebrow: "Service · 06",
    order: 6,
    trigram: "☴",
    imgFile: "journal/wildflowers.jpg",
    imageAlt: "Natural greenery, representing whole-food nourishment",
    lead: "Real food first, built around your labs and physiology, not a one-size template.",
    body: "Real food first, built around your labs and physiology, not a one-size template. Choline, methylfolate, and sufficient DHA are often missing from standard prenatals. Paternal nutrition matters here too: sperm DNA integrity responds to what happens in the months before conception.",
    points: [
      "Personalized plan from preconception through postpartum",
      "Choline and methylfolate dosed for your methylation status",
      "Blood sugar support tuned to your physiology",
      "Paternal nutrition, three to four months before conception",
    ],
    detailBody: pt("svc-6", [
      "Nutritional Biochemistry starts with real food and builds from there, using your labs and physiology rather than a generic prenatal template. Most standard prenatal vitamins underdose choline, needed for fetal neural tube and brain development, and use synthetic folic acid rather than methylfolate, which matters for anyone with reduced MTHFR enzyme function.",
      "Blood sugar regulation is part of this picture too: a lower-glycemic, adequate-protein approach supports gestational diabetes prevention and is relevant well past pregnancy for both partners' long-term metabolic health.",
      "Paternal nutrition is often overlooked entirely. Sperm undergo a roughly three-month development cycle, and nutrient status, particularly zinc, selenium, and antioxidants, during that window measurably affects sperm DNA integrity. A preconception nutrition plan for fathers is built on that same three-to-four-month timeline.",
      TELEHEALTH_LINE,
    ]),
  },
  {
    id: "service-medical-grade-supplementation",
    title: "Medical-Grade",
    titleLine2: "Supplementation",
    slug: "medical-grade-supplementation",
    eyebrow: "Service · 07",
    order: 7,
    trigram: "☱",
    imgFile: "hero/hero-golden.jpg",
    imageAlt: "Warm golden light, representing careful, considered protocol design",
    lead: "The prenatal supplement aisle is enormous and largely unregulated.",
    body: "The prenatal supplement aisle is enormous and largely unregulated. This work identifies the precise combination that makes a real difference, third-party tested, in forms your body can actually absorb, so you understand why each piece is in your protocol.",
    points: [
      "Right prenatal foundation plus targeted additions from your labs",
      "Vitamin D with K2, magnesium glycinate, methylfolate at your dose",
      "Preconception protocol for fathers, a full sperm cycle out",
      "You'll understand why, so you can adjust as your needs change",
    ],
    detailBody: pt("svc-7", [
      "The supplement industry is largely unregulated, and the prenatal aisle is one of its most crowded corners. Medical-Grade Supplementation means third-party-tested products, dosed against your actual labs rather than a generic label, in forms your body can absorb (methylfolate rather than folic acid, magnesium glycinate rather than magnesium oxide, vitamin D paired with K2).",
      "A protocol usually starts with a strong prenatal foundation and adds targeted pieces based on what your labs show: iron if levels run low, iodine and selenium if thyroid markers call for it, additional omega-3s if DHA intake is inadequate.",
      "Fathers get their own preconception protocol too, built around the sperm development cycle, typically antioxidants, zinc, and CoQ10 over a three-month window before conception. Every recommendation comes with an explanation of the mechanism, so the plan makes sense and can adjust as your needs change through pregnancy and postpartum.",
      TELEHEALTH_LINE,
    ]),
  },
  {
    id: "service-functional-lifestyle-strategies",
    title: "Functional Lifestyle",
    titleLine2: "Strategies",
    slug: "functional-lifestyle-strategies",
    eyebrow: "Service · 08",
    order: 8,
    trigram: "☳",
    imgFile: "hero/hero-kimono.jpeg",
    imageAlt: "Slow, embodied movement, representing daily lifestyle practice",
    lead: "Sleep, daily toxin exposure, movement, and stress recovery are in constant conversation with your body.",
    body: "Sleep, daily toxin exposure, movement, and stress recovery are in constant conversation with your body. This isn't about anxiety over every exposure. It's about a personalized, sustainable strategy that makes everything else in your care plan more effective.",
    points: [
      "Realistic toxic load reduction, plastics, fragrance, personal care products",
      "Movement matched to your trimester and physiology",
      "Sleep quality and circadian rhythm support",
      "For partners too: heat, alcohol, and daily habits affect sperm quality",
    ],
    detailBody: pt("svc-8", [
      "Functional Lifestyle Strategies covers the daily inputs that compound over a pregnancy: sleep quality, toxic load, movement, and stress recovery. None of this is about eliminating every possible exposure. It's about a handful of realistic, sustainable swaps, in plastics, fragrance, and personal care products, that meaningfully reduce endocrine disruptor exposure without adding anxiety to your day.",
      "Movement recommendations shift by trimester and by your own physiology and history, drawing on pelvic floor awareness and preparation for physiological birth alongside general strength and mobility. Sleep hygiene and circadian rhythm support are treated as core care, not an afterthought, given how directly they affect stress hormone regulation.",
      "Partners are part of this too. Scrotal heat exposure, alcohol intake, and general lifestyle habits measurably affect sperm quality over the same three-month development window that nutrition and supplementation protocols target.",
      TELEHEALTH_LINE,
    ]),
  },
  {
    id: "service-community-resources",
    title: "Community",
    titleLine2: "Resources",
    slug: "community-resources",
    eyebrow: "Service · 09",
    order: 9,
    trigram: "☷",
    imgFile: "journal/hand.jpg",
    imageAlt: "Hands in gentle connection, representing a trusted care network",
    lead: "Birth and early parenthood happen within a community.",
    body: "Birth and early parenthood happen within a community. Finding a midwife, doula, lactation consultant, or pelvic floor therapist who genuinely fits your values isn't always straightforward. Your care team is an extension of your care, built with the same intention.",
    points: [
      "Midwives and OBs who integrate functional medicine approaches",
      "Birth and postpartum doulas, lactation consultants",
      "Pelvic floor physical therapists and perinatal mental health providers",
      "Infant sleep consultants and bodywork practitioners",
    ],
    detailBody: pt("svc-9", [
      "No single practitioner covers everything a pregnancy and postpartum period calls for. Community Resources is a curated referral network, built over a decade of practice, of providers who share the same underlying philosophy: bio-individuality, informed decision-making, and integration rather than antagonism toward conventional care.",
      "That network includes midwives and OBs who integrate functional medicine thinking into a hospital, birth center, or home birth practice, birth and postpartum doulas, and lactation consultants for the early weeks of feeding.",
      "It also extends past birth itself: pelvic floor physical therapists for recovery, perinatal mental health providers for support with mood and anxiety disorders, infant sleep consultants, and bodywork practitioners for both parent and baby. Recommendations are personalized to your location and your specific needs, not a generic list.",
      TELEHEALTH_LINE,
    ]),
  },
];

const orphanedIds = [
  "servicesBlock-mindfulness",
  "servicesBlock-individual-therapy",
  "servicesBlock-clarity-consult",
  "servicesBlock-life-coaching",
  "servicesStats-singleton",
  "servicesPricing-singleton",
  "servicesStory-singleton",
  "servicesFaq-singleton",
];

async function main() {
  console.log("Patching 4 existing service docs...");
  for (const svc of existingPatches) {
    const { id, ...fields } = svc;
    await client
      .patch(id)
      .set({ ...fields, slug: { _type: "slug", current: svc.slug } })
      .commit();
    console.log(`  patched ${id} (${svc.slug})`);
  }

  console.log("Creating 5 new service docs...");
  for (const svc of newServices) {
    const image = await uploadImg(svc.imgFile);
    const { id, imgFile, slug, ...fields } = svc;
    await client.createOrReplace({
      _type: "service",
      _id: id,
      ...fields,
      slug: { _type: "slug", current: slug },
      image,
    });
    console.log(`  created ${id} (${slug})`);
  }

  console.log("Updating servicesHero / servicesCta singletons...");
  await client
    .patch("servicesHero-singleton")
    .set({
      eyebrow: "Services",
      titleLine1: "Prepping the",
      titleEm: "Palace.",
      lead: "Functional and Eastern medicine, somatic healing, and nutritional biochemistry, working together to prepare both partners for conception, pregnancy, and birth.",
    })
    .commit();
  await client
    .patch("servicesCta-singleton")
    .set({
      eyebrow: "Begin Your Journey",
      title: "Ready to prepare",
      titleEm: "the palace?",
      body: "Discovery calls are free, hour-long, and unhurried. We talk about where you are, what you've tried, and whether this is the right fit before anything is booked.",
      ctaLabel: "Book a discovery call",
    })
    .commit();

  console.log("Deleting orphaned Services Stats/Pricing/Story/FAQ/Block docs...");
  for (const id of orphanedIds) {
    try {
      await client.delete(id);
      console.log(`  deleted ${id}`);
    } catch {
      console.log(`  skip ${id} (already gone)`);
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
