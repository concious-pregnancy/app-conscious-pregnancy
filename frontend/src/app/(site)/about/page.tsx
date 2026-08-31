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
  aboutPebblesQuery,
  aboutStoryQuery,
  aboutFaqQuery,
  aboutCtaQuery,
} from "@/lib/sanity/queries";
import { FLAGS } from "@/flags";
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

// Breaks a long body string into a bold opening sentence plus a couple of
// shorter paragraphs so long-form copy doesn't read as one dense block.
function splitIntroBody(body: string): { lead: string; rest: string[] } {
  const sentences = body.match(/[^.!?]+[.!?]+(?:\s+|$)/g)?.map((sentence) => sentence.trim()) ?? [
    body,
  ];
  const [lead, ...rest] = sentences;
  if (!lead) return { lead: body, rest: [] };
  const mid = Math.ceil(rest.length / 2);
  const paragraphs = [rest.slice(0, mid).join(" "), rest.slice(mid).join(" ")].filter(Boolean);
  return { lead, rest: paragraphs };
}

type Band = {
  eyebrow?: string;
  title?: string;
  body?: string;
  highlightedBody?: string;
  image?: SanityImage;
  surface?: string;
};

// idx is the band's position in aboutIntro.bands[], used for the surface/reverse
// alternation, independent of where on the page the band actually renders
// (band 2 renders out of array order, after "My Story").
function BandSection({ band, idx }: { band: Band; idx: number }) {
  const isNight = (band.surface ?? (idx % 2 === 1 ? "navy" : "cream")) === "navy";
  return (
    <div
      className={[s.band, isNight ? s.bandNight : s.bandDay, idx % 2 === 1 ? s.bandReverse : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div>
        <span className="t-label t-label-eyebrow">{band.eyebrow}</span>
        <h2 className={s.bandTitle} style={{ marginTop: "1rem" }}>
          {band.title}
        </h2>
        <p className={s.bandBody}>{band.body}</p>
        {band.highlightedBody && <p className={s.bandHighlight}>{band.highlightedBody}</p>}
      </div>
      <img
        src={imgUrl(band.image, `${IMG}/RQK6FjdwGi88lXjfiA3iUnV5rvc.jpg`)}
        alt=""
        className={s.bandMedia}
      />
    </div>
  );
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
  const [hero, intro, founder, teamSection, team, pebbles, story, faq, cta] = await Promise.all([
    client.fetch(aboutHeroQuery, {}, opts),
    client.fetch(aboutIntroQuery, {}, opts),
    client.fetch(aboutFounderQuery, {}, opts),
    client.fetch(aboutTeamSectionQuery, {}, opts),
    client.fetch(teamMembersQuery, {}, opts),
    client.fetch(aboutPebblesQuery, {}, opts),
    client.fetch(aboutStoryQuery, {}, opts),
    client.fetch(aboutFaqQuery, {}, opts),
    client.fetch(aboutCtaQuery, {}, opts),
  ]);

  const h = hero ?? {};
  const i = intro ?? {};
  const f = founder ?? {};
  const ts = teamSection ?? {};
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
  const founderChapters: { label?: string; title?: string; body?: string }[] = f.chapters ?? [];
  // founderBody[0] can hold the full multi-paragraph bio as one \n-joined string
  // (legacy data entry); the chaptered view only wants the first paragraph as its lead.
  const founderLead = founderBody[0]?.split("\n")[0];
  const storyFacts: { value?: string; label?: string }[] = st.facts ?? [];
  const storyPullQuotes: { quote?: string; attribution?: string }[] = st.pullQuotes ?? [];
  const storyOutsideClinic: string[] = st.outsideClinic ?? [];
  const introBands: Band[] = i.bands ?? [];
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
  const introBody =
    i.body ??
    "At ClearPath, we believe every journey is unique, and so is the support it deserves. Our role is to walk beside you, offering clarity, compassion, and practical guidance as you navigate life's challenges.";
  const { lead: introLead, rest: introRest } = splitIntroBody(introBody);
  const storyBody: string =
    st.body ??
    "When Daniel and Marisa first came in, they weren't on the verge of breaking up, but they felt more like roommates than partners.";
  // storyBody's paragraphs are separated by real newlines (not sentence-regex splittable,
  // since T.C.M./L.Ac. abbreviation periods would fragment the naive splitIntroBody split).
  const [storyLead, ...storyRest] = storyBody.split("\n").filter(Boolean);

  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        {/* Intro (band 2 moves after "My Story," band 3 moves after "My Path") */}
        {introBands.length > 0 ? (
          <section className={s.bandSection}>
            {introBands.map((band, idx) =>
              idx === 1 || idx === 2 ? null : <BandSection key={idx} band={band} idx={idx} />,
            )}
          </section>
        ) : (
          <section className={`${s.section} ${s.sectionPaper}`}>
            <div className={s.sectionInner}>
              <div className={s.twoCol}>
                <div>
                  <span className="t-label t-label-eyebrow">{i.eyebrow ?? "The Way We Help"}</span>
                  <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                    {i.title ?? "We start by"}{" "}
                    <em>{i.titleEm ?? "listening, really listening."}</em>
                  </h2>
                </div>
                <div className={s.twoColBody}>
                  <p className={s.twoColBodyLead}>{introLead}</p>
                  {introRest.map((para, idx) => (
                    <p key={idx} style={{ marginTop: "1rem" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Founder intro / chaptered story ("My Story") */}
        <section className={`${s.section} ${s.sectionAltDark}`}>
          <div className={s.sectionInner}>
            <span className="t-label t-label-eyebrow">{f.eyebrow ?? "Meet our founder"}</span>
            <h2 className={s.twoColTitle} style={{ marginTop: "1rem", maxWidth: "16ch" }}>
              {f.title ?? "Meet"} <em>{f.titleEm ?? "Our Founder."}</em>
            </h2>
            {founderChapters.length > 0 ? (
              <>
                {founderLead && (
                  <p
                    className={s.twoColBodyLead}
                    style={{ marginTop: "var(--s-6)", maxWidth: "42ch" }}
                  >
                    {founderLead}
                  </p>
                )}
                <div className={s.stickySection} style={{ marginTop: "var(--s-12)" }}>
                  <div className={s.stickyHead}>
                    <span className="t-label" style={{ color: "var(--muted)" }}>
                      In this story
                    </span>
                    <ul
                      style={{
                        listStyle: "none",
                        marginTop: "var(--s-4)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--s-2)",
                      }}
                    >
                      {founderChapters.map((chapter, idx) => (
                        <li key={idx}>
                          <a
                            href={`#chapter-${idx + 1}`}
                            className="t-body-sm"
                            style={{ color: "var(--muted)" }}
                          >
                            {chapter.label ?? `Chapter ${idx + 1}`}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ol className={s.stepList} style={{ listStyle: "none" }}>
                    {founderChapters.map((chapter, idx) => (
                      <li key={idx} id={`chapter-${idx + 1}`} className={s.stepItem}>
                        <span className={s.stepNumber}>{String(idx + 1).padStart(2, "0")}</span>
                        <div>
                          <h3 className={s.stepTitle}>{chapter.title}</h3>
                          <p className={s.stepBody}>{chapter.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            ) : (
              <div className={s.twoColBody} style={{ marginTop: "var(--s-8)", maxWidth: "60ch" }}>
                {founderBody.map((para, idx) => (
                  <p key={idx} style={idx > 0 ? { marginTop: "1rem" } : undefined}>
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Intro band 2, "No generic protocol, no national average," moved
            here (after My Story) per redesign feedback, out of its array order. */}
        {introBands.length > 1 && (
          <section className={s.bandSection}>
            <BandSection band={introBands[1]} idx={1} />
          </section>
        )}

        {/* Team */}
        {!FLAGS.OMIT_ABOUT_SECTIONS.team && (
          <section className={`${s.section} ${s.sectionOffWhite}`}>
            <div className={s.sectionInner}>
              <div style={{ marginBottom: "var(--s-12)", textAlign: "center" }}>
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
        )}

        {/* Pebbles photo overlay */}
        {!FLAGS.OMIT_ABOUT_SECTIONS.pebbles && (
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
                href="/contact"
                className="btn btn-ghost-light"
                style={{ marginTop: "var(--s-6)" }}
              >
                <span className="btn-dot" /> {p.ctaLabel ?? "Start your journey"}
              </Link>
            </div>
          </section>
        )}

        {/* Featured story / My Path (editorial spread) */}
        <section className={`${s.section} ${s.sectionAltDark}`}>
          <div className={s.sectionInner}>
            <div className={s.twoCol}>
              <div>
                <span className="t-label t-label-eyebrow">
                  {st.eyebrow ?? "Real people. Real change."}
                </span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  {st.title ?? "Finding each other"} <em>{st.titleEm ?? "again."}</em>
                </h2>
                <p
                  className={s.twoColBodyLead}
                  style={{ marginTop: "var(--s-6)", maxWidth: "56ch" }}
                >
                  {storyLead}
                </p>
                {storyRest.flatMap((para, idx) => {
                  const els = [
                    <p
                      key={`p-${idx}`}
                      className={s.twoColBody}
                      style={{ marginTop: "var(--s-4)" }}
                    >
                      {para}
                    </p>,
                  ];
                  // Highlighted paragraph sits right after the "My path has since
                  // expanded..." paragraph in Sanity's original body order (idx 1
                  // of storyRest), the spot it occupied before being split out.
                  if (idx === 1 && st.highlightedBody) {
                    els.push(
                      <p
                        key={`hl-${idx}`}
                        className={s.storyHighlight}
                        style={{ marginTop: "var(--s-4)" }}
                      >
                        {st.highlightedBody}
                      </p>,
                    );
                  }
                  return els;
                })}
              </div>
              <div className={s.factsRail}>
                {storyFacts.map((fact, idx) => (
                  <div key={idx} className={s.factsRailItem}>
                    <span className={s.statValue}>{fact.value}</span>
                    <span className={s.statLabel}>{fact.label}</span>
                  </div>
                ))}
                {storyOutsideClinic.length > 0 && (
                  <div className={s.factsRailItem}>
                    <span className="t-label">Outside the clinic</span>
                    <ul
                      style={{
                        listStyle: "none",
                        marginTop: "var(--s-3)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--s-2)",
                      }}
                    >
                      {storyOutsideClinic.map((item, idx) => (
                        <li key={idx} className="t-body-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {storyPullQuotes.length > 0 && (
              <div style={{ marginTop: "var(--s-12)", maxWidth: "56ch" }}>
                {storyPullQuotes.map((pq, idx) => (
                  <blockquote
                    key={idx}
                    className="t-quote"
                    style={idx > 0 ? { marginTop: "var(--s-8)" } : undefined}
                  >
                    {pq.quote}
                    {pq.attribution && (
                      <footer
                        className="t-label"
                        style={{ marginTop: "var(--s-3)", fontStyle: "normal" }}
                      >
                        {pq.attribution}
                      </footer>
                    )}
                  </blockquote>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        {!FLAGS.OMIT_ABOUT_SECTIONS.faq && (
          <section className={`${s.section} ${s.sectionPaper}`}>
            <div className={s.sectionInner}>
              <div className={s.twoCol}>
                <div>
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
        )}

        {/* Closing CTA */}
        {!FLAGS.OMIT_ABOUT_SECTIONS.closingCta && (
          <section className={s.closingCta}>
            <span className="t-label t-label-eyebrow">{c.eyebrow ?? "Begin Your Journey"}</span>
            <h2 className={s.closingTitle}>
              {c.title ?? "Ready to find"} <em>{c.titleEm ?? "your path?"}</em>
            </h2>
            <p className={s.closingBody}>
              {c.body ??
                "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes, it's about meaningful change, one clear step at a time."}
            </p>
            <Link href="/contact" className="btn btn-primary">
              <span className="btn-dot" /> {c.ctaLabel ?? "Start your journey"}
            </Link>
          </section>
        )}

        {/* Prepping the Palace CTA, moved here from the top of the page. */}
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
          <div className={s.heroInnerStacked}>
            <h1 className={s.heroTitle}>
              {h.titleLine1 ?? "Your Path,"} <em>{h.titleEm ?? "Our Purpose."}</em>
            </h1>
            <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>
              {h.eyebrow ?? "About"}
            </span>
            <p className={s.heroLeadLarge}>
              {h.lead ??
                "Find out who we are, what we stand for, and how we can support your journey."}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
