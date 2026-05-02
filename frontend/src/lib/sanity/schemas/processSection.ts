import { defineType, defineField } from "sanity";

export const processSectionType = defineType({
  name: "processSection",
  title: "Process Section",
  type: "document",
  preview: {
    prepare: () => ({ title: "Process Section" }),
  },
  fields: [
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
