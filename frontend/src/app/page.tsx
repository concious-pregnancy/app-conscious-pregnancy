import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Balance from "@/components/Balance";
import Services from "@/components/Services";
import Philosophy from "@/components/Philosophy";
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

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Balance />
        <Services />
        <Philosophy />
        <Story
          label="A Different Starting Point."
          title="She came in thinking her hormones were fine."
          body="Standard bloodwork had flagged nothing. But a full functional panel told a different story: subclinical hypothyroidism, low vitamin D, and an MTHFR variant she had never heard of. Three months later, her numbers and her energy were both transformed."
          image="/hero/hero-eye.jpeg"
          image2="/hero/hero-kimono.jpeg"
        />
        <Process />
        <Ready />
        <Pricing />
        <Approach />
        <Listen />
        <RealStories />
        <Journal />
        <Stats />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
