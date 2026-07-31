"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { LineReveal } from "@/components/shared/line-reveal"
import { Magnetic } from "@/components/shared/magnetic"
import { site } from "@/lib/site"

const ease = [0.16, 1, 0.3, 1] as const

/** Technische Eckdaten am unteren Bühnenrand. Nur Belegtes. */
const specs = [
  {
    k: "Bewertung",
    // Erzwungene Nachkommastelle: toLocaleString(5) liefert sonst "5" und
    // die Zahl liest sich wie eine Anzahl statt wie eine Note.
    v: `${site.reviews.rating.toLocaleString("de-DE", {
      minimumFractionDigits: 1,
    })} bei ${site.reviews.count} auf Google`,
  },
  { k: "Folien", v: "3M · Avery · HEXIS · ORAFOL" },
  { k: "Standort", v: "Jüchen · Rhein-Kreis Neuss" },
  { k: "Termine", v: "Nach Vereinbarung" },
]

/**
 * Bühne statt Banner.
 *
 * Der frühere Hero legte einen Textblock links auf ein vollflächiges Foto —
 * eine Anordnung, die jede zweite Handwerkerseite benutzt. Hier steht das
 * Foto stattdessen als beschnittene Tafel rechts, gegen eine schwarze
 * Satzfläche links, und die Headline läuft bewusst über die Kante dieser
 * Tafel hinweg. Diese eine Überschneidung erzeugt die Tiefe, für die es
 * sonst Schatten und Glows bräuchte.
 */
export function Hero() {
  const ref = React.useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  // Das Bild zieht langsamer nach als der Satz — echte Tiefenstaffelung
  // statt eines Blocks, der als Ganzes verschwindet.
  //
  // Bei reduced-motion werden die Werte geklemmt statt das style-Objekt
  // wegzulassen: sonst bliebe eine bereits geschriebene Transform stehen.
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"])
  const imageScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0])

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32 pb-0 lg:justify-center lg:pt-36"
    >
      {/* Grundfläche: neutrales Schwarz mit feinem Messraster */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-background">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(120%_90%_at_20%_40%,#000,transparent_75%)]" />
      </div>

      {/* Bildtafel. Auf lg beschnitten auf die rechte Bühnenhälfte, darunter
          vollflächig hinter dem Satz. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 lg:left-[42%] lg:border-l lg:border-border"
      >
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0"
        >
          <Image
            src="/stock/hero-car.jpg"
            alt=""
            fill
            priority
            // Ab lg belegt die Bildtafel nur die rechten 58 % der Bühne;
            // mit 100vw wurde die 3840er Variante geladen (78,6 KB) statt
            // der 2048er (49,5 KB) — auf dem LCP-Pfad.
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[62%_55%] [filter:contrast(1.08)_saturate(0.92)_brightness(0.95)]"
          />
        </motion.div>

        {/* Weiche Kante nach links, damit die Headline über die Tafel laufen
            kann, ohne unlesbar zu werden. Unter lg liegt das Bild vollflächig
            hinter dem Satz und braucht deshalb einen deutlich dichteren
            Scrim — sonst steht der Fließtext auf der Karosserie. */}
        <div className="absolute inset-0 bg-linear-to-r from-background from-30% via-background/75 to-background/45 lg:from-background lg:from-0% lg:via-background/0 lg:via-40% lg:to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background from-10% via-background/55 to-background/70 lg:via-transparent lg:to-background/50" />
        <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <Container width="wide" className="w-full">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="pb-14 lg:pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="t-mono flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground"
          >
            <span className="h-px w-10 bg-signal" aria-hidden />
            <span>Folierstudio Jüchen</span>
            {/* Zweiter Teil erst ab sm — auf 390 px bricht die Zeile sonst
                mitten im Trennzeichen um. */}
            <span className="hidden text-border sm:inline" aria-hidden>
              /
            </span>
            <span className="hidden sm:inline">Seit der ersten Bahn Folie</span>
          </motion.div>

          {/* H1: unsichtbarer Fließtext für Suchmaschinen und Screenreader,
              visuell das zeilenweise maskierte Pendant. */}
          <h1 className="mt-7 lg:mt-9">
            <span className="sr-only">
              Premium Fahrzeugfolierung und Lackschutz in Jüchen.
            </span>
            <LineReveal
              aria-hidden
              className="t-display"
              delay={0.06}
              lines={[
                <span key="1" className="text-outline">
                  Premium
                </span>,
                <span key="2" className="text-flow">
                  Fahrzeugfolierung
                </span>,
                <span key="3" className="text-foreground">
                  &amp; Lackschutz
                </span>,
              ]}
            />
          </h1>

          <div className="mt-10 grid gap-9 lg:mt-14 lg:grid-cols-[minmax(0,30rem)_auto] lg:items-end lg:gap-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.42 }}
              className="t-lead border-l border-border pl-6 text-foreground/70 text-pretty"
            >
              Millimetergenau verlegte Markenfolie, unsichtbarer
              Steinschlagschutz und Tiefenglanz, der bleibt. Aus Jüchen,
              wenige Minuten von Neuss, Düsseldorf und Mönchengladbach.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.5 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/#kontakt">
                    Festpreis anfragen
                    <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="lg">
                {/* Führt auf eine Seite mit sichtbaren Zahlen statt in ein
                    Akkordeon mit 15 geschlossenen Fragen. */}
                <Link href="/leistungen">Preise ansehen</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Spec-Leiste: die Eckdaten als Messtafel über die volle Bühnenbreite.
          Ersetzt die frühere Trust-Zeile — gleiche Information, aber im
          technischen Register der Marke. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease, delay: 0.7 }}
        className="relative z-10 border-t border-border bg-background/70 backdrop-blur-md"
      >
        <Container width="wide" className="px-0! sm:px-0! lg:px-0!">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {specs.map((spec, i) => (
              <div
                key={spec.k}
                className={
                  "flex flex-col gap-1.5 px-5 py-4 sm:px-8 lg:px-12 " +
                  (i > 0 ? "border-l border-border" : "") +
                  (i < 2 ? " max-lg:border-b max-lg:border-border" : "") +
                  (i === 2 ? " max-lg:border-l-0" : "")
                }
              >
                <dt className="t-mono text-muted-foreground">{spec.k}</dt>
                <dd className="t-mono-sm flex items-center gap-2 text-foreground/90">
                  {i === 0 ? (
                    <Star
                      className="size-3.5 fill-signal text-signal"
                      aria-hidden
                    />
                  ) : null}
                  <span className="truncate">{spec.v}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </motion.div>
    </section>
  )
}
