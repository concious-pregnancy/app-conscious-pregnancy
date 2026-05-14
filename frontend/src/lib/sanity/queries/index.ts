import { groq } from "next-sanity";

export const faqsQuery = groq`*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer
}`;

export const faqSectionQuery = groq`*[_type == "faqSection"][0] {
  headingLine1,
  headingLine2Em
}`;

export const pricingTiersQuery = groq`*[_type == "pricingTier"] | order(order asc) {
  _id,
  name,
  description,
  price,
  unit,
  featured,
  features,
  herFeatures,
  hisFeatures
}`;

export const pricingSectionQuery = groq`*[_type == "pricingSection"][0] {
  eyebrow,
  headingLine1,
  headingLine2,
  sub,
  ctaLabel
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  title,
  titleLine2,
  body,
  image,
  trigram,
  slug
}`;

// Slug strings only — for generateStaticParams on /services/[slug].
export const serviceSlugsQuery = groq`*[_type == "service" && defined(slug.current)][].slug.current`;

// Single service + N related (excluding self), keyed by slug.
export const serviceBySlugQuery = groq`{
  "service": *[_type == "service" && slug.current == $slug][0] {
    _id, title, titleLine2, eyebrow, body, image, imageAlt, trigram, slug,
    lead, detailBody, seo
  },
  "related": *[_type == "service" && slug.current != $slug] | order(coalesce(order, 9999) asc) [0...3] {
    _id, title, body, image, imageAlt, slug,
    "eyebrow": coalesce(eyebrow, "Service")
  }
}`;

// Service-detail chrome: shared labels for every /services/[slug] page.
export const servicePageQuery = groq`*[_type == "servicePage"][0] {
  backLinkLabel,
  bodyPlaceholder,
  relatedEyebrow, relatedHeading, relatedReadLabel,
  ctaEyebrow, ctaTitle, ctaTitleEm, ctaBody, ctaLabel, ctaHref,
  metaTitleSuffix
}`;

export const serviceExtrasQuery = groq`*[_type == "serviceExtra"] | order(order asc) {
  _id,
  trigram,
  title,
  body
}`;

export const servicesSectionQuery = groq`*[_type == "servicesSection"][0] {
  eyebrow,
  headingLine1,
  headingLine2Em,
  sub,
  "services": services[]->{
    _id, title, titleLine2, body, image, trigram, slug
  }
}`;

export const journalArticlesQuery = groq`*[_type == "journalArticle"] | order(order asc) {
  _id,
  title,
  excerpt,
  image,
  slug
}`;

export const journalSectionQuery = groq`*[_type == "journalSection"][0] {
  eyebrow,
  headingLine1,
  headingLine2Em,
  sub,
  ctaLabel,
  "articles": articles[]->{
    _id, title, excerpt, image, slug
  }
}`;

export const testimonialQuery = groq`*[_type == "testimonial"][0] {
  _id,
  eyebrow,
  heading,
  body,
  ctaLabel
}`;

export const heroSectionQuery = groq`*[_type == "heroSection"][0] {
  eyebrow,
  headlineLine1,
  headlineLine2,
  subheading,
  primaryCtaLabel,
  secondaryCtaLabel,
  credentials,
  footLabel
}`;

export const balanceSectionQuery = groq`*[_type == "balanceSection"][0] {
  invitationEyebrow,
  invitationHeading,
  invitationBody,
  palaceEyebrow,
  palaceHeading,
  palaceBody,
  palaceCtaLabel
}`;

export const listenSectionQuery = groq`*[_type == "listenSection"][0] {
  quote,
  attribution,
  image
}`;

export const statsSectionQuery = groq`*[_type == "statsSection"][0] {
  intro,
  stats[] { value, label }
}`;

export const processSectionQuery = groq`*[_type == "processSection"][0] {
  eyebrow,
  headingLine1,
  headingLine2Em,
  lede,
  steps[] { title, body }
}`;

export const credentialsSectionQuery = groq`*[_type == "credentialsSection"][0] {
  label,
  title,
  body,
  body2,
  ctaLabel,
  image,
  image2
}`;

export const readySectionQuery = groq`*[_type == "readySection"][0] {
  headingLine1,
  headingEm,
  sub,
  ctaLabel,
  trustLabel,
  ratingText,
  chatIntro,
  chatEmail
}`;

export const contactSectionQuery = groq`*[_type == "contactSection"][0] {
  label,
  headingLine1,
  headingLine2,
  sub,
  formHeading,
  trustLine,
  submitLabel
}`;

export const philosophySectionQuery = groq`*[_type == "philosophySection"][0] {
  eyebrow,
  heading,
  ctaLabel,
  footnote
}`;

export const approachSectionQuery = groq`*[_type == "approachSection"][0] {
  heading,
  headingEm,
  sub
}`;

/* ── About-page section queries ────────────────────────────────── */

export const aboutHeroQuery = groq`*[_type == "aboutHero"][0] {
  eyebrow, titleLine1, titleEm, lead
}`;

export const aboutIntroQuery = groq`*[_type == "aboutIntro"][0] {
  eyebrow, title, titleEm, body
}`;

export const aboutFounderQuery = groq`*[_type == "aboutFounder"][0] {
  eyebrow, title, titleEm, body, image, quote, quoteAttribution
}`;

