import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, MapPin, Route, Clock } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { LandingJsonLd } from "@/components/shared/json-ld"
import { MapEmbed } from "@/components/shared/map"
import { ServiceIcon } from "@/components/shared/service-icons"
import { PageHero } from "@/components/sections/page-hero"
import { CtaBand } from "@/components/sections/cta-band"
import { Faq } from "@/components/sections/faq"
import { site, services } from "@/lib/site"
import { locations, getLocation } from "@/lib/landing"

type Params = { params: Promise<{ stadt: string }> }

export function generateStaticParams() {
  return locations.map((l) => ({ stadt: l.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { stadt } = await params
  const location = getLocation(stadt)
  if (!location) return {}

  const path = `/standorte/${stadt}`
  return {
    title: { absolute: location.metaTitle },
    description: location.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "de_DE",
      url: `${site.url}${path}`,
      siteName: site.name,
      title: location.metaTitle,
      description: location.metaDescription,
    },
  }
}

export default async function LocationPage({ params }: Params) {
  const { stadt } = await params
  const location = getLocation(stadt)
  if (!location) notFound()

  const focusServices = location.focus
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s))

  const otherServices = services.filter((s) => !location.focus.includes(s.slug))

  const crumbs = [
    { name: "Standorte", path: "/standorte" },
    { name: location.city, path: `/standorte/${stadt}` },
  ]

  return (
    <>
      <LandingJsonLd
        path={`/standorte/${stadt}`}
        name={location.metaTitle}
        description={location.metaDescription}
        crumbs={crumbs}
        faqs={location.faqs}
        service={{
          // "für" statt "in": der Betrieb sitzt ausschließlich in Jüchen.
          // "Fahrzeugfolierung in Neuss" liest sich in H1 und Schema wie ein
          // zweiter Standort.
          name: `Fahrzeugfolierung für ${location.city}`,
          description: location.metaDescription,
          serviceType: "Fahrzeugfolierung",
          areaServed: location.city,
        }}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Einzugsgebiet"
        title="Fahrzeugfolierung"
        accent={`für ${location.city}`}
        lead={location.lead}
        image={{
          src: "/originals/img-17.jpg",
          alt: "Foliertes Fahrzeug aus der WrapCut-Halle in Jüchen",
        }}
        facts={[
          { label: "Entfernung", value: `rund ${location.distanceKm} km` },
          { label: "Fahrzeit", value: location.driveMinutes },
          { label: "Route", value: location.route },
          { label: "Termine", value: site.availability },
        ]}
      />

      <section className="section">
        <Container className="grid gap-14 lg:grid-cols-[1fr_0.62fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="t-h2-minor text-balance">
                Von {location.city} nach {site.address.city}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              {location.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="leading-relaxed text-muted-foreground text-pretty">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10">
              <h3 className="t-h3">
                Auch aus diesen Ortsteilen ist der Weg derselbe
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {location.districts.map((d) => (
                  <li
                    key={d}
                    className="border border-border px-3.5 py-2 text-sm text-muted-foreground"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="scaleIn" className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border p-7">
              <h2 className="t-h3">So finden Sie uns</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-signal" />
                  <div>
                    <dt className="font-semibold">Adresse</dt>
                    <dd className="mt-1 text-muted-foreground">
                      <address className="not-italic">
                        {site.address.street}
                        <br />
                        {site.address.postalCode} {site.address.city}
                      </address>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Route className="mt-0.5 size-4 shrink-0 text-signal" />
                  <div>
                    <dt className="font-semibold">Anfahrt aus {location.city}</dt>
                    <dd className="nums mt-1 text-muted-foreground">
                      {location.route} · rund {location.distanceKm} km
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-signal" />
                  <div>
                    <dt className="font-semibold">Fahrzeit</dt>
                    <dd className="mt-1 text-muted-foreground">
                      je nach Verkehr {location.driveMinutes}
                    </dd>
                  </div>
                </div>
              </dl>
              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-signal underline-offset-4 hover:underline"
              >
                Route in Google Maps öffnen
                <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="mt-6">
              <MapEmbed />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Leistungen: die für diese Stadt genannten zuerst, danach der Rest. */}
      <section className="section-tight border-t border-border">
        <Container>
          <Reveal>
            <Eyebrow>Leistungen für {location.city}</Eyebrow>
            <h2 className="t-h2-minor mt-5 max-w-3xl text-balance">
              Alles, was wir für Fahrzeuge aus {location.city} machen.
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3">
            {focusServices.map((s) => (
              <RevealItem key={s.slug} variant="scaleIn">
                <Link
                  href={`/leistungen/${s.slug}`}
                  className="group flex h-full flex-col border border-border p-6 transition-colors hover:border-signal "
                >
                  <ServiceIcon slug={s.slug} className="size-5 text-signal" />
                  <h3 className="t-h3 mt-5">{s.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                    Details
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-6 flex flex-wrap gap-2">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/leistungen/${s.slug}`}
                className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-signal hover:text-signal"
              >
                {s.name}
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      <Faq
        items={location.faqs}
        eyebrow={`${location.city} — Fragen`}
        headline="Wenn Sie aus"
        headlineAccent={`${location.city} kommen.`}
        intro={`Anfahrt, Dauer und Ablauf für Kunden aus ${location.city}. Ihre Frage ist nicht dabei?`}
      />

      <CtaBand
        headline={`Sie kommen aus ${location.city}? Schreiben Sie uns, bevor Sie losfahren.`}
        text="Fahrzeug, Wunsch und ein paar Fotos genügen für eine belastbare Einschätzung samt Preisrahmen. Beratung und Festpreis-Angebot sind kostenlos."
      />

      <section className="section-tight">
        <Container>
          <Reveal>
            <Eyebrow>Weitere Städte</Eyebrow>
          </Reveal>
          <Reveal className="mt-6 flex flex-wrap gap-2">
            {locations
              .filter((l) => l.slug !== location.slug)
              .map((l) => (
                <Link
                  key={l.slug}
                  href={`/standorte/${l.slug}`}
                  className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm transition-colors hover:border-signal hover:text-signal"
                >
                  <MapPin className="size-3.5 text-muted-foreground" />
                  Folierung {l.city}
                </Link>
              ))}
          </Reveal>
        </Container>
      </section>
    </>
  )
}
