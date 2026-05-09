import { defineField, defineType } from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  description:
    "Page-level content for the standalone /services route. Service cards themselves come from the existing 'service' documents.",
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
      name: "serviceBlocks",
      title: "Service Blocks",
      description:
        "Each block renders as its own full-bleed dark photographic section with white-text overlay. Order matters.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "eyebrow", title: "Eyebrow", type: "string" },
            { name: "title", title: "Title", type: "string" },
            {
              name: "titleEm",
              title: "Title (italic accent)",
              type: "string",
            },
            {
              name: "image",
              title: "Background Photo",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "paragraphs",
              title: "Body Paragraphs",
              type: "array",
              of: [{ type: "text", rows: 3 }],
            },
            { name: "ctaLabel", title: "CTA Label", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "statsEyebrow",
      title: "Stats Section Eyebrow",
      type: "string",
    }),
    defineField({
      name: "statsTitle",
      title: "Stats Title",
      type: "string",
    }),
    defineField({
      name: "statsTitleEm",
      title: "Stats Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "statsBody",
      title: "Stats Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "pricingEyebrow",
      title: "Pricing Eyebrow",
      type: "string",
    }),
    defineField({
      name: "pricingTitle",
      title: "Pricing Title",
      type: "string",
    }),
    defineField({
      name: "pricingTitleEm",
      title: "Pricing Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "pricingSub",
      title: "Pricing Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tiers",
      title: "Pricing Tiers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "blurb", title: "Blurb", type: "string" },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "storyEyebrow",
      title: "Featured Story Eyebrow",
      type: "string",
    }),
    defineField({
      name: "storyTitle",
      title: "Featured Story Title",
      type: "string",
    }),
    defineField({
      name: "storyTitleEm",
      title: "Featured Story Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "storyBody",
      title: "Featured Story Body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "storyImage",
      title: "Featured Story Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyCtaLabel",
      title: "Featured Story CTA Label",
      type: "string",
    }),
    defineField({
      name: "faqEyebrow",
      title: "FAQ Eyebrow",
      type: "string",
    }),
    defineField({
      name: "faqTitle",
      title: "FAQ Title",
      type: "string",
    }),
    defineField({
      name: "faqTitleEm",
      title: "FAQ Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "faqSub",
      title: "FAQ Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "faqFootnote",
      title: "FAQ Footnote",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", title: "Question", type: "string" },
            { name: "a", title: "Answer", type: "text", rows: 3 },
          ],
        },
      ],
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
