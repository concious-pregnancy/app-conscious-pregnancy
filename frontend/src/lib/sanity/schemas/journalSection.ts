import { defineType, defineField } from "sanity";

export const journalSectionType = defineType({
  name: "journalSection",
  title: "Journal Section Header",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headingLine1", title: "Heading Line 1", type: "string" }),
    defineField({ name: "headingLine2Em", title: "Heading Line 2 (italic)", type: "string" }),
    defineField({ name: "sub", title: "Subheading", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({
      name: "articles",
      title: "Articles Shown on Home Page",
      description:
        "Pick which journal articles appear in the home page section. Drag to reorder. Leave empty to fall back to the most recent articles.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "journalArticle" }] }],
    }),
  ],
});
