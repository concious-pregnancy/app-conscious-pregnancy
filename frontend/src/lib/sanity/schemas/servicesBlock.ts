import { defineField, defineType } from "sanity";

export const servicesBlockType = defineType({
  name: "servicesBlock",
  title: "Services — Service Block",
  type: "document",
  description: "Each block renders as its own full-bleed dark photographic section.",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({
      name: "image",
      title: "Background Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "paragraphs",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
});
