"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"

import { Maximize2 } from "lucide-react"

import { InstagramIcon } from "@/components/shared/icons"
import { Lightbox } from "@/components/shared/lightbox"
import { SectionHead } from "@/components/shared/section-head"
import { gallery, site } from "@/lib/site"

/**
 * Galerie als horizontale Fahrt, die von der Vertikale angetrieben wird.
 *
 * Acht Fotos untereinander sind acht Bildschirme Scrollweg — die Galerie
 * wäre damit der längste Block der Seite, ohne mehr zu sagen. Stattdessen
 * steht die Section fest im Bild, während die Bilderreihe seitlich
 * durchläuft: derselbe Inhalt, ein Drittel der Strecke, und die Bewegung
 * gehört dem Nutzer.
 *
 * Drei Dinge, die das tragfähig statt frickelig machen:
 *
 * - **Die Höhe des Antriebs steht im Markup**, nicht im Skript: der äußere
 *   Block ist so hoch wie die Reihe breit ist. Damit ist die Fahrt exakt so
 *   lang wie ihr Inhalt und braucht keine Messung.
 * - **`useSpring` über dem `useTransform`**, sonst überträgt sich jedes
 *   Rucken des Rads eins zu eins auf die Reihe.
 * - **Unter `lg` gibt es die Pinnung nicht.** Auf dem Telefon ist gekaperter
 *   Scroll die verlässlichste Art, Nutzer zu verlieren; dort läuft dieselbe
 *   Reihe als normaler Wisch-Bereich.
 */
