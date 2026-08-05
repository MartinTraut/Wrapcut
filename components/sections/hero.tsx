"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowRight, Phone, Star } from "lucide-react"

import { Container } from "@/components/shared/container"
import { LineReveal } from "@/components/shared/line-reveal"
import { Magnetic } from "@/components/shared/magnetic"
import { Button } from "@/components/ui/button"
import { gallery, site } from "@/lib/site"

/*
 * Hero als Showroom, nicht als Vollbild-Plakat.
 *
 * Ein einzelnes großflächig abgedunkeltes Foto hinter einer Headline ist das
 * Standardmuster — und es verschenkt hier das beste Argument des Betriebs:
 * er hat achtzehn Fotos fertiger Fahrzeuge aus einer Halle mit
 * Hexagon-Lichtdecke. Statt eines Bildes läuft deshalb unten eine
 * angeschnittene Reihe: man sieht sofort mehrere Arbeiten und dass es
 * weitergeht.
 *
 * Die Fotos sind bewusst NICHT flächig abgedunkelt. Text und Bild teilen
 * sich keine Fläche, also braucht es keinen Verlauf darüber — die Autos
 * behalten ihre Farbe, und das ist die Farbigkeit der Marke.
 *
 * Beim Wegscrollen sinkt die Bühne leicht zurück und blendet aus, statt hart
 * aus dem Bild zu rutschen. Nur `transform` und `opacity`, kein Layout.
 */

const EASE = [0.22, 1, 0.36, 1] as const
const showroom = gallery.slice(0, 6)

/**
 * Schlusszeile der Headline: ein farbiges Wort, das sich nach dem Auftritt
 * selbst unterstreicht.
 *
 * Der Strich fährt erst, wenn alle drei Zeilen stehen — er ist die Pointe,
 * nicht Teil des Auftritts. `scaleX` auf `origin-left` statt einer animierten
 * Breite: das läuft auf dem Compositor und erzwingt kein Layout.
 */
function Accent({ reduce }: { reduce: boolean }) {
  return (
    <>
      <span className="text-iris relative inline-block">
        Folie
        {reduce ? null : (
          <motion.span
            aria-hidden
            className="bg-iris absolute inset-x-0 -bottom-[0.03em] h-[0.055em] origin-left rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
          />
        )}
      </span>{" "}
      erkennt.
    </>
  )
}

/** Gemeinsame Auftrittskurve — ein Rhythmus für die ganze Bühne. */
function enter(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  }
}

