import { defineType, defineField } from "sanity";

export const pricingSectionType = defineType({
  name: "pricingSection",
  title: "Pricing Section Header",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headingLine1", title: "Heading Line 1", type: "string" }),
    defineField({ name: "headingLine2", title: "Heading Line 2", type: "string" }),
    defineField({ name: "sub", title: "Subheading", type: "text", rows: 3 }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      description: 'Appears on each tier card, e.g. "Get Started"',
    }),
  ],
});
