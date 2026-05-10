import { defineField, defineType } from "sanity";

export const servicesFaqType = defineType({
  name: "servicesFaq",
  title: "Services — FAQ Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "sub", title: "Subheading", type: "text", rows: 2 }),
    defineField({ name: "footnote", title: "Footnote", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", title: "Question", type: "string" },
            { name: "a", title: "Answer", type: "text", rows: 3 },
          ],
        },
      ],
    }),
  ],
});
