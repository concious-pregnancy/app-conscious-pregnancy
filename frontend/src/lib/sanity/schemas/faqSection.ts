import { defineType, defineField } from "sanity";

export const faqSectionType = defineType({
  name: "faqSection",
  title: "FAQ Section Header",
  type: "document",
  fields: [
    defineField({ name: "headingLine1", title: "Heading Line 1", type: "string" }),
    defineField({ name: "headingLine2Em", title: "Heading Line 2 (italic)", type: "string" }),
  ],
});
