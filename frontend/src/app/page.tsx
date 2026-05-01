import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Balance from "@/components/Balance";
import Services from "@/components/Services";
import Philosophy from "@/components/Philosophy";
import Story from "@/components/Story";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Pricing from "@/components/Pricing";
import Credentials from "@/components/Credentials";
import Quote from "@/components/Quote";
import Journal from "@/components/Journal";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Balance />
        <Philosophy />
        <Story
          label="A different starting point."
          title="She came in thinking her hormones were fine."
          body="Standard bloodwork had flagged nothing. But a full functional panel told a different story: subclinical hypothyroidism, low vitamin D, and an MTHFR variant she had never heard of. Three months later, her numbers and her energy were both transformed."
          image="/hero-pic.webp"
        />
        <Process />
        <CTA />
        <Pricing />
        <Credentials />
        <Quote />
        <Story
          label="Both partners, one program."
          title="They came in together and prepared together."
          body="When both partners went through functional labs, the results surprised them. His sperm morphology and her cortisol patterns were both contributing. Addressing both sides of the equation gave them a foundation neither had expected to build."
          image="/hero-pic.webp"
          reverse
        />
        <Journal />
        <Stats />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
