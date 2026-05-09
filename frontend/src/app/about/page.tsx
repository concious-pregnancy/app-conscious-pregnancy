import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlobImage from "@/components/BlobImage";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { aboutPageQuery, teamMembersQuery } from "@/lib/sanity/queries";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Find out who we are, what we stand for, and how we can support your journey.",
};

const IMG = "/clearpath-ref/about";
const LEAF = `${IMG}/9O8sLldl6mV9miUVjkyrhGJsZ7c.svg`;

/* Hardcoded fallbacks. The page renders with these unconditionally;
   any field present on the Sanity aboutPage doc replaces its fallback. */
const defaults = {
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
  founderImage: `${IMG}/1OD7wXOtYnqOi7RvvRqTnSC8o.jpg`,
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
  pebblesImage: `${IMG}/RQK6FjdwGi88lXjfiA3iUnV5rvc.jpg`,

  storyEyebrow: "Real people. Real change.",
  storyTitle: "Finding each other",
  storyTitleEm: "again.",
  storyBody:
    "When Daniel and Marisa first came in, they weren't on the verge of breaking up, but they felt more like roommates than partners. They missed the warmth they used to share, but neither knew how to bridge the distance.",
  storyCtaLabel: "Read full story",
  storyImageBack: `${IMG}/0tyXlpa0soVzPMq44gbKMcP680.jpg`,
  storyImageFront: `${IMG}/wQLwxTlAvuy2tWEdKj8oaawUp0s.jpg`,

  faqEyebrow: "FAQ",
  faqTitle: "Your questions.",
  faqTitleEm: "Answered.",
  faqSub: "Not sure what to expect? These answers might help you feel more confident as you begin.",
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

const defaultTeam = [
  {
    name: "Sofia Bennett",
    role: "Therapist",
    image: `${IMG}/qJCSWUUsykM3SrhtCmbKjBq9Q78.jpg`,
    bio: "Relationship therapist supporting couples and individuals through communication, trust-building, and conflict resolution.",
  },
  {
    name: "Marcus Lee",
    role: "Therapist",
    image: `${IMG}/7eKCHVMVJdWT3yvzEza9J81fWk.jpg`,
    bio: "Wellness coach focused on creating sustainable lifestyle changes for better physical and mental health.",
  },
  {
    name: "Leila Moreno",
    role: "Therapist",
    image: `${IMG}/TF67zgMSYINSD7dymhKX4rhrTM.jpg`,
    bio: "Mindfulness specialist guiding people to slow down, manage stress, and find clarity in daily life.",
  },
];

type SanityImage = { asset?: { _ref?: string } } | null | undefined;

function imgUrl(image: SanityImage, fallback: string): string {
  return image?.asset?._ref ? urlFor(image).width(1600).url() : fallback;
}

function LeafMark({ size = 24 }: { size?: number }) {
  return (
    <img
      src={LEAF}
      alt=""
      className={s.leafMark}
      style={{ width: size, height: "auto" }}
      aria-hidden="true"
    />
  );
}

export default async function AboutPage() {
  const fetchOpts = { cache: "no-store" } as const;
  const [content, sanityTeam] = await Promise.all([
    client.fetch(aboutPageQuery, {}, fetchOpts),
    client.fetch(teamMembersQuery, {}, fetchOpts),
  ]);
  const c = content ?? {};
  const team =
    sanityTeam && sanityTeam.length > 0
      ? sanityTeam.map(
          (m: { name?: string; role?: string; bio?: string; image?: SanityImage }) => ({
            name: m.name ?? "",
            role: m.role ?? "Therapist",
            bio: m.bio ?? "",
            image: imgUrl(m.image, `${IMG}/qJCSWUUsykM3SrhtCmbKjBq9Q78.jpg`),
          }),
        )
      : defaultTeam;
  const faqs = c.faqs && c.faqs.length > 0 ? c.faqs : defaults.faqs;
  const founderBody =
    c.founderBody && c.founderBody.length > 0 ? c.founderBody : defaults.founderBody;
  const pebblesImage = imgUrl(c.pebblesImage, defaults.pebblesImage);

  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        {/* Hero — title left, small lead top-right, eyebrow bottom-left */}
        <section className={s.hero}>
          <div className={s.heroWisp} aria-hidden="true">
            <svg
              viewBox="0 0 1516 443"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M0 441V0H1514V441C1514 441 1214.5 229 757 229C299.5 229 0 441 0 441Z" />
            </svg>
          </div>
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              <h1 className={s.heroTitle}>
                {c.heroTitleLine1 ?? defaults.heroTitleLine1}{" "}
                <em>{c.heroTitleEm ?? defaults.heroTitleEm}</em>
              </h1>
              <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>
                {c.heroEyebrow ?? defaults.heroEyebrow}
              </span>
            </div>
            <p className={s.heroLead}>{c.heroLead ?? defaults.heroLead}</p>
          </div>
        </section>

        {/* Intro */}
        <section className={`${s.section} ${s.sectionPaper}`}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
                <LeafMark />
                <span className="t-label t-label-eyebrow">
                  {c.introEyebrow ?? defaults.introEyebrow}
                </span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  {c.introTitle ?? defaults.introTitle}{" "}
                  <em>{c.introTitleEm ?? defaults.introTitleEm}</em> really listening.
                </h2>
              </div>
              <p className={s.twoColBody}>{c.introBody ?? defaults.introBody}</p>
            </div>
          </div>
        </section>

        {/* Founder intro — text only */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <LeafMark />
            <span className="t-label t-label-eyebrow">
              {c.founderEyebrow ?? defaults.founderEyebrow}
            </span>
            <h2 className={s.twoColTitle} style={{ marginTop: "1rem", maxWidth: "16ch" }}>
              {c.founderTitle ?? defaults.founderTitle}{" "}
              <em>{c.founderTitleEm ?? defaults.founderTitleEm}</em>
            </h2>
            <div className={s.twoColBody} style={{ marginTop: "var(--s-8)", maxWidth: "60ch" }}>
              {founderBody.map((p: string, i: number) => (
                <p key={i} style={i > 0 ? { marginTop: "1rem" } : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Founder full-bleed portrait + quote callout */}
        <section className={s.fullBleedSplit}>
          <img
            src={imgUrl(c.founderImage, defaults.founderImage)}
            alt="Anna Keller"
            className={s.fullBleedSplitImg}
          />
          <div className={s.fullBleedSplitContent}>
            <blockquote className="t-quote" style={{ maxWidth: "22ch" }}>
              {c.founderQuote ?? defaults.founderQuote}
            </blockquote>
            <p className="t-label" style={{ marginTop: "var(--s-3)", color: "var(--muted)" }}>
              {c.founderQuoteAttribution ?? defaults.founderQuoteAttribution}
            </p>
          </div>
        </section>

        {/* Team — blob-masked portraits, 3-up */}
        <section className={`${s.section} ${s.sectionOffWhite}`}>
          <div className={s.sectionInner}>
            <div style={{ marginBottom: "var(--s-12)", textAlign: "center" }}>
              <LeafMark />
              <span className="t-label t-label-eyebrow">
                {c.teamEyebrow ?? defaults.teamEyebrow}
              </span>
              <h2 className={s.twoColTitle} style={{ marginTop: "1rem", marginInline: "auto" }}>
                {c.teamTitle ?? defaults.teamTitle} <em>{c.teamTitleEm ?? defaults.teamTitleEm}</em>
              </h2>
              <p className={s.twoColBody} style={{ marginTop: "1.5rem", marginInline: "auto" }}>
                {c.teamSub ?? defaults.teamSub}
              </p>
            </div>
            <div className={`${s.articleGrid} ${s.articleGrid3}`}>
              {team.map(
                (member: { name: string; role: string; bio: string; image: string }, i: number) => (
                  <article key={member.name} className={s.articleItem}>
                    <BlobImage src={member.image} alt={`${member.name} portrait`} index={i} />
                    <span className="t-label" style={{ marginTop: "var(--s-3)" }}>
                      {member.role}
                    </span>
                    <h3 className={s.articleTitle}>{member.name}</h3>
                    <p className={s.articleExcerpt}>{member.bio}</p>
                  </article>
                ),
              )}
            </div>
            <div className={s.waveDivider} aria-hidden="true">
              <LeafMark size={20} />
              <LeafMark size={20} />
              <LeafMark size={20} />
            </div>
          </div>
        </section>

        {/* Approach summary */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <h2 className={s.twoColTitle}>
                {c.approachTitle ?? defaults.approachTitle}{" "}
                <em>{c.approachTitleEm ?? defaults.approachTitleEm}</em> guided by clarity, and
                built for lasting change.
              </h2>
              <p className={s.twoColBody}>{c.approachBody ?? defaults.approachBody}</p>
            </div>
          </div>
        </section>

        {/* Pebbles quote — full-bleed photographic with text overlay */}
        <section
          className={s.photoOverlay}
          style={
            {
              "--photo-overlay-bg": `url(${pebblesImage})`,
            } as React.CSSProperties
          }
        >
          <div className={s.photoOverlayContent}>
            <span className="t-label t-label-eyebrow">
              {c.pebblesEyebrow ?? defaults.pebblesEyebrow}
            </span>
            <blockquote>{c.pebblesQuote ?? defaults.pebblesQuote}</blockquote>
            <p className="t-label" style={{ marginTop: "var(--s-4)" }}>
              {c.pebblesAttribution ?? defaults.pebblesAttribution}
            </p>
            <Link
              href="/#contact"
              className="btn btn-ghost-light"
              style={{ marginTop: "var(--s-6)" }}
            >
              <span className="btn-dot" /> {c.pebblesCtaLabel ?? defaults.pebblesCtaLabel}
            </Link>
          </div>
        </section>

        {/* Featured story — offset two-image arrangement */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
                <LeafMark />
                <span className="t-label t-label-eyebrow">
                  {c.storyEyebrow ?? defaults.storyEyebrow}
                </span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  {c.storyTitle ?? defaults.storyTitle}{" "}
                  <em>{c.storyTitleEm ?? defaults.storyTitleEm}</em>
                </h2>
                <p className={s.twoColBody} style={{ marginTop: "var(--s-6)" }}>
                  {c.storyBody ?? defaults.storyBody}
                </p>
                <Link
                  href="#"
                  className="btn btn-ghost"
                  style={{ marginTop: "var(--s-6)", alignSelf: "flex-start" }}
                >
                  <span className="btn-dot" /> {c.storyCtaLabel ?? defaults.storyCtaLabel}
                </Link>
              </div>
              <div className={s.offsetPair}>
                <div className={s.offsetPairBack}>
                  <img
                    src={imgUrl(c.storyImageBack, defaults.storyImageBack)}
                    alt="Couple together"
                    className={s.offsetPairImg}
                  />
                </div>
                <div className={s.offsetPairFront}>
                  <img
                    src={imgUrl(c.storyImageFront, defaults.storyImageFront)}
                    alt="Close portrait"
                    className={s.offsetPairImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={`${s.section} ${s.sectionPaper}`}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
                <LeafMark />
                <span className="t-label t-label-eyebrow">
                  {c.faqEyebrow ?? defaults.faqEyebrow}
                </span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  {c.faqTitle ?? defaults.faqTitle} <em>{c.faqTitleEm ?? defaults.faqTitleEm}</em>
                </h2>
                <p className={s.twoColBody} style={{ marginTop: "var(--s-6)" }}>
                  {c.faqSub ?? defaults.faqSub}
                </p>
                <p className="t-body-sm" style={{ marginTop: "var(--s-4)", maxWidth: "40ch" }}>
                  {c.faqFootnote ?? defaults.faqFootnote}
                </p>
              </div>
              <div className={s.faqList}>
                {faqs.map((item: { q: string; a: string }) => (
                  <div key={item.q} className={s.faqItem}>
                    <h3 className={s.faqQ}>{item.q}</h3>
                    <p className={s.faqA}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className={s.closingCta}>
          <span className="t-label t-label-eyebrow">{c.ctaEyebrow ?? defaults.ctaEyebrow}</span>
          <h2 className={s.closingTitle}>
            {c.ctaTitle ?? defaults.ctaTitle} <em>{c.ctaTitleEm ?? defaults.ctaTitleEm}</em>
          </h2>
          <p className={s.closingBody}>{c.ctaBody ?? defaults.ctaBody}</p>
          <Link href="/#contact" className="btn btn-primary">
            <span className="btn-dot" /> {c.ctaLabel ?? defaults.ctaLabel}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
