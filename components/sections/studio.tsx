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
            {/*
              Das Porträt des Inhabers statt eines weiteren Fahrzeugfotos.

              Fahrzeuge zeigt die Seite an sieben anderen Stellen. Die Frage
              dieses Kapitels ist „wer macht das", und darauf antwortet ein
              Gesicht besser als ein achtes Auto — bei einem Handwerksbetrieb
              ist die Person das Vertrauensargument.

              Quelle: Porträt von der Altseite, dort mit dem Alt-Text
              „Beratung Inhaber kostenlos" ausgezeichnet. Das Bild ist im
              Original 1536 × 1920, also exakt 4 : 5 wie der Rahmen — es wird
              nicht beschnitten. Der Nachname des Inhabers ist nicht belegt,
              deshalb steht im Alt-Text kein Name.
            */}
            <Image
              src="/originals/inhaber.jpg"
              alt="Inhaber von WrapCut aus Jüchen"
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
            {/* Als Plakette, nicht als Textrest.
                Frei neben dem Angebotsknopf gesetzt las sich die Bewertung wie
                eine Fußnote zum Knopf — grauer Text in dessen Schatten. Jetzt
                trägt sie eine eigene Fläche in Gold und steht damit als der
                Beleg da, der sie ist. */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-gold/[0.09] py-2.5 pr-5 pl-4">
              <Star className="size-4 shrink-0 fill-gold text-gold" aria-hidden />
              <span className="text-sm text-foreground/85">
                <span className="nums font-semibold text-gold">5,0</span> bei{" "}
                <span className="nums">{site.reviews.count}</span> Bewertungen
              </span>
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
        {/* Als eigene Fläche, nicht als Zeile unter einer Trennlinie.
            Vorher lief das Band als grauer Absatz neben sechs entsättigten
            Kästchen aus — sechs Herstellernamen, die zusammen das stärkste
            Qualitätsargument des Betriebs sind, gingen damit als Fußnote
            unter. Jetzt trägt es dieselbe farbige Fläche wie die Datenblätter
            der Unterseiten und eine eigene Leitmarke. */}
        <div className="bg-iris-wash grid gap-8 rounded-3xl border border-brand/25 p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal className="lg:col-span-4">
            <span className="t-label text-iris">Material</span>
            <p className="mt-5 leading-relaxed text-foreground/85 text-pretty">
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
                  {/* Entsättigt wie zuvor, Farbe erst beim Hover.
                      Sechs Markenlogos in sechs Eigenfarben (zwei Rot, ein
                      Blau, ein Schwarz) ergaben nebeneinander ein buntes Band,
                      das lauter war als das Kapitel darüber. Die Größe bleibt:
                      auf 24 px Logohöhe war keine Marke mehr zu erkennen. */}
                  <span className="flex h-16 w-full items-center justify-center rounded-xl bg-white px-4 grayscale transition-[filter,transform] duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:grayscale-0 lg:h-20">
                    <Image
                      src={supplier.logo}
                      alt={supplier.name}
                      width={220}
                      height={72}
                      className="max-h-8 w-auto object-contain lg:max-h-10"
                    />
                  </span>
                </RevealItem>
              ) : (
                // Für KPMF liegt kein Logo vor — als gesetzter Schriftzug statt
                // eines erfundenen Markenzeichens, aber auf derselben weißen
                // Fläche wie die übrigen fünf. Als dunkler Umrisschip war es
                // vorher das eine Feld in der Reihe, das aussah, als fehle
                // etwas.
                <RevealItem key={supplier.name} variant="rise">
                  <span className="flex h-16 w-full items-center justify-center rounded-xl bg-white text-sm font-bold tracking-[0.12em] text-neutral-800 transition-transform duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 lg:h-20 lg:text-base">
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
