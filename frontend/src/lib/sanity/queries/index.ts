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
  trigram
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
  sub
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
  ctaLabel
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
