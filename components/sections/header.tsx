"use client"

import * as React from "react"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion"
import { Menu, Phone, X } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Logo } from "@/components/shared/logo"
import { Magnetic } from "@/components/shared/magnetic"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Header über die volle Seitenbreite, der beim Scrollen Untergrund bekommt.
 *
 * Er ändert **nicht** seine Höhe und schrumpft nicht — beides erzeugt beim
 * Scrollen einen Sprung im Layout und lässt die Navigation unter dem Zeiger
 * wegrutschen. Was sich ändert, ist ausschließlich der Untergrund: über dem
 * Hero steht er frei auf dem Foto, ab 24 px Scrollweg legt sich eine
 * abgedunkelte, unscharfe Fläche mit Unterkante darunter.
 *
 * `useScroll` + `useMotionValueEvent` statt eines eigenen Scroll-Listeners:
 * ein `window.addEventListener("scroll")` feuert ungedrosselt auf dem
 * Hauptthread und ist neben Lenis die zuverlässigste Ruckelquelle.
 */
export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const scrolledRef = React.useRef(false)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const burgerRef = React.useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  // Schwelle vor dem Setter: sonst läuft `setScrolled` bei jedem Scroll-Tick,
  // 60–120 mal pro Sekunde, obwohl sich der Boolean zweimal pro Besuch ändert.
  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > 24
    if (next === scrolledRef.current) return
    scrolledRef.current = next
    setScrolled(next)
  })

  // Menü offen = Seite darunter darf nicht mitscrollen. Der Lock muss auf
  // <html>, nicht auf <body>: Lenis scrollt das Wurzelelement, ein
  // `body { overflow: hidden }` greift nicht.
  React.useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [open])

  /*
   * Der Hintergrund verschwindet nicht nur optisch, sondern auch für
   * Tastatur und Screenreader.
   *
   * Ohne `inert` läuft der Tab-Fokus nach dem letzten Menüeintrag in die
   * verdeckte Seite weiter — der Nutzer bedient dann unsichtbare Elemente —
   * und Screenreader lesen den kompletten Seiteninhalt hinter dem Overlay
   * mit. `inert` erledigt beides in einem Attribut, inklusive Klick-Sperre.
   */
  React.useEffect(() => {
    const main = document.getElementById("main")
    const footer = document.querySelector("footer")
    for (const el of [main, footer]) {
      if (!el) continue
      if (open) el.setAttribute("inert", "")
      else el.removeAttribute("inert")
    }
    return () => {
      main?.removeAttribute("inert")
      footer?.removeAttribute("inert")
    }
  }, [open])

  /*
   * Fokus hinein, Fokus zurück, Fokus gefangen.
   *
   * Beim Öffnen springt der Fokus auf das erste Menüelement — sonst steht er
   * weiter auf dem Burger und der Nutzer muss sich blind durchtabben. Beim
   * Schließen geht er an den Burger zurück, nicht an eine beliebige Stelle
   * der Seite. Und solange das Menü offen ist, hält Tab ihn im Panel.
   */
  React.useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )

    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        burgerRef.current?.focus()
        return
      }
      if (e.key !== "Tab") return

      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || !panel?.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const closeMenu = React.useCallback(() => {
    setOpen(false)
    burgerRef.current?.focus()
  }, [])

  return (
    <>
      <header
        className={
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[420ms] ease-[var(--ease-premium)] " +
          (scrolled || open
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent")
        }
      >
        <Container className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="rounded-lg focus-ring"
          >
            <Logo />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    // Der Unterstrich wächst aus der Mitte statt einzublenden:
                    // eine Bewegung liest sich als Reaktion, ein Farbwechsel
                    // nur als Zustand.
                    className="group/nav relative rounded-lg px-4 py-2 text-[0.95rem] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-ring"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="bg-iris absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 transition-transform duration-[280ms] ease-[var(--ease-premium)] group-hover/nav:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.contact.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.95rem] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-ring xl:inline-flex"
            >
              <Phone className="size-4" aria-hidden />
              <span className="nums">{site.contact.phone}</span>
            </a>

            <Magnetic className="hidden sm:inline-block">
              <Button asChild>
                <Link href="/#kontakt">Kostenloses Angebot</Link>
              </Button>
            </Magnetic>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-input text-foreground transition-colors duration-200 hover:border-brand/70 focus-ring lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed inset-0 z-40 bg-background/97 pt-20 backdrop-blur-2xl lg:hidden"
          >
            <div
              aria-hidden
              className="bg-hex pointer-events-none absolute inset-0 opacity-60"
            />
            <Container className="relative flex h-full flex-col justify-between pt-10 pb-12">
              <motion.ul
                initial={reduce ? false : "hidden"}
                animate="show"
                variants={{
                  show: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
                }}
                className="flex flex-col"
              >
                {site.nav.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
                    }}
                    className="border-b border-border"
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block py-5 font-display text-3xl font-bold tracking-[-0.03em] transition-colors duration-200 hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="w-full">
                  <Link href="/#kontakt" onClick={closeMenu}>
                    Kostenloses Angebot
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={site.contact.phoneHref}>
                    <Phone />
                    <span className="nums">{site.contact.phone}</span>
                  </a>
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
