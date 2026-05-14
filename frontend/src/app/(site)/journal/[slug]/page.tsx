import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlobImage from "@/components/BlobImage";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import {
  journalArticleBySlugQuery,
  journalArticlePageQuery,
  journalArticleSlugsQuery,
} from "@/lib/sanity/queries";
import s from "@/components/PageScaffold.module.css";

export const revalidate = 300;

type SanityImage =
  | {
      asset?: { _ref?: string };
      alt?: string;
      caption?: string;
    }
  | null
  | undefined;

type Author = { name?: string; role?: string };

type Article = {
  _id: string;
  title?: string;
  eyebrow?: string;
  excerpt?: string;
  image?: SanityImage;
  imageAlt?: string;
  slug?: { current?: string };
  publishedAt?: string;
  readingTime?: number;
  author?: Author;
  tldr?: string[];
  body?: PortableTextBlock[];
  seo?: { title?: string; description?: string };
};

type RelatedArticle = {
  _id: string;
  title?: string;
  excerpt?: string;
  image?: SanityImage;
  imageAlt?: string;
  slug?: { current?: string };
  publishedAt?: string;
  readingTime?: number;
  eyebrow?: string;
};

type ArticlePageData = {
  backLinkLabel?: string;
  bylineFallbackAuthor?: string;
  readingTimeSuffix?: string;
  bodyPlaceholder?: string;
  relatedEyebrow?: string;
  relatedHeading?: string;
  relatedReadLabel?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaTitleEm?: string;
  ctaBody?: string;
  ctaLabel?: string;
  ctaHref?: string;
  metaTitleSuffix?: string;
};

const DEFAULTS = {
  backLinkLabel: "← All articles",
  bylineFallbackAuthor: "Dr. Ashley Alden",
  readingTimeSuffix: "min read",
  bodyPlaceholder: "This article is being written. Check back soon.",
  relatedEyebrow: "Continue reading",
  relatedHeading: "More from the journal.",
  relatedReadLabel: "Read more",
  ctaEyebrow: "Begin Your Journey",
  ctaTitle: "Ready to begin",
  ctaTitleEm: "your work?",
  ctaBody:
    "Discovery calls are free, hour-long, and unhurried. We talk about where you are, what you've tried, and whether this is the right fit before anything is booked.",
  ctaLabel: "Book a discovery call",
  ctaHref: "/#contact",
  metaTitleSuffix: " | Journal | Conscious Pregnancy",
};

function imgUrl(image: SanityImage, width = 1600): string | null {
  return image?.asset?._ref ? urlFor(image).width(width).url() : null;
}

