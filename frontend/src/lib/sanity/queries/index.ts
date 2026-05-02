import { groq } from "next-sanity";

export const faqsQuery = groq`*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer
}`;

export const pricingTiersQuery = groq`*[_type == "pricingTier"] | order(order asc) {
  _id,
  name,
  description,
  price,
  unit,
  featured,
  features
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

export const journalArticlesQuery = groq`*[_type == "journalArticle"] | order(order asc) {
  _id,
  title,
  excerpt,
  image,
  slug
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
