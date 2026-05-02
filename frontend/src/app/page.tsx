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
import {
  faqsQuery,
  pricingTiersQuery,
  servicesQuery,
  serviceExtrasQuery,
  journalArticlesQuery,
  testimonialQuery,
} from "@/lib/sanity/queries";

export default async function Home() {
  const fetchOpts = { cache: "no-store" } as const;
  const [faqs, pricingTiers, services, serviceExtras, journalArticles, testimonial] =
    await Promise.all([
      client.fetch(faqsQuery, {}, fetchOpts),
      client.fetch(pricingTiersQuery, {}, fetchOpts),
      client.fetch(servicesQuery, {}, fetchOpts),
      client.fetch(serviceExtrasQuery, {}, fetchOpts),
      client.fetch(journalArticlesQuery, {}, fetchOpts),
      client.fetch(testimonialQuery, {}, fetchOpts),
    ]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Balance />
        <Services services={services} extras={serviceExtras} />
        {!FLAGS.OMIT_SECTIONS.philosophy && <Philosophy />}
        <Process />
        <Story
          id="credentials"
          label="Support Grounded in Experience"
          title="Eastern and Western medicine, one practice, one purpose."
          body="Dr. Ashley Alden holds a Doctorate in Acupuncture and Chinese Medicine (DACM) and a Master of Traditional Oriental Medicine (MTOM). She is a licensed acupuncturist (L.Ac.) with specialized training in functional medicine, somatic healing, and psychedelic integration for preconception and postpartum care."
          body2="Her practice brings together functional lab analysis, acupuncture, nervous system regulation, and trauma-informed bodywork into a single, integrated model. The result is care that addresses root causes rather than isolated symptoms, preparing the whole person for conception, pregnancy, and beyond."
          ctaLabel="Learn More About Ashley"
          image="/hero/hero-eye.jpeg"
          image2="/hero/hero-kimono.jpeg"
        />
        <Ready />
        <Pricing tiers={pricingTiers} />
        {!FLAGS.OMIT_SECTIONS.approach && <Approach />}
        <Listen />
        {!FLAGS.OMIT_SECTIONS.realStories && <RealStories testimonial={testimonial} />}
        <Journal articles={journalArticles} />
        {!FLAGS.OMIT_SECTIONS.stats && <Stats />}
        <FAQ items={faqs} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
