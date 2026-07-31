"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type SelectorItem = {
  title: string
  tagline: string
  description: string
  benefits: string[]
  image: string
  icon: React.ReactNode
}

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Aufklappende Bild-Panels als echtes Tabs-Pattern (role="tablist" mit
 * Roving Tabindex und Pfeiltasten-Navigation). Der Info-Text steht in einem
 * angeknüpften Panel unter der Bild-Reihe und wechselt per Crossfade.
 *
 * Bewusst kein `willChange` auf den Bildern: fünf dauerhaft promotete
 * Fullsize-Layer im GPU-Speicher kosten mehr, als die Transition spart.
 */
export function InteractiveSelector({ items }: { items: SelectorItem[] }) {
  const [active, setActive] = React.useState(0)
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([])
  const current = items[active]

  function handleKeyDown(event: React.KeyboardEvent) {
    const lastIndex = items.length - 1
    let next: number | null = null

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = active === lastIndex ? 0 : active + 1
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = active === 0 ? lastIndex : active - 1
    } else if (event.key === "Home") {
      next = 0
    } else if (event.key === "End") {
      next = lastIndex
    }

    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabsRef.current[next]?.focus()
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label="Leistungen"
        onKeyDown={handleKeyDown}
        className="flex flex-col gap-2.5 md:h-[440px] md:flex-row"
      >
        {items.map((item, i) => {
          const isActive = active === i
          return (
            <button
              key={item.title}
              ref={(node) => {
                tabsRef.current[i] = node
              }}
              type="button"
              role="tab"
              id={`svc-tab-${i}`}
              aria-selected={isActive}
              aria-controls="svc-panel"
              tabIndex={isActive ? 0 : -1}
              // Bewusst keine Aktivierung per onMouseEnter: der Panelinhalt
              // wechselte beim bloßen Durchqueren mit der Maus und wich damit
              // vom Klick- und Tastaturverhalten ab. Auswahl nur per Klick
              // oder Pfeiltaste.
              onClick={() => setActive(i)}
              className={cn(
                "group/panel relative overflow-hidden  border text-left outline-none transition-[border-color,box-shadow] duration-300 focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive
                  ? "border-signal/50 "
                  : "border-border hover:border-signal",
              )}
              style={{
                flexGrow: isActive ? 7 : 1,
                flexBasis: 0,
                minHeight: isActive ? "20rem" : "5.5rem",
                transition:
                  "flex-grow 0.45s cubic-bezier(0.16,1,0.3,1), min-height 0.45s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.4s ease",
              }}
            >
              <span aria-hidden className="absolute inset-0 block overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  // Nur das aktive Panel braucht die große Variante.
                  sizes={
                    isActive
                      ? "(max-width: 768px) 100vw, 60vw"
                      : "(max-width: 768px) 100vw, 15vw"
                  }
                  className={cn(
                    "object-cover transition-transform duration-500 ease-[var(--ease-premium)]",
                    isActive ? "scale-100" : "scale-[1.12]",
                  )}
                />
              </span>

              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent"
              />
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 bg-background/45 transition-opacity duration-300",
                  isActive ? "opacity-0" : "opacity-100",
                )}
              />

              <span
                className={cn(
                  "nums absolute top-4 right-4 text-xs transition-colors duration-300",
                  isActive ? "text-signal" : "text-foreground/55",
                )}
              >
                0{i + 1}
              </span>

              <span className="absolute inset-x-4 bottom-4 flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center  border backdrop-blur-md transition-colors duration-300",
                    isActive
                      ? "border-signal/50 bg-background/70 text-signal"
                      : "border-white/15 bg-background/60 text-foreground/80",
                  )}
                >
                  {item.icon}
                </span>
                {/* Auf Mobile immer sichtbar — im gestapelten Layout wäre die
                    Leistung sonst hinter einem unbeschrifteten Streifen. */}
                <span
                  className={cn(
                    "truncate text-base font-semibold tracking-tight transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-100 md:opacity-0",
                  )}
                >
                  {item.title}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div
        id="svc-panel"
        role="tabpanel"
        aria-labelledby={`svc-tab-${active}`}
        className="relative overflow-hidden  border border-border bg-transparent"
      >
        <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-signal/70" />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="p-6 sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <span className="text-xs font-medium tracking-wide text-signal uppercase">
                  {current.tagline}
                </span>
                <h3 className="t-h3 mt-1.5">{current.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {current.description}
                </p>
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center  border border-signal/40 bg-background/60 text-signal">
                {current.icon}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {current.benefits.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5  border border-border bg-background/50 px-3 py-1 text-xs text-foreground/85"
                >
                  <Check className="size-3 text-foreground/50" />
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
