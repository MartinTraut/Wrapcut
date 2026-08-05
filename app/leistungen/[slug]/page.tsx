import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, Check, Phone } from "lucide-react"

import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { FaqList } from "@/components/shared/faq-list"
import { ImageStrip } from "@/components/shared/image-strip"
import { JsonLd } from "@/components/shared/json-ld"
import { LandingCta } from "@/components/shared/landing-cta"
import { LineRevealInView } from "@/components/shared/line-reveal"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { Button } from "@/components/ui/button"
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
  const name = service?.name ?? detail.h1
  const related = detail.related
    .map((key) => ({ slug: key, detail: serviceDetails[key] }))
    .filter((entry) => Boolean(entry.detail))

  /*
   * Das erste Foto trägt den Kopf, der Rest die Bildstrecke.
   *
   * Vorher öffnete jede Leistungsseite mit schwarzer Fläche und Text — das
   * erste Foto stand rund 4.000 px weiter unten. Diese Seiten sind aber die
   * Landepunkte der Suche („Fahrzeugfolierung Jüchen"): Wer hier ankommt,
   * entscheidet in Sekunden, ob der Betrieb sein Handwerk beherrscht, und
   * das entscheidet er am Fahrzeug, nicht am Fließtext.
   */
  const [cover, ...rest] = detail.gallery

  return (
    <>
      <JsonLd
        faqs={detail.faqs}
        breadcrumbs={[
          { name: "Leistungen", path: "/leistungen" },
          { name: name, path: `/leistungen/${slug}` },
        ]}
        service={{
          name: name,
          description: detail.metaDescription,
          path: `/leistungen/${slug}`,
        }}
      />

      <Breadcrumbs
        trail={[
          { name: "Leistungen", path: "/leistungen" },
          { name: name, path: `/leistungen/${slug}` },
        ]}
      />

      {/* ── Kopf: Aussage links, Ergebnis rechts ─────────────────────────── */}
      <header className="bg-stage relative isolate overflow-hidden">
        {/* Das Hexagon-Raster läuft nach unten aus, damit der Kopf in den
            Faktenriegel übergeht statt als eigener Kasten zu enden. */}
        <div
          aria-hidden
          className="bg-hex pointer-events-none absolute inset-0 -z-10 opacity-45 [mask-image:linear-gradient(to_bottom,#000,transparent)]"
        />
        <Container className="grid gap-x-14 gap-y-10 pt-4 pb-14 lg:grid-cols-12 lg:items-center lg:pt-6 lg:pb-20">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="t-label text-iris">Leistung</span>
            </Reveal>
            {/* Kleiner gesetzt als auf den Übersichtsseiten: die Headline
                teilt sich die Breite jetzt mit dem Foto und stünde im alten
                Grad über sechs Spalten in Fragmenten. */}
            <h1 className="mt-6 font-display text-[clamp(2.1rem,3vw+1rem,3.9rem)] leading-[1.04] font-bold tracking-[-0.03em] text-balance">
              <LineRevealInView lines={[detail.h1]} />
            </h1>
            <Reveal delay={0.1}>
              <p className="t-lead mt-7 max-w-[46ch] text-muted-foreground text-pretty">
                {detail.lead}
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/#kontakt">Kostenloses Angebot</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={site.contact.phoneHref}>
                  <Phone />
                  <span className="nums">{site.contact.phone}</span>
                </a>
              </Button>
            </Reveal>
          </div>

          {cover ? (
            <Reveal
              variant="curtain"
              delay={0.08}
              className="ring-iris relative aspect-4/3 overflow-hidden rounded-3xl bg-surface lg:col-span-6 lg:aspect-5/4"
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="img-punch object-cover"
              />
              {/* Bildunterschrift auf dem Foto, nicht darunter: der Kopf soll
                  eine Komposition bleiben und keine Bildlegende bekommen. */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background/85 to-transparent"
              />
              <p className="absolute inset-x-6 bottom-5 text-sm text-white/85">
                {cover.alt}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </header>

      {/* ── Eckdaten und Preis als ein Datenblatt ────────────────────────── */}
      <section className="pb-4" aria-labelledby="fakten-titel">
        <Container>
          <h2 id="fakten-titel" className="sr-only">
            Eckdaten und Preisrahmen
          </h2>
          {/*
            Ein Panel statt zwei Kästen.
            Eckdaten und Preis beantworten dieselbe Frage — „woran bin ich
            hier?" — und standen vorher als zwei getrennte Flächen
            untereinander, die zweite in Markenfarbe, die erste in Grau. Das
            liest sich als zwei Bausteine, nicht als ein Datenblatt.
          */}
          <div className="bg-iris-wash overflow-hidden rounded-3xl border border-brand/25">
            {/* Zweispaltig schon auf dem Telefon: einspaltig standen vier
                Kennwerte auf über 900 px, und Eckdaten, an denen man drei
                Daumenwischer vorbeiscrollt, sind keine Übersicht mehr.
                Die Trennlinien folgen deshalb der Spaltenzahl — links ab der
                zweiten Spalte, oben ab der zweiten Zeile. */}
            <RevealGroup className="grid grid-cols-2 lg:grid-cols-4">
              {detail.facts.map((fact) => (
                <RevealItem
                  key={fact.label}
                  className="relative border-brand/15 p-5 even:border-l sm:p-7 [&:nth-child(n+3)]:border-t lg:border-l lg:first:border-l-0 lg:[&:nth-child(n+3)]:border-t-0"
                >
                  {/* Statt eines Piktogramms je Kennwert — die Labels reichen
                      von „Haltbarkeit" bis „Zulassung", dafür gibt es kein
                      ehrliches Bildzeichen — trägt jede Zelle denselben
                      kurzen Farbstrich wie die Kapitelköpfe der Seite. */}
                  <span
                    aria-hidden
                    className="bg-iris block h-px w-10 rounded-full"
                  />
                  <dl className="mt-5">
                    <dt className="t-label text-brand/85">{fact.label}</dt>
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
             * Spanne stammt wörtlich aus dem, was der Betrieb selbst
             * publiziert.
             */}
            {detail.price ? (
              <Reveal className="border-t border-brand/20 bg-background/40 p-7 sm:p-9">
                <h3 className="t-label text-brand/85">
                  {detail.price.headline}
                </h3>
                <dl className="mt-6 divide-y divide-brand/12">
                  {detail.price.items.map((item, i) => (
                    <div
                      key={item.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-4 first:pt-0"
                    >
                      <dt className="leading-snug text-muted-foreground">
                        {item.label}
                      </dt>
                      {/* Die erste Zeile trägt die Leitzahl der Seite und
                          steht deshalb im Display-Register und in der
                          Markenfarbe; alles darunter ist Beiwerk und bleibt
                          im Textgrad. Vier gleich große Preiszeilen wären
                          eine Tabelle, keine Aussage. */}
                      <dd
                        className={
                          "nums " +
                          (i === 0
                            ? "text-iris font-display text-[clamp(1.6rem,1.6vw+1rem,2.4rem)] leading-none font-bold tracking-[-0.02em]"
                            : "text-lg font-semibold text-foreground")
                        }
                      >
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  Richtwerte, keine Pauschale. Den verbindlichen Festpreis
                  nennen wir nach der Besichtigung, Beratung und Angebot sind
                  kostenlos.
                </p>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      {/* ── Fachtext ─────────────────────────────────────────────────────── */}
      <section className="section-sm">
        <Container className="grid gap-x-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {detail.sections.map((block, i) => (
              <Reveal key={block.heading} className="relative mt-16 first:mt-0">
                {/*
                  Zähler plus Haarlinie über jedem Abschnitt.

                  Der Fachtext läuft über drei Kapitel und mehrere
                  Bildschirmhöhen; ohne Ordnungssignal ist er eine einzige
                  Textwand, in der man beim Scrollen die Position verliert.
                  Es ist bewusst dieselbe Figur wie in den Kapitelköpfen der
                  Startseite — auslaufende Linie mit brennendem Kopf —, damit
                  die Unterseiten nicht in einer eigenen Formsprache stehen.
                */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-border via-border to-transparent"
                />
                <span
                  aria-hidden
                  className="bg-iris absolute top-0 left-0 h-px w-16"
                />
                <span className="t-label nums text-iris mt-7 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 font-display text-[clamp(1.6rem,1.8vw+1rem,2.4rem)] leading-tight font-bold tracking-[-0.02em] text-balance">
                  {block.heading}
                </h2>
                {block.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-5 max-w-[68ch] leading-[1.75] text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>

          <aside className="mt-14 lg:col-span-4 lg:mt-0">
            <Reveal className="bg-iris-wash sticky top-28 rounded-2xl border border-brand/25 p-7">
              <h2 className="t-label text-brand/85">Lohnt sich für</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {detail.suitedFor.map((item) => (
                  <li key={item} className="flex gap-3.5 leading-relaxed">
                    {/* Der Haken sitzt in einem eigenen Feld: freistehend
                        rutschte er bei zweizeiligen Einträgen optisch in den
                        Text, statt die Zeile anzuführen. */}
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10">
                      <Check className="size-3 text-brand" aria-hidden />
                    </span>
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
              {/* Der Fachtext ist lang, die Karte läuft sticky mit. Damit ist
                  sie die einzige Stelle, an der über mehrere Bildschirmhöhen
                  hinweg ein Weg zum Angebot offen steht. */}
              <div className="mt-7 border-t border-brand/20 pt-6">
                <Button asChild className="w-full">
                  <Link href="/#kontakt">Kostenloses Angebot</Link>
                </Button>
                <a
                  href={site.contact.phoneHref}
                  className="nums mt-4 flex items-center justify-center gap-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-brand focus-ring"
                >
                  <Phone className="size-4" aria-hidden />
                  {site.contact.phone}
                </a>
              </div>
            </Reveal>
          </aside>
        </Container>
      </section>

      {/* ── Bildstrecke ──────────────────────────────────────────────────── */}
      {rest.length ? (
        <section className="section-sm" aria-labelledby="arbeiten-titel">
          <Container>
            <h2 id="arbeiten-titel" className="t-label text-muted-foreground">
              Arbeiten aus unserem Studio
            </h2>
            <div className="mt-7">
              <ImageStrip images={rest} label={name} />
            </div>
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
              {related.map(({ slug: relatedSlug, detail: relatedDetail }) => {
                const relatedCover = relatedDetail.gallery[0]

                return (
                  <RevealItem key={relatedSlug}>
                    {/*
                      Mit Foto statt als Textkachel.

                      Drei Kacheln mit Namen und Pfeil sind eine Fußzeile, kein
                      Angebot — und sie stehen ausgerechnet dort, wo jemand
                      gerade eine ganze Leistungsseite gelesen hat und für den
                      nächsten Schritt offen ist. Dieselbe Bildkachel wie in
                      der Leistungsübersicht, nur flacher.
                    */}
                    <Link
                      href={`/leistungen/${relatedSlug}`}
                      className="group relative flex h-full min-h-[15rem] flex-col justify-end overflow-hidden rounded-2xl border border-border p-6 transition-colors duration-200 hover:border-brand/50 focus-ring"
                    >
                      {relatedCover ? (
                        <Image
                          src={relatedCover.src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 30vw, 100vw"
                          className="img-punch -z-10 object-cover transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
                        />
                      ) : null}
                      <span
                        aria-hidden
                        className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/80 via-45% to-background/25"
                      />
                      <span className="flex items-end justify-between gap-4">
                        <span className="text-lg leading-snug font-semibold">
                          {services.find((s) => s.slug === relatedSlug)?.name ??
                            relatedDetail.h1}
                        </span>
                        <ArrowUpRight
                          className="size-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-brand"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </Container>
        </section>
      ) : null}

      {/* Kein `toLowerCase()`: „Sie überlegen, voll- & teilfolierung machen zu
          lassen?" — deutsche Substantive bleiben groß, und der Leistungsname
          ist zusätzlich ein Eigenname der Seite. */}
      <LandingCta context={`Sie überlegen, ${name} machen zu lassen?`} />
    </>
  )
}
