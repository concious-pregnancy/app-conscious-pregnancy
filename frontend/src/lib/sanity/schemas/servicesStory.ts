import { defineField, defineType } from "sanity";

export const servicesStoryType = defineType({
  name: "servicesStory",
  title: "Services — Featured Story",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
  ],
});
