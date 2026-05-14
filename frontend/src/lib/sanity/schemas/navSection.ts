import { defineField, defineType } from "sanity";

export const navSectionType = defineType({
  name: "navSection",
  title: "Site Navigation (Top Bar)",
  type: "document",
  description: "The top navigation bar that appears on every page.",
  groups: [
    { name: "brand", title: "Brand & Wordmark", default: true },
    { name: "links", title: "Nav Links" },
    { name: "cta", title: "Begin Your Journey Button" },
  ],
  fields: [
    defineField({
      name: "brandWordPrimary",
      title: "Brand Word (primary)",
      type: "string",
      group: "brand",
      description: 'First word in the wordmark, e.g. "conscious".',
      initialValue: "conscious",
    }),
    defineField({
      name: "brandWordItalic",
      title: "Brand Word (italic accent)",
      type: "string",
      group: "brand",
      description:
        'Second word, rendered with the em-dash separator and italic accent, e.g. "pregnancy".',
      initialValue: "pregnancy",
    }),
    defineField({
      name: "brandAriaLabel",
      title: "Brand Link Accessibility Label",
      type: "string",
      group: "brand",
      initialValue: "Conscious Pregnancy home",
    }),
    defineField({
      name: "navLinks",
      title: "Nav Links",
      type: "array",
      group: "links",
      description: "The clickable items in the top nav. Drag to reorder.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: 'e.g. "/about", "/services", "/journal", "/#contact"',
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      group: "cta",
      initialValue: "Begin Your Journey",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button Link",
      type: "string",
      group: "cta",
      initialValue: "/#contact",
    }),
    defineField({
      name: "mobileMenuLabel",
      title: "Mobile Menu Button Label",
      type: "string",
      group: "cta",
      initialValue: "Menu",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Navigation (Top Bar)" }) },
});