export function Gallery() {
  const reduce = useReducedMotion()
  const pinRef = React.useRef<HTMLDivElement>(null)
  /** Index des groß geöffneten Bildes, `null` heißt geschlossen. */
  const [open, setOpen] = React.useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  })
  /*
   * Fahrweite und Bahnhöhe hängen an `gallery.length`, nicht an Konstanten.
   *
   * Vorher standen hier `h-[320vh]` und `-68%` fest im Markup, während die
   * Reihe aus `gallery.map()` mit datenabhängiger Länge und drei wechselnden
   * Breiten entsteht. Ein einziges zusätzliches Foto in `lib/site.ts` hätte
   * das Ende der Fahrt verschoben, ohne dass irgendwo etwas fehlschlägt —
   * die Reihe wäre entweder zu früh stehen geblieben oder über den letzten
   * Bildrand hinausgelaufen.
   *
   * Die Herleitung: die Kacheln sind im Mittel rund 36 vw breit plus Lücke,
   * bei acht Bildern also grob 3 Viewportbreiten. Die Bahn bekommt pro Bild
   * 28 vh Anlauf plus einen Bildschirm für das Pinnen selbst.
   */
  const trackVw = gallery.length * 37
  const travel = Math.max(0, trackVw - 100 - 2)
  const pinHeightVh = gallery.length * 28 + 100

  const rawX = useTransform(scrollYProgress, [0, 1], ["2%", `-${travel}vw`])
  const x = useSpring(rawX, { stiffness: 90, damping: 26, restDelta: 0.001 })

  // Fortschritt der Fahrt, gefedert wie die Reihe selbst — sonst läuft der
  // Läufer der Bildreihe voraus.
  const runner = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  })
  const runnerScale = useTransform(runner, [0, 1], [0.06, 1])

  return (
    <section id="galerie" className="section scroll-mt-24">
      {/*
        Instagram in Instagram-Farben, aber nicht als bunte Fläche.

        Weiße Schrift auf dem Verlauf wäre am hellen Ende (#feda75) unlesbar,
        deshalb trägt nur das Markenzeichen den Verlauf voll — als Kachel wie
        in der App — und der Rahmen als Haarlinie. Die Fläche bleibt dunkel,
        der Text damit lesbar. Der Schein darunter ist im Ruhezustand halb da
        und geht beim Überfahren auf; dauerhaft volle Leuchtkraft hätte ein
        Randelement lauter gemacht als die Galerie selbst.
      */}
      <SectionHead
        label="Galerie"
        titleLines={["Arbeiten aus", "unserem Studio."]}
        lead="Alles echte Fahrzeuge aus der Halle in Jüchen. Die Beschriftung nennt Folierung und Finish, was auf dem Foto zu sehen ist, nicht mehr."
        action={
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group/ig focus-ring relative isolate inline-flex rounded-full p-px [background:linear-gradient(100deg,#feda75,#fa7e1e_28%,#d62976_55%,#962fbf_78%,#4f5bd5)] transition-transform duration-[280ms] ease-[var(--ease-premium)] hover:-translate-y-0.5"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-2 -z-10 rounded-full opacity-40 blur-xl transition-opacity duration-[280ms] ease-[var(--ease-premium)] group-hover/ig:opacity-90 [background:linear-gradient(100deg,#fa7e1e,#d62976_50%,#4f5bd5)]"
            />
            <span className="inline-flex items-center gap-3 rounded-full bg-background py-2 pr-5 pl-2 text-sm transition-colors duration-[280ms] ease-[var(--ease-premium)] group-hover/ig:bg-background/85">
              <span className="flex size-8 items-center justify-center rounded-[0.7rem] text-white [background:radial-gradient(circle_at_28%_105%,#feda75,#fa7e1e_18%,#d62976_45%,#962fbf_70%,#4f5bd5_92%)]">
                <InstagramIcon className="size-[1.15rem]" />
              </span>
              {/* Ein einziger Textknoten: im Flex-Container würde ein loses
                  Leerzeichen zwischen zwei Spans zu einem eigenen Flex-Item
                  mit `gap-3` links und rechts. */}
              <span>
                Laufend neue Arbeiten auf{" "}
                <span className="font-semibold">
                  {site.social.instagramHandle}
                </span>
              </span>
            </span>
          </a>
        }
        id="galerie-titel"
      />

      {/* ── Desktop: gepinnte Horizontalfahrt ───────────────────────────── */}
      {/* Kein `aria-hidden` hier, obwohl die Wisch-Reihe unten dieselben Bilder
          führt: beide Blöcke sind per `display: none` an ihren Breakpoint
          gebunden, und ein `display: none`-Block steht ohnehin nicht im
          Accessibility-Baum. Ein zusätzliches `aria-hidden` würde die Galerie
          auf dem Desktop für Screenreader vollständig löschen, dort ist der
          mobile Block ja versteckt. */}
      {/*
        Bei `prefers-reduced-motion` gibt es die Bühne gar nicht.
        Vorher wurde nur die Fahrt abgeschaltet (`style={reduce ? undefined
        : {x}}`), der 320-vh-Block blieb aber stehen. Ergebnis: 2.880 px
        Scrollweg an einem eingefrorenen Ausschnitt vorbei, und sechs der acht
        Bilder waren überhaupt nicht erreichbar. Die Wisch-Reihe unten
        übernimmt in dem Fall auch auf Desktop.
      */}
      <div
        ref={pinRef}
        role="group"
        aria-label="Arbeiten aus unserem Studio"
        style={{ height: `${pinHeightVh}vh` }}
        className={"relative mt-14 " + (reduce ? "hidden" : "hidden lg:block")}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex h-full items-end pb-[12vh]">
            <motion.div style={{ x }} className="flex gap-4 pl-12">
            {gallery.map((item, i) => (
              <figure
                key={item.src}
                className={
                  "group relative shrink-0 overflow-hidden rounded-2xl bg-surface " +
                  /*
                   * Wechselnde Formate statt einer gleichförmigen Reihe: das
                   * Auge liest den Wechsel als Komposition, eine Reihe
                   * identischer Kacheln als Katalog.
                   *
                   * Der Container steht auf `items-end`, nicht `items-center`:
                   * zentriert ragte jede Kachel oben und unten unterschiedlich
                   * weit heraus, ohne dass irgendeine Kante geteilt wurde —
                   * das liest sich nicht als Komposition, sondern als „nicht
                   * ausgerichtet". Jetzt gibt es eine gemeinsame Fußlinie, und
                   * das mittlere Format hebt sich bewusst darüber ab.
                   */
                  (i % 3 === 0
                    ? "h-[62vh] w-[46vw]"
                    : i % 3 === 1
                      ? "h-[52vh] w-[28vw] mb-[9vh]"
                      : "h-[68vh] w-[34vw]")
                }
              >
                <Image
                  src={item.src}
                  alt={`${item.label}, ${item.finish}`}
                  fill
                  // `sizes` folgt demselben Ausdruck wie die Breite. Mit einem
                  // festen "46vw" bekamen zwei Drittel der Kacheln Dateien für
                  // eine Breite, die sie nie haben — auf 1440 px rund 660 px
                  // angefragt statt 400.
                  sizes={
                    i % 3 === 0 ? "46vw" : i % 3 === 1 ? "28vw" : "34vw"
                  }
                  className="img-punch object-cover transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
                />
                {/* Deckung bis 42 %: bei 34 % stand die Bildunterschrift des
                    weißen Cabrios auf hellem Blech. */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[42%] bg-linear-to-t from-background via-background/55 to-transparent"
                />
                <figcaption className="absolute inset-x-6 bottom-6">
                  <span className="t-label block text-white/60">{item.label}</span>
                  <span className="mt-1.5 block text-xl font-semibold text-white">
                    {item.finish}
                  </span>
                </figcaption>

                {/* Die Schaltfläche liegt über der ganzen Kachel statt um sie
                    herum: so bleibt das `figure` mit seiner Bildunterschrift
                    intakt, und die Fläche ist trotzdem vollständig klick- und
                    tastaturbedienbar. */}
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`${item.label}, ${item.finish} — größer ansehen`}
                  className="absolute inset-0 z-10 cursor-zoom-in focus-ring"
                >
                  <span
                    aria-hidden
                    className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full border border-white/25 bg-background/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <Maximize2 className="size-4" />
                  </span>
                </button>
              </figure>
              ))}
            </motion.div>
          </div>

          {/*
            Fortschrittslinie der Fahrt.
            Ohne sie sind das drei Bildschirme gekaperter Scroll ohne jeden
            Anhaltspunkt, wie lang die Strecke noch dauert, der Kopf der
            Section ist zu dem Zeitpunkt längst weggescrollt. Der Hero löst
            dasselbe Problem bereits mit einem Läufer; hier fehlte er.
            `scaleX` statt `width`, damit die Animation kein Layout erzwingt.
          */}
          <div
            aria-hidden
            className="absolute inset-x-12 bottom-[6vh] h-px bg-border"
          >
            <motion.div
              style={{ scaleX: runnerScale }}
              className="bg-iris h-px origin-left"
            />
          </div>
        </div>
      </div>

      {/* ── Mobil: normale Wisch-Reihe, kein gekaperter Scroll ──────────── */}
      <div
        tabIndex={0}
        role="group"
        aria-label="Arbeiten aus unserem Studio"
        className={
          "no-scrollbar mt-12 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-2 focus-ring sm:scroll-pl-8 sm:px-8 " +
          // Bei reduzierter Bewegung übernimmt diese Reihe auch auf Desktop —
          // dann ist die gepinnte Fahrt oben gar nicht erst gerendert.
          (reduce ? "" : "lg:hidden")
        }
      >
        {gallery.map((item, i) => (
          <figure
            key={item.src}
            className="relative aspect-4/5 w-[74vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-surface sm:w-[44vw]"
          >
            <Image
              src={item.src}
              alt={`${item.label}, ${item.finish}`}
              fill
              sizes="(min-width: 640px) 44vw, 74vw"
              className="img-punch object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[34%] bg-linear-to-t from-background/92 to-transparent"
            />
            <figcaption className="absolute inset-x-5 bottom-5">
              <span className="t-label block text-white/60">{item.label}</span>
              <span className="mt-1.5 block text-lg font-semibold text-white">
                {item.finish}
              </span>
            </figcaption>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${item.label}, ${item.finish} — größer ansehen`}
              className="absolute inset-0 z-10 focus-ring"
            >
              <span
                aria-hidden
                className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/25 bg-background/55 text-white backdrop-blur-sm"
              >
                <Maximize2 className="size-4" />
              </span>
            </button>
          </figure>
        ))}
      </div>

      <Lightbox
        items={gallery}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  )
}
