import { defineField, defineType } from "sanity";

export const aboutIntroType = defineType({
  name: "aboutIntro",
  title: "About — Intro",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 6,
      description: "Fallback rendering. Prefer Bands below for the alternating day/night layout.",
    }),
    defineField({
      name: "bands",
      title: "Bands",
      description:
        "3 bands that alternate surface color and image side. Falls back to Body when empty.",
      type: "array",
      of: [
        {
          type: "object",
          name: "band",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
            defineField({
              name: "highlightedBody",
              title: "Highlighted body (optional)",
              description:
                "Second paragraph rendered in the gold accent color, set apart from Body. Leave blank for bands with only one paragraph.",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "surface",
              title: "Surface",
              description: "Leave blank to alternate automatically by position.",
              type: "string",
              options: {
                list: [
                  { title: "Night (navy)", value: "navy" },
                  { title: "Day (cream)", value: "cream" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "eyebrow" } },
        },
      ],
    }),
  ],
});
