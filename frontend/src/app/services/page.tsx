import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import {
  servicesHeroQuery,
  servicesBlocksQuery,
  servicesStatsQuery,
  servicesPricingQuery,
  servicesStoryQuery,
  servicesFaqQuery,
  servicesCtaQuery,
} from "@/lib/sanity/queries";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our therapy and coaching options tailored to your goals, pace, and needs.",
};

const IMG = "/clearpath-ref/services";
const LEAF = `${IMG}/9O8sLldl6mV9miUVjkyrhGJsZ7c.svg`;

type SanityImage = { asset?: { _ref?: string } } | null | undefined;
type ServiceBlockDoc = {
  _id: string;
  eyebrow?: string;
  title?: string;
  titleEm?: string;
  image?: SanityImage;
  paragraphs?: string[];
  ctaLabel?: string;
};

function imgUrl(image: SanityImage, fallback: string): string {
  return image?.asset?._ref ? urlFor(image).width(2400).url() : fallback;
}

const fallbackBlocks: ServiceBlockDoc[] = [
  {
    _id: "fb1",
    eyebrow: "Service · 01",
    title: "Mindfulness &",
    titleEm: "Stress Support",
    paragraphs: [
      "Stress, anxiety, and overwhelm can leave you feeling disconnected. Our mindfulness sessions help you slow down, breathe, and reconnect.",
    ],
    ctaLabel: "Book a session",
  },
];

