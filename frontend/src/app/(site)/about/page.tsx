import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlobImage from "@/components/BlobImage";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { aboutPageQuery, servicesCtaQuery } from "@/lib/sanity/queries";
import { FLAGS } from "@/flags";
import { pageMetadata } from "@/lib/og";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = pageMetadata({
  title: "About | Conscious Pregnancy",
  description: "Find out who we are, what we stand for, and how we can support your journey.",
  path: "/about",
});

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

// idx controls the surface/reverse alternation between the two named band fields
// (introBandBeforeFounder renders first, introBandAfterFounder after "My Story").
function BandSection({
  band,
  idx,
  showCredentials,
}: {
  band: Band;
  idx: number;
  showCredentials?: boolean;
}) {
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
        {showCredentials && (
          <>
            <p className={s.bandName}>Dr. Ashley Alden</p>
            <p className={s.bandCredentials}>L.Ac., DACM, MTOM, Dip. of O.M.</p>
          </>
        )}
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
  const [aboutPage, servicesCta] = await Promise.all([
    client.fetch(aboutPageQuery, {}, opts),
    client.fetch(servicesCtaQuery, {}, opts),
  ]);

  const a = aboutPage ?? {};
  const sc = servicesCta ?? {};

  const teamList: { name: string; role: string; bio: string; image: string }[] =
    a.teamMembers && a.teamMembers.length > 0
      ? a.teamMembers.map(
          (m: { name?: string; role?: string; bio?: string; image?: SanityImage }) => ({
            name: m.name ?? "",
            role: m.role ?? "Therapist",
            bio: m.bio ?? "",
            image: imgUrl(m.image, fallbackTeam[0].image),
          }),
        )
      : fallbackTeam;
  const founderBody: string[] = a.founderBody && a.founderBody.length > 0 ? a.founderBody : [];
  const founderChapters: { label?: string; title?: string; body?: string }[] =
    a.founderChapters ?? [];
  // founderBody[0] can hold the full multi-paragraph bio as one \n-joined string
  // (legacy data entry); the chaptered view only wants the first paragraph as its lead.
  const founderLead = founderBody[0]?.split("\n")[0];
  const storyFacts: { value?: string; label?: string }[] = a.storyFacts ?? [];
  const storyPullQuotes: { quote?: string; attribution?: string }[] = a.storyPullQuotes ?? [];
  const storyOutsideClinic: string[] = a.storyOutsideClinic ?? [];
  const bandBeforeFounder: Band = a.introBandBeforeFounder ?? {};
  const bandAfterFounder: Band = a.introBandAfterFounder ?? {};
  const hasIntroBand = Boolean(
    bandBeforeFounder.title || bandBeforeFounder.body || bandBeforeFounder.eyebrow,
  );
  const faqs: { q: string; a: string }[] = a.faqItems && a.faqItems.length > 0 ? a.faqItems : [];

  const pebblesImg = imgUrl(a.pebblesImage, `${IMG}/RQK6FjdwGi88lXjfiA3iUnV5rvc.jpg`);
  const introBody =
    a.introBody ??
    "At Conscious Pregnancy, every journey is unique, and so is the support it deserves.";
  const { lead: introLead, rest: introRest } = splitIntroBody(introBody);
  const storyBody: string = a.storyBody ?? "";
  // storyBody's paragraphs are separated by real newlines (not sentence-regex splittable,
  // since T.C.M./L.Ac. abbreviation periods would fragment the naive splitIntroBody split).
  const [storyLead, ...storyRest] = storyBody.split("\n").filter(Boolean);

  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        {/* Intro (band renders here; second band moves after "My Story") */}
        {hasIntroBand ? (
          <section className={s.bandSection}>
            <BandSection band={bandBeforeFounder} idx={0} showCredentials />
          </section>
        ) : (
          <section className={`${s.section} ${s.sectionPaper}`}>
            <div className={s.sectionInner}>
              <div className={s.twoCol}>
                <div>
                  <span className="t-label t-label-eyebrow">
                    {a.introEyebrow ?? "The Way We Help"}
                  </span>
                  <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                    {a.introTitle ?? "We start by"}{" "}
                    <em>{a.introTitleEm ?? "listening, really listening."}</em>
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
            <span className="t-label t-label-eyebrow">
              {a.founderEyebrow ?? "Meet our founder"}
            </span>
            <h2 className={s.twoColTitle} style={{ marginTop: "1rem", maxWidth: "16ch" }}>
              {a.founderTitle ?? "Meet"} <em>{a.founderTitleEm ?? "Our Founder."}</em>
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

        {/* Second intro band renders here, after "My Story," per redesign feedback. */}
        {Boolean(bandAfterFounder.title || bandAfterFounder.body || bandAfterFounder.eyebrow) && (
          <section className={s.bandSection}>
            <BandSection band={bandAfterFounder} idx={1} />
          </section>
        )}

        {/* Team */}
        {!FLAGS.OMIT_ABOUT_SECTIONS.team && (
          <section className={`${s.section} ${s.sectionOffWhite}`}>
            <div className={s.sectionInner}>
              <div style={{ marginBottom: "var(--s-12)", textAlign: "center" }}>
                <span className="t-label t-label-eyebrow">{a.teamEyebrow ?? "Our team"}</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem", marginInline: "auto" }}>
                  {a.teamTitle ?? "The People Who"} <em>{a.teamTitleEm ?? "Walk Beside You."}</em>
                </h2>
                <p className={s.twoColBody} style={{ marginTop: "1.5rem", marginInline: "auto" }}>
                  {a.teamSub ??
                    "Conscious Pregnancy is more than a service, each member of our team is here to listen, guide, and support you at your own pace."}
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
                {a.pebblesEyebrow ?? "Real people. Real change."}
              </span>
              <blockquote>
                {a.pebblesQuote ??
                  "Every path is unique, the important thing is taking the next step, no matter how small."}
              </blockquote>
              <p className="t-label" style={{ marginTop: "var(--s-4)" }}>
                {a.pebblesAttribution ?? "Dr. Ashley Alden · Founder of Conscious Pregnancy"}
              </p>
              <Link
                href="/contact"
                className="btn btn-ghost-light"
                style={{ marginTop: "var(--s-6)" }}
              >
                <span className="btn-dot" /> {a.pebblesCtaLabel ?? "Start your journey"}
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
                  {a.storyEyebrow ?? "Real people. Real change."}
                </span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                  {a.storyTitle ?? "Finding each other"} <em>{a.storyTitleEm ?? "again."}</em>
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
                  if (idx === 1 && a.storyHighlightedBody) {
                    els.push(
                      <p
                        key={`hl-${idx}`}
                        className={s.storyHighlight}
                        style={{ marginTop: "var(--s-4)" }}
                      >
                        {a.storyHighlightedBody}
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
                  <span className="t-label t-label-eyebrow">{a.faqEyebrow ?? "FAQ"}</span>
                  <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                    {a.faqTitle ?? "Your questions."} <em>{a.faqTitleEm ?? "Answered."}</em>
                  </h2>
                  <p className={s.twoColBody} style={{ marginTop: "var(--s-6)" }}>
                    {a.faqSub ?? "Not sure what to expect? These answers might help."}
                  </p>
                  {a.faqFootnote && (
                    <p className="t-body-sm" style={{ marginTop: "var(--s-4)", maxWidth: "40ch" }}>
                      {a.faqFootnote}
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
            <span className="t-label t-label-eyebrow">{a.ctaEyebrow ?? "Begin Your Journey"}</span>
            <h2 className={s.closingTitle}>
              {a.ctaTitle ?? "Ready to find"} <em>{a.ctaTitleEm ?? "your path?"}</em>
            </h2>
            <p className={s.closingBody}>
              {a.ctaBody ??
                "If this story resonates with you, maybe it's time to start your own. Change happens one clear step at a time."}
            </p>
            <Link href="/contact" className="btn btn-primary">
              <span className="btn-dot" /> {a.ctaLabel ?? "Start your journey"}
            </Link>
          </section>
        )}

        {/* Closing CTA, matching the Services page's final section. */}
        <section className={s.closingCta}>
          <span className="t-label t-label-eyebrow">{sc.eyebrow ?? "Book a session"}</span>
          <h2 className={s.closingTitle}>
            {sc.title ?? "Support starts with a"} <em>{sc.titleEm ?? "simple step."}</em>
          </h2>
          <p className={s.closingBody}>
            {sc.body ??
              "Whether you're starting fresh, returning, or exploring options, we're here."}
          </p>
          <Link href="/contact" className="btn btn-primary">
            <span className="btn-dot" /> {sc.ctaLabel ?? "Book a session"}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