export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = React.useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -72])
  const rawFade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  // Ruhewerte als eigene MotionValues: `style={reduce ? undefined : …}` würde
  // einen bereits geschriebenen Transform eingefroren stehen lassen.
  const rest = useMotionValue(0)
  const restOpacity = useMotionValue(1)
  const stageY = useSpring(reduce ? rest : rawY, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.5,
  })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden pt-32 pb-10 lg:pt-40 lg:pb-16"
    >
      <div
        aria-hidden
        className="bg-hex pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(75%_65%_at_50%_0%,#000,transparent)]"
      />
      <div
        aria-hidden
        className="bg-stage pointer-events-none absolute inset-0 -z-10"
      />

      <motion.div style={{ y: stageY, opacity: reduce ? restOpacity : rawFade }}>
        {/* `items-stretch` statt `items-end`: die Bildspalte war vorher auf eine
            feste Breite und ein festes Seitenverhältnis genagelt und stand
            damit als kleine Kachel neben einer über 800 px hohen Headline. Jetzt
            gibt die Textspalte die Zeilenhöhe vor, und das Foto füllt sie ganz —
            die Proportion stimmt dadurch auf jeder Fensterbreite. */}
        <Container className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:items-stretch lg:gap-12 xl:gap-16">
          <div>
            {/* Die Bewertung zuerst: der stärkste belegte Fakt des Betriebs,
                und er kostet nur eine Zeile. */}
            <motion.div
              {...(reduce ? {} : enter(0))}
              className="ring-iris mb-9 inline-flex items-center gap-3 rounded-full bg-surface/60 py-2 pr-5 pl-3 backdrop-blur-sm"
            >
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-foreground text-foreground" />
                ))}
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="nums font-semibold text-foreground">5,0</span> bei{" "}
                <span className="nums">{site.reviews.count}</span> Google-Bewertungen
              </span>
            </motion.div>

            {/*
              Einfarbig bis auf ein Wort.
              Eine zweite Zeile in Grau liest sich als deaktivierter Text, nicht
              als Hierarchie. Betont wird deshalb genau ein Begriff und der in
              der Iridescence, weil er den Kern des Angebots benennt.
            */}
            {/* Die Breitenbremse gilt erst ab sm. Auf 390 px ist `16ch`
                schmaler als die längste Zeile selbst, die Zeile brach dann
                *innerhalb* ihrer Maske um und die Headline zerfiel in vier
                ungleiche Stufen statt in drei gesetzte Zeilen. */}
            <h1 className="t-display sm:max-w-[16ch]">
              <LineReveal
                lines={[
                  "Folierung, die",
                  "man nicht als",
                  <Accent key="accent" reduce={!!reduce} />,
                ]}
                delay={0.1}
                stagger={0.085}
              />
            </h1>

            <motion.p
              {...(reduce ? {} : enter(0.5))}
              className="t-lead mt-8 max-w-xl text-muted-foreground text-pretty"
            >
              Fahrzeugfolierung, Lackschutz und Scheibentönung aus{" "}
              {site.address.city}, millimetergenau verlegte Markenfolie, wenige
              Minuten von Neuss, Mönchengladbach und Düsseldorf.
            </motion.p>

            <motion.div
              {...(reduce ? {} : enter(0.62))}
              className="mt-11 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/#kontakt">
                    Kostenloses Angebot
                    <ArrowRight className="transition-transform duration-[280ms] ease-[var(--ease-premium)] group-hover/button:translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="lg">
                <a href={site.contact.phoneHref}>
                  <Phone />
                  <span className="nums">{site.contact.phone}</span>
                </a>
              </Button>
            </motion.div>
          </div>

          {/*
            Rechte Spalte: ein Fahrzeug, sonst nichts.

            Auf 1440 px stünde hier sonst eine leere Fläche von rund 800 × 550 px
, Weißraum wird zur Leere, sobald er größer ist als das, was er
            rahmt. Das Frontalfoto trägt es: die Hexagon-Lichtdecke spiegelt
            sich ungebrochen in der Haube, und genau das ist die Aussage der
            Headline, man sieht keine Folie, man sieht Lack.
          */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.34, ease: EASE }}
            className="ring-iris group relative hidden h-full min-h-[30rem] w-full overflow-hidden rounded-3xl bg-surface lg:block"
          >
            <Image
              src="/originals/img-03.jpg"
              // Kein Fahrzeugmodell im Alt-Text: welches Modell hier steht,
              // ist nirgends belegt — und `lib/site.ts` bezeichnet dasselbe
              // Bild als „Satin Violett", nicht als glänzend. Beschrieben
              // wird deshalb nur, was sicher zu sehen ist.
              alt="Frontpartie eines in Satin Violett folierten Sportwagens, foliert bei WrapCut in Jüchen"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 0px"
              className="img-punch object-cover transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
            />
          </motion.div>
        </Container>
      </motion.div>

      <div className="mt-16 lg:mt-20">
        <ShowroomRow reduce={!!reduce} />
      </div>
    </section>
  )
}

/**
 * Horizontal scrollbare Fahrzeugreihe.
 *
 * Nativer Overflow statt einer Transform-Karussell-Mechanik: Trackpad,
 * Touch-Wisch und Shift+Rad funktionieren dadurch ohne eigenen Code, und
 * Lenis — das ausschließlich die Vertikale steuert — kommt sich nicht in die
 * Quere. `snap` hält die Reihe nach dem Wischen an einer Kachelkante.
 *
 * Eine überlaufende Reihe ohne Anzeige ist eine unsichtbare Interaktion:
 * darunter läuft deshalb eine Haarlinie mit, deren Läufer Position und Anteil
 * des Sichtfensters abbildet. Das ersetzt jeden „← wischen"-Hinweis.
 */
