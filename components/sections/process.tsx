"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import * as React from "react"

import { Container } from "@/components/shared/container"
import { SectionHead } from "@/components/shared/section-head"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { processSteps } from "@/lib/site"

/**
 * Ablauf als Zeitstrahl mit mitwachsender Linie.
 *
 * Fünf nummerierte Absätze untereinander sind eine Liste, kein Ablauf. Was
 * daraus einen Prozess macht, ist die durchgehende Linie links: sie füllt
 * sich exakt mit dem Scrollfortschritt der Section und zeigt damit, wie weit
 * man im Verfahren ist.
 *
 * Die Linie läuft über `scaleY` mit `transform-origin: top` — nicht über
 * `height`. Eine animierte Höhe erzwingt pro Frame ein Layout für die ganze
 * Spalte; `scaleY` läuft auf dem Compositor.
 *
 * Die Bildspalte ist unter `lg` **vollständig** ausgeblendet, nicht nur das
 * Bild darin: bliebe der leere Block stehen, stünde auf dem Telefon eine
 * unsichtbare Spalte plus deren Rasterabstand im Layout.
 */
export function Process() {
  const reduce = useReducedMotion()
  const listRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.6"],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="ablauf" className="section-sm scroll-mt-24">
      <SectionHead
        label="Ablauf"
        titleLines={["Von der Anfrage", "bis zur Übergabe."]}
        lead="Fünf Schritte, die bei jedem Fahrzeug gleich laufen. Sie wissen jederzeit, woran wir gerade arbeiten und was als Nächstes kommt."
        id="ablauf-titel"
      />

      <Container className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-16">
        <div ref={listRef} className="relative lg:col-span-7">
          {/* Schiene und Füllung. Die Schiene sitzt auf der Mitte der Ziffern
              (2rem Kreis → 1rem Achse), damit die Linie durch sie hindurch
              läuft statt daneben. */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.125rem] w-px bg-border sm:left-[1.375rem]"
          />
          <motion.span
            aria-hidden
            style={reduce ? { scaleY: 1 } : { scaleY: progress }}
            className="bg-iris absolute top-2 bottom-2 left-[1.125rem] w-px origin-top sm:left-[1.375rem]"
          />

          <RevealGroup as="ol" stagger={0.09} className="flex flex-col">
            {processSteps.map((step) => (
              <RevealItem
                key={step.step}
                as="li"
                className="group relative flex gap-6 pb-12 last:pb-0 sm:gap-8"
              >
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background sm:size-11">
                  <span className="nums text-sm font-bold text-muted-foreground transition-colors duration-300 group-hover:text-brand">
                    {step.step}
                  </span>
                </span>
                <div className="pt-1">
                  <h3 className="t-h3">{step.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground text-pretty">
                    {step.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal
          variant="rise"
          className="hidden lg:sticky lg:top-28 lg:col-span-5 lg:block lg:self-start"
        >
          <div className="ring-iris relative aspect-4/5 overflow-hidden rounded-2xl bg-surface">
            <Image
              src="/originals/img-20.jpeg"
              alt="Arbeitsplatz im Folierstudio von WrapCut in Jüchen"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="img-punch object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background/80 to-transparent"
            />
            <p className="absolute inset-x-7 bottom-7 text-[0.95rem] leading-relaxed text-white/85">
              Staubarme Umgebung, saubere Kanten. Die Vorbereitung entscheidet
              über das Ergebnis, hier sparen wir nie.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
