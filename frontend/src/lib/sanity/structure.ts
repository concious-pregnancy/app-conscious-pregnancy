import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site")
        .child(
          S.list()
            .title("Site")
            .items([
              S.listItem()
                .title("Navigation (Top Bar)")
                .child(
                  S.document()
                    .title("Navigation")
                    .schemaType("navSection")
                    .documentId("navSection-singleton"),
                ),
              S.listItem()
                .title("Footer")
                .child(
                  S.document()
                    .title("Footer")
                    .schemaType("footerSection")
                    .documentId("footerSection-singleton"),
                ),
            ]),
        ),
      S.divider(),
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
                .title("2. Balance (The Invitation)")
                .child(
                  S.document()
                    .title("Balance")
                    .schemaType("balanceSection")
                    .documentId("balanceSection-singleton"),
                ),
              S.listItem()
                .title("3. Services (Section Header)")
                .child(
                  S.document()
                    .title("Services — Section Header")
                    .schemaType("servicesSection")
                    .documentId("servicesSection-singleton"),
                ),
              S.listItem()
                .title("3. Services (Cards)")
                .child(S.documentTypeList("service").title("Service Cards")),
              S.listItem()
                .title("4. Philosophy")
                .child(
                  S.document()
                    .title("Philosophy")
                    .schemaType("philosophySection")
                    .documentId("philosophySection-singleton"),
                ),
              S.listItem()
                .title("5. Process")
                .child(
                  S.document()
                    .title("Process")
                    .schemaType("processSection")
                    .documentId("processSection-singleton"),
                ),
              S.listItem()
                .title("6. Story / Credentials")
                .child(
                  S.document()
                    .title("Story / Credentials")
                    .schemaType("credentialsSection")
                    .documentId("credentialsSection-singleton"),
                ),
              S.listItem()
                .title("7. Ready")
                .child(
                  S.document()
                    .title("Ready")
                    .schemaType("readySection")
                    .documentId("readySection-singleton"),
                ),
              S.listItem()
                .title("8. Pricing (Section Header)")
                .child(
                  S.document()
                    .title("Pricing — Section Header")
                    .schemaType("pricingSection")
                    .documentId("pricingSection-singleton"),
                ),
              S.listItem()
                .title("8. Pricing (Tiers)")
                .child(S.documentTypeList("pricingTier").title("Pricing Tiers")),
              S.listItem()
                .title("9. Approach")
                .child(
                  S.document()
                    .title("Approach")
                    .schemaType("approachSection")
                    .documentId("approachSection-singleton"),
                ),
              S.listItem()
                .title("10. Listen")
                .child(
                  S.document()
                    .title("Listen")
                    .schemaType("listenSection")
                    .documentId("listenSection-singleton"),
                ),
              S.listItem()
                .title("11. Real Stories (Testimonials)")
                .child(S.documentTypeList("testimonial").title("Testimonials")),
              S.listItem()
                .title("12. Journal (Section Header)")
                .child(
                  S.document()
                    .title("Journal — Section Header")
                    .schemaType("journalSection")
                    .documentId("journalSection-singleton"),
                ),
              S.listItem()
                .title("13. Stats")
                .child(
                  S.document()
                    .title("Stats")
                    .schemaType("statsSection")
                    .documentId("statsSection-singleton"),
                ),
              S.listItem()
                .title("14. FAQ (Section Header)")
                .child(
                  S.document()
                    .title("FAQ — Section Header")
                    .schemaType("faqSection")
                    .documentId("faqSection-singleton"),
                ),
              S.listItem()
                .title("14. FAQ (Items)")
                .child(S.documentTypeList("faq").title("FAQ Items")),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("About Page")
        .child(
          S.document()
            .title("About Page")
            .schemaType("aboutPage")
            .documentId("aboutPage-singleton"),
        ),
      S.divider(),
      S.listItem()
        .title("Services Page")
        .child(
          S.list()
            .title("Services Page")
            .items([
              S.listItem()
                .title("1. CTA")
                .child(
                  S.document()
                    .title("Services CTA")
                    .schemaType("servicesCta")
                    .documentId("servicesCta-singleton"),
                ),
              S.divider(),
              S.listItem()
                .title("Service Detail Layout (shared labels)")
                .child(
                  S.document()
                    .title("Services — Service Detail Layout")
                    .schemaType("servicePage")
                    .documentId("servicePage-singleton"),
                ),
              S.listItem()
                .title("All Services")
                .child(S.documentTypeList("service").title("Services")),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Journal")
        .child(
          S.list()
            .title("Journal")
            .items([
              S.listItem()
                .title("Index Page (/journal)")
                .child(
                  S.document()
                    .title("Journal — Index Page")
                    .schemaType("journalIndexPage")
                    .documentId("journalIndexPage-singleton"),
                ),
              S.listItem()
                .title("Article Detail Layout (shared labels)")
                .child(
                  S.document()
                    .title("Journal — Article Detail Layout")
                    .schemaType("journalArticlePage")
                    .documentId("journalArticlePage-singleton"),
                ),
              S.listItem()
                .title("All Articles")
                .child(S.documentTypeList("journalArticle").title("Journal Articles")),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Contact Page")
        .child(
          S.document()
            .title("Contact Page")
            .schemaType("contactSection")
            .documentId("contactSection-singleton"),
        ),
    ]);
