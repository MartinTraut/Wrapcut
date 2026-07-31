import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, MapPin, Star } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { LandingJsonLd } from "@/components/shared/json-ld"
import { SpotlightCard } from "@/components/shared/spotlight-card"
import { PageHero } from "@/components/sections/page-hero"
import { CtaBand } from "@/components/sections/cta-band"
import { Faq } from "@/components/sections/faq"
import { site, services } from "@/lib/site"
import { serviceDetails, locations } from "@/lib/landing"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

function load(slug: string) {
  const service = services.find((s) => s.slug === slug)
  const detail = serviceDetails[slug]
  if (!service || !detail) return null
  return { service, detail }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const data = load(slug)
  if (!data) return {}

  const path = `/leistungen/${slug}`
  return {
    // absolute, weil das Template der Startseite hier zu lange Titel erzeugt
    title: { absolute: data.detail.metaTitle },
    description: data.detail.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "de_DE",
      url: `${site.url}${path}`,
      siteName: site.name,
      title: data.detail.metaTitle,
      description: data.detail.metaDescription,
    },
  }
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params
  const data = load(slug)
  if (!data) notFound()
  const { service, detail } = data

  const related = detail.related
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s))

  return (
    <>
      <LandingJsonLd
        path={`/leistungen/${slug}`}
        name={detail.metaTitle}
        description={detail.metaDescription}
        crumbs={[
          { name: "Leistungen", path: "/leistungen" },
          { name: service.name, path: `/leistungen/${slug}` },
        ]}
        faqs={detail.faqs}
        service={{
          name: service.name,
          description: service.description,
          serviceType: service.keywords[0],
        }}
      />

      <PageHero
        crumbs={[
          { name: "Leistungen", path: "/leistungen" },
          { name: service.name, path: `/leistungen/${slug}` },
        ]}
        eyebrow="Leistung"
        title={detail.h1}
        lead={detail.lead}
        image={{ src: detail.gallery[0].src, alt: detail.gallery[0].alt }}
        facts={detail.facts}
      />

      {/* Fachteil links, Preis- und Eignungskarte rechts mitlaufend. */}
      <section className="section">
        <Container className="grid gap-14 lg:grid-cols-[1fr_0.62fr] lg:gap-20">
          <div className="space-y-14">
            {detail.sections.map((block) => (
              <Reveal key={block.heading}>
                <h2 className="t-h2-minor text-balance">{block.heading}</h2>
                <div className="mt-5 space-y-4">
                  {block.body.map((p, i) => (
                    <p
                      key={i}
                      className="leading-relaxed text-muted-foreground text-pretty"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {detail.price && (
              <Reveal variant="scaleIn">
                <SpotlightCard className="border border-border p-7">
                  <h2 className="t-h3">{detail.price.headline}</h2>
                  <dl className="mt-5 space-y-4">
                    {detail.price.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="text-sm text-muted-foreground">
                          {item.label}
                        </dt>
                        <dd className="nums font-semibold text-signal">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                    Richtwerte. Der verbindliche Preis steht im kostenlosen
                    Festpreis-Angebot nach Sichtung des Fahrzeugs.
                  </p>
                  {/* Vertrauenssignal genau dort, wo die Kaufentscheidung
                      fällt — die Bewertung stand vorher erst weit darunter
                      im CtaBand. */}
                  <p className="t-mono-sm nums mt-5 flex items-center gap-2 border-t border-border pt-5 text-muted-foreground">
                    <Star className="size-3.5 shrink-0 fill-signal text-signal" aria-hidden />
                    {site.reviews.rating.toLocaleString("de-DE", {
                      minimumFractionDigits: 1,
                    })}{" "}
                    von 5 bei {site.reviews.count} Google-Bewertungen
                  </p>
                  <Link
                    href={`/?leistung=${slug}#kontakt`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal underline-offset-4 hover:underline"
                  >
                    Angebot anfragen
                    <ArrowRight className="size-4" />
                  </Link>
                </SpotlightCard>
              </Reveal>
            )}

            <Reveal variant="scaleIn" delay={0.06}>
              <div className="border border-border p-7">
                <h2 className="t-h3">Besonders sinnvoll bei</h2>
                <ul className="mt-5 space-y-3">
                  {detail.suitedFor.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0 text-signal" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {detail.gallery.length > 1 && (
        <section className="section-tight">
          <Container width="wide">
            <Reveal>
              <Eyebrow>Aus unserer Halle</Eyebrow>
            </Reveal>
            <RevealGroup className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {detail.gallery.map((img) => (
                <RevealItem
                  key={img.src}
                  variant="curtain"
                  as="figure"
                  className="relative aspect-4/3 overflow-hidden border border-border"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-[var(--ease-premium)] hover:scale-[1.04]"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}

      <Faq
        items={detail.faqs}
        eyebrow={`${service.name} — Fragen`}
        headline="Was Kunden"
        headlineAccent="am häufigsten fragen."
        intro={`Konkrete Antworten zu ${service.name}. Ihre Frage ist nicht dabei?`}
      />

      <CtaBand
        service={slug}
        headline={`${service.name} für Ihr Fahrzeug — sagen Sie uns, worum es geht.`}
        text="Beratung und Festpreis-Angebot sind kostenlos. Schicken Sie uns Fahrzeug und Wunsch, dann bekommen Sie eine ehrliche Einschätzung — auch dann, wenn die kleinere Lösung die richtige ist."
      />

      {/* Interne Verlinkung: verwandte Leistungen und das Einzugsgebiet. */}
      <section className="section-tight">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Passt dazu</Eyebrow>
                <h2 className="t-h2-minor mt-5 text-balance">
                  Weitere Leistungen
                </h2>
              </Reveal>
              <RevealGroup className="mt-7 space-y-3">
                {related.map((r) => (
                  <RevealItem key={r.slug}>
                    <Link
                      href={`/leistungen/${r.slug}`}
                      className="group flex items-start justify-between gap-6 border border-border p-5 transition-colors hover:border-signal "
                    >
                      <span>
                        <span className="block font-semibold">{r.name}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {r.tagline}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 size-4 shrink-0 text-signal transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div>
              <Reveal>
                <Eyebrow>Einzugsgebiet</Eyebrow>
                <h2 className="t-h2-minor mt-5 text-balance">
                  {service.name} in Ihrer Stadt
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground text-pretty">
                  Unser Studio steht in {site.address.city}, zentral im
                  Rhein-Kreis Neuss. Wie Sie von Ihrer Stadt aus zu uns kommen,
                  steht auf der jeweiligen Seite.
                </p>
              </Reveal>
              <RevealGroup className="mt-7 flex flex-wrap gap-2">
                {locations.map((l) => (
                  <RevealItem key={l.slug} as="div">
                    <Link
                      href={`/standorte/${l.slug}`}
                      className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm transition-colors hover:border-signal hover:text-signal"
                    >
                      <MapPin className="size-3.5 text-muted-foreground" />
                      {l.city}
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
