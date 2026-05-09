import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .child(
          S.list()
            .title("Home Page")
            .items([
              S.listItem()
                .title("1. Hero")
                .child(
                  S.document()
                    .title("Hero")
                    .schemaType("heroSection")
                    .documentId("heroSection-singleton"),
                ),
              S.listItem()
                .title("2. Invitation & Palace")
                .child(
                  S.document()
                    .title("Invitation & Palace")
                    .schemaType("balanceSection")
                    .documentId("balanceSection-singleton"),
                ),
              S.listItem()
                .title("3. Services")
                .child(
                  S.list()
                    .title("Services")
                    .items([
                      S.listItem()
                        .title("Section Header")
                        .child(
                          S.document()
                            .title("Services Section Header")
                            .schemaType("servicesSection")
                            .documentId("servicesSection-singleton"),
                        ),
                      S.listItem()
                        .title("Service Cards")
                        .child(S.documentTypeList("service").title("Service Cards")),
                      S.listItem()
                        .title("Service Extras")
                        .child(S.documentTypeList("serviceExtra").title("Service Extras")),
                    ]),
                ),
              S.listItem()
                .title("4. Process Steps")
                .child(
                  S.document()
                    .title("Process Steps")
                    .schemaType("processSection")
                    .documentId("processSection-singleton"),
                ),
              S.listItem()
                .title("5. Credentials (Dr. Ashley)")
                .child(
                  S.document()
                    .title("Credentials (Dr. Ashley)")
                    .schemaType("credentialsSection")
                    .documentId("credentialsSection-singleton"),
                ),
              S.listItem()
                .title("6. Ready")
                .child(
                  S.document()
                    .title("Ready Section")
                    .schemaType("readySection")
                    .documentId("readySection-singleton"),
                ),
              S.listItem()
                .title("7. Pricing")
                .child(
                  S.list()
                    .title("Pricing")
                    .items([
                      S.listItem()
                        .title("Section Header")
                        .child(
                          S.document()
                            .title("Pricing Section Header")
                            .schemaType("pricingSection")
                            .documentId("pricingSection-singleton"),
                        ),
                      S.listItem()
                        .title("Pricing Tiers")
                        .child(S.documentTypeList("pricingTier").title("Pricing Tiers")),
                    ]),
                ),
              S.listItem()
                .title("8. Listen (Quote)")
                .child(
                  S.document()
                    .title("Listen (Quote)")
                    .schemaType("listenSection")
                    .documentId("listenSection-singleton"),
                ),
              S.listItem()
                .title("9. Testimonials")
                .child(S.documentTypeList("testimonial").title("Testimonials")),
              S.listItem()
                .title("10. Journal")
                .child(
                  S.list()
                    .title("Journal")
                    .items([
                      S.listItem()
                        .title("Section Header")
                        .child(
                          S.document()
                            .title("Journal Section Header")
                            .schemaType("journalSection")
                            .documentId("journalSection-singleton"),
                        ),
                      S.listItem()
                        .title("Journal Articles")
                        .child(S.documentTypeList("journalArticle").title("Journal Articles")),
                    ]),
                ),
              S.listItem()
                .title("11. Stats")
                .child(
                  S.document()
                    .title("Stats")
                    .schemaType("statsSection")
                    .documentId("statsSection-singleton"),
                ),
              S.listItem()
                .title("12. FAQ")
                .child(
                  S.list()
                    .title("FAQ")
                    .items([
                      S.listItem()
                        .title("Section Header")
                        .child(
                          S.document()
                            .title("FAQ Section Header")
                            .schemaType("faqSection")
                            .documentId("faqSection-singleton"),
                        ),
                      S.listItem()
                        .title("FAQ Items")
                        .child(S.documentTypeList("faq").title("FAQ Items")),
                    ]),
                ),
              S.listItem()
                .title("13. Contact")
                .child(
                  S.document()
                    .title("Contact Section")
                    .schemaType("contactSection")
                    .documentId("contactSection-singleton"),
                ),
              S.listItem()
                .title("14. Philosophy (hidden)")
                .child(
                  S.document()
                    .title("Philosophy Section")
                    .schemaType("philosophySection")
                    .documentId("philosophySection-singleton"),
                ),
              S.listItem()
                .title("15. Approach (hidden)")
                .child(
                  S.document()
                    .title("Approach Section")
                    .schemaType("approachSection")
                    .documentId("approachSection-singleton"),
                ),
            ]),
        ),
      S.listItem()
        .title("About Page")
        .child(
          S.list()
            .title("About Page")
            .items([
              S.listItem()
                .title("Page Content")
                .child(
                  S.document()
                    .title("About Page Content")
                    .schemaType("aboutPage")
                    .documentId("aboutPage-singleton"),
                ),
              S.listItem()
                .title("Team Members")
                .child(S.documentTypeList("teamMember").title("Team Members")),
            ]),
        ),
      S.listItem()
        .title("Services Page")
        .child(
          S.document()
            .title("Services Page Content")
            .schemaType("servicesPage")
            .documentId("servicesPage-singleton"),
        ),
      S.listItem()
        .title("Journal Page")
        .child(
          S.document()
            .title("Journal Page Content")
            .schemaType("journalPage")
            .documentId("journalPage-singleton"),
        ),
    ]);
