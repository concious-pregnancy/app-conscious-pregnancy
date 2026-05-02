import { defineType, defineField } from "sanity";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headlineLine1", title: "Headline Line 1", type: "string" }),
    defineField({ name: "headlineLine2", title: "Headline Line 2", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 3 }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
    defineField({ name: "credentials", title: "Doctor Credentials", type: "string" }),
    defineField({ name: "footLabel", title: "Footer Label", type: "string" }),
  ],
});
