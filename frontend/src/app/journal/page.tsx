import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlobImage from "@/components/BlobImage";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import {
  journalHeroQuery,
  journalRecentQuery,
  journalCtaQuery,
  journalArticlesFullQuery,
} from "@/lib/sanity/queries";
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

const fallbackArticles: Article[] = [
  {
    eyebrow: "Reflection · No. 01",
    title: "Learning to Pause Without Guilt.",
    image: `${IMG}/LksF7zMOHE97HJPqXDmb7LSvWE.jpg`,
    excerpt:
      "Taking a break isn't failure, it's part of the process. Here's how to slow down with kindness.",
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
  const opts = { cache: "no-store" } as const;
  const [hero, recent, cta, sanityArticles] = await Promise.all([
    client.fetch(journalHeroQuery, {}, opts),
    client.fetch(journalRecentQuery, {}, opts),
    client.fetch(journalCtaQuery, {}, opts),
    client.fetch(journalArticlesFullQuery, {}, opts),
  ]);

  const h = hero ?? {};
  const r = recent ?? {};
  const c = cta ?? {};

  const articles: Article[] =
    sanityArticles && sanityArticles.length > 0
      ? sanityArticles.map(
          (
            a: {
              eyebrow?: string;
              title?: string;
              excerpt?: string;
              image?: SanityImage;
            },
            i: number,
          ) => ({
            eyebrow: a.eyebrow ?? `Article · 0${i + 1}`,
            title: a.title ?? "",
            excerpt: a.excerpt ?? "",
            image: imgUrl(a.image, fallbackArticles[i % fallbackArticles.length].image),
          }),
        )
      : fallbackArticles;

  const featuredCount = r.featuredCount ?? 2;
  const featured = articles.slice(0, featuredCount);
  const recentItems = articles.slice(featuredCount);

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
                {h.titleLine1 ?? "Insights"} <em>{h.titleEm ?? "That Matter."}</em>
              </h1>
              <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>
                {h.eyebrow ?? "Journal"}
              </span>
            </div>
            <p className={s.heroLead}>
              {h.lead ??
                "Articles, tools, and insights to help you find clarity, balance, and direction."}
            </p>
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
        {recentItems.length > 0 && (
          <section className={`${s.section} ${s.sectionPaper}`}>
            <div className={s.sectionInner}>
              <div style={{ marginBottom: "var(--s-12)" }}>
                <img src={LEAF} alt="" className={s.leafMark} aria-hidden="true" />
                <span className="t-label t-label-eyebrow">{r.eyebrow ?? "Latest writing"}</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem", color: "var(--dark)" }}>
                  {r.title ?? "Recent"} <em>{r.titleEm ?? "articles."}</em>
                </h2>
              </div>
              <div className={s.articleGrid}>
                {recentItems.map((article, i) => (
                  <ArticleItem
                    key={article.title + i}
                    index={i + featured.length}
                    article={article}
                    solo={i === recentItems.length - 1 && recentItems.length % 2 === 1}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Closing CTA */}
        <section className={s.closingCta}>
          <span className="t-label t-label-eyebrow">{c.eyebrow ?? "Begin Your Journey"}</span>
          <h2 className={s.closingTitle}>
            {c.title ?? "Ready to find"} <em>{c.titleEm ?? "your path?"}</em>
          </h2>
          <p className={s.closingBody}>
            {c.body ??
              "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes."}
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
