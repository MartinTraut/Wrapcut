import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Star } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal } from "@/components/shared/reveal"
import { Tilt } from "@/components/shared/tilt"
import { Button } from "@/components/ui/button"
import { about, site } from "@/lib/site"

/** Nur belegbare Aussagen — keine geschätzten Fahrzeugzahlen, keine
 *  Zertifizierung ohne benannten Zertifizierer. */
const credibilityPoints = [
  "Lackschutz und Folierung aus einer Hand — beides im eigenen Studio",
  "Markenfolie von Avery Dennison, 3M, HEXIS, ORAFOL, BodyFence und KPMF",
  "Millimetergenaue Handarbeit in staubarmer Umgebung",
  `5,0 von 5 bei ${site.reviews.count} Google-Bewertungen`,
]

export function About() {
  return (
    <section
      id="ueber-uns"
      className="section-loose relative scroll-mt-20 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-card/20 to-transparent"
      />
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/*
          Bildseite: echtes Studiofoto mit dezentem Tilt.

          Bewusst KEIN `curtain`-Reveal. In Kombination mit dem
          `transform-style: preserve-3d` von `Tilt` animierte Framer die
          `clip-path` nie: der Wrapper blieb auf dem SSR-Wert
          `inset(0 0 100% 0)` stehen und die halbe Section war ein schwarzes
          Loch — reproduzierbar auch unter `prefers-reduced-motion`. `rise`
          läuft über transform/opacity und ist von der 3D-Ebene unabhängig.
          `priority` hält das Laden zusätzlich vom Reveal-Zustand entkoppelt.
        */}
        <Tilt max={5} className="relative order-last lg:order-first">
          <Reveal variant="rise">
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
              <Image
                src="/originals/img-08.jpg"
                alt="Folierter Sportwagen nach der Abnahme bei WrapCut in Jüchen"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
              />
            </div>
          </Reveal>

          {/* Bewertungs-Badge — belegte Werte aus dem Google-Profil */}
          <div className="absolute -right-3 -bottom-6 flex items-center gap-4 border border-border bg-background px-5 py-4 sm:-right-6">
            <div className="flex items-center gap-2">
              <Star className="size-4 fill-signal text-signal" aria-hidden />
              <span className="nums text-2xl leading-none font-bold tracking-[-0.04em]">
                5,0
              </span>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden />
            <div className="leading-tight">
              <p className="t-mono-sm nums font-medium">
                {site.reviews.count} Bewertungen
              </p>
              <p className="t-mono mt-1 text-muted-foreground">auf Google</p>
            </div>
          </div>
        </Tilt>

        {/* Textseite */}
        {/* Läuft gegen die Achse der Bildseite ein — eine zweite
            Bewegungsart, damit die Section nicht als Block auftaucht. */}
        <Reveal variant="slideX" delay={0.12} className="lg:pl-4">
          <Eyebrow index="03">Über WrapCut</Eyebrow>

          <h2 className="t-h2 mt-7 text-balance">{about.headline}</h2>
          <p className="t-h3 mt-5 text-foreground/85">{about.lead}</p>

          <p className="t-lead mt-6 max-w-xl text-muted-foreground text-pretty">
            {about.text}
          </p>

          {/* Belege als Liste mit Haarlinien statt als Häkchen-Raster: die
              Zeile selbst trägt die Struktur, das Icon bleibt Nebensache. */}
          <ul className="mt-10 border-t border-border">
            {credibilityPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 border-b border-border py-4"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="text-sm leading-relaxed text-foreground/85">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/#kontakt">
                Festpreis anfragen
                <ArrowRight className="transition-transform duration-[280ms] ease-[var(--ease-premium)] group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Studio in {site.address.city}, persönlich und unverbindlich.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
