import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our therapy and coaching options tailored to your goals, pace, and needs.",
};

const IMG = "/clearpath-ref/services";

const services = [
  {
    title: (
      <>
        Mindfulness & <em>Stress Support</em>
      </>
    ),
    image: `${IMG}/X1KAS3BPHbN4rR5FN8CCVsSUhM.jpg`,
    paragraphs: [
      "Stress, anxiety, and overwhelm can leave you feeling disconnected from yourself and your life. Our mindfulness-based sessions are designed to help you slow down, breathe, and reconnect. You'll learn practical techniques to build resilience, manage emotional triggers, and develop a calmer, more centered mind.",
      "We draw on proven practices like guided meditation, grounding exercises, and mindful reflection to help you find balance, both in the moment and in your daily life. Ideal for anyone seeking more peace, presence, and emotional stability.",
    ],
  },
  {
    title: (
      <>
        Individual <em>Therapy</em>
      </>
    ),
    image: `${IMG}/lZn0EEipDdK6TqFQ685W86d6r9M.jpg`,
    paragraphs: [
      "Sometimes you need a safe, private space to talk openly and work through what's on your mind. Our one-on-one therapy sessions focus on emotional clarity, deeper self-understanding, and healing. Whether you're facing life transitions, relationship difficulties, or personal challenges, we'll work together to explore patterns, process experiences, and strengthen your emotional well-being.",
      "Sessions are tailored to your pace and needs, blending evidence-based approaches with compassionate, practical support.",
    ],
  },
  {
    title: (
      <>
        Clarity <em>Consult</em>
      </>
    ),
    image: `${IMG}/Ux4Is85LWxm9dXetoVhxJWLGhLI.jpg`,
    paragraphs: [
      "When you need direction fast, a Clarity Consult offers a focused space to step back and reassess. In these short-term, goal-driven sessions, we help you pinpoint what's holding you back, clarify your priorities, and map a practical next step.",
      "Perfect for making a big decision, resetting your goals, or addressing a specific challenge without committing to long-term therapy. You'll leave with new insight, a clearer mind, and an actionable plan to move forward.",
    ],
  },
  {
    title: (
      <>
        Life <em>Coaching</em>
      </>
    ),
    image: `${IMG}/rQkdR79nheYY38OKZhh8pENppw.jpg`,
    paragraphs: [
      "Life coaching is for those ready to create change and take action. Whether you want to build confidence, strengthen motivation, or find a stronger sense of direction, we work with you to set clear goals and break them into achievable steps. Coaching is future-focused, it's about moving forward, staying accountable, and unlocking your potential.",
      "Through guided reflection, strategic planning, and ongoing support, we'll help you create the momentum needed to reach the life you want.",
    ],
  },
];

const stats = [
  { value: "450+", label: "Therapy sessions completed" },
  { value: "80+", label: "Clients supported" },
  { value: "9+", label: "Years of professional experience" },
  { value: "25+", label: "Programs and tools offered" },
];

