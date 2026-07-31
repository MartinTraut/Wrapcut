import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { LandingJsonLd } from "@/components/shared/json-ld"
import { PageHero } from "@/components/sections/page-hero"
import { CtaBand } from "@/components/sections/cta-band"
import { site, services } from "@/lib/site"
import { serviceDetails } from "@/lib/landing"

const metaTitle = "Leistungen | Folierung, Lackschutz & Tönung"
const metaDescription =
  "Alle Leistungen von WrapCut in Jüchen: Voll- und Teilfolierung, Lackschutzfolie (PPF), Keramikversiegelung, Scheibentönung, Chrom Delete und Werbebeschriftung."

export const metadata: Metadata = {
  title: { absolute: metaTitle },
  description: metaDescription,
  alternates: { canonical: "/leistungen" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${site.url}/leistungen`,
    siteName: site.name,
    title: metaTitle,
    description: metaDescription,
  },
}

export default function LeistungenPage() {
  const crumbs = [{ name: "Leistungen", path: "/leistungen" }]

  return (
    <>
      <LandingJsonLd
        path="/leistungen"
        name={metaTitle}
        description={metaDescription}
        crumbs={crumbs}
        faqs={[]}
        itemList={services.map((s) => ({
          name: s.name,
          path: `/leistungen/${s.slug}`,
        }))}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Übersicht"
        title="Sechs Disziplinen,"
        accent="ein Anspruch."
        lead="Von der Vollfolierung bis zur Zierleiste: alles, was wir in Jüchen an Fahrzeugen machen — mit Preisrahmen, Dauer und den Fragen, die dazu am häufigsten kommen."
        image={{
          src: "/originals/img-01.jpg",
          alt: "Vollfolierung in einem Camo-Design",
        }}
      />

      <section className="section-tight">
        <Container>
          <RevealGroup className="grid gap-4 md:grid-cols-2">
            {services.map((s) => {
              const detail = serviceDetails[s.slug]
              return (
                <RevealItem key={s.slug} variant="scaleIn">
                  <Link
                    href={`/leistungen/${s.slug}`}
                    // minmax(0,1fr) statt 1fr: sonst behält die Textspalte
                    // ihren min-content-Boden und die Karte sprengt bei
                    // 320 px den Viewport (gemessen: scrollWidth 370 px).
                    className="group grid h-full grid-cols-[auto_minmax(0,1fr)] gap-5 border border-border p-5 transition-colors duration-200 hover:border-signal sm:gap-6"
                  >
                    {/* 112 px Bild + Innenabstand ließen bei 320 px keine
                        Restbreite für die Textspalte. */}
                    <span className="relative size-20 shrink-0 overflow-hidden sm:size-28 md:size-32">
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        sizes="128px"
                        className="object-cover transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-[1.06]"
                      />
                    </span>
                    <span className="flex flex-col">
                      {/* `break-words`, weil der Umbruchschutz in globals.css
                          nur auf h1–h4 liegt — hier steht der Leistungsname
                          in einem span und riss sonst aus der Zelle. */}
                      <span className="t-h3 block break-words">{s.name}</span>
                      <span className="mt-2 block text-sm text-signal">
                        {s.tagline}
                      </span>
                      <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted-foreground">
                        {detail?.lead ?? s.description}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                        Zur Leistung
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </RevealItem>
              )
            })}
          </RevealGroup>

          <Reveal className="mt-10">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Sie wissen noch nicht, was Ihr Fahrzeug braucht? Rufen Sie an. Wir
              sagen Ihnen ehrlich, welche Maßnahme den größten Effekt bringt —
              auch dann, wenn das die günstigere ist.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        headline="Zwei Minuten am Telefon sparen Ihnen oft die halbe Recherche."
        text="Beratung und Festpreis-Angebot sind kostenlos. Sagen Sie uns Fahrzeug und Ziel, dann bekommen Sie eine Einschätzung, mit der Sie etwas anfangen können."
      />
    </>
  )
}
