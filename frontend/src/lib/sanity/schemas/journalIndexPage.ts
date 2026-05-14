import { defineField, defineType } from "sanity";

export const journalIndexPageType = defineType({
  name: "journalIndexPage",
  title: "Journal — Index Page (/journal)",
  type: "document",
  description:
    'Chrome and copy for the journal index page at "/journal". Articles themselves live under "Journal — All Articles".',
  groups: [
    { name: "hero", title: 'Hero — "Insights That Matter"', default: true },
    { name: "featured", title: "Featured Pair (top of grid)" },
    { name: "grid", title: 'Section — "Recent articles"' },
    { name: "cta", title: 'Closing CTA — "Ready to find your path?"' },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      group: "hero",
      initialValue: "Journal",
    }),
    defineField({
      name: "heroTitleLine1",
      title: "Hero Title (line 1)",
      type: "string",
      group: "hero",
      initialValue: "Insights",
    }),
    defineField({
      name: "heroTitleEm",
      title: "Hero Title (italic accent)",
      type: "string",
      group: "hero",
      initialValue: "That Matter.",
    }),
    defineField({
      name: "heroLead",
      title: "Hero Lead Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue:
        "Articles, tools, and insights to help you find clarity, balance, and direction.",
    }),

    // Featured
    defineField({
      name: "featuredCount",
      title: "Featured Article Count",
      type: "number",
      group: "featured",
      description:
        "How many of the most recent articles render in the top featured pair (typically 2). The rest cycle into the recent-articles grid below.",
      initialValue: 2,
    }),

    // Grid
    defineField({
      name: "gridEyebrow",
      title: "Grid Eyebrow",
      type: "string",
      group: "grid",
      initialValue: "Latest writing",
    }),
    defineField({
      name: "gridTitle",
      title: "Grid Title (line 1)",
      type: "string",
      group: "grid",
      initialValue: "Recent",
    }),
    defineField({
      name: "gridTitleEm",
      title: "Grid Title (italic accent)",
      type: "string",
      group: "grid",
      initialValue: "articles.",
    }),
    defineField({
      name: "readMoreLabel",
      title: "Card Read-More Label",
      type: "string",
      group: "grid",
      initialValue: "Read more",
    }),

    // Closing CTA
    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: "Begin Your Journey",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title (line 1)",
      type: "string",
      group: "cta",
      initialValue: "Ready to find",
    }),
    defineField({
      name: "ctaTitleEm",
      title: "CTA Title (italic accent)",
      type: "string",
      group: "cta",
      initialValue: "your path?",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue:
        "If this story resonates with you, maybe it's time to start your own. Therapy isn't about quick fixes.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      group: "cta",
      initialValue: "Start your journey",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: "/#contact",
    }),

    // SEO
    defineField({
      name: "metaTitle",
      title: "Meta Title (browser tab)",
      type: "string",
      group: "seo",
      initialValue: "Journal | Conscious Pregnancy",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      group: "seo",
      initialValue:
        "Articles, tools, and insights to help you find clarity, balance, and direction.",
    }),
  ],
  preview: { prepare: () => ({ title: "Journal — Index Page (/journal)" }) },
});
