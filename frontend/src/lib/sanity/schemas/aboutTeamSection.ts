import { defineField, defineType } from "sanity";

export const aboutTeamSectionType = defineType({
  name: "aboutTeamSection",
  title: "About — Team Section Header",
  type: "document",
  description: "Header for the team grid. Team members themselves come from the teamMember docs.",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleEm", title: "Title (italic accent)", type: "string" }),
    defineField({ name: "sub", title: "Subheading", type: "text", rows: 2 }),
  ],
});
