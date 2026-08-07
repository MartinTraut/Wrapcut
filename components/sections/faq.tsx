import Link from "next/link"

import { Container } from "@/components/shared/container"
import { SectionHead } from "@/components/shared/section-head"
import { Reveal } from "@/components/shared/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { faqs, site } from "@/lib/site"

/**
 * FAQ zweispaltig, interview-artig.
 *
 * Die naheliegende Bauform — klebende Kopfspalte links, alle Fragen rechts —
 * erzeugt bei fünfzehn Fragen eine über tausend Pixel hohe leere linke
 * Fläche, und zwar genau vor dem Kontaktformular, also an der Stelle mit der
 * höchsten Abbruchgefahr. Der Kopf steht deshalb über der vollen Breite, die
 * Fragen laufen zweispaltig darunter.
 *
 * **Zwei getrennte Accordion-Instanzen**, nicht eine über beide Spalten:
 * `type="single"` gilt pro Instanz. Bei einem gemeinsamen Accordion würde das
 * Öffnen einer linken Frage die rechte Spalte springen lassen. So kann links
 * und rechts je eine Antwort offen stehen.
 */
export function Faq() {
  const split = Math.ceil(faqs.length / 2)
  const columns = [faqs.slice(0, split), faqs.slice(split)]

  return (
    <section id="faq" className="section-sm scroll-mt-24">
      {/* „Antworten, bevor Sie fragen." klang nach Werbespruch und
          unterstellte dem Leser, seine Frage sei vorhersehbar. Ein
          Fachbetrieb sagt schlicht, worüber er Auskunft gibt. */}
      <SectionHead
        label="Fragen & Antworten"
        titleLines={["Was Kunden uns", "vorher fragen."]}
        lead="Alles Wichtige zu Folierung, Lackschutz, Keramik und Tönung. Ihre Frage ist nicht dabei?"
        action={
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href="/#kontakt">Kostenloses Angebot</Link>
            </Button>
            <a
              href={site.contact.phoneHref}
              className="focus-ring inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              oder{" "}
              <span className="nums font-semibold text-foreground">
                {site.contact.phone}
              </span>
            </a>
          </div>
        }
        id="faq-titel"
      />

      <Container>
        <Reveal className="mt-14 grid gap-x-16 lg:mt-16 lg:grid-cols-2">
          {columns.map((column, col) => (
            <Accordion
              key={col}
              type="single"
              collapsible
              className="w-full border-t border-border"
            >
              {column.map((faq, i) => {
                // Durchlaufende Nummerierung über beide Spalten hinweg —
                // sonst begänne die rechte Spalte wieder bei 01 und die
                // Zählung läse sich als zwei getrennte Listen.
                const index = col * split + i
                return (
                  <AccordionItem key={faq.q} value={faq.q}>
                    <AccordionTrigger>
                      <span
                        className="nums mt-1 shrink-0 text-xs font-semibold text-brand"
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{faq.q}</span>
                    </AccordionTrigger>
                    {/* Eingerückt auf die Fluchtlinie der Frage, damit Antwort
                        und Frage eine Spalte bilden statt zwei. */}
                    <AccordionContent className="pl-[2.6rem] leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
