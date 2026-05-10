import { defineField, defineType } from "sanity";

export const servicesPricingType = defineType({
  name: "servicesPricing",
  title: "Services — Pricing",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "sub", title: "Subheading", type: "text", rows: 3 }),
    defineField({
      name: "tiers",
      title: "Tiers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "blurb", title: "Blurb", type: "string" },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
  ],
});