function ShowroomRow({ reduce }: { reduce: boolean }) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const runnerRef = React.useRef<HTMLDivElement>(null)

  /*
   * Der Läufer läuft komplett an React vorbei.
   *
   * Vorher hing an `onScroll` ein `setProgress({…})` mit einem **neuen
   * Objekt** — React konnte also bei keinem einzigen Scroll-Tick abbrechen und
   * hat die ganze Reihe neu gerendert. Der Läufer animierte dann `left` und
   * `width`, beides Layout-Properties, mit einer expliziten Transition
   * darauf. Das ist genau das Muster, das in `process.tsx` zu Recht vermieden
   * wird.
   *
   * Jetzt: Messung in `requestAnimationFrame` gedrosselt, Ergebnis direkt als
   * `transform` auf das Element geschrieben. `scaleX` + `translateX` auf
   * `transform-origin: left` bilden dieselbe Geometrie ab, erzwingen aber kein
   * Layout — und React rendert dabei gar nicht.
   */
  React.useEffect(() => {
    const el = trackRef.current
    const runner = runnerRef.current
    if (!el || !runner) return

    let frame = 0
    const measure = () => {
      frame = 0
      const scrollable = el.scrollWidth - el.clientWidth
      const ratio = Math.min(el.clientWidth / el.scrollWidth, 1)
      const offset = scrollable > 0 ? el.scrollLeft / scrollable : 0
      const travel = (1 - ratio) / (ratio || 1)
      runner.style.transform = `translateX(${offset * travel * 100}%) scaleX(${ratio})`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    el.addEventListener("scroll", schedule, { passive: true })
    // `ResizeObserver` statt `window.resize`: die Kachelbreiten hängen an
    // vw-Einheiten, aber auch ein Schriftwechsel oder ein nachgeladenes Bild
    // ändert `scrollWidth`, ohne dass das Fenster sich bewegt.
    const ro = new ResizeObserver(schedule)
    ro.observe(el)

    return () => {
      el.removeEventListener("scroll", schedule)
      ro.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <motion.div
        ref={trackRef}
        initial={reduce ? false : "hidden"}
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.075, delayChildren: 0.55 } },
        }}
        // Scrollbare Bereiche müssen per Tastatur erreichbar sein (WCAG 2.1.1);
        // ohne fokussierbares Kind bekommt der Container selbst den Tabstopp.
        tabIndex={0}
        role="group"
        aria-label="Fahrzeuge aus unserem Studio"
        // `scroll-pl-*` ist Pflicht, nicht Kosmetik: ohne scroll-padding rastet
        // snap-start am Containerrand ein und zieht die erste Kachel über das
        // Innenpadding hinweg bündig an die Fensterkante. Die Reihe verlöre
        // damit die Satzkante der gesamten Seite.
        className="no-scrollbar flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto scroll-smooth px-5 pb-2 focus-ring sm:scroll-pl-8 sm:gap-4 sm:px-8 lg:scroll-pl-12 lg:px-12"
      >
        {showroom.map((item, i) => (
          <motion.figure
            key={item.src}
            variants={{
              hidden: { opacity: 0, y: 34 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className={
              "group relative aspect-4/5 shrink-0 snap-start overflow-hidden rounded-2xl bg-surface " +
              (i === 0
                ? "w-[78vw] sm:w-[46vw] lg:w-[30rem]"
                : "w-[62vw] sm:w-[32vw] lg:w-[21rem]")
            }
          >
            <Image
              src={item.src}
              alt={`${item.label}, ${item.finish}`}
              fill
              // Nur die erste Kachel ist über der Falz vollständig sichtbar.
              priority={i === 0}
              sizes="(min-width: 1024px) 30rem, (min-width: 640px) 46vw, 78vw"
              className="img-punch object-cover transition-transform duration-[800ms] ease-[var(--ease-premium)] group-hover:scale-[1.06]"
            />
            {/* Verlauf nur im unteren Drittel, wo die Bildunterschrift liegt.
                Beim Hover wird er tiefer, damit die aufsteigende Unterschrift
                über jedem Motiv lesbar bleibt. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[32%] bg-linear-to-t from-background/90 to-transparent transition-[height] duration-[500ms] ease-[var(--ease-premium)] group-hover:h-1/2"
            />
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl ring-1 ring-white/0 transition-[--tw-ring-color] duration-300 group-hover:ring-white/15"
            />
            <figcaption className="absolute inset-x-5 bottom-5 transition-transform duration-[420ms] ease-[var(--ease-premium)] group-hover:-translate-y-1">
              <span className="t-label block text-white/60">{item.label}</span>
              <span className="mt-1.5 block text-lg font-semibold text-white">
                {item.finish}
              </span>
            </figcaption>
          </motion.figure>
        ))}

        {/* Abschluss der Reihe: ein Weg in die volle Galerie statt einer toten
            Kante. */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 34 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
          className="flex shrink-0 snap-start"
        >
          <Link
            href="/#galerie"
            className="group flex aspect-4/5 w-[62vw] flex-col justify-end rounded-2xl border border-border p-7 transition-colors duration-200 hover:border-brand/50 focus-ring sm:w-[32vw] lg:w-[21rem]"
          >
            <span className="t-h3 block text-balance">Alle Arbeiten ansehen</span>
            <span className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 group-hover:text-brand">
              Zur Galerie
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Läufer statt Scrollbalken: gleiche Satzkante wie die Reihe. Rein
          dekorativ für Screenreader, die Reihe selbst ist als Gruppe
          ausgezeichnet und per Tastatur bedienbar. */}
      <div aria-hidden className="mt-6 px-5 sm:px-8 lg:px-12">
        <div className="relative h-px w-full max-w-[26rem] bg-border">
          <div
            ref={runnerRef}
            className="bg-iris absolute inset-x-0 -top-px h-[3px] origin-left rounded-full will-change-transform"
          />
        </div>
      </div>
    </>
  )
}
