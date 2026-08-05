import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

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
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <RevealItem key={location.slug}>
                <Link
                  href={`/standorte/${location.slug}`}
                  className="group flex h-full flex-col gap-5 rounded-2xl border border-border bg-surface/30 p-7 transition-colors duration-200 hover:border-brand/50 focus-ring"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="t-h3 font-display">{location.city}</span>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-brand"
                      aria-hidden
                    />
                  </span>
                  <span className="nums text-sm text-muted-foreground">
                    rund {location.distanceKm} km · {location.driveMinutes}
                  </span>
                  <span className="mt-auto text-sm leading-relaxed text-foreground/85">
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
