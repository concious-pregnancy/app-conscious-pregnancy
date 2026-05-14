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
import { serviceBySlugQuery, servicePageQuery, serviceSlugsQuery } from "@/lib/sanity/queries";
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

type Service = {
  _id: string;
  title?: string;
  titleLine2?: string;
  eyebrow?: string;
  body?: string;
  image?: SanityImage;
  imageAlt?: string;
  trigram?: string;
  slug?: { current?: string };
  lead?: string;
  detailBody?: PortableTextBlock[];
  seo?: { title?: string; description?: string };
};

type RelatedService = {
  _id: string;
  title?: string;
  body?: string;
  image?: SanityImage;
  imageAlt?: string;
  slug?: { current?: string };
  eyebrow?: string;
};

type ServicePageData = {
  backLinkLabel?: string;
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
  backLinkLabel: "← All services",
  bodyPlaceholder: "Details for this service are being written. Check back soon.",
  relatedEyebrow: "Continue exploring",
  relatedHeading: "More ways we work together.",
  relatedReadLabel: "Learn more",
  ctaEyebrow: "Begin Your Journey",
  ctaTitle: "Ready to begin",
  ctaTitleEm: "your work?",
  ctaBody:
    "Discovery calls are free, hour-long, and unhurried. We talk about where you are, what you've tried, and whether this is the right fit before anything is booked.",
  ctaLabel: "Book a discovery call",
  ctaHref: "/#contact",
  metaTitleSuffix: " | Services | Conscious Pregnancy",
};

function imgUrl(image: SanityImage, width = 1600): string | null {
  return image?.asset?._ref ? urlFor(image).width(width).url() : null;
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
  const slugs = await client.fetch<string[]>(serviceSlugsQuery).catch(() => [] as string[]);
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
      .fetch<{ service: Service | null }>(serviceBySlugQuery, { slug })
      .catch(() => ({ service: null })),
    client.fetch<ServicePageData | null>(servicePageQuery).catch(() => null),
  ]);
  const service = data.service;
  if (!service) return { title: "Service not found" };
  const baseTitle = service.seo?.title?.trim() || service.title?.trim() || "Service";
  const suffix = chrome?.metaTitleSuffix ?? DEFAULTS.metaTitleSuffix;
  return {
    title: baseTitle + suffix,
    description: service.seo?.description?.trim() || service.body?.trim() || undefined,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [data, chromeData] = await Promise.all([
    client
      .fetch<{ service: Service | null; related: RelatedService[] }>(serviceBySlugQuery, { slug })
      .catch(() => ({ service: null, related: [] as RelatedService[] })),
    client.fetch<ServicePageData | null>(servicePageQuery).catch(() => null),
  ]);

  const service = data.service;
  if (!service) notFound();

  const c = chromeData ?? {};
  const backLinkLabel = c.backLinkLabel?.trim() || DEFAULTS.backLinkLabel;
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

  const heroImage = imgUrl(service.image, 1800);
  const lead = service.lead?.trim() || service.body?.trim() || "";

  const related = (data.related ?? [])
    .map((r): (RelatedService & { url: string; image: string }) | null => {
      const url = r.slug?.current?.trim();
      const image = imgUrl(r.image);
      if (!url || !image) return null;
      return { ...r, url: `/services/${url}`, image };
    })
    .filter((r): r is RelatedService & { url: string; image: string } => r !== null);

  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              <Link
                href="/services"
                className="t-label t-label-eyebrow"
                style={{ display: "inline-block", marginBottom: "var(--s-3)" }}
              >
                {backLinkLabel}
              </Link>
              {service.eyebrow ? (
                <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>
                  {service.eyebrow}
                </span>
              ) : null}
              <h1 className={s.heroTitle}>
                {service.title}
                {service.titleLine2 ? (
                  <>
                    {" "}
                    <em>{service.titleLine2}</em>
                  </>
                ) : null}
              </h1>
              {lead ? <p className={s.heroLead}>{lead}</p> : null}
            </div>
          </div>
        </section>

        {heroImage ? (
          <section className={s.section}>
            <div className={s.sectionInner}>
              <img
                src={heroImage}
                alt={service.imageAlt ?? service.title ?? ""}
                style={{ width: "100%", height: "auto", borderRadius: "var(--radius-lg, 0.75rem)" }}
              />
            </div>
          </section>
        ) : null}

        <section className={s.section}>
          <div className={s.sectionInner} style={{ maxWidth: "48rem" }}>
            {service.detailBody && service.detailBody.length > 0 ? (
              <PortableText value={service.detailBody} components={portableComponents} />
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
                    {r.body ? <p className={s.articleExcerpt}>{r.body}</p> : null}
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
