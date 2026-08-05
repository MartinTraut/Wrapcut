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

      {/*
        Keine Kästen mehr — nur Zahl und Bedeutung.

        Flächen, Rasterlinien und Ordnungsziffern waren drei Ebenen Verpackung
        um vier Angaben herum. Was den Riegel jetzt zusammenhält, ist
        ausschließlich das Raster: gleiche Startlinie, gleicher Abstand,
        gleiche Größe. Das ist auch die ehrlichere Lösung — eine Zahl, die eine
        Umrandung braucht, um zu wirken, wirkt nicht.
      */}
      <Container className="relative py-16 lg:py-24">
        {/* Zweispaltig schon auf dem Telefon: einspaltig stehen vier Zahlen auf
            fast 1.000 px, und ein Beweis, an dem man drei Bildschirme
            vorbeiscrollt, beweist nichts mehr. */}
        <RevealGroup className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4 lg:gap-x-12">
          {stats.map((stat) => (
            /* Zentriert statt linksbündig: ohne Zellenkanten sitzt der Satz
               jeder Zelle sonst am linken Rand einer unsichtbaren Spalte, und
               die letzte Spalte lief nach rechts hin leer aus. Mittig
               ausgerichtet trägt das Raster den Riegel sichtbar. */
            <RevealItem
              key={stat.label}
              variant="rise"
              className="group flex flex-col items-center text-center"
            >
              {/* Der Wert in der Markenfarbe statt in Weiß. Vier weiße
                  Zahlen auf Schwarz sind eine Tabelle; in der Iridescence
                  lesen sie sich als die Aussage, die sie sind. */}
              <span className="text-iris nums block font-display text-[clamp(3.6rem,5vw,5.75rem)] leading-[0.85] font-bold tracking-[-0.05em]">
                {stat.value}
              </span>
              {/* Der Strich sitzt zwischen Zahl und Bedeutung: er ersetzt die
                  weggefallene Zellenkante als einziges verbliebenes Bauteil
                  und bindet beide Zeilen zu einer Einheit. */}
              <span
                aria-hidden
                className="bg-iris mt-6 block h-px w-12 rounded-full opacity-60 transition-transform duration-[420ms] ease-[var(--ease-premium)] group-hover:scale-x-150"
              />
              {/* `max-w-[24ch]` statt `20ch`: bei 20 brach
                  „von 5 bei 24 Google-Bewertungen" mitten im Kompositum um
                  und hinterließ eine Zeile mit einem Wort. */}
              <span className="mt-5 block max-w-[24ch] text-[1.02rem] leading-snug text-balance text-foreground/85">
                {stat.label}
              </span>
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
