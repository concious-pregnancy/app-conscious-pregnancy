import { defineType, defineField } from "sanity";

export const philosophySectionType = defineType({
  name: "philosophySection",
  title: "Philosophy Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "footnote", title: "Footnote", type: "string" }),
  ],
});
