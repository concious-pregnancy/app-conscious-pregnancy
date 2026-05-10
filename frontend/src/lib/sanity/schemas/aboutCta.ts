import { defineField, defineType } from "sanity";

export const aboutCtaType = defineType({
  name: "aboutCta",
  title: "About — Closing CTA",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
  ],
});
