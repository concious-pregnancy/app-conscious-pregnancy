import { defineType, defineField } from "sanity";

export const listenSectionType = defineType({
  name: "listenSection",
  title: "Listen Section (Quote)",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({ name: "attribution", title: "Attribution", type: "string" }),
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
