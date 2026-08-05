import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Star } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { Button } from "@/components/ui/button"
import { about, site, suppliers } from "@/lib/site"

/** Nur belegbare Aussagen — keine geschätzten Fahrzeugzahlen, keine
 *  Zertifizierung ohne benannten Zertifizierer. */
const credibility = [
  "Lackschutz und Folierung aus einer Hand, beides im eigenen Studio",
  "Markenfolie von Avery Dennison, 3M, HEXIS, ORAFOL, BodyFence und KPMF",
  "Millimetergenaue Handarbeit in staubarmer Umgebung",
  `5,0 von 5 bei ${site.reviews.count} Google-Bewertungen`,
]

export function Studio() {
  return (
    <section id="studio" className="section-lg relative scroll-mt-24 overflow-hidden">
      <div
        aria-hidden
        className="bg-hex pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(60%_50%_at_85%_20%,#000,transparent)]"
      />

      {/* Kapitelmarke ohne eigene Headline: dieses Kapitel trägt seinen Titel
          in der Textspalte. Die Haarlinie muss trotzdem stehen, sie ist das
          Ordnungssignal, an dem das Auge den Kapitelanfang erkennt, und ein
          einzelnes Kapitel ohne sie fiele aus der Reihe. */}
      <Container>
        <div className="relative pt-10 lg:pt-12">
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
          <span aria-hidden className="bg-iris absolute top-0 left-0 h-px w-24" />
          <Reveal>
            <span className="t-label text-muted-foreground">
              Studio {site.address.city}
            </span>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-20">
        <Reveal variant="curtain" className="order-last lg:order-first">
          <div className="ring-iris relative aspect-4/5 overflow-hidden rounded-2xl bg-surface">
            <Image
              src="/originals/img-08.jpg"
              alt="Folierter Sportwagen nach der Abnahme bei WrapCut in Jüchen"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="img-punch object-cover"
            />
            {/* Nur ein schmaler Fuß, damit der Bewertungs-Badge nicht auf einem
                hellen Bildbereich sitzt. Ein Verlauf über 60 % der Höhe nähme
                dem Foto die Zeichnung. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background/70 to-transparent"
            />
          </div>
        </Reveal>

        {/* Läuft gegen die Achse der Bildseite ein, eine zweite Bewegungsart,
            damit die Section nicht als Block auftaucht. */}
        <Reveal variant="slideX" delay={0.12}>
          <h2 className="t-h2 text-balance">{about.headline}</h2>
          <p className="t-h3 mt-6 text-foreground/85">{about.lead}</p>
          <p className="t-lead mt-7 max-w-xl text-muted-foreground text-pretty">
            {about.text}
          </p>

          {/* Belege als Liste mit Haarlinien statt als Häkchenraster: die Zeile
              selbst trägt die Struktur, das Icon bleibt Nebensache. */}
          <ul className="mt-10 border-t border-border">
            {credibility.map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 border-b border-border py-4"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span className="text-sm leading-relaxed text-foreground/85">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button asChild size="lg">
              <Link href="/#kontakt">
                Kostenloses Angebot
                <ArrowRight className="transition-transform duration-[280ms] ease-[var(--ease-premium)] group-hover/button:translate-x-1" />
              </Link>
            </Button>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="size-4 fill-foreground text-foreground" aria-hidden />
              <span className="nums">5,0</span> bei{" "}
              <span className="nums">{site.reviews.count}</span> Bewertungen
            </span>
          </div>
        </Reveal>
      </Container>

      {/*
        Material als Fußzeile dieses Kapitels, nicht als eigene Section.
        Inhaltlich sind die Marken kein Kapitel, sondern ein Beleg und
        Belege gehören zu der Aussage, die sie stützen.

        Warum helle Chips statt freigestellter Logos auf Schwarz: drei der
        fünf Dateien sind JPEG mit eingebranntem weißem Hintergrund (Avery,
        3M, HEXIS), zwei PNG mit dunkler Zeichnung auf Transparenz (ORAFOL,
        BodyFence). Direkt auf der schwarzen Fläche zerfiele das Band in drei
        helle Kästchen und zwei fast unsichtbare Marken.
      */}
      <Container className="mt-20 lg:mt-28">
        <div className="grid gap-8 border-t border-border pt-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="leading-relaxed text-muted-foreground text-pretty">
              {about.supplierText}
            </p>
          </Reveal>

          {/* Festes Raster statt `flex-wrap`: sechs Marken in einer freien
              Umbruchreihe ergäben fünf Chips oben und einen allein darunter —
              das liest sich als Rest, nicht als Reihe. */}
          <RevealGroup
            stagger={0.05}
            className="grid grid-cols-3 gap-2.5 sm:grid-cols-6 lg:col-span-8 lg:gap-3"
          >
            {suppliers.map((supplier) =>
              supplier.logo ? (
                <RevealItem key={supplier.name} variant="rise">
                  <span className="flex h-14 w-full items-center justify-center rounded-xl bg-white/90 px-3 grayscale transition-[filter,background-color] duration-300 ease-[var(--ease-premium)] hover:bg-white hover:grayscale-0">
                    <Image
                      src={supplier.logo}
                      alt={supplier.name}
                      width={220}
                      height={72}
                      className="max-h-6 w-auto object-contain"
                    />
                  </span>
                </RevealItem>
              ) : (
                // Für KPMF liegt kein Logo vor — als gesetzter Schriftzug statt
                // eines erfundenen Markenzeichens, aber im selben Chip-Format,
                // damit die Lücke nicht wie ein Ladefehler aussieht.
                <RevealItem key={supplier.name} variant="rise">
                  <span className="flex h-14 w-full items-center justify-center rounded-xl border border-border text-sm font-bold tracking-[0.12em] text-foreground/60 transition-colors duration-300 hover:border-brand/50 hover:text-foreground">
                    {supplier.name}
                  </span>
                </RevealItem>
              ),
            )}
          </RevealGroup>
        </div>
      </Container>
    </section>
  )
}
