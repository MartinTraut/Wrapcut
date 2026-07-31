import { ScrollProgress } from "@/components/shared/scroll-progress"
import { SmoothScroll } from "@/components/shared/smooth-scroll"
import { StickyCta } from "@/components/shared/sticky-cta"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

/**
 * Rahmen für alle Landingpages (Leistungen, Standorte). Gleiche Navigation,
 * gleiche Scroll-Mechanik und derselbe Sticky-CTA wie auf der Startseite —
 * die Unterseiten sollen sich nicht wie ein anderes Produkt anfühlen.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