export default async function ServicesPage() {
  const opts = { cache: "no-store" } as const;
  const [hero, blocks, stats, pricing, story, faq, cta] = await Promise.all([
    client.fetch(servicesHeroQuery, {}, opts),
    client.fetch(servicesBlocksQuery, {}, opts),
    client.fetch(servicesStatsQuery, {}, opts),
    client.fetch(servicesPricingQuery, {}, opts),
    client.fetch(servicesStoryQuery, {}, opts),
    client.fetch(servicesFaqQuery, {}, opts),
    client.fetch(servicesCtaQuery, {}, opts),
  ]);

  const h = hero ?? {};
  const st = stats ?? {};
  const pr = pricing ?? {};
  const sty = story ?? {};
  const q = faq ?? {};
  const c = cta ?? {};

  const serviceBlocks: ServiceBlockDoc[] = blocks && blocks.length > 0 ? blocks : fallbackBlocks;
  const tiers: { name: string; blurb: string; features: string[] }[] =
    pr.tiers && pr.tiers.length > 0
      ? pr.tiers
      : [
          {
            name: "Starter",
            blurb: "Explore therapy at your own pace.",
            features: ["Dedicated therapist", "Online or in-person"],
          },
        ];
  const statRows: { value: string; label: string }[] =
    st.stats && st.stats.length > 0
      ? st.stats
      : [{ value: "450+", label: "Therapy sessions completed" }];
  const faqs: { q: string; a: string }[] =
    q.items && q.items.length > 0
      ? q.items
      : [
          {
            q: "How do I know if therapy is right for me?",
            a: "Therapy isn't just for crises. It's for anyone curious about growth, clarity, or navigating life's changes.",
          },
        ];

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
                {h.titleLine1 ?? "Every Step"} <em>{h.titleEm ?? "of Your Journey."}</em>
              </h1>
              <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>
                {h.eyebrow ?? "Services"}
              </span>
            </div>
            <p className={s.heroLead}>
              {h.lead ??
                "Explore our therapy and coaching options tailored to your goals, pace, and needs."}
            </p>
          </div>
        </section>

        {/* Service blocks — full-bleed dark photographic per service */}
        {serviceBlocks.map((svc, idx) => (
          <section
            key={svc._id ?? idx}
            className={s.servicePhotoBlock}
            style={
              {
                "--service-bg": `url(${imgUrl(svc.image, `${IMG}/X1KAS3BPHbN4rR5FN8CCVsSUhM.jpg`)})`,
              } as React.CSSProperties
            }
          >
            <div className={s.servicePhotoContent}>
              <div className={s.servicePhotoInner}>
                <span className="t-label t-label-eyebrow" style={{ color: "var(--sage-light)" }}>
                  {svc.eyebrow ?? `Service · 0${idx + 1}`}
                </span>
                <h2 className={s.servicePhotoTitle}>
                  {svc.title} <em style={{ color: "var(--sage-light)" }}>{svc.titleEm}</em>
                </h2>
                <div className={s.servicePhotoBody}>
                  {(svc.paragraphs ?? []).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <Link
                  href="/#contact"
                  className="btn btn-ghost-light"
                  style={{ alignSelf: "flex-start", marginTop: "var(--s-4)" }}
                >
                  <span className="btn-dot" /> {svc.ctaLabel ?? "Book a session"}
                </Link>
              </div>
            </div>
          </section>
        ))}

        {/* Stats */}
        <section className={`${s.section} ${s.sectionDark} noise-overlay`}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <h2 className={s.twoColTitle}>
                {st.title ?? "From first steps to"} <em>{st.titleEm ?? "lasting change,"}</em> these
                numbers reflect the impact of walking the path together.
              </h2>
              <p className={s.twoColBody}>
                {st.body ??
                  "Behind every number is a story of progress. These milestones capture the work, dedication, and care we bring."}
              </p>
            </div>
            <div className={s.statsGrid} style={{ marginTop: "var(--s-12)" }}>
              {statRows.map((stat) => (
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
              <img src={LEAF} alt="" className={s.leafMark} aria-hidden="true" />
              <span className="t-label t-label-eyebrow">{pr.eyebrow ?? "Our prices"}</span>
              <h2 className={s.twoColTitle} style={{ marginTop: "1rem", marginInline: "auto" }}>
                {pr.title ?? "Support that fits"} <em>{pr.titleEm ?? "your pace."}</em>
              </h2>
              <p className={s.twoColBody} style={{ marginTop: "var(--s-4)", marginInline: "auto" }}>
                {pr.sub ??
                  "A first session is often just a conversation, a starting point. From there, you choose the pace and depth of support that feels right for you."}
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
                    {(tier.features ?? []).map((f) => (
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
                <img src={LEAF} alt="" className={s.leafMark} aria-hidden="true" />
                <span className="t-label t-label-eyebrow">
                  {sty.eyebrow ?? "Real people. Real change."}
                </span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  {sty.title ?? "Rewriting success on"} <em>{sty.titleEm ?? "his own terms."}</em>
                </h2>
                <img
                  src={imgUrl(sty.image, `${IMG}/92gLXvk1EhQjqbfE6arrIJRsBGY.jpg`)}
                  alt="Featured client portrait"
                  className={s.featuredStoryMedia}
                  style={{ marginTop: "var(--s-6)" }}
                />
              </div>
              <div className={s.twoColBody}>
                <p>{sty.body ?? "James was thriving in a competitive field, at least on paper."}</p>
                <Link
                  href="#"
                  className="btn btn-ghost"
                  style={{ marginTop: "var(--s-6)", alignSelf: "flex-start" }}
                >
                  <span className="btn-dot" /> {sty.ctaLabel ?? "Read full story"}
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
                <img src={LEAF} alt="" className={s.leafMark} aria-hidden="true" />
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
          <span className="t-label t-label-eyebrow">{c.eyebrow ?? "Book a session"}</span>
          <h2 className={s.closingTitle}>
            {c.title ?? "Support starts with a"} <em>{c.titleEm ?? "simple step."}</em>
          </h2>
          <p className={s.closingBody}>
            {c.body ??
              "Whether you're starting fresh, returning, or exploring options, we're here."}
          </p>
          <Link href="/#contact" className="btn btn-primary">
            <span className="btn-dot" /> {c.ctaLabel ?? "Book a session"}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
