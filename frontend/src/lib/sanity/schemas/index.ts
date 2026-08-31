import { faqType } from "./faq";
import { faqSectionType } from "./faqSection";
import { pricingTierType } from "./pricingTier";
import { pricingSectionType } from "./pricingSection";
import { serviceType, serviceExtraType } from "./service";
import { servicesSectionType } from "./servicesSection";
import { journalArticleType } from "./journalArticle";
import { journalSectionType } from "./journalSection";
import { testimonialType } from "./testimonial";
import { heroSectionType } from "./heroSection";
import { balanceSectionType } from "./balanceSection";
import { listenSectionType } from "./listenSection";
import { statsSectionType } from "./statsSection";
import { processSectionType } from "./processSection";
import { credentialsSectionType } from "./credentialsSection";
import { readySectionType } from "./readySection";
import { contactSectionType } from "./contactSection";
import { philosophySectionType } from "./philosophySection";
import { approachSectionType } from "./approachSection";

// About page: one consolidated document, grouped by on-page section
import { aboutPageType } from "./aboutPage";

// Services-page sections
import { servicesCtaType } from "./servicesCta";

// Journal page (layout singletons that wrap the journalArticle collection)
import { journalIndexPageType } from "./journalIndexPage";
import { journalArticlePageType } from "./journalArticlePage";

// Service detail page layout (wraps the service collection at /services/[slug])
import { servicePageType } from "./servicePage";

// Site-wide layout (nav + footer)
import { navSectionType } from "./navSection";
import { footerSectionType } from "./footerSection";

export const schemaTypes = [
  // Homepage
  faqType,
  faqSectionType,
  pricingTierType,
  pricingSectionType,
  serviceType,
  serviceExtraType,
  servicesSectionType,
  journalArticleType,
  journalSectionType,
  testimonialType,
  heroSectionType,
  balanceSectionType,
  listenSectionType,
  statsSectionType,
  processSectionType,
  credentialsSectionType,
  readySectionType,
  contactSectionType,
  philosophySectionType,
  approachSectionType,

  // About page
  aboutPageType,

  // Services page
  servicesCtaType,

  // Journal page layout
  journalIndexPageType,
  journalArticlePageType,

  // Service detail layout
  servicePageType,

  // Site-wide layout
  navSectionType,
  footerSectionType,
];
