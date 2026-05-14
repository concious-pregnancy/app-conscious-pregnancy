import { defineType, defineField } from "sanity";

export const servicesSectionType = defineType({
  name: "servicesSection",
  title: "Services Section Header",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headingLine1", title: "Heading Line 1", type: "string" }),
    defineField({ name: "headingLine2Em", title: "Heading Line 2 (italic)", type: "string" }),
    defineField({ name: "sub", title: "Subheading Paragraph", type: "text", rows: 3 }),
    defineField({
      name: "services",
      title: "Services Shown on Home Page",
      description:
        "Pick which services appear in the home page section. Drag to reorder. Leave empty to fall back to all services in order.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
  ],
});
