import { Container, type ContainerWidth } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { LineRevealInView } from "@/components/shared/line-reveal"

/**
 * Ein Kopf für alle Kapitel der Seite.
 *
 * Wenn jede Section ihre eigene Kopfzeile bekommt — mal mit Label, mal ohne,
 * Linie mal ja mal nein, Erklärsatz mal darunter, mal daneben — liest sich
 * das Ergebnis als zusammengesetzt statt als gestaltet. Deshalb genau eine
 * Figur, überall identisch:
 *
 *   ──────────────────────────────────────────────────  Haarlinie
 *   LEITMARKE                    Der Erklärsatz zum
 *   Die Headline über            Kapitel, rechts an
 *   zwei Zeilen.                 der Headline.
 *
 * Die Haarlinie über jedem Kopf ist das Ordnungssignal der Seite: sie zeigt
 * im Vorbeiscrollen, wo ein neues Kapitel beginnt, ohne dass dafür eine
 * Fläche, ein Rahmen oder ein Farbwechsel nötig wäre. Ihr linkes Stück
 * brennt in der Iridescence aus — sonst wäre eine 12-%-Weißlinie auf fast
 * schwarzem Grund faktisch unsichtbar.
 *
 * 7 zu 5 Spalten statt 6 zu 6: eine Headline im Display-Register braucht mehr
 * Lauflänge als ein Fließtextabsatz, sonst bricht sie in Fragmente.
 */
export function SectionHead({
  label,
  titleLines,
  lead,
  action,
  width = "default",
  id,
  className,
}: {
  label: string
  /** Eine Zeile pro Array-Eintrag — sie laufen einzeln aus der Maske auf. */
  titleLines: string[]
  lead?: React.ReactNode
  action?: React.ReactNode
  width?: ContainerWidth
  id?: string
  className?: string
}) {
  return (
    <Container width={width} className={className}>
      <div className="relative pt-10 lg:pt-12">
        {/* Haarlinie plus brennender Kopf. Zwei Elemente statt eines Verlaufs
            über die volle Breite: der Kopf soll an der Satzkante sitzen, also
            genau dort, wo die Headline darunter beginnt. */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
        <span
          aria-hidden
          className="bg-iris absolute top-0 left-0 h-px w-24"
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-7">
            {/* Die Leitmarke trägt die Markenfarbe, nicht Grau: sie steht
                direkt unter dem brennenden Kopf der Haarlinie und setzt
                dessen Farbe im Text fort. */}
            <Reveal>
              <span className="t-label text-iris">{label}</span>
            </Reveal>
            <h2 id={id} className="t-h2 mt-6 text-balance">
              <LineRevealInView lines={titleLines} />
            </h2>
          </div>

          {/* `lg:pt-2` setzt die erste Zeile des Erklärsatzes optisch auf die
              Grundlinie der Leitmarke: mathematisch gleiche Oberkanten wirken
              bei zwei so verschiedenen Schriftgraden verschoben. */}
          {lead || action ? (
            <Reveal delay={0.1} className="lg:col-span-5 lg:pt-2">
              {lead ? (
                <p className="t-lead max-w-xl text-muted-foreground text-pretty">
                  {lead}
                </p>
              ) : null}
              {action ? <div className="mt-7">{action}</div> : null}
            </Reveal>
          ) : null}
        </div>
      </div>
    </Container>
  )
}
