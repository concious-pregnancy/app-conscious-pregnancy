import { defineType, defineField } from "sanity";

export const contactSectionType = defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "headingLine1", title: "Heading Line 1", type: "string" }),
    defineField({ name: "headingLine2", title: "Heading Line 2", type: "string" }),
    defineField({ name: "sub", title: "Subheading", type: "text", rows: 3 }),
    defineField({ name: "formHeading", title: "Form Heading", type: "string" }),
    defineField({ name: "trustLine", title: "Trust Label", type: "string" }),
    defineField({ name: "submitLabel", title: "Submit Button Label", type: "string" }),
  ],
});
