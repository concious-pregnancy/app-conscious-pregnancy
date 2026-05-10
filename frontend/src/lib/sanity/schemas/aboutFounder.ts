import { defineField, defineType } from "sanity";

export const aboutFounderType = defineType({
  name: "aboutFounder",
  title: "About — Founder",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({
      name: "body",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "image",
      title: "Full-Bleed Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "quote", title: "Pull Quote", type: "text", rows: 3 }),
    defineField({ name: "quoteAttribution", title: "Quote Attribution", type: "string" }),
  ],
});
