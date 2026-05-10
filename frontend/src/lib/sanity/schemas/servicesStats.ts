import { defineField, defineType } from "sanity";

export const servicesStatsType = defineType({
  name: "servicesStats",
  title: "Services — Stats",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({
      name: "stats",
      title: "Stat Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),
  ],
});
