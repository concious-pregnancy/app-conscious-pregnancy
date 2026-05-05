import { defineType, defineField } from "sanity";

export const approachSectionType = defineType({
  name: "approachSection",
  title: "Approach Section",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "text", rows: 2 }),
    defineField({ name: "headingEm", title: "Heading Italic Suffix", type: "string" }),
    defineField({ name: "sub", title: "Subheading", type: "text", rows: 3 }),
  ],
});
