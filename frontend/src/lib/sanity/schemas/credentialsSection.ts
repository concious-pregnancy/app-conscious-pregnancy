import { defineType, defineField } from "sanity";

export const credentialsSectionType = defineType({
  name: "credentialsSection",
  title: "Credentials Section (Dr. Ashley)",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "First Paragraph", type: "text", rows: 4 }),
    defineField({ name: "body2", title: "Second Paragraph", type: "text", rows: 4 }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "image", title: "Back Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "image2",
      title: "Front Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
