import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, Car, Clock, MapPin } from "lucide-react"

import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { FaqList } from "@/components/shared/faq-list"
import { JsonLd } from "@/components/shared/json-ld"
import { LandingCta } from "@/components/shared/landing-cta"
import { LineRevealInView } from "@/components/shared/line-reveal"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { locations, serviceDetails } from "@/lib/landing"
import { services, site } from "@/lib/site"

export function generateStaticParams() {
  return locations.map((location) => ({ stadt: location.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stadt: string }>
}): Promise<Metadata> {
  const { stadt } = await params
  const location = locations.find((l) => l.slug === stadt)
  if (!location) return {}

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: { canonical: `/standorte/${stadt}` },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `${site.url}/standorte/${stadt}`,
    },
  }
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ stadt: string }>
}) {
  const { stadt } = await params
  const location = locations.find((l) => l.slug === stadt)
  if (!location) notFound()

  const focus = location.focus
    .map((slug) => ({
      slug,
      name: services.find((s) => s.slug === slug)?.name,
      lead: serviceDetails[slug]?.lead,
    }))
    .filter((entry) => Boolean(entry.name))

  const trail = [
    { name: "Standorte", path: "/standorte" },
    { name: location.city, path: `/standorte/${location.slug}` },
  ]

  return (
    <>
      <JsonLd
        faqs={location.faqs}
        breadcrumbs={trail}
        service={{
          name: `Fahrzeugfolierung für ${location.city}`,
          description: location.metaDescription,
          path: `/standorte/${location.slug}`,
          areaServed: location.city,
        }}
      />

      <Breadcrumbs trail={trail} />

      <header className="section-sm">
        <Container className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.3rem,4.2vw+1rem,5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
              <LineRevealInView
                lines={["Fahrzeugfolierung", `für ${location.city}`]}
              />
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="t-lead text-muted-foreground">{location.lead}</p>
          </div>
        </Container>
      </header>

      {/* ── Anfahrt als harte Zahlen ─────────────────────────────────────── */}
      <section className="pb-4" aria-labelledby="anfahrt-titel">
        <Container>
          <h2 id="anfahrt-titel" className="sr-only">
            Anfahrt aus {location.city}
          </h2>
          <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {[
              {
                icon: MapPin,
                label: "Entfernung",
                value: `rund ${location.distanceKm} km`,
              },
              { icon: Clock, label: "Fahrzeit", value: location.driveMinutes },
              { icon: Car, label: "Route", value: location.route },
            ].map((item) => (
              <RevealItem key={item.label} className="bg-background p-6">
                <item.icon className="size-5 text-brand" aria-hidden />
                <dl className="mt-4">
                  <dt className="t-label text-muted-foreground">{item.label}</dt>
                  <dd className="mt-2 text-lg leading-snug font-semibold">
                    {item.value}
                  </dd>
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── Ortsbezug ────────────────────────────────────────────────────── */}
      <section className="section-sm">
        <Container className="grid gap-x-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {location.body.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 40)}>
                <p className="mt-5 leading-[1.75] text-muted-foreground first:mt-0">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <aside className="mt-12 lg:col-span-4 lg:mt-0">
            <Reveal className="rounded-2xl border border-border bg-surface/40 p-7">
              <h2 className="t-label text-muted-foreground">
                Kunden aus diesen Stadtteilen
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {location.districts.map((district) => (
                  <li
                    key={district}
                    className="rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground/85"
                  >
                    {district}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Unser Studio steht in {site.address.city},{" "}
                {site.address.street}, nicht in {location.city}. Die Anfahrt
                lohnt sich, weil die Arbeit hier in der Halle stattfindet.
              </p>
            </Reveal>
          </aside>
        </Container>
      </section>

      {/* ── Leistungen mit Ortsbezug ─────────────────────────────────────── */}
      <section className="section-sm" aria-labelledby="leistungen-titel">
        <Container>
          <h2
            id="leistungen-titel"
            className="font-display text-[clamp(1.8rem,2.4vw+1rem,2.9rem)] leading-tight font-bold tracking-[-0.02em]"
          >
            Gefragt aus {location.city}
          </h2>
          <RevealGroup className="mt-9 grid gap-4 lg:grid-cols-3">
            {focus.map((entry) => (
              <RevealItem key={entry.slug}>
                <Link
                  href={`/leistungen/${entry.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface/30 p-7 transition-colors duration-200 hover:border-brand/50 focus-ring"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-lg leading-snug font-semibold">
                      {entry.name}
                    </span>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-brand"
                      aria-hidden
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {entry.lead}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section-sm" aria-labelledby="ort-faq-titel">
        <Container className="max-w-[52rem]">
          <h2
            id="ort-faq-titel"
            className="font-display text-[clamp(1.8rem,2.4vw+1rem,2.9rem)] leading-tight font-bold tracking-[-0.02em]"
          >
            Fragen aus {location.city}
          </h2>
          <Reveal className="mt-9">
            <FaqList faqs={location.faqs} headingId="ort-faq-titel" />
          </Reveal>
        </Container>
      </section>

      <LandingCta
        context={`Sie kommen aus ${location.city} und wollen wissen, ob sich die Fahrt lohnt?`}
      />
    </>
  )
}
