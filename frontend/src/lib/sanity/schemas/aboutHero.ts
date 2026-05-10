import { defineField, defineType } from "sanity";

export const aboutHeroType = defineType({
  name: "aboutHero",
  title: "About — Hero",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "titleLine1", title: "Title (line 1)", type: "string" }),
    defineField({
      name: "titleEm",
      title: "Title (italic accent)",
      type: "string",
      description: "Renders italic-sage on the second line of the hero title.",
    }),
    defineField({ name: "lead", title: "Lead Paragraph", type: "text", rows: 3 }),
  ],
});
