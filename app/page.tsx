import { ScrollProgress } from "@/components/shared/scroll-progress"
import { SmoothScroll } from "@/components/shared/smooth-scroll"
import { StickyCta } from "@/components/shared/sticky-cta"
import { HomeJsonLd } from "@/components/shared/json-ld"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { TrustMarquee } from "@/components/sections/trust-marquee"
import { Services } from "@/components/sections/services"
import { Showcase } from "@/components/sections/showcase"
import { About } from "@/components/sections/about"
import { Suppliers } from "@/components/sections/suppliers"
import { Stats } from "@/components/sections/stats"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { ParallaxBand } from "@/components/sections/parallax-band"
import { Faq } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

/**
 * Dramaturgie: Beweis vor Erklärung. Die Galerie ist in dieser Branche das
 * einzige harte Argument und steht deshalb direkt hinter den Leistungen,
 * nicht an neunter Stelle. Die früher drei aufeinanderfolgenden Vertrauens-
 * blöcke (About, Stats, Lieferanten) sind zu einem Abschnitt verdichtet.
 */
export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <TrustMarquee />
        <Services />
        <Showcase />
        <About />
        <Suppliers />
        <Stats />
        <Process />
        <Testimonials />
        <ParallaxBand />
        <Faq index="06" />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
