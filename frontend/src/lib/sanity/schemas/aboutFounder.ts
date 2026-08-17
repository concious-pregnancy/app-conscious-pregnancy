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
      description: "Fallback rendering. Prefer Chapters below for the chaptered narrative layout.",
    }),
    defineField({
      name: "chapters",
      title: "Chapters",
      description:
        "5 numbered chapters rendered with a sticky rail nav. Falls back to Body Paragraphs when empty.",
      type: "array",
      of: [
        {
          type: "object",
          name: "chapter",
          fields: [
            defineField({ name: "label", title: "Rail Label", type: "string" }),
            defineField({ name: "title", title: "Chapter Title", type: "string" }),
            defineField({ name: "body", title: "Chapter Body", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "title", subtitle: "label" } },
        },
      ],
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
