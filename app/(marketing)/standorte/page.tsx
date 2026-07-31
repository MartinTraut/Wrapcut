import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { LandingJsonLd } from "@/components/shared/json-ld"
import { MapEmbed } from "@/components/shared/map"
import { PageHero } from "@/components/sections/page-hero"
import { CtaBand } from "@/components/sections/cta-band"
import { site } from "@/lib/site"
import { locations } from "@/lib/landing"

const metaTitle = "Einzugsgebiet | Folierung im Rhein-Kreis Neuss"
const metaDescription =
  "WrapCut foliert für Neuss, Mönchengladbach, Düsseldorf, Grevenbroich, Korschenbroich und Kaarst. Studio in Jüchen — Anfahrt und Fahrzeit je Stadt."

export const metadata: Metadata = {
  title: { absolute: metaTitle },
  description: metaDescription,
  alternates: { canonical: "/standorte" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${site.url}/standorte`,
    siteName: site.name,
    title: metaTitle,
    description: metaDescription,
  },
}

/** Städte ohne eigene Seite — genannt, aber bewusst nicht als dünne Seite. */
const furtherCities = site.serviceArea.filter(
  (city) =>
    city !== site.address.city && !locations.some((l) => l.city === city),
)

export default function StandortePage() {
  const crumbs = [{ name: "Standorte", path: "/standorte" }]

  return (
    <>
      <LandingJsonLd
        path="/standorte"
        name={metaTitle}
        description={metaDescription}
        crumbs={crumbs}
        faqs={[]}
        itemList={locations.map((l) => ({
          name: `Folierung ${l.city}`,
          path: `/standorte/${l.slug}`,
        }))}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Einzugsgebiet"
        title="Ein Studio in Jüchen,"
        accent="mitten im Rhein-Kreis."
        lead="Zwischen Mönchengladbach und Neuss, zwanzig Minuten von fast überall. Wie Sie aus Ihrer Stadt zu uns kommen und was sich für die Anfahrt lohnt, steht auf der jeweiligen Seite."
        image={{
          src: "/originals/img-08.jpg",
          alt: "Sportwagen in der WrapCut-Halle in Jüchen",
        }}
      />

      <section className="section-tight">
        <Container className="grid gap-14 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
          <RevealGroup className="space-y-3">
            {locations.map((l) => (
              <RevealItem key={l.slug}>
                <Link
                  href={`/standorte/${l.slug}`}
                  className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border border-border p-5 transition-colors hover:border-signal "
                >
                  <span>
                    <span className="t-h3 block">
                      Fahrzeugfolierung {l.city}
                    </span>
                    <span className="nums mt-1.5 block text-sm text-muted-foreground">
                      rund {l.distanceKm} km · {l.driveMinutes} · {l.route}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-signal transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </RevealItem>
            ))}

            <RevealItem>
              <p className="pt-4 text-sm leading-relaxed text-muted-foreground">
                Kunden kommen außerdem regelmäßig aus{" "}
                {furtherCities.join(", ")}. Auch aus dem weiteren Umkreis lohnt
                sich die Anfahrt, gerade bei Vollfolierungen und Lackschutz —
                sprechen Sie uns einfach an.
              </p>
            </RevealItem>
          </RevealGroup>

          <Reveal variant="scaleIn" className="lg:sticky lg:top-28 lg:self-start">
            <MapEmbed />
            <address className="mt-6 text-sm leading-relaxed text-muted-foreground not-italic">
              {site.businessName}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
              <br />
              <a
                href={site.contact.phoneHref}
                className="mt-2 inline-block font-semibold text-signal underline-offset-4 hover:underline"
              >
                {site.contact.phone}
              </a>
            </address>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        headline="Nicht sicher, ob sich die Fahrt lohnt? Fragen Sie vorher."
        text="Schicken Sie uns Fahrzeug, Wunsch und ein paar Fotos. Sie bekommen eine ehrliche Einschätzung samt Preisrahmen, bevor Sie losfahren — kostenlos."
      />
    </>
  )
}
