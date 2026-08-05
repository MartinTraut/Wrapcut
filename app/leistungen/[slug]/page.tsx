import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, Check } from "lucide-react"

import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { FaqList } from "@/components/shared/faq-list"
import { JsonLd } from "@/components/shared/json-ld"
import { LandingCta } from "@/components/shared/landing-cta"
import { LineRevealInView } from "@/components/shared/line-reveal"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { serviceDetails, serviceSlugs } from "@/lib/landing"
import { services, site } from "@/lib/site"

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const detail = serviceDetails[slug]
  if (!detail) return {}

  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
    alternates: { canonical: `/leistungen/${slug}` },
    openGraph: {
      title: detail.metaTitle,
      description: detail.metaDescription,
      url: `${site.url}/leistungen/${slug}`,
      images: detail.gallery[0]
        ? [{ url: detail.gallery[0].src, alt: detail.gallery[0].alt }]
        : undefined,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const detail = serviceDetails[slug]
  if (!detail) notFound()

  const service = services.find((s) => s.slug === slug)
  const related = detail.related
    .map((key) => ({ slug: key, detail: serviceDetails[key] }))
    .filter((entry) => Boolean(entry.detail))

  return (
    <>
      <JsonLd
        faqs={detail.faqs}
        breadcrumbs={[
          { name: "Leistungen", path: "/leistungen" },
          { name: service?.name ?? detail.h1, path: `/leistungen/${slug}` },
        ]}
        service={{
          name: service?.name ?? detail.h1,
          description: detail.metaDescription,
          path: `/leistungen/${slug}`,
        }}
      />

      <Breadcrumbs
        trail={[
          { name: "Leistungen", path: "/leistungen" },
          { name: service?.name ?? detail.h1, path: `/leistungen/${slug}` },
        ]}
      />

      {/* ── Kopf ─────────────────────────────────────────────────────────── */}
      <header className="section-sm">
        <Container className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.3rem,4.2vw+1rem,5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
              <LineRevealInView lines={[detail.h1]} />
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="t-lead text-muted-foreground">{detail.lead}</p>
          </div>
        </Container>
      </header>

      {/* ── Faktenkasten + Preis ─────────────────────────────────────────── */}
      <section className="pb-4" aria-labelledby="fakten-titel">
        <Container>
          <h2 id="fakten-titel" className="sr-only">
            Eckdaten
          </h2>
          <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {detail.facts.map((fact) => (
              <RevealItem key={fact.label} className="bg-background p-6">
                <dl>
                  <dt className="t-label text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-2.5 text-lg leading-snug font-semibold text-foreground">
                    {fact.value}
                  </dd>
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>

          {/*
           * Preise stehen so weit oben wie es geht.
           *
           * „Was kostet das" ist bei Folierung die erste Frage. Wer sie erst
           * im FAQ am Seitenende beantwortet, hat den Großteil der Besucher
           * längst an den Wettbewerber verloren, der eine Zahl nennt. Die
           * Spanne stammt wörtlich aus dem, was der Betrieb selbst publiziert.
           */}
          {detail.price ? (
            <Reveal className="mt-6 rounded-2xl border border-brand/30 bg-brand/[0.05] p-7 sm:p-9">
              <h2 className="font-display text-xl font-bold">
                {detail.price.headline}
              </h2>
              <dl className="mt-6 divide-y divide-border">
                {detail.price.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-3.5"
                  >
                    <dt className="text-muted-foreground">{item.label}</dt>
                    <dd className="nums text-lg font-semibold text-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Richtwerte, keine Pauschale. Den verbindlichen Festpreis nennen
                wir nach der Besichtigung, Beratung und Angebot sind kostenlos.
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ── Fachtext ─────────────────────────────────────────────────────── */}
      <section className="section-sm">
        <Container className="grid gap-x-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {detail.sections.map((block) => (
              <Reveal key={block.heading} className="mt-14 first:mt-0">
                <h2 className="font-display text-[clamp(1.6rem,1.8vw+1rem,2.4rem)] leading-tight font-bold tracking-[-0.02em]">
                  {block.heading}
                </h2>
                {block.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-5 leading-[1.75] text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>

          <aside className="mt-14 lg:col-span-4 lg:mt-0">
            <Reveal className="sticky top-28 rounded-2xl border border-border bg-surface/40 p-7">
              <h2 className="t-label text-muted-foreground">Lohnt sich für</h2>
              <ul className="mt-5 flex flex-col gap-3.5">
                {detail.suitedFor.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <Check
                      className="mt-1 size-4 shrink-0 text-brand"
                      aria-hidden
                    />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </Container>
      </section>

      {/* ── Bildstrecke ──────────────────────────────────────────────────── */}
      {detail.gallery.length ? (
        <section className="section-sm" aria-labelledby="arbeiten-titel">
          <Container>
            <h2 id="arbeiten-titel" className="t-label text-muted-foreground">
              Arbeiten aus unserem Studio
            </h2>
            <RevealGroup className="mt-7 grid gap-4 sm:grid-cols-2">
              {detail.gallery.map((image, i) => (
                <RevealItem
                  key={image.src}
                  className={
                    "relative overflow-hidden rounded-2xl bg-surface " +
                    // Erstes Bild über die volle Breite: eine Strecke aus vier
                    // gleich großen Kacheln liest sich als Katalog, mit einem
                    // Aufmacher als Auswahl.
                    (i === 0 ? "aspect-16/9 sm:col-span-2" : "aspect-4/3")
                  }
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
                    className="img-punch object-cover"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      ) : null}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section-sm" aria-labelledby="faq-titel">
        <Container className="max-w-[52rem]">
          <h2
            id="faq-titel"
            className="font-display text-[clamp(1.8rem,2.4vw+1rem,2.9rem)] leading-tight font-bold tracking-[-0.02em]"
          >
            Häufige Fragen
          </h2>
          <Reveal className="mt-9">
            <FaqList faqs={detail.faqs} headingId="faq-titel" />
          </Reveal>
        </Container>
      </section>

      {/* ── Verwandte Leistungen ─────────────────────────────────────────── */}
      {related.length ? (
        <section className="section-sm" aria-labelledby="verwandt-titel">
          <Container>
            <h2 id="verwandt-titel" className="t-label text-muted-foreground">
              Passt dazu
            </h2>
            <RevealGroup className="mt-7 grid gap-4 sm:grid-cols-3">
              {related.map(({ slug: relatedSlug, detail: relatedDetail }) => (
                <RevealItem key={relatedSlug}>
                  <Link
                    href={`/leistungen/${relatedSlug}`}
                    className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-surface/30 p-7 transition-colors duration-200 hover:border-brand/50 focus-ring"
                  >
                    <span className="text-lg leading-snug font-semibold">
                      {services.find((s) => s.slug === relatedSlug)?.name ??
                        relatedDetail.h1}
                    </span>
                    <ArrowUpRight
                      className="size-5 text-muted-foreground transition-colors duration-200 group-hover:text-brand"
                      aria-hidden
                    />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      ) : null}

      <LandingCta
        context={`Sie überlegen, ${(service?.name ?? detail.h1).toLowerCase()} machen zu lassen?`}
      />
    </>
  )
}
