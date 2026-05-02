import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description:
    "The featured story shown in the Real Stories section. Only the first document is used.",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: 'Small label above the heading, e.g. "Real Stories."',
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      description: 'Button label, e.g. "Read the full story"',
    }),
  ],
});
