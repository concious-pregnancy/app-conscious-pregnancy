import { defineField, defineType } from "sanity";

export const journalArticleType = defineType({
  name: "journalArticle",
  title: "Journal Article",
  type: "document",
  groups: [
    { name: "card", title: "Card (index + homepage)", default: true },
    { name: "post", title: "Article Body" },
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
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "card",
      description: "Small label above the title (e.g. 'Reflection · No. 01').",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "card",
      description: "Shown on the journal index card and the homepage. Keep to 2 to 3 sentences.",
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      group: "card",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Cover Image Alt Text",
      type: "string",
      group: "card",
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
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "card",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "card",
      description: "Lower numbers appear first on the homepage grid",
    }),

    // Article body
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      group: "post",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      group: "post",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
      ],
    }),
    defineField({
      name: "tldr",
      title: "TL;DR Bullets",
      type: "array",
      group: "post",
      description: "Optional. Shown in a summary block at the top of the article.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "array",
      group: "post",
      description:
        "Full article content. Bold, italic, headings, links, and inline images supported.",
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
    {
      title: "Newest published",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow", media: "image" },
  },
});
