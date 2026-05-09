import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  description: "Practitioners on the about-page team grid.",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Eyebrow",
      type: "string",
      description: "Renders above the name (e.g. Therapist).",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
});
