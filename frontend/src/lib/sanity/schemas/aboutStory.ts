import { defineField, defineType } from "sanity";

export const aboutStoryType = defineType({
  name: "aboutStory",
  title: "About — Featured Story (offset image pair)",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
    defineField({
      name: "highlightedBody",
      title: "Highlighted paragraph (optional)",
      description:
        "Rendered in the gold accent color, set apart from Body, right after the paragraph that precedes it in Body. Leave blank to render Body as plain paragraphs only.",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({
      name: "imageBack",
      title: "Image (back, right side)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageFront",
      title: "Image (front, left, offset)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "facts",
      title: "Facts Rail",
      description: 'e.g. "10+" / "years in practice", "3,000" / "years of TCM history".',
      type: "array",
      of: [
        {
          type: "object",
          name: "fact",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "pullQuotes",
      title: "Pull Quotes",
      type: "array",
      of: [
        {
          type: "object",
          name: "pullQuote",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
            defineField({ name: "attribution", title: "Attribution", type: "string" }),
          ],
          preview: { select: { title: "quote", subtitle: "attribution" } },
        },
      ],
    }),
    defineField({
      name: "outsideClinic",
      title: "Outside the Clinic",
      description:
        'Short list items, e.g. "Farmer\'s markets", "Her dog, Presley", "1986 VW Westfalia".',
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
