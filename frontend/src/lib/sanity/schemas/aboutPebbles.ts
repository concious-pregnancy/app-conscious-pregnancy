import { defineField, defineType } from "sanity";

export const aboutPebblesType = defineType({
  name: "aboutPebbles",
  title: "About — Pebbles Quote (full-bleed photo)",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({ name: "attribution", title: "Attribution", type: "string" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
