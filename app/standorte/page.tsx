import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Navigation } from "lucide-react"

import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { JsonLd } from "@/components/shared/json-ld"
import { LandingCta } from "@/components/shared/landing-cta"
import { LineRevealInView } from "@/components/shared/line-reveal"
import { RevealGroup, RevealItem } from "@/components/shared/reveal"
import { locations } from "@/lib/landing"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Einzugsgebiet, Folierung im Rhein-Kreis Neuss",
  description: `Unser Studio steht in ${site.address.city}. Kunden kommen aus Neuss, Mönchengladbach, Düsseldorf, Grevenbroich, Korschenbroich und Kaarst, Entfernungen und Anfahrt im Überblick.`,
  alternates: { canonical: "/standorte" },
}

/** Kopie, damit die Sortierung das importierte Array nicht verändert. */
const sortedLocations = [...locations].sort((a, b) => a.distanceKm - b.distanceKm)
const maxDistance = Math.max(...locations.map((l) => l.distanceKm))

export default function StandortePage() {
  const trail = [{ name: "Standorte", path: "/standorte" }]

  return (
    <>
      <JsonLd breadcrumbs={trail} />
      <Breadcrumbs trail={trail} />

      <header className="section-sm">
        <Container className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.3rem,4.2vw+1rem,5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
              <LineRevealInView lines={["Ein Studio,", "kurze Wege."]} />
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="t-lead text-muted-foreground">
              Wir arbeiten an einem Ort: {site.address.street} in{" "}
              {site.address.postalCode} {site.address.city}. Von dort sind die
              Städte im Rhein-Kreis Neuss und am linken Niederrhein in unter
              einer halben Stunde erreichbar.
            </p>
          </div>
        </Container>
      </header>

      <section className="pb-4">
        <Container>
          {/*
            Nach Entfernung sortiert, nicht nach Redaktionsreihenfolge.

            Die Frage, die jemand auf dieser Seite hat, lautet „wie weit ist es
            von mir aus" — eine Liste, die mit 18 km beginnt, dann 15, dann 30,
            dann 8 zeigt, beantwortet sie nicht. Aufsteigend sortiert ist die
            Reihenfolge selbst schon die halbe Antwort. Sortiert wird auf einer
            Kopie, `toSorted` lässt das importierte Array unangetastet.

            Der Balken darunter macht die Zahl vergleichbar: Er misst gegen die
            weiteste Stadt, ein kurzer Balken heißt „gleich um die Ecke".
          */}
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedLocations.map((location) => (
              <RevealItem key={location.slug}>
                <Link
                  href={`/standorte/${location.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 p-7 transition-colors duration-300 hover:border-brand/60 focus-ring"
                >
                  <span
                    aria-hidden
                    className="bg-iris absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-[420ms] ease-[var(--ease-premium)] group-hover:scale-x-100"
                  />

                  <span className="flex items-start justify-between gap-4">
                    <span className="t-h3 font-display">{location.city}</span>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-muted-foreground transition-[transform,color] duration-[320ms] ease-[var(--ease-premium)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                      aria-hidden
                    />
                  </span>

                  {/* Die Entfernung ist die eigentliche Auskunft dieser Karte,
                      also bekommt sie das Display-Register und die Farbe. */}
                  <span className="mt-6 flex items-baseline gap-2">
                    <span className="text-iris nums font-display text-[2.6rem] leading-none font-bold tracking-[-0.04em]">
                      {location.distanceKm}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      km
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="mt-4 block h-1 w-full overflow-hidden rounded-full bg-white/8"
                  >
                    <span
                      className="bg-iris block h-full rounded-full"
                      style={{
                        width: `${Math.round((location.distanceKm / maxDistance) * 100)}%`,
                      }}
                    />
                  </span>

                  <span className="nums mt-4 text-sm text-muted-foreground">
                    {location.driveMinutes} Fahrt
                  </span>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-sm leading-relaxed text-foreground/85">
                    <Navigation className="size-3.5 shrink-0 text-brand" aria-hidden />
                    {location.route}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Das volle Einzugsgebiet steht bewusst darunter als Text: für die
              fünf Städte ohne eigene Seite wäre eine leere Landingpage
              schlechter als eine ehrliche Nennung. */}
          <p className="mt-10 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
            Darüber hinaus kommen Kunden regelmäßig aus{" "}
            {site.serviceArea
              .filter((city) => !locations.some((l) => l.city === city))
              .filter((city) => city !== site.address.city)
              .join(", ")}
            . Rufen Sie an, wir sagen Ihnen vorher, ob sich die Fahrt für Ihr
            Vorhaben lohnt.
          </p>
        </Container>
      </section>

      <LandingCta />
    </>
  )
}
