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
  ],
});