const tiers = [
  {
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
    name: "Complete",
    blurb: "Consistent support with full access.",
    features: [
      "All Growth features",
      "Extended sessions",
      "Priority booking",
      "Direct therapist messaging",
    ],
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

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        {/* Hero with wisp-line decoration */}
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
            <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>Services</span>
            <h1 className={s.heroTitle}>
              Every Step <em>of Your Journey.</em>
            </h1>
            <p className={s.heroLead}>
              Explore our therapy and coaching options tailored to your goals, pace, and needs.
              Therapy and coaching designed entirely around you, your goals, your pace, and your
              needs. We help you move forward with clarity, confidence, and real, lasting change.
            </p>
          </div>
        </section>

        {/* Service blocks — full-bleed alternating, rectangular (no blob masks) */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            {services.map((svc, idx) => (
              <article
                key={idx}
                className={`${s.serviceBleedBlock} ${idx % 2 === 1 ? s.serviceBleedReverse : ""}`}
              >
                <img
                  src={svc.image}
                  alt=""
                  className={s.serviceBleedMedia}
                  style={{ aspectRatio: "4 / 5" }}
                />
                <div className={s.serviceBody}>
                  <img
                    src="/clearpath-ref/services/9O8sLldl6mV9miUVjkyrhGJsZ7c.svg"
                    alt=""
                    className={s.leafMark}
                    aria-hidden="true"
                  />
                  <span className="t-label t-label-eyebrow">Service · 0{idx + 1}</span>
                  <h2 className={s.serviceTitle} style={{ marginTop: "1rem" }}>
                    {svc.title}
                  </h2>
                  {svc.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <Link
                    href="/#contact"
                    className="btn btn-ghost"
                    style={{ alignSelf: "flex-start", marginTop: "var(--s-3)" }}
                  >
                    <span className="btn-dot" /> Book a session
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className={`${s.section} ${s.sectionDark} noise-overlay`}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <h2 className={s.twoColTitle}>
                From first steps to <em>lasting change,</em> these numbers reflect the impact of
                walking the path together.
              </h2>
              <p className={s.twoColBody}>
                Behind every number is a story of progress. These milestones capture the work,
                dedication, and care we bring to each step of the journey.
              </p>
            </div>
            <div className={s.statsGrid} style={{ marginTop: "var(--s-12)" }}>
              {stats.map((stat) => (
                <div key={stat.value} className={s.statCell}>
                  <span className={s.statValue}>{stat.value}</span>
                  <span className={s.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className={`${s.section} ${s.sectionPaper}`}>
          <div className={s.sectionInner}>
            <div style={{ marginBottom: "var(--s-12)", textAlign: "center" }}>
              <span className="t-label t-label-eyebrow">Our prices</span>
              <h2
                className={s.twoColTitle}
                style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
              >
                Support that fits <em>your pace.</em>
              </h2>
              <p
                className={s.twoColBody}
                style={{ marginTop: "var(--s-4)", marginLeft: "auto", marginRight: "auto" }}
              >
                A first session is often just a conversation, a starting point. From there, you
                choose the pace and depth of support that feels right for you.
              </p>
            </div>
            <div className={`${s.cardGrid} ${s.cardGrid3}`}>
              {tiers.map((tier) => (
                <article key={tier.name} className={s.card}>
                  <span className={`t-label t-label-eyebrow ${s.cardEyebrow}`}>{tier.name}</span>
                  <h3 className={s.cardTitle}>{tier.blurb}</h3>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--s-2)",
                      marginTop: "var(--s-4)",
                    }}
                  >
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.95rem",
                          color: "var(--muted)",
                          paddingLeft: "var(--s-4)",
                          position: "relative",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "0.55em",
                            width: 6,
                            height: 6,
                            background: "var(--sage)",
                            borderRadius: "50%",
                          }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#contact"
                    className="btn btn-primary"
                    style={{ marginTop: "var(--s-6)", alignSelf: "flex-start" }}
                  >
                    <span className="btn-dot" /> Get started
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Featured story */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
                <span className="t-label t-label-eyebrow">Real people. Real change.</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  Rewriting success on <em>his own terms.</em>
                </h2>
                <img
                  src={`${IMG}/92gLXvk1EhQjqbfE6arrIJRsBGY.jpg`}
                  alt="Featured client portrait"
                  className={s.featuredStoryMedia}
                  style={{ marginTop: "var(--s-6)" }}
                />
              </div>
              <div className={s.twoColBody}>
                <p>
                  James was 38, thriving in a competitive field, at least on paper. Inside, he felt
                  exhausted and disconnected from the life he'd worked so hard to build. Even when
                  he hit his goals, the satisfaction was fleeting, quickly replaced by the pressure
                  to reach the next milestone.
                </p>
                <Link
                  href="#"
                  className="btn btn-ghost"
                  style={{ marginTop: "var(--s-6)", alignSelf: "flex-start" }}
                >
                  <span className="btn-dot" /> Read full story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={`${s.section} ${s.sectionPaper}`}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
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
          <span className="t-label t-label-eyebrow">Book a session</span>
          <h2 className={s.closingTitle}>
            Support starts with a <em>simple step.</em>
          </h2>
          <p className={s.closingBody}>
            Whether you're starting fresh, returning for ongoing support, or simply exploring your
            options, we're here to meet you where you are. Use the form to book a session that feels
            right for you.
          </p>
          <Link href="/#contact" className="btn btn-primary">
            <span className="btn-dot" /> Book a session
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
