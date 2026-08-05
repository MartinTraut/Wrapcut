"use client"

import * as React from "react"
import Image from "next/image"
import { Maximize2 } from "lucide-react"

import { Lightbox } from "@/components/shared/lightbox"
import { RevealGroup, RevealItem } from "@/components/shared/reveal"

/**
 * Bildstrecke der Landingpages, mit derselben Vollbildansicht wie die Galerie
 * der Startseite.
 *
 * Vorher waren die Fotos hier tote Kacheln: Wer auf einer Leistungsseite bis
 * zur Bildstrecke gescrollt hat, will genau das sehen, was in Kachelgröße
 * nicht zu erkennen ist — die Kante am Radlauf, den Verlauf über die Sicke.
 * Auf der Startseite öffnet ein Klick das Bild groß, hier passierte nichts.
 * Zwei Galerien mit unterschiedlichem Verhalten sind für den Nutzer keine
 * zwei Bausteine, sondern ein defekter.
 *
 * Das Raster füllt sich immer vollständig: bei ungerader Bildzahl läuft die
 * letzte Kachel über beide Spalten. Eine halbe Kachel neben einer Lücke liest
 * sich als fehlendes Bild, nicht als Komposition.
 */
export function ImageStrip({
  images,
  label,
}: {
  images: { src: string; alt: string }[]
  /** Kleine Oberzeile in der Vollbildansicht — hier der Leistungsname. */
  label: string
}) {
  const [open, setOpen] = React.useState<number | null>(null)

  const items = images.map((image) => ({
    src: image.src,
    label,
    finish: image.alt,
  }))

  return (
    <>
      <RevealGroup className="grid gap-4 sm:grid-cols-2">
        {images.map((image, i) => {
          const isLast = i === images.length - 1
          const spans = isLast && images.length % 2 === 1

          return (
            <RevealItem
              key={image.src}
              variant="curtain"
              className={
                "group relative overflow-hidden rounded-2xl bg-surface " +
                (spans ? "aspect-16/9 sm:col-span-2" : "aspect-4/3")
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  spans
                    ? "(min-width: 1024px) 88vw, 100vw"
                    : "(min-width: 640px) 44vw, 100vw"
                }
                className="img-punch object-cover transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
              />
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${image.alt} — größer ansehen`}
                className="absolute inset-0 cursor-zoom-in focus-ring"
              >
                <span
                  aria-hidden
                  className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full border border-white/25 bg-background/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Maximize2 className="size-4" />
                </span>
              </button>
            </RevealItem>
          )
        })}
      </RevealGroup>

      <Lightbox
        items={items}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </>
  )
}
