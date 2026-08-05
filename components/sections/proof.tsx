import { Container } from "@/components/shared/container"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { VelocityMarquee } from "@/components/shared/velocity-marquee"
import { stats, testimonials } from "@/lib/site"

/** Die Porsche-Rezension: konkret, mit Fahrzeug und mit Nachbetreuung. */
const lead = testimonials[0]

const keywords = [
  "Fahrzeugfolierung",
  "Lackschutz PPF",
  "Keramikversiegelung",
  "Scheibentönung",
  "Werbebeschriftung",
  "Mattfolierung",
  "Steinschlagschutz",
  "Teilfolierung",
  "Chrom Delete",
  "Premium-Markenfolie",
]

/**
 * Der Beweisriegel — erste Station nach dem Hero.
 *
 * Die Frage „Warum sollte ich euch vertrauen?" wird hier beantwortet, nach
 * dem ersten Scroll und nicht auf halber Seitenhöhe. Wer die Kennzahlen weit
 * unten platziert, stellt sie hinter die Entscheidung, ob überhaupt
 * weitergelesen wird.
 *
 * Die Deckzeile ist Textur, kein Titel: Leistungsbegriffe als Laufband
 * liefern Suchbreite und einen ruhigen Übergang, ohne ein eigenes Kapitel zu
 * beanspruchen.
 */
export function Proof() {
  return (
    <section aria-label="Kennzahlen" className="relative border-b border-border">
      <div
        aria-hidden
        className="bg-hex pointer-events-none absolute inset-0 opacity-45 [mask-image:linear-gradient(to_bottom,#000,transparent)]"
      />

      <div className="relative overflow-hidden border-y border-border py-4">
        <VelocityMarquee className="mask-fade-x">
          <>
            {[...keywords, ...keywords].map((item, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-8 pl-8 text-[0.9rem] font-medium whitespace-nowrap text-muted-foreground sm:gap-10 sm:pl-10"
              >
                {item}
                {/* Der Trennpunkt gehört zum Wort, nicht zwischen die Wörter —
                    sonst fehlt er an der Naht der verdoppelten Liste. */}
                <span aria-hidden className="bg-iris size-1.5 rounded-full" />
              </span>
            ))}
          </>
        </VelocityMarquee>
      </div>

      {/* Das Padding liegt in den Zellen, nicht am Container: sonst addiert es
          sich auf das Container-Padding und der Zahlenblock startet weiter
          innen als jede andere Section. */}
      <Container className="relative px-0! sm:px-0! lg:px-0!">
        {/* Zweispaltig schon auf dem Telefon: einspaltig stehen vier Zahlen auf
            fast 1.000 px, und ein Beweis, an dem man drei Bildschirme
            vorbeiscrollt, beweist nichts mehr. */}
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <RevealItem
              key={stat.label}
              variant="rise"
              // Rasterlinien folgen dem Umbruch, nicht der Reihenfolge: bei
              // zwei Spalten trennt die linke Linie nur die geraden Zellen,
              // und die untere Reihe bekommt keinen Fuß. Ab lg trägt jede
              // Zelle außer der ersten ihre linke Linie.
              className="group relative isolate flex flex-col justify-between gap-6 overflow-hidden border-b border-border px-5 py-8 sm:gap-9 sm:px-8 sm:py-11 lg:min-h-[16rem] lg:border-b-0 lg:border-l lg:px-12 lg:first:border-l-0 [&:nth-child(even)]:border-l [&:nth-child(n+3)]:border-b-0"
            >
              {/* Zündlinie an der Oberkante: sie fährt aus der linken Ecke auf,
                  statt einzublenden. Eine Zelle, die sich beim Überfahren
                  einschaltet, liest sich als Bedienelement, eine, die nur
                  heller wird, als Hover-Effekt. */}
              <span
                aria-hidden
                className="bg-iris absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 transition-transform duration-[420ms] ease-[var(--ease-premium)] group-hover:scale-x-100"
              />
              {/* Die Farbfläche liegt jetzt dauerhaft an, nicht erst beim
                  Überfahren: der Riegel war als Ganzes eine schwarze Fläche
                  mit weißen Ziffern, und auf Touch gibt es kein Hover, das
                  daran je etwas geändert hätte. */}
              <span
                aria-hidden
                className="bg-iris-wash pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity duration-[420ms] ease-[var(--ease-premium)] group-hover:opacity-100"
              />

              {/*
                Die Positionsziffer als Konturschrift, bewusst klein.

                Vorher lief sie auf 4.5rem, während der eigentliche Wert bei
                1440 px auf 65 px kam: die Ordnungsziffer war größer als der
                Beweis. Im Riegel las man zuerst „01 02 03 04" und erst danach
                „5,0 / 6 / 5–10 / 0 €". Das Verhältnis liegt jetzt bei
                mindestens 1 : 2 zugunsten des Werts.
              */}
              <span
                aria-hidden
                className="pointer-events-none block font-display text-[1.5rem] leading-[0.8] font-bold tracking-[-0.06em] text-transparent tabular-nums select-none [-webkit-text-stroke:1px_oklch(0.82_0.14_208/45%)] transition-[--tw-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke-color:oklch(0.82_0.14_208/95%)] sm:text-[2rem] lg:text-[2.75rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                {/* Der Wert in der Markenfarbe statt in Weiß. Vier weiße
                    Zahlen auf Schwarz sind eine Tabelle; in der Iridescence
                    lesen sie sich als die Aussage, die sie sind. */}
                <span className="text-iris nums block font-display text-[clamp(3.6rem,5.2vw,5.75rem)] leading-[0.85] font-bold tracking-[-0.05em]">
                  {stat.value}
                </span>
                {/* `max-w-[24ch]` statt `20ch`: bei 20 brach
                    „von 5 bei 24 Google-Bewertungen" mitten im Kompositum um
                    und hinterließ eine Zeile mit einem Wort. */}
                <span className="mt-4 block max-w-[24ch] text-[1.02rem] leading-snug text-balance text-foreground/85 transition-colors duration-300 group-hover:text-foreground">
                  {stat.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      {/*
        Ein Zitat im Wortlaut, direkt an den Zahlen.

        „5,0 bei 24 Bewertungen" ist eine Zahl; erst ein Satz, den ein echter
        Kunde geschrieben hat, macht sie greifbar. Die vollständige Reihe steht
        im Kapitel „Bewertungen", das liegt aber an siebter von neun
        Positionen, also hinter der Stelle, an der die meisten entscheiden, ob
        sie überhaupt weiterlesen.
      */}
      <Container className="relative">
        <Reveal>
          <figure className="mx-auto max-w-[52rem] py-14 text-center lg:py-20">
            <blockquote className="font-display text-[clamp(1.35rem,1.6vw+0.9rem,2.05rem)] leading-[1.35] font-semibold tracking-[-0.02em] text-balance">
              &bdquo;{lead.text}&ldquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              <span className="text-foreground/85">{lead.name}</span> ·{" "}
              {lead.source}-Rezension
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  )
}
