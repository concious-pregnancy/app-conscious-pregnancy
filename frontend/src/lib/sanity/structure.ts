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
                .title("1. Hero")
                .child(
                  S.document()
                    .title("Hero")
                    .schemaType("aboutHero")
                    .documentId("aboutHero-singleton"),
                ),
              S.listItem()
                .title("2. Intro (The Way We Help)")
                .child(
                  S.document()
                    .title("Intro")
                    .schemaType("aboutIntro")
                    .documentId("aboutIntro-singleton"),
                ),
              S.listItem()
                .title("3. Founder")
                .child(
                  S.document()
                    .title("Founder")
                    .schemaType("aboutFounder")
                    .documentId("aboutFounder-singleton"),
                ),
              S.listItem()
                .title("4. Team")
                .child(
                  S.list()
                    .title("Team")
                    .items([
                      S.listItem()
                        .title("Section Header")
                        .child(
                          S.document()
                            .title("Team Section Header")
                            .schemaType("aboutTeamSection")
                            .documentId("aboutTeamSection-singleton"),
                        ),
                      S.listItem()
                        .title("Team Members")
                        .child(S.documentTypeList("teamMember").title("Team Members")),
                    ]),
                ),
              S.listItem()
                .title("5. Approach Summary")
                .child(
                  S.document()
                    .title("Approach Summary")
                    .schemaType("aboutApproach")
                    .documentId("aboutApproach-singleton"),
                ),
              S.listItem()
                .title("6. Pebbles Quote")
                .child(
                  S.document()
                    .title("Pebbles Quote")
                    .schemaType("aboutPebbles")
                    .documentId("aboutPebbles-singleton"),
                ),
              S.listItem()
                .title("7. Featured Story")
                .child(
                  S.document()
                    .title("Featured Story")
                    .schemaType("aboutStory")
                    .documentId("aboutStory-singleton"),
                ),
              S.listItem()
                .title("8. FAQ")
                .child(
                  S.document().title("FAQ").schemaType("aboutFaq").documentId("aboutFaq-singleton"),
                ),
              S.listItem()
                .title("9. Closing CTA")
                .child(
                  S.document()
                    .title("Closing CTA")
                    .schemaType("aboutCta")
                    .documentId("aboutCta-singleton"),
                ),
            ]),
        ),
      S.listItem()
        .title("Services Page")
        .child(
          S.list()
            .title("Services Page")
            .items([
              S.listItem()
                .title("1. Hero")
                .child(
                  S.document()
                    .title("Hero")
                    .schemaType("servicesHero")
                    .documentId("servicesHero-singleton"),
                ),
              S.listItem()
                .title("2. Service Blocks")
                .child(S.documentTypeList("servicesBlock").title("Service Blocks")),
              S.listItem()
                .title("3. Stats")
                .child(
                  S.document()
                    .title("Stats")
                    .schemaType("servicesStats")
                    .documentId("servicesStats-singleton"),
                ),
              S.listItem()
                .title("4. Pricing")
                .child(
                  S.document()
                    .title("Pricing")
                    .schemaType("servicesPricing")
                    .documentId("servicesPricing-singleton"),
                ),
              S.listItem()
                .title("5. Featured Story")
                .child(
                  S.document()
                    .title("Featured Story")
                    .schemaType("servicesStory")
                    .documentId("servicesStory-singleton"),
                ),
              S.listItem()
                .title("6. FAQ")
                .child(
                  S.document()
                    .title("FAQ")
                    .schemaType("servicesFaq")
                    .documentId("servicesFaq-singleton"),
                ),
              S.listItem()
                .title("7. Closing CTA")
                .child(
                  S.document()
                    .title("Closing CTA")
                    .schemaType("servicesCta")
                    .documentId("servicesCta-singleton"),
                ),
            ]),
        ),
      S.listItem()
        .title("Journal Page")
        .child(
          S.list()
            .title("Journal Page")
            .items([
              S.listItem()
                .title("1. Hero")
                .child(
                  S.document()
                    .title("Hero")
                    .schemaType("journalHero")
                    .documentId("journalHero-singleton"),
                ),
              S.listItem()
                .title("2. Recent Articles Header")
                .child(
                  S.document()
                    .title("Recent Articles Header")
                    .schemaType("journalRecent")
                    .documentId("journalRecent-singleton"),
                ),
              S.listItem()
                .title("3. Articles")
                .child(S.documentTypeList("journalArticle").title("Journal Articles")),
              S.listItem()
                .title("4. Closing CTA")
                .child(
                  S.document()
                    .title("Closing CTA")
                    .schemaType("journalCta")
                    .documentId("journalCta-singleton"),
                ),
            ]),
        ),
    ]);
