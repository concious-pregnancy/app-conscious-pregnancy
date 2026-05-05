import { defineType, defineField } from "sanity";

export const readySectionType = defineType({
  name: "readySection",
  title: "Ready Section",
  type: "document",
  fields: [
    defineField({ name: "headingLine1", title: "Heading Line 1", type: "string" }),
    defineField({ name: "headingEm", title: "Heading Italic Line", type: "string" }),
    defineField({ name: "sub", title: "Subheading", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({
      name: "trustLabel",
      title: "Trust Label",
      type: "string",
      description: 'e.g. "Trusted by 80+ clients"',
    }),
    defineField({
      name: "ratingText",
      title: "Rating Text",
      type: "string",
      description: 'e.g. "Excellent 4.9 out of 5"',
    }),
    defineField({
      name: "chatIntro",
      title: "Chat Line Intro",
      type: "string",
      description: 'Text before the email link, e.g. "Prefer to chat first?"',
    }),
    defineField({ name: "chatEmail", title: "Chat Email Address", type: "string" }),
  ],
});
