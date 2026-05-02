import { defineType, defineField } from "sanity";

export const statsSectionType = defineType({
  name: "statsSection",
  title: "Stats Section",
  type: "document",
  preview: {
    prepare: () => ({ title: "Stats Section" }),
  },
  fields: [
    defineField({ name: "intro", title: "Intro Text", type: "text", rows: 3 }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
