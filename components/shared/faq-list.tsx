import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Faq } from "@/lib/site"

/**
 * FAQ-Block für Unterseiten.
 *
 * Einspaltig statt zweispaltig wie auf der Startseite: dort tragen fünfzehn
 * Fragen zwei Spalten, hier sind es drei bis fünf — zweispaltig entstünde eine
 * Spalte mit zwei Einträgen neben einer leeren Fläche.
 */
export function FaqList({ faqs, headingId }: { faqs: Faq[]; headingId?: string }) {
  return (
    <Accordion
      type="single"
      collapsible
      aria-labelledby={headingId}
      className="w-full border-t border-border"
    >
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={faq.q}>
          <AccordionTrigger>
            <span
              className="nums mt-1 shrink-0 text-xs font-semibold text-brand"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">{faq.q}</span>
          </AccordionTrigger>
          <AccordionContent className="pl-[2.6rem] leading-relaxed">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
