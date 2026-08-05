"use client"

import * as React from "react"
import { useInView, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * Der auffahrende Textblock der Leistungskacheln — auf jedem Gerät.
 *
 * Auf dem Desktop steht auf der Kachel zunächst nur die Überschrift, beim
 * Überfahren fährt der komplette Text hoch. Auf dem Telefon gab es diese
 * Bewegung nicht: Dort stand alles von Anfang an offen, weil es kein Hover
 * gibt. Damit fehlte auf genau dem Gerät, auf dem die meisten Besucher
 * ankommen, die auffälligste Bewegung der Seite.
 *
 * Der Auslöser unterscheidet sich deshalb nach Gerät, die Bewegung nicht:
 *
 * - **ab `lg`**: Hover und Tastaturfokus, wie bisher.
 * - **darunter**: der Block fährt auf, sobald die Kachel in den Blick kommt,
 *   und bleibt offen. Bewusst *kein* Auf- und Zuklappen per Antippen — der
 *   erste Fingertipp auf einer Kachel muss die Leistungsseite öffnen, alles
 *   andere wäre eine unterschlagene Navigation.
 *
 * `grid-template-rows: 0fr → 1fr` ist weiterhin die Mechanik: die einzige,
 * die eine *unbekannte* Texthöhe animierbar macht, ohne eine Maximalhöhe zu
 * raten.
 */
export function HoverReveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  /** `span`, wo der Block innerhalb eines `<a>` steht. */
  as?: "div" | "span"
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLElement>(null)

  /*
   * `amount: 0` ist hier Pflicht, kein Standardwert.
   *
   * Der Block ist im Ruhezustand null Pixel hoch. Jeder Schwellwert über 0
   * fordert einen Anteil sichtbarer Fläche, den ein Element ohne Fläche nie
   * erreichen kann — der Beobachter warte dann auf eine Sichtbarkeit, die
   * erst die Animation herstellen würde, die auf ihn wartet.
   *
   * Der negative untere Rand verschiebt den Auslöser aus der Bildschirmkante
   * heraus: sonst startet die Bewegung genau dann, wenn die Kachel unten
   * gerade erst anschneidet, und ist vorbei, bevor sie zu lesen ist.
   */
  const inView = useInView(ref, {
    once: true,
    amount: 0,
    margin: "0px 0px -12% 0px",
  })

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      data-open={reduce || inView ? "true" : "false"}
      className={cn(
        "grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-[420ms] ease-[var(--ease-premium)] motion-reduce:transition-none",
        "max-lg:data-[open=true]:grid-rows-[1fr] max-lg:data-[open=true]:opacity-100",
        "lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-visible:grid-rows-[1fr] lg:group-focus-visible:opacity-100",
        className,
      )}
    >
      {/* `block` explizit: als `span` wäre der innere Träger inline, und
          `overflow: hidden` bleibt auf einem Inline-Element wirkungslos —
          der Text stünde beim Zufahren über die Kachelkante hinaus. */}
      <Tag className="block overflow-hidden">{children}</Tag>
    </Tag>
  )
}
