import { defineField, defineType } from "sanity";

export const aboutIntroType = defineType({
  name: "aboutIntro",
  title: "About — Intro",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 6 }),
  ],
});
