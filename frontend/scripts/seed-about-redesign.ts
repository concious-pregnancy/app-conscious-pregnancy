/* Populate chapters[]/facts[]/pullQuotes[]/outsideClinic[]/bands[] on the
 * about-page singletons with the EXISTING Sanity body/quote text, split at
 * the same sentence boundaries as the Claude Design "Turn 1" exploration.
 * No prose is invented here except the handful of labels the design itself
 * flags as new (5 founder chapter titles, 2 band headlines). Everything
 * else is verbatim from aboutFounder.body / aboutStory.body / aboutIntro.body.
 *
 * Run:  SANITY_API_TOKEN=... npx tsx scripts/seed-about-redesign.ts
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ih14cr70",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const imgRef = (assetId: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: assetId },
});

async function main() {
  await client
    .patch("aboutFounder-singleton")
    .set({
      chapters: [
        {
          _key: "chapter-1",
          _type: "chapter",
          label: "The patient first",
          title: "The patient first",
          body: "How I arrived here begins long before I was a practitioner. As a child, my immune system was often failing, and I sat in many doctor's chairs long before I sat behind one. Being the patient first taught me where conventional care succeeds, and where it leaves people behind. At the end of the day, I practice the way I would have liked to have seen in my own health care.",
        },
        {
          _key: "chapter-2",
          _type: "chapter",
          label: "What I only learned later",
          title: "What I only learned later",
          body: "The deepest part of this story I only learned later in life. I came from a high-stress pregnancy. The repercussions of an elevated nervous system in utero left my immune system weakened as a child, and that is where my whole journey toward this work began.",
        },
        {
          _key: "chapter-3",
          _type: "chapter",
          label: "The training",
          title: "The training",
          body: "I have spent a lifetime navigating what happens when a nervous system is upregulated, and when environmental factors come into play. That experience sent me on a deep dive into what I believed would matter most. I earned a Doctorate and Master's in Traditional Chinese Medicine and Functional Medicine, drawn to TCM as a time-tested blueprint we have been given. And to Functional Medicine for what today's comprehensive labs can help surface that is otherwise overlooked.",
        },
        {
          _key: "chapter-4",
          _type: "chapter",
          label: "Naming the work",
          title: "Naming the work",
          body: "Later in my practice, patients would come back to me wanting to work on their next milestone, often the desire to conceive. I started calling this conscious pregnancy. I had been doing this work long before I knew it was also my own story.",
        },
        {
          _key: "chapter-5",
          _type: "chapter",
          label: "Why this work is mine",
          title: "Why this work is mine",
          body: "I am healing the very thing I came from. I understand firsthand the importance of preparing the body, physically and energetically, before conception, and the cascading effects that can follow when that preparation is missing. My whole life has been made for this work. It is the deepest privilege of my career to walk this path with parents, and help give a child the best possible start in a world and environment where it is most needed.",
        },
      ],
    })
    .commit();
  console.log("aboutFounder-singleton: chapters set (5)");

  await client
    .patch("aboutStory-singleton")
    .set({
      body: [
        "Starting from a science fair-winning child whose immune system was often failing, to propelling full force into a Doctorate and Master's in Traditional Chinese Medicine (T.C.M.) and Functional Medicine. I've led a life in and out of the many sides of the 'health care' system.",
        "I recognize that labs can give us some key informational markers but understanding how to bring the body back to balance is a whole other science in itself. When I got introduced to T.C.M., light bulbs went off and a truth resonated with me that this is a complete diagnostic way of looking at the body. In my opinion, this is the origination of functional medicine, looking at whole systems and addressing the root. It's a time-tested modality that's over 3,000 years old and created its own diagnostic language to have a higher conversation. This is where I built my foundation but also understood that in today's world and environment, comprehensive lab work can give us insight into often overlooked pathologies. When you bring these two systems of healing together you have a comprehensive approach to addressing imbalances in the body.",
        "My path has since expanded to include Somatic Healing Therapy, a natural evolution of everything I believe about the body. Understanding that stress, trauma, and emotional patterns are held physically, not just mentally, has deepened my approach to care in ways I couldn't have anticipated. The body is always speaking. Learning to listen is where the deepest healing begins.",
        "I've been in private practice in Los Angeles for over 10 years, serving patients across Southern California, the Bay Area, and through my telemedicine practice, clients around the world.",
        "I practice what I 'preach' by enjoying the amazing farmer's markets locally; cooking magical, nourishing meals, beach walks with my dog Presley (everyone's clinic friend), Dharma yoga, Qi Gong, skiing, hiking trips with my 1986 VW Westfalia van (stick shift!), reading health and energetics literature, teaching classes on ways to a conscious pregnancy, collecting vinyl, a weakness for thrifting, supporting the arts and music scene, tuning forks, saunaing, laughing with friends and family while we all support each other getting through this journey called life.",
      ].join("\n"),
      highlightedBody:
        "This path of healing has brought me so much in understanding the dynamics of each person's unique makeup, which I will always be grateful for. There is no blanket approach; emotions and energetics have a role; healing is more than just a meal plan change, but a lifestyle change that you want to pursue living.",
      facts: [
        {
          _key: "fact-1",
          _type: "fact",
          value: "10+",
          label: "Years in private practice, Los Angeles",
        },
        {
          _key: "fact-2",
          _type: "fact",
          value: "3,000",
          label: "Years of T.C.M. diagnostic language",
        },
        {
          _key: "fact-3",
          _type: "fact",
          value: "DACM, L.Ac.",
          label: "Doctorate + Master's, T.C.M. and Functional Medicine",
        },
      ],
      pullQuotes: [
        {
          _key: "pq-1",
          _type: "pullQuote",
          quote:
            "The body is always speaking. Learning to listen is where the deepest healing begins.",
          attribution: "",
        },
      ],
      outsideClinic: [
        "Farmer's markets, and cooking from them",
        "Beach walks with Presley, the clinic dog",
        "Dharma yoga, Qi Gong, tuning forks, sauna",
        "A 1986 VW Westfalia. Stick shift.",
        "Vinyl, thrifting, the LA music scene",
      ],
    })
    .commit();
  console.log("aboutStory-singleton: facts (3), pullQuotes (1), outsideClinic (5) set");

  await client
    .patch("aboutIntro-singleton")
    .set({
      bands: [
        {
          _key: "band-1",
          _type: "band",
          eyebrow: "The Way We Help",
          title: "I start by listening, really listening.",
          body: "Most prenatal care runs on fifteen minutes and a population-level checklist. I work differently. I want the time to truly know you, your biology and your history both, so I can help you prepare for one of the biggest milestones of your life.",
          image: imgRef("image-595b6409437a95f3e3fe99ccb78ebb3042edebb0-6192x4128-jpg"),
          surface: "navy",
        },
        {
          _key: "band-2",
          _type: "band",
          eyebrow: "The Way We Help",
          title: "No generic protocol, no national average.",
          body: "You are not an algorithm, and you are not a national average, so I won't hand you a generic protocol. I listen first, then I look closely. I support your body in two ways at once: nutritionally, through functional labs read against pregnancy-specific ranges, and energetically, through acupuncture and somatic therapy that steady the nervous system and restore where your energy is stuck.",
          image: imgRef("image-b0ad741e65bb8adfaa16fcc7596a9541299d5523-3173x4154-jpg"),
          surface: "cream",
        },
        {
          _key: "band-3",
          _type: "band",
          eyebrow: "The Way We Help",
          title: "Science and energetics, working as one.",
          body: "From preconception through every trimester. From there, we build a plan that fits your real life and moves at your pace.",
          highlightedBody:
            "The palace is the baby's first home. My work is to help you prepare it, on purpose and well before anyone moves in.",
          image: imgRef("image-465b077ce35ded20c9806921b5a07bb412892043-427x640-jpg"),
          surface: "navy",
        },
      ],
    })
    .commit();
  console.log("aboutIntro-singleton: bands set (3)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
