import { ArrowUpRight } from "lucide-react"
import { InstagramIcon } from "@/components/shared/icons"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal, RevealGroup } from "@/components/shared/reveal"
import { GalleryLightbox } from "@/components/ui/lightbox"
import { site, gallery } from "@/lib/site"

export function Showcase() {
  return (
    <section id="galerie" className="section-loose scroll-mt-20">
      {/* Weiter als der Rest der Seite: die Galerie darf Randluft fressen. */}
      <Container width="wide">
        <Reveal className="flex flex-col items-start justify-between gap-8 border-t border-border pt-10 sm:flex-row sm:items-end sm:gap-16">
          <div className="max-w-2xl">
            <Eyebrow index="02">Galerie</Eyebrow>
            <h2 className="t-h2 mt-7 text-balance">
              Acht Fahrzeuge,
              <br />
              <span className="text-outline">acht Finishes.</span>
            </h2>
            <p className="t-lead mt-6 text-muted-foreground text-pretty">
              Camo, Satin Violett, Military Green, Purple Gloss, Stealth Black —
              alles Kundenfahrzeuge aus dem Rhein-Kreis Neuss. Zum Vergrößern
              antippen.
            </p>
          </div>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="t-mono group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-input px-5 py-3.5 text-foreground transition-colors duration-200 hover:border-signal hover:text-signal focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <InstagramIcon className="size-4" />
            {site.social.instagramHandle}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        {/*
          Sechsspaltiges Raster mit flacheren Zeilen: erst die stärkere
          Spreizung der Kacheln macht aus der gleichförmigen Wand ein Bento
          mit Kadenz. Die Spans liegen bei den Bilddaten in lib/site.ts.
        */}
        <RevealGroup
          stagger={0.06}
          className="mt-12 grid auto-rows-[110px] grid-cols-4 gap-3 sm:auto-rows-[130px] sm:grid-cols-6"
        >
          <GalleryLightbox items={gallery} />
        </RevealGroup>
      </Container>
    </section>
  )
}
