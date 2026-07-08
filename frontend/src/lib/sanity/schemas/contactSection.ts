import { defineType, defineField, defineArrayMember } from "sanity";

export const contactSectionType = defineType({
  name: "contactSection",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "intro", title: "Intro Text", default: true },
    { name: "locations", title: "Locations" },
  ],
  fields: [
    // ── Left-column intro ("Begin Your Journey" / "Your preparation starts here")
    defineField({ name: "label", title: "Eyebrow Label", type: "string", group: "intro" }),
    defineField({ name: "headingLine1", title: "Heading Line 1", type: "string", group: "intro" }),
    defineField({ name: "headingLine2", title: "Heading Line 2", type: "string", group: "intro" }),
    defineField({ name: "sub", title: "Subheading", type: "text", rows: 3, group: "intro" }),
    defineField({ name: "formHeading", title: "Form Heading", type: "string", group: "intro" }),
    defineField({ name: "trustLine", title: "Trust Label", type: "string", group: "intro" }),
    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      group: "intro",
    }),

    // ── "Where We Work" locations block
    defineField({
      name: "locationsLabel",
      title: "Locations Eyebrow",
      type: "string",
      group: "locations",
    }),
    defineField({
      name: "locationsHeading",
      title: "Locations Heading",
      type: "string",
      group: "locations",
    }),
    defineField({
      name: "locationsSub",
      title: "Locations Subheading",
      type: "text",
      rows: 3,
      group: "locations",
    }),
    defineField({
      name: "locations",
      title: "Locations",
      type: "array",
      group: "locations",
      description:
        "Each entry renders a Google Map (built from the address below) plus a directions link.",
      of: [
        defineArrayMember({
          type: "object",
          name: "location",
          fields: [
            defineField({ name: "city", title: "Label / City", type: "string" }),
            defineField({ name: "addressLine1", title: "Address Line 1", type: "string" }),
            defineField({
              name: "addressLine2",
              title: "Address Line 2 (city, state, ZIP)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "city", subtitle: "addressLine1" },
          },
        }),
      ],
    }),
  ],
});
