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

// About-page sections (each is its own document, mirroring the homepage pattern)
import { aboutHeroType } from "./aboutHero";
import { aboutIntroType } from "./aboutIntro";
import { aboutFounderType } from "./aboutFounder";
import { aboutTeamSectionType } from "./aboutTeamSection";
import { aboutApproachType } from "./aboutApproach";
import { aboutPebblesType } from "./aboutPebbles";
import { aboutStoryType } from "./aboutStory";
import { aboutFaqType } from "./aboutFaq";
import { aboutCtaType } from "./aboutCta";
import { teamMemberType } from "./teamMember";

// Services-page sections
import { servicesHeroType } from "./servicesHero";
import { servicesBlockType } from "./servicesBlock";
import { servicesStatsType } from "./servicesStats";
import { servicesPricingType } from "./servicesPricing";
import { servicesStoryType } from "./servicesStory";
import { servicesFaqType } from "./servicesFaq";
import { servicesCtaType } from "./servicesCta";

// Journal page (chrome singletons that wrap the journalArticle collection)
import { journalIndexPageType } from "./journalIndexPage";
import { journalArticlePageType } from "./journalArticlePage";

// Service detail page chrome (wraps the service collection at /services/[slug])
import { servicePageType } from "./servicePage";

// Site-wide chrome (nav + footer)
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
  aboutHeroType,
  aboutIntroType,
  aboutFounderType,
  aboutTeamSectionType,
  aboutApproachType,
  aboutPebblesType,
  aboutStoryType,
  aboutFaqType,
  aboutCtaType,
  teamMemberType,

  // Services page
  servicesHeroType,
  servicesBlockType,
  servicesStatsType,
  servicesPricingType,
  servicesStoryType,
  servicesFaqType,
  servicesCtaType,

  // Journal page chrome
  journalIndexPageType,
  journalArticlePageType,

  // Service detail chrome
  servicePageType,

  // Site-wide chrome
  navSectionType,
  footerSectionType,
];
