import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { JsonLd } from "@/components/shared/json-ld"
import { LandingCta } from "@/components/shared/landing-cta"
import { LineRevealInView } from "@/components/shared/line-reveal"
import { RevealGroup, RevealItem } from "@/components/shared/reveal"
import { serviceDetails } from "@/lib/landing"
import { services, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Leistungen, Folierung, Lackschutz & Tönung",
  description: `Alle Leistungen von ${site.name} in ${site.address.city}: Fahrzeugfolierung, Lackschutzfolie (PPF), Keramikversiegelung, Scheibentönung, Chrom Delete und Werbebeschriftung.`,
  alternates: { canonical: "/leistungen" },
}

export default function LeistungenPage() {
  const trail = [{ name: "Leistungen", path: "/leistungen" }]

  return (
    <>
      <JsonLd breadcrumbs={trail} />
      <Breadcrumbs trail={trail} />

      <header className="section-sm">
        <Container className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.3rem,4.2vw+1rem,5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
              <LineRevealInView lines={["Sechs Leistungen,", "ein Anspruch."]} />
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="t-lead text-muted-foreground">
              Folierung, Lackschutz, Keramik, Tönung, Chrom Delete und
              Beschriftung, alles in unserer Halle in {site.address.city}, mit
              Material von Avery Dennison, 3M, HEXIS, ORAFOL, BodyFence und
              KPMF.
            </p>
          </div>
        </Container>
      </header>

      <section className="pb-4">
        <Container>
          <RevealGroup className="grid gap-4 lg:grid-cols-2">
            {services.map((service) => {
              const detail = serviceDetails[service.slug]
              const cover = detail?.gallery[0]

              return (
                <RevealItem key={service.slug}>
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="group relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-2xl border border-border p-7 transition-colors duration-200 hover:border-brand/50 focus-ring"
                  >
                    {cover ? (
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="img-punch -z-10 object-cover transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
                      />
                    ) : null}
                    {/* Deckung großzügig: der Titel steht auf einem Foto, und
                        ein Verlauf, der nur bis zur Grundlinie reicht, lässt
                        die Headline auf hellen Fahrzeugen verschwinden. */}
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/80 via-45% to-background/25"
                    />

                    <span className="flex items-start justify-between gap-4">
                      <span className="t-h3 font-display">{service.name}</span>
                      <ArrowUpRight
                        className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-brand"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-3 max-w-[38ch] leading-relaxed text-muted-foreground">
                      {detail?.lead ?? service.tagline}
                    </span>
                    {detail?.price ? (
                      <span className="nums mt-5 inline-flex w-fit rounded-full border border-brand/35 bg-brand/[0.07] px-4 py-1.5 text-sm font-semibold text-foreground">
                        {detail.price.items[0].value}
                      </span>
                    ) : null}
                  </Link>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </Container>
      </section>

      <LandingCta />
    </>
  )
}
