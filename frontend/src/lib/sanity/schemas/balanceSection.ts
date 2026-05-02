import { defineType, defineField } from "sanity";

export const balanceSectionType = defineType({
  name: "balanceSection",
  title: "Balance Section",
  type: "document",
  fields: [
    defineField({ name: "invitationEyebrow", title: "Invitation Eyebrow", type: "string" }),
    defineField({ name: "invitationHeading", title: "Invitation Heading", type: "text", rows: 2 }),
    defineField({ name: "invitationBody", title: "Invitation Body", type: "text", rows: 4 }),
    defineField({ name: "palaceEyebrow", title: "Palace Eyebrow", type: "string" }),
    defineField({ name: "palaceHeading", title: "Palace Heading", type: "text", rows: 2 }),
    defineField({ name: "palaceBody", title: "Palace Body", type: "text", rows: 4 }),
    defineField({ name: "palaceCtaLabel", title: "Palace CTA Label", type: "string" }),
  ],
});
