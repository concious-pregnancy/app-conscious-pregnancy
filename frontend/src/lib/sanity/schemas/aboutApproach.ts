import { defineField, defineType } from "sanity";

export const aboutApproachType = defineType({
  name: "aboutApproach",
  title: "About — Approach Summary",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
  ],
});
