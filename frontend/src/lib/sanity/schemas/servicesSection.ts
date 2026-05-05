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
  ],
});
