import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlobImage from "@/components/BlobImage";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { journalPageQuery, journalArticlesFullQuery } from "@/lib/sanity/queries";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles, tools, and insights to help you find clarity, balance, and direction.",
};

const IMG = "/clearpath-ref/journal";
const LEAF = `${IMG}/9O8sLldl6mV9miUVjkyrhGJsZ7c.svg`;

type Article = {
  eyebrow: string;
  title: string;
  excerpt: string;
  image: string;
};

const defaults = {
  heroEyebrow: "Journal",
  heroTitleLine1: "Insights",
  heroTitleEm: "That Matter.",
  heroLead:
    "Articles, tools, and insights to help you find clarity, balance, and direction. Our journal is where we share thoughts, stories, and practical tools to help you find clarity and balance, and keep moving toward the life you want.",

  featuredCount: 2,

  recentEyebrow: "Latest writing",
  recentTitle: "Recent",
  recentTitleEm: "articles.",

  ctaEyebrow: "Begin Your Journey",
  ctaTitle: "Ready to find",
  ctaTitleEm: "your path?",
  ctaBody:
    "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes, it's about meaningful change, one clear step at a time.",
  ctaLabel: "Start your journey",
};

const defaultArticles: Article[] = [
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
  },
];

type SanityImage = { asset?: { _ref?: string } } | null | undefined;

function imgUrl(image: SanityImage, fallback: string): string {
  return image?.asset?._ref ? urlFor(image).width(1600).url() : fallback;
}

function ArticleItem({
  index,
  article,
  solo = false,
}: {
  index: number;
  article: Article;
  solo?: boolean;
}) {
  return (
    <article className={`${s.articleItem} ${solo ? s.articleItemSolo : ""}`}>
      <BlobImage src={article.image} index={index} />
      <span className="t-label t-label-eyebrow" style={{ marginTop: "var(--s-3)" }}>
        {article.eyebrow}
      </span>
      <h3 className={s.articleTitle}>{article.title}</h3>
      <p className={s.articleExcerpt}>{article.excerpt}</p>
      <Link href="#" className={s.readMorePill}>
        <span className="btn-dot" />
        Read more
      </Link>
    </article>
  );
}

export default async function JournalPage() {
  const fetchOpts = { cache: "no-store" } as const;
  const [content, sanityArticles] = await Promise.all([
    client.fetch(journalPageQuery, {}, fetchOpts),
    client.fetch(journalArticlesFullQuery, {}, fetchOpts),
  ]);
  const c = content ?? {};
  const articles: Article[] =
    sanityArticles && sanityArticles.length > 0
      ? sanityArticles.map(
          (
            a: {
              eyebrow?: string;
              title?: string;
              excerpt?: string;
              image?: SanityImage;
              order?: number;
            },
            i: number,
          ) => ({
            eyebrow: a.eyebrow ?? `Article · 0${i + 1}`,
            title: a.title ?? "",
            excerpt: a.excerpt ?? "",
            image: imgUrl(a.image, defaultArticles[i % defaultArticles.length].image),
          }),
        )
      : defaultArticles;

  const featuredCount = c.featuredCount ?? defaults.featuredCount;
  const featured = articles.slice(0, featuredCount);
  const recent = articles.slice(featuredCount);

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

        {/* Featured pair */}
        {featured.length > 0 && (
          <section className={s.section}>
            <div className={s.sectionInner}>
              <div className={`${s.articleGrid} ${s.articleGridFeatured}`}>
                {featured.map((article, i) => (
                  <ArticleItem key={article.title + i} index={i} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent articles */}
        {recent.length > 0 && (
          <section className={`${s.section} ${s.sectionPaper}`}>
            <div className={s.sectionInner}>
              <div style={{ marginBottom: "var(--s-12)" }}>
                <img src={LEAF} alt="" className={s.leafMark} aria-hidden="true" />
                <span className="t-label t-label-eyebrow">
                  {c.recentEyebrow ?? defaults.recentEyebrow}
                </span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem", color: "var(--dark)" }}>
                  {c.recentTitle ?? defaults.recentTitle}{" "}
                  <em>{c.recentTitleEm ?? defaults.recentTitleEm}</em>
                </h2>
              </div>
              <div className={s.articleGrid}>
                {recent.map((article, i) => (
                  <ArticleItem
                    key={article.title + i}
                    index={i + featured.length}
                    article={article}
                    solo={i === recent.length - 1 && recent.length % 2 === 1}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

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