export const aboutTeamSectionQuery = groq`*[_type == "aboutTeamSection"][0] {
  eyebrow, title, titleEm, sub
}`;

export const teamMembersQuery = groq`*[_type == "teamMember"] | order(order asc) {
  _id, name, role, bio, image
}`;

export const aboutApproachQuery = groq`*[_type == "aboutApproach"][0] {
  title, titleEm, body
}`;

export const aboutPebblesQuery = groq`*[_type == "aboutPebbles"][0] {
  eyebrow, quote, attribution, ctaLabel, image
}`;

export const aboutStoryQuery = groq`*[_type == "aboutStory"][0] {
  eyebrow, title, titleEm, body, ctaLabel, imageBack, imageFront
}`;

export const aboutFaqQuery = groq`*[_type == "aboutFaq"][0] {
  eyebrow, title, titleEm, sub, footnote, items[] { q, a }
}`;

export const aboutCtaQuery = groq`*[_type == "aboutCta"][0] {
  eyebrow, title, titleEm, body, ctaLabel
}`;

/* ── Services-page section queries ─────────────────────────────── */

export const servicesHeroQuery = groq`*[_type == "servicesHero"][0] {
  eyebrow, titleLine1, titleEm, lead
}`;

export const servicesBlocksQuery = groq`*[_type == "servicesBlock"] | order(order asc) {
  _id, eyebrow, title, titleEm, image, paragraphs, ctaLabel, order
}`;

export const servicesStatsQuery = groq`*[_type == "servicesStats"][0] {
  title, titleEm, body, stats[] { value, label }
}`;

export const servicesPricingQuery = groq`*[_type == "servicesPricing"][0] {
  eyebrow, title, titleEm, sub, tiers[] { name, blurb, features }
}`;

export const servicesStoryQuery = groq`*[_type == "servicesStory"][0] {
  eyebrow, title, titleEm, body, image, ctaLabel
}`;

export const servicesFaqQuery = groq`*[_type == "servicesFaq"][0] {
  eyebrow, title, titleEm, sub, footnote, items[] { q, a }
}`;

export const servicesCtaQuery = groq`*[_type == "servicesCta"][0] {
  eyebrow, title, titleEm, body, ctaLabel
}`;

/* ── Journal queries ──────────────────────────────────────────── */

// Index page chrome: hero copy, grid eyebrow + title, closing CTA, SEO meta.
export const journalIndexPageQuery = groq`*[_type == "journalIndexPage"][0] {
  heroEyebrow, heroTitleLine1, heroTitleEm, heroLead,
  featuredCount,
  gridEyebrow, gridTitle, gridTitleEm, readMoreLabel,
  ctaEyebrow, ctaTitle, ctaTitleEm, ctaBody, ctaLabel, ctaHref,
  metaTitle, metaDescription
}`;

// Article-detail chrome: shared labels for every /journal/[slug] page.
export const journalArticlePageQuery = groq`*[_type == "journalArticlePage"][0] {
  backLinkLabel, bylineFallbackAuthor, readingTimeSuffix,
  bodyPlaceholder,
  relatedEyebrow, relatedHeading, relatedReadLabel,
  ctaEyebrow, ctaTitle, ctaTitleEm, ctaBody, ctaLabel, ctaHref,
  metaTitleSuffix
}`;

// All articles, full payload for the index grid.
export const journalArticlesFullQuery = groq`*[_type == "journalArticle"] | order(coalesce(order, 9999) asc, publishedAt desc) {
  _id, title, excerpt, image, imageAlt, slug, publishedAt, readingTime, order,
  "eyebrow": coalesce(eyebrow, "Article")
}`;

// Slug strings only — for generateStaticParams.
export const journalArticleSlugsQuery = groq`*[_type == "journalArticle" && defined(slug.current)][].slug.current`;

// Single article + N related (excluding self), keyed by slug.
export const journalArticleBySlugQuery = groq`{
  "article": *[_type == "journalArticle" && slug.current == $slug][0] {
    _id, title, eyebrow, excerpt, image, imageAlt, slug, publishedAt,
    readingTime, author, tldr, body, seo
  },
  "related": *[_type == "journalArticle" && slug.current != $slug] | order(coalesce(order, 9999) asc, publishedAt desc) [0...3] {
    _id, title, excerpt, image, imageAlt, slug, publishedAt, readingTime,
    "eyebrow": coalesce(eyebrow, "Article")
  }
}`;

/* ── Site-wide chrome ─────────────────────────────────────────── */

export const navSectionQuery = groq`*[_type == "navSection"][0] {
  brandWordPrimary, brandWordItalic, brandAriaLabel,
  navLinks[] { label, href },
  ctaLabel, ctaHref, mobileMenuLabel
}`;

export const footerSectionQuery = groq`*[_type == "footerSection"][0] {
  signupHeadline, signupHeadlineEm, signupSub,
  signupPlaceholder, signupButtonLabel, signupSubmittingLabel,
  signupSuccessMessage, signupFineprint, privacyHref,
  sitemapColumn1[] { label, href },
  sitemapColumn2[] { label, href },
  brandWordPrimary, brandWordItalic, copyrightTemplate
}`;
