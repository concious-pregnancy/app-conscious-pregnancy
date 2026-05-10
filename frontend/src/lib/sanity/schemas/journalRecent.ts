import { defineField, defineType } from "sanity";

export const journalRecentType = defineType({
  name: "journalRecent",
  title: "Journal — Recent Articles Section Header",
  type: "document",
  description: "Header for the recent-articles grid. Articles come from journalArticle docs.",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({
      name: "featuredCount",
      title: "Featured Article Count",
      type: "number",
      description:
        "Number of articles to render in the top featured pair (typically 2). The rest cycle into the recent-articles grid.",
      initialValue: 2,
    }),
  ],
});
