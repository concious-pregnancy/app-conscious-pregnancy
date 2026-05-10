import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlobImage from "@/components/BlobImage";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import {
  aboutHeroQuery,
  aboutIntroQuery,
  aboutFounderQuery,
  aboutTeamSectionQuery,
  teamMembersQuery,
  aboutApproachQuery,
  aboutPebblesQuery,
  aboutStoryQuery,
  aboutFaqQuery,
  aboutCtaQuery,
} from "@/lib/sanity/queries";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Find out who we are, what we stand for, and how we can support your journey.",
};

const IMG = "/clearpath-ref/about";
const LEAF = `${IMG}/9O8sLldl6mV9miUVjkyrhGJsZ7c.svg`;

const fallbackTeam = [
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
  const opts = { cache: "no-store" } as const;
  const [hero, intro, founder, teamSection, team, approach, pebbles, story, faq, cta] =
    await Promise.all([
      client.fetch(aboutHeroQuery, {}, opts),
      client.fetch(aboutIntroQuery, {}, opts),
      client.fetch(aboutFounderQuery, {}, opts),
      client.fetch(aboutTeamSectionQuery, {}, opts),
      client.fetch(teamMembersQuery, {}, opts),
      client.fetch(aboutApproachQuery, {}, opts),
      client.fetch(aboutPebblesQuery, {}, opts),
      client.fetch(aboutStoryQuery, {}, opts),
      client.fetch(aboutFaqQuery, {}, opts),
      client.fetch(aboutCtaQuery, {}, opts),
    ]);

  const h = hero ?? {};
  const i = intro ?? {};
  const f = founder ?? {};
  const ts = teamSection ?? {};
  const a = approach ?? {};
  const p = pebbles ?? {};
  const st = story ?? {};
  const q = faq ?? {};
  const c = cta ?? {};

  const teamList =
    team && team.length > 0
      ? team.map((m: { name?: string; role?: string; bio?: string; image?: SanityImage }) => ({
          name: m.name ?? "",
          role: m.role ?? "Therapist",
          bio: m.bio ?? "",
          image: imgUrl(m.image, fallbackTeam[0].image),
        }))
      : fallbackTeam;
  const founderBody: string[] =
    f.body && f.body.length > 0
      ? f.body
      : [
          "ClearPath was founded by Anna Keller, a therapist with over 15 years of experience helping people navigate life's turning points. Her work is grounded in the belief that clarity and change come from small, intentional steps, and that no one should walk their path alone.",
          "Anna started ClearPath to create a welcoming, non-judgmental space where people could slow down, reflect, and find their next direction with confidence and care.",
        ];
  const faqs: { q: string; a: string }[] =
    q.items && q.items.length > 0
      ? q.items
      : [
          {
            q: "How do I know if therapy is right for me?",
            a: "Therapy isn't just for crises. It's for anyone curious about growth, clarity, or navigating life's changes with more support and self-awareness.",
          },
          {
            q: "What can I expect from the first session?",
            a: "The first session is a gentle starting point. You'll talk with your therapist about what brings you here, what you're hoping for, and what feels comfortable for you right now.",
          },
        ];

  const pebblesImg = imgUrl(p.image, `${IMG}/RQK6FjdwGi88lXjfiA3iUnV5rvc.jpg`);

  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        {/* Hero */}
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
                {h.titleLine1 ?? "Your Path,"} <em>{h.titleEm ?? "Our Purpose."}</em>
              </h1>
              <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>
                {h.eyebrow ?? "About"}
              </span>
            </div>
            <p className={s.heroLead}>
              {h.lead ??
                "Find out who we are, what we stand for, and how we can support your journey."}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className={`${s.section} ${s.sectionPaper}`}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
                <LeafMark />
                <span className="t-label t-label-eyebrow">{i.eyebrow ?? "The Way We Help"}</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  {i.title ?? "We start by"} <em>{i.titleEm ?? "listening,"}</em> really listening.
                </h2>
              </div>
              <p className={s.twoColBody}>
                {i.body ??
                  "At ClearPath, we believe every journey is unique, and so is the support it deserves. Our role is to walk beside you, offering clarity, compassion, and practical guidance as you navigate life's challenges."}
              </p>
            </div>
          </div>
        </section>

        {/* Founder intro */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <LeafMark />
            <span className="t-label t-label-eyebrow">{f.eyebrow ?? "Meet our founder"}</span>
            <h2 className={s.twoColTitle} style={{ marginTop: "1rem", maxWidth: "16ch" }}>
              {f.title ?? "Meet"} <em>{f.titleEm ?? "Our Founder."}</em>
            </h2>
            <div className={s.twoColBody} style={{ marginTop: "var(--s-8)", maxWidth: "60ch" }}>
              {founderBody.map((para, idx) => (
                <p key={idx} style={idx > 0 ? { marginTop: "1rem" } : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Founder full-bleed portrait + quote */}
        <section className={s.fullBleedSplit}>
          <img
            src={imgUrl(f.image, `${IMG}/1OD7wXOtYnqOi7RvvRqTnSC8o.jpg`)}
            alt="Anna Keller"
            className={s.fullBleedSplitImg}
          />
          <div className={s.fullBleedSplitContent}>
            <blockquote className="t-quote" style={{ maxWidth: "22ch" }}>
              {f.quote ??
                "Therapy isn't about fixing people, it's about walking beside them as they discover their own way forward."}
            </blockquote>
            <p className="t-label" style={{ marginTop: "var(--s-3)", color: "var(--muted)" }}>
              {f.quoteAttribution ?? "Anna Keller"}
            </p>
          </div>
        </section>

        {/* Team */}
        <section className={`${s.section} ${s.sectionOffWhite}`}>
          <div className={s.sectionInner}>
            <div style={{ marginBottom: "var(--s-12)", textAlign: "center" }}>
              <LeafMark />
              <span className="t-label t-label-eyebrow">{ts.eyebrow ?? "Our team"}</span>
              <h2 className={s.twoColTitle} style={{ marginTop: "1rem", marginInline: "auto" }}>
                {ts.title ?? "The People Who"} <em>{ts.titleEm ?? "Walk Beside You."}</em>
              </h2>
              <p className={s.twoColBody} style={{ marginTop: "1.5rem", marginInline: "auto" }}>
                {ts.sub ??
                  "ClearPath is more than a service, each member of our team is here to listen, guide, and support you at your own pace."}
              </p>
            </div>
            <div className={`${s.articleGrid} ${s.articleGrid3}`}>
              {teamList.map(
                (
                  member: { name: string; role: string; bio: string; image: string },
                  idx: number,
                ) => (
                  <article key={member.name} className={s.articleItem}>
                    <BlobImage src={member.image} alt={`${member.name} portrait`} index={idx} />
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
                {a.title ?? "Support grounded in"} <em>{a.titleEm ?? "experience,"}</em> guided by
                clarity, and built for lasting change.
              </h2>
              <p className={s.twoColBody}>
                {a.body ??
                  "Our sessions create space for that change to happen. We take time to understand your needs, offer structure where it helps, and support your direction, not ours."}
              </p>
            </div>
          </div>
        </section>

        {/* Pebbles photo overlay */}
        <section
          className={s.photoOverlay}
          style={{ "--photo-overlay-bg": `url(${pebblesImg})` } as React.CSSProperties}
        >
          <div className={s.photoOverlayContent}>
            <span className="t-label t-label-eyebrow">
              {p.eyebrow ?? "Real people. Real change."}
            </span>
            <blockquote>
              {p.quote ??
                "Every path is unique, the important thing is taking the next step, no matter how small."}
            </blockquote>
            <p className="t-label" style={{ marginTop: "var(--s-4)" }}>
              {p.attribution ?? "Anna Keller · Therapist and Founder of ClearPath"}
            </p>
            <Link
              href="/#contact"
              className="btn btn-ghost-light"
              style={{ marginTop: "var(--s-6)" }}
            >
              <span className="btn-dot" /> {p.ctaLabel ?? "Start your journey"}
            </Link>
          </div>
        </section>

        {/* Featured story */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
                <LeafMark />
                <span className="t-label t-label-eyebrow">
                  {st.eyebrow ?? "Real people. Real change."}
                </span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  {st.title ?? "Finding each other"} <em>{st.titleEm ?? "again."}</em>
                </h2>
                <p className={s.twoColBody} style={{ marginTop: "var(--s-6)" }}>
                  {st.body ??
                    "When Daniel and Marisa first came in, they weren't on the verge of breaking up, but they felt more like roommates than partners."}
                </p>
                <Link
                  href="#"
                  className="btn btn-ghost"
                  style={{ marginTop: "var(--s-6)", alignSelf: "flex-start" }}
                >
                  <span className="btn-dot" /> {st.ctaLabel ?? "Read full story"}
                </Link>
              </div>
              <div className={s.offsetPair}>
                <div className={s.offsetPairBack}>
                  <img
                    src={imgUrl(st.imageBack, `${IMG}/0tyXlpa0soVzPMq44gbKMcP680.jpg`)}
                    alt="Couple together"
                    className={s.offsetPairImg}
                  />
                </div>
                <div className={s.offsetPairFront}>
                  <img
                    src={imgUrl(st.imageFront, `${IMG}/wQLwxTlAvuy2tWEdKj8oaawUp0s.jpg`)}
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
                <span className="t-label t-label-eyebrow">{q.eyebrow ?? "FAQ"}</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  {q.title ?? "Your questions."} <em>{q.titleEm ?? "Answered."}</em>
                </h2>
                <p className={s.twoColBody} style={{ marginTop: "var(--s-6)" }}>
                  {q.sub ?? "Not sure what to expect? These answers might help."}
                </p>
                {q.footnote && (
                  <p className="t-body-sm" style={{ marginTop: "var(--s-4)", maxWidth: "40ch" }}>
                    {q.footnote}
                  </p>
                )}
              </div>
              <div className={s.faqList}>
                {faqs.map((item) => (
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
          <span className="t-label t-label-eyebrow">{c.eyebrow ?? "Begin Your Journey"}</span>
          <h2 className={s.closingTitle}>
            {c.title ?? "Ready to find"} <em>{c.titleEm ?? "your path?"}</em>
          </h2>
          <p className={s.closingBody}>
            {c.body ??
              "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes, it's about meaningful change, one clear step at a time."}
          </p>
          <Link href="/#contact" className="btn btn-primary">
            <span className="btn-dot" /> {c.ctaLabel ?? "Start your journey"}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
