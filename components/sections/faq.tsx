import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal } from "@/components/shared/reveal"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { faqs as homeFaqs, type Faq as FaqItem } from "@/lib/site"

/**
 * Wird auf der Startseite mit dem vollständigen FAQ und auf den Landingpages
 * mit dem jeweils themenspezifischen Auszug gerendert. Wichtig: Das
 * FAQPage-Schema muss immer genau die hier sichtbaren Fragen abbilden.
 */
export function Faq({
  items = homeFaqs,
  index,
  eyebrow = "Häufige Fragen",
  headline = "Antworten,",
  headlineAccent = "bevor Sie fragen.",
  intro = "Alles Wichtige zu Folierung, Lackschutz, Keramik und Tönung. Ihre Frage ist nicht dabei?",
}: {
  items?: readonly FaqItem[]
  /** Nur auf der Startseite gesetzt — dort laufen die Sections durchnummeriert. */
  index?: string
  eyebrow?: string
  headline?: string
  headlineAccent?: string
  intro?: string
} = {}) {
  return (
    <section id="faq" className="section scroll-mt-20">
      <Container
        width="wide"
        className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24"
      >
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          <h2 className="t-h2 mt-7 text-balance">
            {headline}
            <span className="text-muted-foreground block">{headlineAccent}</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground text-pretty">
            {intro}
          </p>
          <Link
            href="/#kontakt"
            className="t-mono mt-6 inline-flex items-center gap-2 text-signal underline-offset-4 hover:underline"
          >
            {/* In Versalien liest sich das ursprüngliche "Stellen Sie sie uns
                direkt" wegen des doppelten SIE wie ein Tippfehler. */}
            Frage direkt stellen →
          </Link>
        </Reveal>

        <Reveal>
          <Accordion type="single" collapsible className="w-full border-t border-border">
            {items.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>
                  <span className="t-mono nums mt-1.5 shrink-0 text-muted-foreground" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
