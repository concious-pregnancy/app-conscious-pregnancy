import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Balance from "@/components/Balance";
import Services from "@/components/Services";
import Philosophy from "@/components/Philosophy";
import { FLAGS } from "@/flags";
import Story from "@/components/Story";
import Process from "@/components/Process";
import Ready from "@/components/Ready";
import Pricing from "@/components/Pricing";
import Approach from "@/components/Approach";
import Listen from "@/components/Listen";
import RealStories from "@/components/RealStories";
import Journal from "@/components/Journal";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import {
  faqsQuery,
  pricingTiersQuery,
  servicesQuery,
  serviceExtrasQuery,
  journalArticlesQuery,
  testimonialQuery,
  heroSectionQuery,
  balanceSectionQuery,
  listenSectionQuery,
  statsSectionQuery,
  processSectionQuery,
  credentialsSectionQuery,
} from "@/lib/sanity/queries";

export default async function Home() {
  const fetchOpts = { cache: "no-store" } as const;
  const [
    faqs,
    pricingTiers,
    services,
    serviceExtras,
    journalArticles,
    testimonial,
    heroContent,
    balanceContent,
    listenContent,
    statsContent,
    processContent,
    credentialsContent,
  ] = await Promise.all([
    client.fetch(faqsQuery, {}, fetchOpts),
    client.fetch(pricingTiersQuery, {}, fetchOpts),
    client.fetch(servicesQuery, {}, fetchOpts),
    client.fetch(serviceExtrasQuery, {}, fetchOpts),
    client.fetch(journalArticlesQuery, {}, fetchOpts),
    client.fetch(testimonialQuery, {}, fetchOpts),
    client.fetch(heroSectionQuery, {}, fetchOpts),
    client.fetch(balanceSectionQuery, {}, fetchOpts),
    client.fetch(listenSectionQuery, {}, fetchOpts),
    client.fetch(statsSectionQuery, {}, fetchOpts),
    client.fetch(processSectionQuery, {}, fetchOpts),
    client.fetch(credentialsSectionQuery, {}, fetchOpts),
  ]);

  return (
    <>
      <Nav />
      <main>
        <Hero content={heroContent} />
        <Balance content={balanceContent} />
        <Services services={services} extras={serviceExtras} />
        {!FLAGS.OMIT_SECTIONS.philosophy && <Philosophy />}
        <Process content={processContent} />
        <Story
          id="credentials"
          label={credentialsContent?.label ?? "Support Grounded in Experience"}
          title={
            credentialsContent?.title ?? "Eastern and Western medicine, one practice, one purpose."
          }
          body={
            credentialsContent?.body ??
            "Dr. Ashley Alden holds a Doctorate in Acupuncture and Chinese Medicine (DACM) and a Master of Traditional Oriental Medicine (MTOM). She is a licensed acupuncturist (L.Ac.) with specialized training in functional medicine, somatic healing, and psychedelic integration for preconception and postpartum care."
          }
          body2={
            credentialsContent?.body2 ??
            "Her practice brings together functional lab analysis, acupuncture, nervous system regulation, and trauma-informed bodywork into a single, integrated model. The result is care that addresses root causes rather than isolated symptoms, preparing the whole person for conception, pregnancy, and beyond."
          }
          ctaLabel={credentialsContent?.ctaLabel ?? "Learn More About Ashley"}
          image={
            credentialsContent?.image?.asset
              ? urlFor(credentialsContent.image).width(1200).url()
              : "/hero/hero-eye.jpeg"
          }
          image2={
            credentialsContent?.image2?.asset
              ? urlFor(credentialsContent.image2).width(1200).url()
              : "/hero/hero-kimono.jpeg"
          }
        />
        <Ready />
        <Pricing tiers={pricingTiers} />
        {!FLAGS.OMIT_SECTIONS.approach && <Approach />}
        <Listen content={listenContent} />
        {!FLAGS.OMIT_SECTIONS.realStories && <RealStories testimonial={testimonial} />}
        <Journal articles={journalArticles} />
        {!FLAGS.OMIT_SECTIONS.stats && <Stats content={statsContent} />}
        <FAQ items={faqs} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