function formatDate(iso: string | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      const url = imgUrl(value, 1400);
      if (!url) return null;
      return (
        <figure style={{ margin: "var(--s-12) 0" }}>
          <img src={url} alt={value?.alt ?? ""} style={{ width: "100%", height: "auto" }} />
          {value?.caption ? (
            <figcaption style={{ marginTop: "var(--s-3)", fontSize: "0.875rem", opacity: 0.7 }}>
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; blank?: boolean };
      children: React.ReactNode;
    }) => {
      const href = value?.href ?? "#";
      const target = value?.blank ? "_blank" : undefined;
      const rel = value?.blank ? "noopener noreferrer" : undefined;
      return (
        <a href={href} target={target} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await client.fetch<string[]>(journalArticleSlugsQuery).catch(() => [] as string[]);
  return slugs.filter(Boolean).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [data, chrome] = await Promise.all([
    client
      .fetch<{ article: Article | null }>(journalArticleBySlugQuery, { slug })
      .catch(() => ({ article: null })),
    client.fetch<ArticlePageData | null>(journalArticlePageQuery).catch(() => null),
  ]);
  const article = data.article;
  if (!article) return { title: "Article not found" };
  const baseTitle = article.seo?.title?.trim() || article.title?.trim() || "Article";
  const suffix = chrome?.metaTitleSuffix ?? DEFAULTS.metaTitleSuffix;
  return {
    title: baseTitle + suffix,
    description: article.seo?.description?.trim() || article.excerpt?.trim() || undefined,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [data, chromeData] = await Promise.all([
    client
      .fetch<{ article: Article | null; related: RelatedArticle[] }>(journalArticleBySlugQuery, {
        slug,
      })
      .catch(() => ({ article: null, related: [] as RelatedArticle[] })),
    client.fetch<ArticlePageData | null>(journalArticlePageQuery).catch(() => null),
  ]);

  const article = data.article;
  if (!article) notFound();

  const c = chromeData ?? {};
  const backLinkLabel = c.backLinkLabel?.trim() || DEFAULTS.backLinkLabel;
  const bylineFallback = c.bylineFallbackAuthor?.trim() || DEFAULTS.bylineFallbackAuthor;
  const readingTimeSuffix = c.readingTimeSuffix?.trim() || DEFAULTS.readingTimeSuffix;
  const bodyPlaceholder = c.bodyPlaceholder?.trim() || DEFAULTS.bodyPlaceholder;
  const relatedEyebrow = c.relatedEyebrow?.trim() || DEFAULTS.relatedEyebrow;
  const relatedHeading = c.relatedHeading?.trim() || DEFAULTS.relatedHeading;
  const relatedReadLabel = c.relatedReadLabel?.trim() || DEFAULTS.relatedReadLabel;
  const ctaEyebrow = c.ctaEyebrow?.trim() || DEFAULTS.ctaEyebrow;
  const ctaTitle = c.ctaTitle?.trim() || DEFAULTS.ctaTitle;
  const ctaTitleEm = c.ctaTitleEm?.trim() || DEFAULTS.ctaTitleEm;
  const ctaBody = c.ctaBody?.trim() || DEFAULTS.ctaBody;
  const ctaLabel = c.ctaLabel?.trim() || DEFAULTS.ctaLabel;
  const ctaHref = c.ctaHref?.trim() || DEFAULTS.ctaHref;

  const heroImage = imgUrl(article.image, 1800);
  const author = article.author?.name?.trim() || bylineFallback;
  const dateLabel = formatDate(article.publishedAt);
  const readingLabel = article.readingTime ? `${article.readingTime} ${readingTimeSuffix}` : null;

  const related = (data.related ?? [])
    .map((r): (RelatedArticle & { url: string; image: string }) | null => {
      const url = r.slug?.current?.trim();
      const image = imgUrl(r.image);
      if (!url || !image) return null;
      return { ...r, url: `/journal/${url}`, image };
    })
    .filter((r): r is RelatedArticle & { url: string; image: string } => r !== null);

  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              <Link
                href="/journal"
                className="t-label t-label-eyebrow"
                style={{ display: "inline-block", marginBottom: "var(--s-3)" }}
              >
                {backLinkLabel}
              </Link>
              {article.eyebrow ? (
                <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>
                  {article.eyebrow}
                </span>
              ) : null}
              <h1 className={s.heroTitle}>{article.title}</h1>
              <p className={s.heroLead} style={{ opacity: 0.85 }}>
                {[author, dateLabel, readingLabel].filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>
        </section>

        {heroImage ? (
          <section className={s.section}>
            <div className={s.sectionInner}>
              <img
                src={heroImage}
                alt={article.imageAlt ?? article.title ?? ""}
                style={{ width: "100%", height: "auto", borderRadius: "var(--radius-lg, 0.75rem)" }}
              />
            </div>
          </section>
        ) : null}

        {article.tldr && article.tldr.length > 0 ? (
          <section className={`${s.section} ${s.sectionPaper}`}>
            <div className={s.sectionInner} style={{ maxWidth: "48rem" }}>
              <span className="t-label t-label-eyebrow">TL;DR</span>
              <ul style={{ marginTop: "var(--s-3)", paddingLeft: "1.25rem" }}>
                {article.tldr.map((bullet, i) => (
                  <li key={i} style={{ marginBottom: "var(--s-2)" }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className={s.section}>
          <div className={s.sectionInner} style={{ maxWidth: "48rem" }}>
            {article.body && article.body.length > 0 ? (
              <PortableText value={article.body} components={portableComponents} />
            ) : (
              <p>{bodyPlaceholder}</p>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <section className={`${s.section} ${s.sectionPaper}`}>
            <div className={s.sectionInner}>
              <div style={{ marginBottom: "var(--s-12)" }}>
                <span className="t-label t-label-eyebrow">{relatedEyebrow}</span>
                <h2 className={s.twoColTitle} style={{ marginTop: "1rem", color: "var(--dark)" }}>
                  {relatedHeading}
                </h2>
              </div>
              <div className={s.articleGrid}>
                {related.map((r, i) => (
                  <article key={r._id} className={s.articleItem}>
                    <Link href={r.url} aria-label={r.title}>
                      <BlobImage src={r.image} index={i} />
                    </Link>
                    <span className="t-label t-label-eyebrow" style={{ marginTop: "var(--s-3)" }}>
                      {r.eyebrow}
                    </span>
                    <h3 className={s.articleTitle}>
                      <Link href={r.url}>{r.title}</Link>
                    </h3>
                    {r.excerpt ? <p className={s.articleExcerpt}>{r.excerpt}</p> : null}
                    <Link href={r.url} className={s.readMorePill}>
                      <span className="btn-dot" />
                      {relatedReadLabel}
                    </Link>
                  </article>
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
