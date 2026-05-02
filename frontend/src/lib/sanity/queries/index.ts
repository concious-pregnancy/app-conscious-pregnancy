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
  imagePath,
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
