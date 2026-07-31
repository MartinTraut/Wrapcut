"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import { RevealItem } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"
import type { GalleryItem } from "@/lib/site"

type GalleryLightboxProps = {
  items: GalleryItem[]
}

const subscribe = () => () => {}

export function GalleryLightbox({ items }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  // Client-Erkennung ohne setState-im-Effect: spart die Kaskaden-Renderrunde
  // bei jedem Seitenaufruf und erfüllt react-hooks/set-state-in-effect.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  const isOpen = activeIndex !== null

  const open = useCallback((index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null
    setActiveIndex(index)
  }, [])

  const close = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % items.length
    )
  }, [items.length])

  const goPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? current
        : (current - 1 + items.length) % items.length
    )
  }, [items.length])

  // Lock body scroll, move focus to close button, restore on close.
  useEffect(() => {
    if (!isOpen) return

    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus()
    }, 0)

    // Rest der Seite für Screenreader und Tastatur stilllegen.
    const main = document.getElementById("main")
    main?.setAttribute("inert", "")

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        close()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        goNext()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        goPrev()
      } else if (event.key === "Tab") {
        // Fokus zyklisch im Dialog halten.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = overflow
      main?.removeAttribute("inert")
      lastFocusedRef.current?.focus?.()
    }
  }, [isOpen, close, goNext, goPrev])

  const active = activeIndex !== null ? items[activeIndex] : null

  return (
    <>
      {items.map((item, index) => (
        <RevealItem
          key={item.src}
          variant="curtain"
          className={cn(
            "relative overflow-hidden border border-border",
            // Basisraster für Mobile: zwei Kacheln pro Zeile. Die Spans in
            // lib/site.ts sind für das sechsspaltige Desktop-Bento geschrieben
            // und deshalb `sm:`-gebunden — ungefiltert erzeugten sie im
            // vierspaltigen Mobilraster implizite Spalten und Kacheln von
            // real 10 px Breite.
            "col-span-2 row-span-2",
            // Die beiden Leitmotive bekommen auch auf Mobile mehr Fläche.
            (index === 0 || index === 4) && "max-sm:col-span-4 max-sm:row-span-3",
            item.span,
          )}
        >
          <motion.button
            type="button"
            layoutId={`gallery-${item.src}`}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => open(index)}
            aria-label={`Bild vergrößern: ${item.label}, ${item.finish}`}
            className="group absolute inset-0 block w-full cursor-pointer text-left transition-colors duration-300 ease-[var(--ease-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60 focus-visible:ring-inset"
          >
            <Image
              src={item.src}
              alt={`WrapCut ${item.label}, ${item.finish}`}
              fill
              sizes="(max-width: 640px) 50vw, 30vw"
              className="object-cover transition-[transform,filter] duration-[280ms] ease-[var(--ease-premium)] group-hover:scale-[1.06] group-hover:brightness-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />

            <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground opacity-0 backdrop-blur transition-all duration-300 ease-[var(--ease-premium)] group-hover:opacity-100 group-hover:border-signal group-hover:text-signal">
              <Expand className="size-4" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
              <div className="text-sm font-semibold text-foreground">
                {item.label}
              </div>
              <div className="hidden text-xs text-muted-foreground sm:block">
                {item.finish}
              </div>
            </div>
          </motion.button>
        </RevealItem>
      ))}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && active && (
              <motion.div
                key="lightbox"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={`${active.label}, ${active.finish}`}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={close}
              >
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Galerie schließen"
                  className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur transition-colors duration-300 ease-[var(--ease-premium)] hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60 sm:right-8 sm:top-8"
                >
                  <X className="size-5" />
                </button>

                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        goPrev()
                      }}
                      aria-label="Vorheriges Bild"
                      className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur transition-colors duration-300 ease-[var(--ease-premium)] hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60 sm:left-8"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        goNext()
                      }}
                      aria-label="Nächstes Bild"
                      className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur transition-colors duration-300 ease-[var(--ease-premium)] hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60 sm:right-8"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </>
                )}

                <motion.figure
                  key={active.src}
                  className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(event) => event.stopPropagation()}
                >
                  {/* layoutId verbindet Kachel und Großansicht: das Bild
                      wächst aus der angeklickten Kachel heraus, statt als
                      unverbundener Fade zu erscheinen. */}
                  <motion.div
                    layoutId={`gallery-${active.src}`}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full overflow-hidden border border-border"
                  >
                    <Image
                      src={active.src}
                      alt={`WrapCut ${active.label}, ${active.finish}`}
                      width={1600}
                      height={1067}
                      sizes="(max-width: 1024px) 92vw, 1024px"
                      className="max-h-[85vh] w-full object-contain"
                    />
                  </motion.div>
                  <figcaption className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
                    <span className="text-base font-semibold text-foreground">
                      {active.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {active.finish}
                    </span>
                    {items.length > 1 && (
                      <span className="text-xs text-muted-foreground/70">
                        {(activeIndex ?? 0) + 1} / {items.length}
                      </span>
                    )}
                  </figcaption>
                </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
