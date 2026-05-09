import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
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
      description: "Renders italic-sage on the second line of the hero title.",
    }),
    defineField({
      name: "heroLead",
      title: "Hero Lead Paragraph",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "introEyebrow",
      title: "Intro Eyebrow",
      type: "string",
    }),
    defineField({
      name: "introTitle",
      title: "Intro Title",
      type: "string",
    }),
    defineField({
      name: "introTitleEm",
      title: "Intro Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "introBody",
      title: "Intro Body",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "founderEyebrow",
      title: "Founder Section Eyebrow",
      type: "string",
    }),
    defineField({
      name: "founderTitle",
      title: "Founder Section Title",
      type: "string",
    }),
    defineField({
      name: "founderTitleEm",
      title: "Founder Section Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "founderBody",
      title: "Founder Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "founderImage",
      title: "Founder Full-Bleed Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "founderQuote",
      title: "Founder Quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "founderQuoteAttribution",
      title: "Founder Quote Attribution",
      type: "string",
    }),
    defineField({
      name: "teamEyebrow",
      title: "Team Section Eyebrow",
      type: "string",
    }),
    defineField({
      name: "teamTitle",
      title: "Team Section Title",
      type: "string",
    }),
    defineField({
      name: "teamTitleEm",
      title: "Team Section Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "teamSub",
      title: "Team Section Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "approachTitle",
      title: "Approach Summary Title",
      type: "string",
    }),
    defineField({
      name: "approachTitleEm",
      title: "Approach Summary Title (italic accent)",
      type: "string",
    }),
    defineField({
      name: "approachBody",
      title: "Approach Summary Body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "pebblesEyebrow",
      title: "Pebbles Section Eyebrow",
      type: "string",
    }),
    defineField({
      name: "pebblesQuote",
      title: "Pebbles Section Quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pebblesAttribution",
      title: "Pebbles Section Attribution",
      type: "string",
    }),
    defineField({
      name: "pebblesCtaLabel",
      title: "Pebbles Section CTA Label",
      type: "string",
    }),
    defineField({
      name: "pebblesImage",
      title: "Pebbles Background Image",
      type: "image",
      options: { hotspot: true },
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
      name: "storyCtaLabel",
      title: "Featured Story CTA Label",
      type: "string",
    }),
    defineField({
      name: "storyImageBack",
      title: "Featured Story Image (back / right)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyImageFront",
      title: "Featured Story Image (front / left, offset)",
      type: "image",
      options: { hotspot: true },
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
