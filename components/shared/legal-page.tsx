import * as React from "react"

import { Container } from "@/components/shared/container"

/**
 * Rahmen für Rechtstexte.
 *
 * Rechtsseiten sind keine Marketingflächen — hier gilt Lesbarkeit vor
 * Anmutung: eine Spalte, harte Zeilenlängenbegrenzung, ruhige Hierarchie,
 * keine Bewegung. Der einzige Bezug zum Designsystem ist die Haarlinie unter
 * dem Titel, damit die Seite nicht wie eine fremde Seite wirkt.
 */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <article className="section">
      <Container>
        <header className="max-w-[46rem]">
          <h1 className="font-display text-[clamp(2.1rem,3.5vw+1rem,3.6rem)] leading-[1.05] font-bold tracking-[-0.02em]">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          ) : null}
          <div aria-hidden className="bg-iris mt-10 h-px w-24" />
        </header>

        {/*
         * Typografie der Rechtstexte über einen einzigen Selektor-Block statt
         * über Klassen an jedem Element: der Inhalt ist reines Fließmaterial
         * und soll sich beim Nachtragen von Absätzen nicht um Styling
         * kümmern müssen.
         */}
        <div
          className="mt-12 max-w-[42rem] text-[0.98rem] leading-[1.75] text-muted-foreground [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-[1.45rem] [&_h2]:leading-snug [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:mt-1.5 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5"
        >
          {children}
        </div>
      </Container>
    </article>
  )
}

/**
 * Sichtbare Lücke statt stiller Erfindung.
 *
 * Für Rechtstexte fehlen Pflichtangaben, die nur der Betreiber liefern kann
 * (Rechtsform, USt-IdNr., vollständiger Name). Ein Platzhaltertext wie
 * „Musterfirma GmbH" wäre eine Falschangabe im rechtsverbindlichsten Teil der
 * Seite. Deshalb steht die Lücke sichtbar da — sie muss vor dem Livegang
 * auffallen, nicht danach.
 */
export function MissingData({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-destructive">
      [ zu ergänzen: {children} ]
    </strong>
  )
}
