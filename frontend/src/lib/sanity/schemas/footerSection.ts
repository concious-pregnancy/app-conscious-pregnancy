import { defineField, defineType } from "sanity";

export const footerSectionType = defineType({
  name: "footerSection",
  title: "Site Footer",
  type: "document",
  description: "The footer that appears on every page.",
  groups: [
    { name: "signup", title: 'Newsletter — "Begin where you actually are"', default: true },
    { name: "sitemapA", title: "Sitemap — Column 1" },
    { name: "sitemapB", title: "Sitemap — Column 2" },
    { name: "brand", title: "Brand Mark & Copyright" },
  ],
  fields: [
    // Newsletter signup
    defineField({
      name: "signupHeadline",
      title: "Headline (line 1)",
      type: "string",
      group: "signup",
      initialValue: "Begin where you",
    }),
    defineField({
      name: "signupHeadlineEm",
      title: "Headline (italic accent)",
      type: "string",
      group: "signup",
      initialValue: "actually are.",
    }),
    defineField({
      name: "signupSub",
      title: "Sub Paragraph",
      type: "text",
      rows: 3,
      group: "signup",
      initialValue:
        "A monthly note from Dr. Alden, slow reading on conscious conception, the body, and the work between knowing and changing.",
    }),
    defineField({
      name: "signupPlaceholder",
      title: "Email Input Placeholder",
      type: "string",
      group: "signup",
      initialValue: "your email address",
    }),
    defineField({
      name: "signupButtonLabel",
      title: "Subscribe Button Label",
      type: "string",
      group: "signup",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "signupSubmittingLabel",
      title: "Subscribing… (in-flight label)",
      type: "string",
      group: "signup",
      initialValue: "Subscribing...",
    }),
    defineField({
      name: "signupSuccessMessage",
      title: "Success Message",
      type: "string",
      group: "signup",
      initialValue: "You're on the list. Thank you.",
    }),
    defineField({
      name: "signupFineprint",
      title: "Fineprint (Privacy Policy line)",
      type: "string",
      group: "signup",
      description: 'Use {{privacy}} where the "Privacy Policy" link should appear.',
      initialValue: "By signing up you agree to our {{privacy}}.",
    }),
    defineField({
      name: "privacyHref",
      title: "Privacy Policy Link",
      type: "string",
      group: "signup",
      initialValue: "#",
    }),

    // Sitemap columns
    defineField({
      name: "sitemapColumn1",
      title: "Sitemap Column 1 Links",
      type: "array",
      group: "sitemapA",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "sitemapColumn2",
      title: "Sitemap Column 2 Links",
      type: "array",
      group: "sitemapB",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),

    // Brand / copyright
    defineField({
      name: "brandWordPrimary",
      title: "Brand Mark (primary)",
      type: "string",
      group: "brand",
      initialValue: "conscious",
    }),
    defineField({
      name: "brandWordItalic",
      title: "Brand Mark (italic)",
      type: "string",
      group: "brand",
      initialValue: "pregnancy",
    }),
    defineField({
      name: "copyrightTemplate",
      title: "Copyright Line",
      type: "string",
      group: "brand",
      description: "Use {{year}} where the current year should appear.",
      initialValue: "© {{year}} Conscious Pregnancy. A Golden Life Wellness practice. Venice, CA.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Footer" }) },
});
