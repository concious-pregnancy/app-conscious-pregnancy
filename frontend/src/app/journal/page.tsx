import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles, tools, and insights to help you find clarity, balance, and direction.",
};

const IMG = "/clearpath-ref/journal";

const blobOutlinePaths = [
  // wisp / outline ring approximations matching XzHb5S2N (lobed top-left)
  "M250 36c-58 6-127 36-150 88-22 50 6 100 30 134 28 38 78 50 122 47 50-3 100-22 124-58 28-43 12-100-26-138-30-30-66-46-100-73z",
  // YRuh4U5T (right-bulge wider)
  "M270 30c-72-2-156 30-186 86-26 50 6 110 38 142 36 36 96 50 144 44 56-7 110-30 132-72 22-44 0-100-32-138-30-36-58-58-96-62z",
  // 4hAvhj6oD (flatter pebble)
  "M270 28c-78 0-160 22-200 70-32 40 0 96 28 130 28 34 84 50 138 48 56-3 110-22 138-58 24-30 18-78-12-118-32-44-50-72-92-72z",
];

const featured = [
  {
    eyebrow: "Reflection · No. 01",
    title: "Learning to Pause Without Guilt.",
    image: `${IMG}/LksF7zMOHE97HJPqXDmb7LSvWE.jpg`,
    excerpt:
      "Taking a break isn't failure, it's part of the process. Here's how to slow down with kindness.",
  },
  {
    eyebrow: "Practice · No. 02",
    title: "What Makes Therapy Work?",
    image: `${IMG}/ZMX4xonC6WvSRyRzHHgOkTDzw4.jpg`,
    excerpt: "Beyond techniques or tools, therapy works best when it feels safe, real, and human.",
  },
];

const articles = [
  {
    eyebrow: "Slowing down · No. 03",
    title: "The Gentle Art of Slowing Down",
    image: `${IMG}/2EIIgE63cU5md9VUpWNs5xhsM.jpg`,
    excerpt:
      "Slowing down is more than just taking a break, it's a conscious choice to live at a pace that allows space for reflection, connection, and clarity. In a world that celebrates speed, learning to slow down can feel radical, but it's a powerful way to reclaim presence and peace.",
  },
  {
    eyebrow: "Release · No. 04",
    title: "Finding Strength in Release",
    image: `${IMG}/LsGrGUWDWx4Ok7pTwhp0PXTTA.jpg`,
    excerpt:
      "Letting go is one of the hardest, and most transformative, things we do. It asks us to release control, loosen our grip, and trust that something better might come in its place.",
  },
  {
    eyebrow: "Self-knowledge · No. 05",
    title: "Listening to Yourself Again.",
    image: `${IMG}/TF67zgMSYINSD7dymhKX4rhrTM.jpg`,
    excerpt:
      "In a noisy world full of advice, opinions, and pressure, it's easy to lose touch with your own voice. We start living on autopilot, doing what's expected instead of what feels true.",
    solo: true,
  },
];

const blobClasses = [s.blob0, s.blob1, s.blob2];

function ArticleItem({
  index,
  title,
  excerpt,
  image,
  eyebrow,
  solo = false,
}: {
  index: number;
  title: string;
  excerpt: string;
  image: string;
  eyebrow: string;
  solo?: boolean;
}) {
  const blobIdx = index % 3;
  const blobClass = blobClasses[blobIdx];
  const outlinePath = blobOutlinePaths[blobIdx];
  return (
    <article className={`${s.articleItem} ${solo ? s.articleItemSolo : ""}`}>
      <div className={`${s.blobFrame} ${blobClass}`}>
        <img src={image} alt="" />
        <svg
          className={s.blobOutline}
          viewBox="0 0 540 405"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d={outlinePath} />
        </svg>
      </div>
      <span className={`t-label t-label-eyebrow`} style={{ marginTop: "var(--s-3)" }}>
        {eyebrow}
      </span>
      <h3 className={s.articleTitle}>{title}</h3>
      <p className={s.articleExcerpt}>{excerpt}</p>
      <Link href="#" className={s.readMorePill}>
        <span className="btn-dot" />
        Read more
      </Link>
    </article>
  );
}

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        {/* Hero with inline wisp line decoration */}
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
            <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>Journal</span>
            <h1 className={s.heroTitle}>
              Insights <em>That Matter.</em>
            </h1>
            <p className={s.heroLead}>
              Articles, tools, and insights to help you find clarity, balance, and direction. Our
              journal is where we share thoughts, stories, and practical tools to help you find
              clarity and balance, and keep moving toward the life you want.
            </p>
          </div>
        </section>

        {/* Featured pair — blob-masked, no card chrome */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <div className={`${s.articleGrid} ${s.articleGridFeatured}`}>
              {featured.map((article, i) => (
                <ArticleItem
                  key={article.title}
                  index={i}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  eyebrow={article.eyebrow}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Article grid — no card chrome, blob masks cycling, solo rows allowed */}
        <section className={`${s.section} ${s.sectionPaper}`}>
          <div className={s.sectionInner}>
            <div style={{ marginBottom: "var(--s-12)" }}>
              <img
                src={`${IMG}/9O8sLldl6mV9miUVjkyrhGJsZ7c.svg`}
                alt=""
                className={s.leafMark}
                aria-hidden="true"
              />
              <span className="t-label t-label-eyebrow">Latest writing</span>
              <h2 className={s.twoColTitle} style={{ marginTop: "1rem", color: "var(--dark)" }}>
                Recent <em>articles.</em>
              </h2>
            </div>
            <div className={s.articleGrid}>
              {articles.map((article, i) => (
                <ArticleItem
                  key={article.title}
                  index={i + featured.length}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  eyebrow={article.eyebrow}
                  solo={article.solo}
                />
              ))}
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
