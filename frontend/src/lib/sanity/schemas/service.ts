import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleLine2",
      title: "Title (second line)",
      type: "string",
      description: "Optional — renders as a second line below the main title on the card",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "imagePath",
      title: "Image Path",
      type: "string",
      description: "Path to an image in the public folder, e.g. /hero/hero-water.jpeg",
    }),
    defineField({
      name: "trigram",
      title: "Trigram Symbol",
      type: "string",
      description: "I Ching trigram character, e.g. ☵",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
});

export const serviceExtraType = defineType({
  name: "serviceExtra",
  title: "Service Extra",
  type: "document",
  description: "The supporting items in the strip below the main service cards",
  fields: [
    defineField({
      name: "trigram",
      title: "Trigram Symbol",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
});
