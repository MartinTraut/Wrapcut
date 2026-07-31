import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal } from "@/components/shared/reveal"
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs"
import { Magnetic } from "@/components/shared/magnetic"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

type PageHeroProps = {
  crumbs: Crumb[]
  eyebrow: string
  /** Erster Teil der H1 — bleibt in Textfarbe */
  title: string
  /** Zweiter Teil der H1 — trägt den Akzent */
  accent?: string
  lead: string
  image: { src: string; alt: string }
  /** Eckdaten unter dem Text. Nur belegte Werte übergeben. */
  facts?: { label: string; value: string }[]
}

/**
 * Hero für Unterseiten. Bewusst nicht der Startseiten-Hero in klein:
 * kein Vollbild, dafür asymmetrische Zweispaltigkeit und ein versetzter
 * Rahmen hinter dem Bild — Tiefe ohne einen zweiten Fullscreen-Auftritt.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  accent,
  lead,
  image,
  facts,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Messraster statt Farbverlauf — gleiche Ordnungsebene wie Startseite. */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(80%_70%_at_10%_0%,#000,transparent_70%)]"
      />
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.035]" />

      <Container width="wide">
        <Reveal>
          <Breadcrumbs items={crumbs} />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="t-h2-hero mt-7 text-balance">
                {title}
                {accent && <span className="text-flow block">{accent}</span>}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="t-lead mt-7 max-w-2xl text-muted-foreground text-pretty">
                {lead}
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/#kontakt">
                    Kostenloses Angebot
                    <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="lg">
                <a href={site.contact.phoneHref}>
                  <Phone />
                  {site.contact.phone}
                </a>
              </Button>
            </Reveal>

            {facts && facts.length > 0 && (
              <Reveal delay={0.24}>
                <dl className="mt-12 grid border-t border-border sm:grid-cols-2">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-b border-border py-5 sm:even:border-l sm:even:pl-8"
                    >
                      <dt className="t-mono text-muted-foreground">
                        {fact.label}
                      </dt>
                      <dd className="nums mt-2.5 text-base font-semibold text-foreground">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>

          {/* Versetzter Rahmen hinter dem Bild: Layering statt flacher Kachel. */}
          <Reveal variant="curtain" className="relative">
            {/* Erst ab sm: der versetzte Rahmen ragt um 16 px über die
                rechte Kante hinaus und sprengte damit bei 320 px den
                Viewport. Rein dekorativ, also unter sm entbehrlich. */}
            <div
              aria-hidden
              className="absolute -top-4 -right-4 bottom-8 left-10 hidden border border-signal/30 sm:block lg:-top-6 lg:-right-6"
            />
            <div className="relative aspect-4/5 overflow-hidden border border-border lg:aspect-3/4">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
