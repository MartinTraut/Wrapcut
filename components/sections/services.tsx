import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHead } from "@/components/shared/section-head"
import { RevealGroup, RevealItem } from "@/components/shared/reveal"
import { serviceDetails } from "@/lib/landing"
import { services } from "@/lib/site"

/**
 * Leistungen als asymmetrisches Bento-Raster.
 *
 * Sechs gleich große Karten nebeneinander sind ein Kartenfriedhof — der
 * Betrachter sieht sechs Optionen und keine Aussage. Hier tragen drei
 * Kacheln (Index 0, 3, 4) die doppelte Breite, wodurch die Fläche eine
 * Leserichtung bekommt.
 *
 * Rasterarithmetik ist dabei Designarbeit, kein Layout-Detail: Sechs
 * Einträge mit *einer* breiten Kachel ergäben 7 Zellen in 3 Spalten — die
 * letzte Zeile stünde zu zwei Dritteln leer. Drei breite Kacheln ergeben 9
 * und damit eine volle Schlusszeile. Auf zwei Spalten (sm) muss die
 * Paarbildung erhalten bleiben, deshalb sind es die Indizes 0 und 3, nicht
 * 0 und 4.
 */
const WIDE = new Set([0, 3, 4])

export function Services() {
  return (
    <section id="leistungen" className="section scroll-mt-24">
      <SectionHead
        label="Leistungen"
        titleLines={["Sechs Disziplinen,", "ein Anspruch."]}
        lead="Ob neue Farbe, unsichtbarer Steinschlagschutz oder Tönung, wir sagen vorher ehrlich, was die jeweilige Lösung leistet und was sie nicht leistet."
        id="leistungen-titel"
      />

      <Container>
        <RevealGroup
          stagger={0.07}
          className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {services.map((service, i) => (
            <RevealItem
              key={service.slug}
              as="article"
              variant="scaleIn"
              className={
                "group relative isolate overflow-hidden rounded-2xl bg-surface " +
                (WIDE.has(i) ? "sm:col-span-2 lg:col-span-2" : "")
              }
            >
              {/*
                Höher als zuvor (22/25 → 24/32 rem), aus zwei Gründen:
                Die breiten Kacheln standen bei 890 × 400 px auf 2,2 : 1, im
                Panoramaformat blieb vom Fahrzeug ein Streifen Heck und viel
                Hallendecke, die Fotos wirkten wie Textur statt wie Beleg. Und
                die Vorteile stehen jetzt dauerhaft im Text, brauchen also
                Platz.
              */}
              <Link
                href={`/leistungen/${service.slug}`}
                className="flex min-h-[24rem] flex-col justify-end p-7 focus-ring lg:min-h-[32rem] lg:p-9"
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes={
                    WIDE.has(i)
                      ? "(min-width: 1024px) 62vw, (min-width: 640px) 100vw, 100vw"
                      : "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
                  }
                  className="img-punch -z-20 object-cover transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.06]"
                />

                {/*
                  Textschutz statt Bildabdunklung, der Rest des Fotos bleibt
                  unangetastet, weil dort kein Text liegt.

                  Unter `lg` reicht der Verlauf deutlich weiter hoch: dort
                  steht die Vorteilsliste dauerhaft offen, der Textblock ist
                  damit rund 195 px hoch. Mit den vorherigen 62 % von 22 rem
                  lag die Kachelüberschrift bereits im transparenten Teil —
                  „Voll- & Teilfolierung" stand auf einem weißen Auto,
                  „Keramikversiegelung" in der Leuchtdecke.
                */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 -z-10 h-[78%] bg-linear-to-t from-background via-background/82 via-52% to-transparent lg:h-[62%]"
                />
                {/* Zweiter Schleier, nur beim Überfahren: der aufgefahrene Text
                    steht sonst auf hellen Motiven (Camo, Leuchtdecke) praktisch
                    ohne Kontrast. Er legt sich über das ganze Foto, wodurch die
                    überfahrene Kachel zugleich in den Vordergrund tritt. */}
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-background/55 opacity-0 transition-opacity duration-[420ms] ease-[var(--ease-premium)] group-hover:opacity-100 group-focus-visible:opacity-100"
                />

                <div className="relative">
                  <h3 className="t-h3 flex items-start gap-3">
                    {service.name}
                    <ArrowUpRight
                      aria-hidden
                      className="mt-1 size-5 shrink-0 text-muted-foreground transition-[transform,color] duration-[320ms] ease-[var(--ease-premium)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                    />
                  </h3>
                  {/*
                    Auf großen Schirmen steht zunächst nur die Überschrift auf
                    dem Foto, beim Überfahren fährt der komplette Textblock
                    hoch. Umgesetzt über `grid-template-rows: 0fr → 1fr`: das
                    ist die einzige Technik, die eine *unbekannte* Texthöhe
                    animierbar macht, ohne eine Maximalhöhe zu raten — und weil
                    die Karte ihren Inhalt unten ausrichtet, schiebt der
                    wachsende Block die Überschrift nach oben, statt nach unten
                    aufzuklappen.

                    Nur ab `lg`: darunter gibt es keinen Hover, dort bliebe der
                    Text sonst dauerhaft unerreichbar. `group-focus-visible`
                    öffnet ihn zusätzlich bei Tastaturbedienung.
                  */}
                  <div className="lg:grid lg:grid-rows-[0fr] lg:opacity-0 lg:transition-[grid-template-rows,opacity] lg:duration-[420ms] lg:ease-[var(--ease-premium)] lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-visible:grid-rows-[1fr] lg:group-focus-visible:opacity-100">
                    <div className="lg:overflow-hidden">
                      <p className="mt-2.5 text-[0.95rem] text-muted-foreground">
                        {service.tagline}
                      </p>

                      <ul className="mt-5">
                        {service.benefits.slice(0, 3).map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-2.5 py-1 text-sm text-foreground/85"
                          >
                            <Check
                              className="mt-0.5 size-3.5 shrink-0 text-brand"
                              aria-hidden
                            />
                            {benefit}
                          </li>
                        ))}
                      </ul>

                      {/*
                        Preisanker, wo einer belegt ist.
                        „Was kostet das" ist bei Folierung die erste Frage. Auf
                        der gesamten Startseite stand vorher keine einzige Zahl,
                        obwohl der Betrieb selbst welche publiziert.
                      */}
                      <span className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="text-sm font-semibold text-brand">
                          Details zur Leistung
                        </span>
                        {serviceDetails[service.slug]?.price ? (
                          <span className="nums text-sm text-muted-foreground">
                            {serviceDetails[service.slug].price!.items[0].value}
                          </span>
                        ) : null}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
