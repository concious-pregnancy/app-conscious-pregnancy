import { defineType, defineField } from "sanity";

export const processSectionType = defineType({
  name: "processSection",
  title: "Process Section",
  type: "document",
  preview: {
    prepare: () => ({ title: "Process Section" }),
  },
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headingLine1", title: "Heading Line 1", type: "string" }),
    defineField({ name: "headingLine2Em", title: "Heading Line 2 (italic)", type: "string" }),
    defineField({ name: "lede", title: "Intro Paragraph", type: "text", rows: 3 }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Step Title", type: "string" }),
            defineField({ name: "body", title: "Step Description", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
  ],
});
