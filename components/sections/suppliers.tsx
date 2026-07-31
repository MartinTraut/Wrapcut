import Image from "next/image"
import { Container } from "@/components/shared/container"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { suppliers, about } from "@/lib/site"

/**
 * Lieferanten sind ein Vertrauens-Beiläufer, keine eigene Sektion: ein ruhiges
 * Band statt einer Kachelwand mit doppelter Headline. Die frühere endlose
 * Schwebe-Animation auf fünf weißen Kacheln ist entfallen — Bewegung ohne
 * Funktion in einer dark-first Seite.
 */
export function Suppliers() {
  return (
    <section id="marken" className="section-tight scroll-mt-20 border-y border-border">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="t-lead text-muted-foreground text-pretty">
            {about.supplierText}
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.05}
          className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-8"
        >
          {suppliers.map((s) =>
            s.logo ? (
              <RevealItem key={s.name} variant="rise">
                {/*
                  `brightness-0 invert` machte aus jedem Logo mit opakem
                  Hintergrund eine weiße Vollfläche. `grayscale` erhält die
                  Binnenzeichnung und fügt sich trotzdem ins neutrale
                  Graustufen-System. Höhe optisch gestaffelt statt
                  mathematisch: die Bildmarken laufen bei gleicher Pixelhöhe
                  sonst deutlich größer als die Wortmarken.
                */}
                <Image
                  src={s.logo}
                  alt={s.name}
                  width={200}
                  height={64}
                  className="max-h-7 w-auto max-w-[7.5rem] object-contain opacity-55 grayscale transition-opacity duration-300 hover:opacity-100"
                />
              </RevealItem>
            ) : (
              // Für KPMF liegt kein Logo vor — als gesetzter Schriftzug statt
              // eines erfundenen Markenzeichens.
              <RevealItem
                key={s.name}
                variant="rise"
                className="text-sm font-bold tracking-[0.18em] text-foreground/50 transition-colors duration-300 hover:text-foreground/85"
              >
                {s.name}
              </RevealItem>
            ),
          )}
        </RevealGroup>
      </Container>
    </section>
  )
}
