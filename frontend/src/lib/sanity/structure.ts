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
                .title("6. Pricing Tiers")
                .child(S.documentTypeList("pricingTier").title("Pricing Tiers")),
              S.listItem()
                .title("7. Listen (Quote)")
                .child(
                  S.document()
                    .title("Listen (Quote)")
                    .schemaType("listenSection")
                    .documentId("listenSection-singleton"),
                ),
              S.listItem()
                .title("8. Testimonials")
                .child(S.documentTypeList("testimonial").title("Testimonials")),
              S.listItem()
                .title("9. Journal Articles")
                .child(S.documentTypeList("journalArticle").title("Journal Articles")),
              S.listItem()
                .title("10. Stats")
                .child(
                  S.document()
                    .title("Stats")
                    .schemaType("statsSection")
                    .documentId("statsSection-singleton"),
                ),
              S.listItem().title("11. FAQ").child(S.documentTypeList("faq").title("FAQ")),
            ]),
        ),
    ]);
