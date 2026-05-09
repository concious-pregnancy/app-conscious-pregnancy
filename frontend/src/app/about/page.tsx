import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlobImage from "@/components/BlobImage";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Find out who we are, what we stand for, and how we can support your journey.",
};

const IMG = "/clearpath-ref/about";
const LEAF = `${IMG}/9O8sLldl6mV9miUVjkyrhGJsZ7c.svg`;

const team = [
  {
    name: "Sofia Bennett",
    image: `${IMG}/qJCSWUUsykM3SrhtCmbKjBq9Q78.jpg`,
    bio: "Relationship therapist supporting couples and individuals through communication, trust-building, and conflict resolution.",
  },
  {
    name: "Marcus Lee",
    image: `${IMG}/7eKCHVMVJdWT3yvzEza9J81fWk.jpg`,
    bio: "Wellness coach focused on creating sustainable lifestyle changes for better physical and mental health.",
  },
  {
    name: "Leila Moreno",
    image: `${IMG}/TF67zgMSYINSD7dymhKX4rhrTM.jpg`,
    bio: "Mindfulness specialist guiding people to slow down, manage stress, and find clarity in daily life.",
  },
];

const faqs = [
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
];

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

export default function AboutPage() {
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
                Your Path, <em>Our Purpose.</em>
              </h1>
              <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>About</span>
            </div>
            <p className={s.heroLead}>
              Find out who we are, what we stand for, and how we can support your journey.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className={`${s.section} ${s.sectionPaper}`}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
                <LeafMark />
                <span className="t-label t-label-eyebrow">The Way We Help</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  We start by <em>listening,</em> really listening.
                </h2>
              </div>
              <p className={s.twoColBody}>
                At ClearPath, we believe every journey is unique, and so is the support it deserves.
                Our role is to walk beside you, offering clarity, compassion, and practical guidance
                as you navigate life's challenges. We start by listening, really listening, to
                understand your needs and pace. From there, we shape a path that's realistic,
                sustainable, and tailored to you. Every session is a safe space to explore, reflect,
                and grow without judgment.
              </p>
            </div>
          </div>
        </section>

        {/* Founder intro — text only */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <LeafMark />
            <span className="t-label t-label-eyebrow">Meet our founder</span>
            <h2 className={s.twoColTitle} style={{ marginTop: "1rem", maxWidth: "16ch" }}>
              Meet <em>Our Founder.</em>
            </h2>
            <div className={s.twoColBody} style={{ marginTop: "var(--s-8)", maxWidth: "60ch" }}>
              <p>
                ClearPath was founded by Anna Keller, a therapist with over 15 years of experience
                helping people navigate life's turning points. Her work is grounded in the belief
                that clarity and change come from small, intentional steps, and that no one should
                walk their path alone.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Anna started ClearPath to create a welcoming, non-judgmental space where people
                could slow down, reflect, and find their next direction with confidence and care.
              </p>
            </div>
          </div>
        </section>

        {/* Founder full-bleed portrait + quote callout — edge-to-edge split */}
        <section className={s.fullBleedSplit}>
          <img
            src={`${IMG}/1OD7wXOtYnqOi7RvvRqTnSC8o.jpg`}
            alt="Anna Keller"
            className={s.fullBleedSplitImg}
          />
          <div className={s.fullBleedSplitContent}>
            <blockquote className="t-quote" style={{ maxWidth: "22ch" }}>
              Therapy isn't about fixing people, it's about walking beside them as they discover
              their own way forward.
            </blockquote>
            <p className="t-label" style={{ marginTop: "var(--s-3)", color: "var(--muted)" }}>
              Anna Keller
            </p>
          </div>
        </section>

        {/* Team — blob-masked portraits, three different shapes */}
        <section className={`${s.section} ${s.sectionOffWhite}`}>
          <div className={s.sectionInner}>
            <div style={{ marginBottom: "var(--s-12)", textAlign: "center" }}>
              <LeafMark />
              <span className="t-label t-label-eyebrow">Our team</span>
              <h2 className={s.twoColTitle} style={{ marginTop: "1rem", marginInline: "auto" }}>
                The People Who <em>Walk Beside You.</em>
              </h2>
              <p className={s.twoColBody} style={{ marginTop: "1.5rem", marginInline: "auto" }}>
                ClearPath is more than a service, each member of our team is here to listen, guide,
                and support you at your own pace.
              </p>
            </div>
            <div className={`${s.articleGrid} ${s.articleGrid3}`}>
              {team.map((member, i) => (
                <article key={member.name} className={s.articleItem}>
                  <BlobImage src={member.image} alt={`${member.name} portrait`} index={i} />
                  <span className="t-label" style={{ marginTop: "var(--s-3)" }}>
                    Therapist
                  </span>
                  <h3 className={s.articleTitle}>{member.name}</h3>
                  <p className={s.articleExcerpt}>{member.bio}</p>
                </article>
              ))}
            </div>
            {/* Wave divider closing the team section */}
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
                Support grounded in <em>experience,</em> guided by clarity, and built for lasting
                change.
              </h2>
              <p className={s.twoColBody}>
                Our sessions create space for that change to happen. We take time to understand your
                needs, offer structure where it helps, and support your direction, not ours. Learn
                more about how we work and what to expect from the process.
              </p>
            </div>
          </div>
        </section>

        {/* Pebbles quote — full-bleed photographic background with text overlay */}
        <section
          className={s.photoOverlay}
          style={
            {
              "--photo-overlay-bg": `url(${IMG}/RQK6FjdwGi88lXjfiA3iUnV5rvc.jpg)`,
            } as React.CSSProperties
          }
        >
          <div className={s.photoOverlayContent}>
            <span className="t-label t-label-eyebrow">Real people. Real change.</span>
            <blockquote>
              Every path is unique, the important thing is taking the next step, no matter how
              small.
            </blockquote>
            <p className="t-label" style={{ marginTop: "var(--s-4)" }}>
              Anna Keller · Therapist and Founder of ClearPath
            </p>
            <Link
              href="/#contact"
              className="btn btn-ghost-light"
              style={{ marginTop: "var(--s-6)" }}
            >
              <span className="btn-dot" /> Start your journey
            </Link>
          </div>
        </section>

        {/* Featured story — offset two-image arrangement */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
                <LeafMark />
                <span className="t-label t-label-eyebrow">Real people. Real change.</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  Finding each other <em>again.</em>
                </h2>
                <p className={s.twoColBody} style={{ marginTop: "var(--s-6)" }}>
                  When Daniel and Marisa first came in, they weren't on the verge of breaking up,
                  but they felt more like roommates than partners. They missed the warmth they used
                  to share, but neither knew how to bridge the distance.
                </p>
                <Link
                  href="#"
                  className="btn btn-ghost"
                  style={{ marginTop: "var(--s-6)", alignSelf: "flex-start" }}
                >
                  <span className="btn-dot" /> Read full story
                </Link>
              </div>
              <div className={s.offsetPair}>
                <div className={s.offsetPairBack}>
                  <img
                    src={`${IMG}/0tyXlpa0soVzPMq44gbKMcP680.jpg`}
                    alt="Couple together"
                    className={s.offsetPairImg}
                  />
                </div>
                <div className={s.offsetPairFront}>
                  <img
                    src={`${IMG}/wQLwxTlAvuy2tWEdKj8oaawUp0s.jpg`}
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
                <span className="t-label t-label-eyebrow">FAQ</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  Your questions. <em>Answered.</em>
                </h2>
                <p className={s.twoColBody} style={{ marginTop: "var(--s-6)" }}>
                  Not sure what to expect? These answers might help you feel more confident as you
                  begin.
                </p>
                <p className="t-body-sm" style={{ marginTop: "var(--s-4)", maxWidth: "40ch" }}>
                  Didn't find your answer? Send us a message, we'll respond with care and clarity.
                </p>
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
          <span className="t-label t-label-eyebrow">Begin Your Journey</span>
          <h2 className={s.closingTitle}>
            Ready to find <em>your path?</em>
          </h2>
          <p className={s.closingBody}>
            If this story resonates with you, maybe it's time to start your own. Therapy isn't about
            quick fixes, it's about meaningful change, one clear step at a time.
          </p>
          <Link href="/#contact" className="btn btn-primary">
            <span className="btn-dot" /> Start your journey
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
