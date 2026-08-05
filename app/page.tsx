import { Hero } from "@/components/sections/hero"
import { Proof } from "@/components/sections/proof"
import { Services } from "@/components/sections/services"
import { Gallery } from "@/components/sections/gallery"
import { Process } from "@/components/sections/process"
import { Studio } from "@/components/sections/studio"
import { Reviews } from "@/components/sections/reviews"
import { Faq } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
import { JsonLd } from "@/components/shared/json-ld"
import { faqs } from "@/lib/site"

/**
 * Die Startseite als Abfolge der Fragen, die ein Besucher tatsächlich stellt:
 *
 *   Hero      → Was ist das und für wen?
 *   Proof     → Warum sollte ich euch trauen?
 *   Services  → Was genau bekomme ich?
 *   Gallery   → Zeigt her.
 *   Process   → Wie läuft das ab?
 *   Studio    → Wer macht das, und womit?
 *   Reviews   → Was sagen andere hinterher?
 *   Faq       → Was ist mit …?
 *   Contact   → Was tue ich jetzt?
 *
 * Die Reihenfolge ist die eigentliche Designarbeit: der stärkste belegte Fakt
 * des Betriebs — 5,0 bei 24 Bewertungen — steht direkt nach dem ersten
 * Scroll, nicht auf halber Seitenhöhe. Alles, was über die Entscheidung
 * „weiterlesen oder nicht" hinter dieser Schwelle steht, wirkt nur noch auf
 * die, die ohnehin bleiben.
 */
export default function HomePage() {
  return (
    <>
      {/* Das FAQ ist auf dieser Seite sichtbar, nur deshalb darf FAQPage
          hier mit in den Graph. */}
      <JsonLd faqs={faqs} />
      <Hero />
      <Proof />
      <Services />
      <Gallery />
      <Process />
      <Studio />
      <Reviews />
      <Faq />
      <Contact />
    </>
  )
}
