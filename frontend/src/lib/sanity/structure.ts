import type { StructureResolver } from "sanity/structure";

// One flat list. Every page sits at the top level so editors don't have to
// drill in. Titles mirror what the editor sees on the live site so they can
// find "the page that says 'Begin where you actually are.'" without guessing.

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ── Site-wide chrome (appears on every page) ───────────────────
      S.listItem()
        .title("Site Navigation (Top Bar)")
        .child(
          S.document()
            .title("Site Navigation (Top Bar)")
            .schemaType("navSection")
            .documentId("navSection-singleton"),
        ),
      S.listItem()
        .title("Site Footer")
        .child(
          S.document()
            .title("Site Footer")
            .schemaType("footerSection")
            .documentId("footerSection-singleton"),
        ),

      S.divider(),

      // ── Home page — one item per visible section, in page order ─────
      S.listItem()
        .title('Home — "We are deeply human" Hero')
        .child(
          S.document()
            .title("Home — Hero")
            .schemaType("heroSection")
            .documentId("heroSection-singleton"),
        ),
      S.listItem()
        .title('Home — Invitation & "Prepping the Palace"')
        .child(
          S.document()
            .title("Home — Invitation & Palace")
            .schemaType("balanceSection")
            .documentId("balanceSection-singleton"),
        ),
      S.listItem()
        .title("Home — Services Section Header")
        .child(
          S.document()
            .title("Home — Services Section Header")
            .schemaType("servicesSection")
            .documentId("servicesSection-singleton"),
        ),
      S.listItem()
        .title("Home — Service Cards")
        .child(S.documentTypeList("service").title("Service Cards")),
      S.listItem()
        .title("Home — Service Extras (add-ons)")
        .child(S.documentTypeList("serviceExtra").title("Service Extras")),
      S.listItem()
        .title('Home — "How we work together" Process Steps')
        .child(
          S.document()
            .title("Home — Process Steps")
            .schemaType("processSection")
            .documentId("processSection-singleton"),
        ),
      S.listItem()
        .title("Home — Credentials (Dr. Ashley)")
        .child(
          S.document()
            .title("Home — Credentials (Dr. Ashley)")
            .schemaType("credentialsSection")
            .documentId("credentialsSection-singleton"),
        ),
      S.listItem()
        .title('Home — "Ready to begin?" Section')
        .child(
          S.document()
            .title("Home — Ready Section")
            .schemaType("readySection")
            .documentId("readySection-singleton"),
        ),
      S.listItem()
        .title("Home — Pricing Section Header")
        .child(
          S.document()
            .title("Home — Pricing Section Header")
            .schemaType("pricingSection")
            .documentId("pricingSection-singleton"),
        ),
      S.listItem()
        .title("Home — Pricing Tiers")
        .child(S.documentTypeList("pricingTier").title("Pricing Tiers")),
      S.listItem()
        .title('Home — "Listen" Quote')
        .child(
          S.document()
            .title("Home — Listen Quote")
            .schemaType("listenSection")
            .documentId("listenSection-singleton"),
        ),
      S.listItem()
        .title("Home — Testimonials")
        .child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem()
        .title("Home — Journal Section Header")
        .child(
          S.document()
            .title("Home — Journal Section Header")
            .schemaType("journalSection")
            .documentId("journalSection-singleton"),
        ),
      S.listItem()
        .title('Home — "By the numbers" Stats')
        .child(
          S.document()
            .title("Home — Stats")
            .schemaType("statsSection")
            .documentId("statsSection-singleton"),
        ),
      S.listItem()
        .title("Home — FAQ Section Header")
        .child(
          S.document()
            .title("Home — FAQ Section Header")
            .schemaType("faqSection")
            .documentId("faqSection-singleton"),
        ),
      S.listItem().title("Home — FAQ Items").child(S.documentTypeList("faq").title("FAQ Items")),
      S.listItem()
        .title("Home — Contact Form Section")
        .child(
          S.document()
            .title("Home — Contact Section")
            .schemaType("contactSection")
            .documentId("contactSection-singleton"),
        ),
      S.listItem()
        .title("Home — Philosophy (hidden)")
        .child(
          S.document()
            .title("Home — Philosophy")
            .schemaType("philosophySection")
            .documentId("philosophySection-singleton"),
        ),
      S.listItem()
        .title("Home — Approach (hidden)")
        .child(
          S.document()
            .title("Home — Approach")
            .schemaType("approachSection")
            .documentId("approachSection-singleton"),
        ),

      S.divider(),

      // ── About page (/about) ─────────────────────────────────────────
      S.listItem()
        .title("About — Hero")
        .child(
          S.document()
            .title("About — Hero")
            .schemaType("aboutHero")
            .documentId("aboutHero-singleton"),
        ),
      S.listItem()
        .title('About — "The way we help" Intro')
        .child(
          S.document()
            .title("About — Intro")
            .schemaType("aboutIntro")
            .documentId("aboutIntro-singleton"),
        ),
      S.listItem()
        .title("About — Founder (Dr. Ashley)")
        .child(
          S.document()
            .title("About — Founder")
            .schemaType("aboutFounder")
            .documentId("aboutFounder-singleton"),
        ),
      S.listItem()
        .title("About — Team Section Header")
        .child(
          S.document()
            .title("About — Team Section Header")
            .schemaType("aboutTeamSection")
            .documentId("aboutTeamSection-singleton"),
        ),
      S.listItem()
        .title("About — Team Members")
        .child(S.documentTypeList("teamMember").title("Team Members")),
      S.listItem()
        .title("About — Approach Summary")
        .child(
          S.document()
            .title("About — Approach Summary")
            .schemaType("aboutApproach")
            .documentId("aboutApproach-singleton"),
        ),
      S.listItem()
        .title("About — Pebbles Quote")
        .child(
          S.document()
            .title("About — Pebbles Quote")
            .schemaType("aboutPebbles")
            .documentId("aboutPebbles-singleton"),
        ),
      S.listItem()
        .title("About — Featured Story")
        .child(
          S.document()
            .title("About — Featured Story")
            .schemaType("aboutStory")
            .documentId("aboutStory-singleton"),
        ),
      S.listItem()
        .title("About — FAQ")
        .child(
          S.document().title("About — FAQ").schemaType("aboutFaq").documentId("aboutFaq-singleton"),
        ),
      S.listItem()
        .title("About — Closing CTA")
        .child(
          S.document()
            .title("About — Closing CTA")
            .schemaType("aboutCta")
            .documentId("aboutCta-singleton"),
        ),

      S.divider(),

      // ── Services page (/services) ───────────────────────────────────
      S.listItem()
        .title("Services — Hero")
        .child(
          S.document()
            .title("Services — Hero")
            .schemaType("servicesHero")
            .documentId("servicesHero-singleton"),
        ),
      S.listItem()
        .title("Services — Service Blocks")
        .child(S.documentTypeList("servicesBlock").title("Service Blocks")),
      S.listItem()
        .title('Services — "By the numbers" Stats')
        .child(
          S.document()
            .title("Services — Stats")
            .schemaType("servicesStats")
            .documentId("servicesStats-singleton"),
        ),
      S.listItem()
        .title("Services — Pricing")
        .child(
          S.document()
            .title("Services — Pricing")
            .schemaType("servicesPricing")
            .documentId("servicesPricing-singleton"),
        ),
      S.listItem()
        .title("Services — Featured Story")
        .child(
          S.document()
            .title("Services — Featured Story")
            .schemaType("servicesStory")
            .documentId("servicesStory-singleton"),
        ),
      S.listItem()
        .title("Services — FAQ")
        .child(
          S.document()
            .title("Services — FAQ")
            .schemaType("servicesFaq")
            .documentId("servicesFaq-singleton"),
        ),
      S.listItem()
        .title("Services — Closing CTA")
        .child(
          S.document()
            .title("Services — Closing CTA")
            .schemaType("servicesCta")
            .documentId("servicesCta-singleton"),
        ),

      S.divider(),

      // ── Journal — index + article-detail chrome + posts list ────────
      S.listItem()
        .title("Journal — Index Page (/journal)")
        .child(
          S.document()
            .title("Journal — Index Page")
            .schemaType("journalIndexPage")
            .documentId("journalIndexPage-singleton"),
        ),
      S.listItem()
        .title("Journal — Article Detail Chrome (shared labels)")
        .child(
          S.document()
            .title("Journal — Article Detail Chrome")
            .schemaType("journalArticlePage")
            .documentId("journalArticlePage-singleton"),
        ),
      S.listItem()
        .title("Journal — All Articles")
        .child(S.documentTypeList("journalArticle").title("Journal Articles")),
    ]);
