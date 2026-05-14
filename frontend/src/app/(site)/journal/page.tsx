import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlobImage from "@/components/BlobImage";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { journalIndexPageQuery, journalArticlesFullQuery } from "@/lib/sanity/queries";
import s from "@/components/PageScaffold.module.css";

export const revalidate = 300;

const IMG = "/clearpath-ref/journal";
const LEAF = `${IMG}/9O8sLldl6mV9miUVjkyrhGJsZ7c.svg`;

type SanityImage = { asset?: { _ref?: string } } | null | undefined;

type Article = {
  _id: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
};

type SanityArticle = {
  _id: string;
  title?: string;
  excerpt?: string;
  image?: SanityImage;
  imageAlt?: string;
  slug?: { current?: string };
  eyebrow?: string;
};

type IndexPageData = {
  heroEyebrow?: string;
  heroTitleLine1?: string;
  heroTitleEm?: string;
  heroLead?: string;
  featuredCount?: number;
  gridEyebrow?: string;
  gridTitle?: string;
  gridTitleEm?: string;
  readMoreLabel?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaTitleEm?: string;
  ctaBody?: string;
  ctaLabel?: string;
  ctaHref?: string;
  metaTitle?: string;
  metaDescription?: string;
};

const DEFAULTS = {
  heroEyebrow: "Journal",
  heroTitleLine1: "Insights",
  heroTitleEm: "That Matter.",
  heroLead: "Articles, tools, and insights to help you find clarity, balance, and direction.",
  featuredCount: 2,
  gridEyebrow: "Latest writing",
  gridTitle: "Recent",
  gridTitleEm: "articles.",
  readMoreLabel: "Read more",
  ctaEyebrow: "Begin Your Journey",
  ctaTitle: "Ready to find",
  ctaTitleEm: "your path?",
  ctaBody:
    "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes.",
  ctaLabel: "Start your journey",
  ctaHref: "/#contact",
  metaTitle: "Journal | Conscious Pregnancy",
  metaDescription:
    "Articles, tools, and insights to help you find clarity, balance, and direction.",
};

function imgUrl(image: SanityImage): string | null {
  return image?.asset?._ref ? urlFor(image).width(1600).url() : null;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<IndexPageData | null>(journalIndexPageQuery).catch(() => null);
  return {
    title: data?.metaTitle?.trim() || DEFAULTS.metaTitle,
    description: data?.metaDescription?.trim() || DEFAULTS.metaDescription,
  };
}

function ArticleCard({
  index,
  article,
  readMoreLabel,
  solo = false,
}: {
  index: number;
  article: Article;
  readMoreLabel: string;
  solo?: boolean;
}) {
  return (
    <article className={`${s.articleItem} ${solo ? s.articleItemSolo : ""}`}>
      <Link href={`/journal/${article.slug}`} aria-label={article.title}>
        <BlobImage src={article.image} index={index} />
      </Link>
      <span className="t-label t-label-eyebrow" style={{ marginTop: "var(--s-3)" }}>
        {article.eyebrow}
      </span>
      <h3 className={s.articleTitle}>
        <Link href={`/journal/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className={s.articleExcerpt}>{article.excerpt}</p>
      <Link href={`/journal/${article.slug}`} className={s.readMorePill}>
        <span className="btn-dot" />
        {readMoreLabel}
      </Link>
    </article>
  );
}

export default async function JournalPage() {
  const [indexData, sanityArticles] = await Promise.all([
    client.fetch<IndexPageData | null>(journalIndexPageQuery).catch(() => null),
    client.fetch<SanityArticle[]>(journalArticlesFullQuery).catch(() => [] as SanityArticle[]),
  ]);

  const d = indexData ?? {};
  const heroEyebrow = d.heroEyebrow?.trim() || DEFAULTS.heroEyebrow;
  const heroTitleLine1 = d.heroTitleLine1?.trim() || DEFAULTS.heroTitleLine1;
  const heroTitleEm = d.heroTitleEm?.trim() || DEFAULTS.heroTitleEm;
  const heroLead = d.heroLead?.trim() || DEFAULTS.heroLead;
  const featuredCount = d.featuredCount ?? DEFAULTS.featuredCount;
  const gridEyebrow = d.gridEyebrow?.trim() || DEFAULTS.gridEyebrow;
  const gridTitle = d.gridTitle?.trim() || DEFAULTS.gridTitle;
  const gridTitleEm = d.gridTitleEm?.trim() || DEFAULTS.gridTitleEm;
  const readMoreLabel = d.readMoreLabel?.trim() || DEFAULTS.readMoreLabel;
  const ctaEyebrow = d.ctaEyebrow?.trim() || DEFAULTS.ctaEyebrow;
  const ctaTitle = d.ctaTitle?.trim() || DEFAULTS.ctaTitle;
  const ctaTitleEm = d.ctaTitleEm?.trim() || DEFAULTS.ctaTitleEm;
  const ctaBody = d.ctaBody?.trim() || DEFAULTS.ctaBody;
  const ctaLabel = d.ctaLabel?.trim() || DEFAULTS.ctaLabel;
  const ctaHref = d.ctaHref?.trim() || DEFAULTS.ctaHref;

  const articles: Article[] = sanityArticles
    .map((a, i): Article | null => {
      const image = imgUrl(a.image);
      const slug = a.slug?.current?.trim();
      if (!slug || !image) return null;
      return {
        _id: a._id,
        eyebrow: a.eyebrow?.trim() || `Article · 0${i + 1}`,
        title: a.title?.trim() || "",
        excerpt: a.excerpt?.trim() || "",
        image,
        slug,
      };
    })
    .filter((a): a is Article => a !== null);

  const featured = articles.slice(0, featuredCount);
  const recent = articles.slice(featuredCount);

  return (
    <>
      <Nav />
      <main className={s.pageMain}>
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
                {heroTitleLine1} <em>{heroTitleEm}</em>
              </h1>
              <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>{heroEyebrow}</span>
            </div>
            <p className={s.heroLead}>{heroLead}</p>
          </div>
        </section>

        {featured.length > 0 && (
          <section className={s.section}>
            <div className={s.sectionInner}>
              <div className={`${s.articleGrid} ${s.articleGridFeatured}`}>
                {featured.map((article, i) => (
                  <ArticleCard
                    key={article._id}
                    index={i}
                    article={article}
                    readMoreLabel={readMoreLabel}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {recent.length > 0 && (
          <section className={`${s.section} ${s.sectionPaper}`}>
            <div className={s.sectionInner}>
              <div style={{ marginBottom: "var(--s-12)" }}>
                <img src={LEAF} alt="" className={s.leafMark} aria-hidden="true" />
                <span className="t-label t-label-eyebrow">{gridEyebrow}</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem", color: "var(--dark)" }}>
                  {gridTitle} <em>{gridTitleEm}</em>
                </h2>
              </div>
              <div className={s.articleGrid}>
                {recent.map((article, i) => (
                  <ArticleCard
                    key={article._id}
                    index={i + featured.length}
                    article={article}
                    readMoreLabel={readMoreLabel}
                    solo={i === recent.length - 1 && recent.length % 2 === 1}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={s.closingCta}>
          <span className="t-label t-label-eyebrow">{ctaEyebrow}</span>
          <h2 className={s.closingTitle}>
            {ctaTitle} <em>{ctaTitleEm}</em>
          </h2>
          <p className={s.closingBody}>{ctaBody}</p>
          <Link href={ctaHref} className="btn btn-primary">
            <span className="btn-dot" /> {ctaLabel}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
