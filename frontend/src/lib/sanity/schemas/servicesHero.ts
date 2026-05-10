import { defineField, defineType } from "sanity";

export const servicesHeroType = defineType({
  name: "servicesHero",
  title: "Services — Hero",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "titleLine1", title: "Title (line 1)", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "lead", title: "Lead Paragraph", type: "text", rows: 3 }),
  ],
});
