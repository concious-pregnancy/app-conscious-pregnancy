import { defineField, defineType } from "sanity";

export const journalPageType = defineType({
  name: "journalPage",
  title: "Journal Page",
  type: "document",
  description:
    "Page-level content for the standalone /journal route. Articles themselves come from the existing 'journalArticle' documents.",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
    }),
    defineField({
      name: "heroTitleLine1",
      title: "Hero Title (line 1)",
      type: "string",
    }),
    defineField({
      name: "heroTitleEm",
      title: "Hero Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "heroLead",
      title: "Hero Lead Paragraph",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featuredCount",
      title: "Featured Article Count",
      type: "number",
      description:
        "Number of articles to render in the top featured pair (typically 2). The rest cycle into the recent-articles grid.",
      initialValue: 2,
    }),
    defineField({
      name: "recentEyebrow",
      title: "Recent Articles Eyebrow",
      type: "string",
    }),
    defineField({
      name: "recentTitle",
      title: "Recent Articles Title",
      type: "string",
    }),
    defineField({
      name: "recentTitleEm",
      title: "Recent Articles Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "ctaEyebrow",
      title: "Closing CTA Eyebrow",
      type: "string",
    }),
    defineField({
      name: "ctaTitle",
      title: "Closing CTA Title",
      type: "string",
    }),
    defineField({
      name: "ctaTitleEm",
      title: "Closing CTA Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "Closing CTA Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaLabel",
      title: "Closing CTA Label",
      type: "string",
    }),
  ],
});
