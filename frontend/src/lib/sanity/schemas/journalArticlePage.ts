import { defineField, defineType } from "sanity";

export const journalArticlePageType = defineType({
  name: "journalArticlePage",
  title: "Journal — Article Detail Layout (/journal/[slug])",
  type: "document",
  description:
    "Shared labels and layout copy that appear on every individual journal article. Edit here once, applies to every article. Per-article body / title / image still live on the Journal Article doc.",
  groups: [
    { name: "header", title: "Article Header" },
    { name: "body", title: "Article Body Defaults" },
    { name: "related", title: 'Section — "Continue reading"' },
    { name: "cta", title: "Closing CTA" },
    { name: "seo", title: "SEO Defaults" },
  ],
  fields: [
    // Header
    defineField({
      name: "backLinkLabel",
      title: "Back-Link Label",
      type: "string",
      group: "header",
      description: 'Shown above the title. e.g. "← All articles"',
      initialValue: "← All articles",
    }),
    defineField({
      name: "bylineFallbackAuthor",
      title: "Byline Fallback (when article has no author)",
      type: "string",
      group: "header",
      initialValue: "Dr. Ashley Alden",
    }),
    defineField({
      name: "readingTimeSuffix",
      title: 'Reading-time Suffix (e.g. "min read")',
      type: "string",
      group: "header",
      initialValue: "min read",
    }),

    // Body
    defineField({
      name: "bodyPlaceholder",
      title: "Body Placeholder Copy",
      type: "text",
      rows: 3,
      group: "body",
      description:
        "Shown when an article has no body content yet. Encourages editor to fill it in without breaking the page.",
      initialValue: "This article is being written. Check back soon.",
    }),

    // Related
    defineField({
      name: "relatedEyebrow",
      title: '"Continue Reading" Eyebrow',
      type: "string",
      group: "related",
      initialValue: "Continue reading",
    }),
    defineField({
      name: "relatedHeading",
      title: '"Continue Reading" Heading',
      type: "string",
      group: "related",
      initialValue: "More from the journal.",
    }),
    defineField({
      name: "relatedReadLabel",
      title: "Related Card Read-More Label",
      type: "string",
      group: "related",
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
      initialValue: "Ready to begin",
    }),
    defineField({
      name: "ctaTitleEm",
      title: "CTA Title (italic accent)",
      type: "string",
      group: "cta",
      initialValue: "your work?",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue:
        "Discovery calls are free, hour-long, and unhurried. We talk about where you are, what you've tried, and whether this is the right fit before anything is booked.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      group: "cta",
      initialValue: "Book a discovery call",
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
      name: "metaTitleSuffix",
      title: "Meta Title Suffix",
      type: "string",
      group: "seo",
      description:
        'Appended after the article title in the browser tab, e.g. " | Journal | Conscious Pregnancy"',
      initialValue: " | Journal | Conscious Pregnancy",
    }),
  ],
  preview: { prepare: () => ({ title: "Journal — Article Detail Layout" }) },
});
