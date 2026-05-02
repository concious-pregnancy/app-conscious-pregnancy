import { defineField, defineType } from "sanity";

export const pricingTierType = defineType({
  name: "pricingTier",
  title: "Pricing Tier",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: 'e.g. "$49"',
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      description: 'e.g. "/ month"',
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Highlighted tier on the pricing grid",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
});
