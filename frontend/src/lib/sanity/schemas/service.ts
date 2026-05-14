import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "card", title: "Card (home + services index)", default: true },
    { name: "detail", title: "Detail Page (/services/[slug])" },
    { name: "meta", title: "Meta & SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleLine2",
      title: "Title (second line)",
      type: "string",
      group: "card",
      description: "Optional — renders as a second line below the main title on the card",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "card",
      description: "Small label above the title on the detail page hero (e.g. 'Service · 01').",
    }),
    defineField({
      name: "body",
      title: "Card Body",
      type: "text",
      rows: 3,
      group: "card",
      description: "Short blurb shown on cards (home + services index).",
    }),
    defineField({
      name: "image",
      title: "Card Image",
      type: "image",
      group: "card",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      group: "card",
    }),
    defineField({
      name: "trigram",
      title: "Trigram Symbol",
      type: "string",
      group: "card",
      description: "I Ching trigram character, e.g. ☵",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "card",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "card",
      description: "Lower numbers appear first",
    }),

    // Detail page
    defineField({
      name: "lead",
      title: "Detail Lead Paragraph",
      type: "text",
      rows: 3,
      group: "detail",
      description: "Hero lead paragraph on the /services/[slug] page.",
    }),
    defineField({
      name: "detailBody",
      title: "Detail Body",
      type: "array",
      group: "detail",
      description: "Full content of the service page. Headings, paragraphs, links, images.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "Link",
                name: "link",
                type: "object",
                fields: [
                  defineField({ name: "href", title: "URL", type: "url" }),
                  defineField({ name: "blank", title: "Open in new tab", type: "boolean" }),
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "meta",
      fields: [
        defineField({ name: "title", title: "SEO Title", type: "string" }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2 }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Order field",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow", media: "image" },
  },
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
