import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Approach from '@/components/Approach'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Journal from '@/components/Journal'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Approach />
        <Services />
        <Process />
        <Pricing />
        <FAQ />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
