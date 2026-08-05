"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export type LightboxItem = { src: string; label: string; finish: string }

/**
 * Vollbildansicht für die Galerie.
 *
 * Eine Galerie, deren Bilder man nur in Kachelgröße sieht, zeigt genau das,
 * was bei einer Folierung zählt, nicht: die Kanten, den Verlauf, die
 * Spiegelung. Deshalb öffnet ein Klick das Foto in voller Größe.
 *
 * Vier Dinge, die eine Lightbox von einem Overlay unterscheiden:
 *
 * - **`object-contain`, nicht `cover`.** Der Zweck ist das ganze Bild; ein
 *   Beschnitt auf Fensterformat wäre hier das genaue Gegenteil der Absicht.
 * - **Der Scroll dahinter steht still.** `overflow: hidden` allein reicht
 *   nicht, solange Lenis läuft — Lenis setzt `scrollTop` selbst und scrollt
 *   fröhlich weiter. Deshalb wird die Instanz zusätzlich angehalten.
 * - **Tastatur vollständig**: Escape schließt, Pfeile blättern, der Fokus
 *   wandert beim Öffnen in den Dialog und beim Schließen zurück auf die
 *   Kachel, aus der geöffnet wurde.
 * - **Blättern ist zyklisch.** Ein Ende, an dem der Knopf nichts mehr tut,
 *   liest sich als Defekt.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[]
  /** `null` heißt geschlossen. */
  index: number | null
  onClose: () => void
  onIndexChange: (next: number) => void
}) {
  const reduce = useReducedMotion()
  const open = index !== null
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const restoreRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!open) return

    restoreRef.current = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()

    const lenis = window.__lenis
    lenis?.stop()
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"

    return () => {
      lenis?.start()
      document.documentElement.style.overflow = previousOverflow
      restoreRef.current?.focus?.()
    }
  }, [open])

  React.useEffect(() => {
    if (index === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowRight")
        onIndexChange((index + 1) % items.length)
      if (event.key === "ArrowLeft")
        onIndexChange((index - 1 + items.length) % items.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index, items.length, onClose, onIndexChange])

  /* Index und Bild als ein Objekt: `item ? …` allein grenzt `index` für den
     Compiler nicht ein, und in den Klick-Handlern wäre er wieder `number |
     null`. */
  const active = index === null ? null : { i: index, item: items[index] }

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.item.label}, ${active.item.finish}`}
          tabIndex={-1}
          initial={reduce ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-200 flex flex-col bg-background/95 backdrop-blur-md outline-none"
          /* Klick auf den Hintergrund schließt, Klick auf Bild oder Knöpfe
             nicht — deshalb die Prüfung auf das Ziel selbst. */
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-sm text-muted-foreground">
              <span className="nums text-foreground">{active.i + 1}</span> von{" "}
              <span className="nums">{items.length}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Ansicht schließen"
              className="flex size-11 items-center justify-center rounded-full border border-input text-foreground transition-colors duration-200 hover:border-brand hover:text-brand focus-ring"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            {/* Wischen blättert. Auf dem Telefon sind die beiden Pfeilknöpfe
                die unwahrscheinlichste Geste — dort erwartet man den Wisch,
                und ohne ihn wirkt die Ansicht klemmig. `dragElastic` gibt
                dem Zug Widerstand, `dragSnapToOrigin` holt das Bild zurück,
                wenn der Schwellwert nicht erreicht wurde. */}
            <motion.div
              key={active.item.src}
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragElastic={0.12}
              dragSnapToOrigin
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70)
                  onIndexChange((active.i + 1) % items.length)
                else if (info.offset.x > 70)
                  onIndexChange((active.i - 1 + items.length) % items.length)
              }}
              className="relative h-full w-full touch-pan-y"
            >
              <Image
                src={active.item.src}
                alt={`${active.item.label}, ${active.item.finish}`}
                fill
                sizes="100vw"
                quality={90}
                className="object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={() =>
                onIndexChange((active.i - 1 + items.length) % items.length)
              }
              aria-label="Vorheriges Bild"
              className="absolute left-2 flex size-11 items-center justify-center rounded-full border border-input bg-background/70 transition-colors duration-200 hover:border-brand hover:text-brand focus-ring sm:left-4"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onIndexChange((active.i + 1) % items.length)}
              aria-label="Nächstes Bild"
              className="absolute right-2 flex size-11 items-center justify-center rounded-full border border-input bg-background/70 transition-colors duration-200 hover:border-brand hover:text-brand focus-ring sm:right-4"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>

          <div className="px-5 py-6 text-center sm:px-8">
            <span className="t-label text-iris block">{active.item.label}</span>
            <p className="mt-2 text-lg font-semibold">{active.item.finish}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
