import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal } from "@/components/shared/reveal"
import { ServiceIcon } from "@/components/shared/service-icons"
import {
  InteractiveSelector,
  type SelectorItem,
} from "@/components/ui/interactive-selector"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/site"

const items: SelectorItem[] = services.map((s) => ({
  title: s.name,
  tagline: s.tagline,
  description: s.description,
  benefits: s.benefits,
  image: s.image,
  icon: <ServiceIcon slug={s.slug} className="size-5.5" />,
}))

export function Services() {
  return (
    <section id="leistungen" className="section scroll-mt-20">
      <Container width="wide">
        <Reveal className="flex flex-col gap-8 border-t border-border pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <Eyebrow index="01">Leistungen</Eyebrow>
            <h2 className="t-h2 mt-7 text-balance">
              Vom Schutzschild bis zum
              <span className="text-muted-foreground"> kompletten Re-Design.</span>
            </h2>
            <p className="t-lead mt-6 max-w-xl text-muted-foreground text-pretty">
              Sechs Disziplinen, ein Anspruch: ein Ergebnis, das jeder
              Detailprüfung standhält.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="shrink-0">
            <Link href="/leistungen">
              Alle Leistungen im Detail
              <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
            </Link>
          </Button>
        </Reveal>

        <Reveal className="mt-14" variant="scaleIn">
          <InteractiveSelector items={items} />
        </Reveal>

        {/* Einstieg in die Leistungsseiten: die Startseite erklärt, die
            Unterseite beantwortet Preis, Dauer und die konkreten Fragen. */}
        <Reveal className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="t-mono mr-2 text-muted-foreground">
            Direkt zum Detail
          </span>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/leistungen/${s.slug}`}
              className="group inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm transition-colors duration-200 hover:border-signal hover:text-signal"
            >
              {s.name}
              <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
