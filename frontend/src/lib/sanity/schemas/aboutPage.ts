import { defineField, defineType } from "sanity";

const bandFields = [
  defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
  defineField({
    name: "highlightedBody",
    title: "Highlighted body (optional)",
    description:
      "Second paragraph rendered in the gold accent color, set apart from Body. Leave blank for a single-paragraph band.",
    type: "text",
    rows: 3,
  }),
  defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  defineField({
    name: "surface",
    title: "Surface",
    description: "Leave blank to use the default for this band's position.",
    type: "string",
    options: {
      list: [
        { title: "Night (navy)", value: "navy" },
        { title: "Day (cream)", value: "cream" },
      ],
    },
  }),
];

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "intro", title: "1. Intro" },
    { name: "founder", title: "2. Founder (My Story)" },
    { name: "team", title: "3. Team" },
    { name: "pebbles", title: "4. Pebbles Quote" },
    { name: "story", title: "5. Featured Story (My Path)" },
    { name: "faq", title: "6. FAQ" },
    { name: "cta", title: "7. Closing CTA" },
  ],
  fields: [
    // 1. Intro
    defineField({ name: "introEyebrow", title: "Eyebrow", type: "string", group: "intro" }),
    defineField({ name: "introTitle", title: "Title", type: "string", group: "intro" }),
    defineField({
      name: "introTitleEm",
      title: "Title (italic accent)",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introBody",
      title: "Body (fallback)",
      description: "Used only if neither band below has content.",
      type: "text",
      rows: 6,
      group: "intro",
    }),
    defineField({
      name: "introBandBeforeFounder",
      title: "Band, before Founder",
      description: "Renders first on the page, with the Dr. Ashley Alden credentials line.",
      type: "object",
      group: "intro",
      fields: bandFields,
      preview: { select: { title: "title", subtitle: "eyebrow" } },
    }),
    defineField({
      name: "introBandAfterFounder",
      title: "Band, after Founder",
      description: "Renders immediately after the Founder (My Story) section.",
      type: "object",
      group: "intro",
      fields: bandFields,
      preview: { select: { title: "title", subtitle: "eyebrow" } },
    }),

    // 2. Founder
    defineField({ name: "founderEyebrow", title: "Eyebrow", type: "string", group: "founder" }),
    defineField({ name: "founderTitle", title: "Title", type: "string", group: "founder" }),
    defineField({
      name: "founderTitleEm",
      title: "Title (italic accent)",
      type: "string",
      group: "founder",
    }),
    defineField({
      name: "founderBody",
      title: "Body Paragraphs (fallback)",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "Used only if Chapters below is empty.",
      group: "founder",
    }),
    defineField({
      name: "founderChapters",
      title: "Chapters",
      description: "Numbered chapters rendered with a sticky rail nav.",
      type: "array",
      group: "founder",
      of: [
        {
          type: "object",
          name: "chapter",
          fields: [
            defineField({ name: "label", title: "Rail Label", type: "string" }),
            defineField({ name: "title", title: "Chapter Title", type: "string" }),
            defineField({ name: "body", title: "Chapter Body", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "title", subtitle: "label" } },
        },
      ],
    }),

    // 3. Team
    defineField({ name: "teamEyebrow", title: "Eyebrow", type: "string", group: "team" }),
    defineField({ name: "teamTitle", title: "Title", type: "string", group: "team" }),
    defineField({
      name: "teamTitleEm",
      title: "Title (italic accent)",
      type: "string",
      group: "team",
    }),
    defineField({ name: "teamSub", title: "Subheading", type: "text", rows: 2, group: "team" }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      description: "Cards shown in the team grid. Drag to reorder.",
      type: "array",
      group: "team",
      of: [
        {
          type: "object",
          name: "teamMember",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role / Eyebrow", type: "string" }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
            defineField({
              name: "image",
              title: "Portrait",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "image" } },
        },
      ],
    }),

    // 4. Pebbles
    defineField({ name: "pebblesEyebrow", title: "Eyebrow", type: "string", group: "pebbles" }),
    defineField({
      name: "pebblesQuote",
      title: "Quote",
      type: "text",
      rows: 3,
      group: "pebbles",
    }),
    defineField({
      name: "pebblesAttribution",
      title: "Attribution",
      type: "string",
      group: "pebbles",
    }),
    defineField({
      name: "pebblesCtaLabel",
      title: "CTA Label",
      type: "string",
      group: "pebbles",
    }),
    defineField({
      name: "pebblesImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      group: "pebbles",
    }),

    // 5. Story
    defineField({ name: "storyEyebrow", title: "Eyebrow", type: "string", group: "story" }),
    defineField({ name: "storyTitle", title: "Title", type: "string", group: "story" }),
    defineField({
      name: "storyTitleEm",
      title: "Title (italic accent)",
      type: "string",
      group: "story",
    }),
    defineField({ name: "storyBody", title: "Body", type: "text", rows: 4, group: "story" }),
    defineField({
      name: "storyHighlightedBody",
      title: "Highlighted paragraph (optional)",
      description:
        "Rendered in the gold accent color, right after the paragraph that precedes it in Body.",
      type: "text",
      rows: 3,
      group: "story",
    }),
    defineField({
      name: "storyFacts",
      title: "Facts Rail",
      description: 'e.g. "10+" / "years in practice".',
      type: "array",
      group: "story",
      of: [
        {
          type: "object",
          name: "fact",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "storyPullQuotes",
      title: "Pull Quotes",
      type: "array",
      group: "story",
      of: [
        {
          type: "object",
          name: "pullQuote",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
            defineField({ name: "attribution", title: "Attribution", type: "string" }),
          ],
          preview: { select: { title: "quote", subtitle: "attribution" } },
        },
      ],
    }),
    defineField({
      name: "storyOutsideClinic",
      title: "Outside the Clinic",
      description: 'Short list items, e.g. "Her dog, Presley", "1986 VW Westfalia".',
      type: "array",
      of: [{ type: "string" }],
      group: "story",
    }),

    // 6. FAQ
    defineField({ name: "faqEyebrow", title: "Eyebrow", type: "string", group: "faq" }),
    defineField({ name: "faqTitle", title: "Title", type: "string", group: "faq" }),
    defineField({
      name: "faqTitleEm",
      title: "Title (italic accent)",
      type: "string",
      group: "faq",
    }),
    defineField({ name: "faqSub", title: "Subheading", type: "text", rows: 2, group: "faq" }),
    defineField({ name: "faqFootnote", title: "Footnote", type: "text", rows: 2, group: "faq" }),
    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      group: "faq",
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

    // 7. Closing CTA
    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta" }),
    defineField({ name: "ctaTitle", title: "Title", type: "string", group: "cta" }),
    defineField({
      name: "ctaTitleEm",
      title: "Title (italic accent)",
      type: "string",
      group: "cta",
    }),
    defineField({ name: "ctaBody", title: "Body", type: "text", rows: 3, group: "cta" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string", group: "cta" }),
  ],
  preview: {
    select: { title: "founderTitle" },
    prepare: ({ title }) => ({ title: title ? `About (${title})` : "About Page" }),
  },
});
