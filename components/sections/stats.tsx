import { Container } from "@/components/shared/container"
import { RevealGroup, RevealItem } from "@/components/shared/reveal"
import { CountUp } from "@/components/shared/count-up"
import { stats } from "@/lib/site"

/**
 * Kennzahlen als Messtafel. Vorher: vier zentrierte Chrom-Zahlen in einer
 * getönten Kachel — hübsch, aber beliebig. Jetzt eine linksbündige
 * Haarlinien-Matrix mit vorangestelltem Index; die Zahl steht groß im
 * Display-Register, die Erklärung klein darunter. Die Trennung entsteht
 * über 1px-Regeln statt über eine Hintergrundfläche.
 */
export function Stats() {
  return (
    <section className="section-tight border-b border-border">
      {/* Padding liegt in den Zellen, nicht am Container: sonst addiert es
          sich auf das Container-Padding und der Zahlenblock startet auf lg
          bei 84 px statt auf den 48 px, an denen jede andere Section ihre
          Satzkante hat. */}
      <Container width="wide" className="px-0! sm:px-0! lg:px-0!">
        <RevealGroup className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <RevealItem
              key={stat.label}
              className="group flex flex-col justify-between gap-8 border-b border-border px-5 py-8 transition-transform duration-[240ms] ease-[var(--ease-premium)] hover:-translate-y-1 sm:px-8 sm:py-10 sm:not-first:border-l lg:min-h-[15rem] lg:px-12 [&:nth-child(3)]:sm:border-l-0 [&:nth-child(3)]:lg:border-l"
            >
              {/* Gedeckt statt in Signalfarbe: der Akzent bleibt dem
                  Sektionsindex vorbehalten, sonst tragen zwei verschiedene
                  Ebenen dasselbe visuelle Token direkt untereinander. */}
              <span
                className="t-mono nums text-muted-foreground transition-colors duration-200 group-hover:text-signal"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <CountUp
                  value={stat.value}
                  className="nums block text-[clamp(2.6rem,4.5vw,4.25rem)] leading-[0.85] font-bold tracking-[-0.05em] text-foreground"
                />
                <span className="mt-4 block max-w-[20ch] text-sm leading-snug text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
