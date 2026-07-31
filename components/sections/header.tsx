"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/shared/logo"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const panelRef = React.useRef<HTMLDivElement>(null)
  const toggleRef = React.useRef<HTMLButtonElement>(null)

  // Scroll-Lock auf <html>, nicht auf <body>: Lenis scrollt das
  // Wurzelelement, ein overflow:hidden auf body greift deshalb nicht — die
  // Seite lief bei offenem Menü dahinter weiter.
  React.useEffect(() => {
    const root = document.documentElement
    if (open) {
      root.style.overflow = "hidden"
    } else {
      root.style.overflow = ""
    }
    return () => {
      root.style.overflow = ""
    }
  }, [open])

  // Escape schließt, Fokus wandert ins Panel, wird darin zyklisch gehalten
  // und danach zurück auf den Burger gegeben.
  React.useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== "Tab") return

      // Fokusfalle: ohne sie tabbt man aus dem Panel heraus in die Seite
      // dahinter, die dann teilweise verdeckt ist.
      const panel = panelRef.current
      if (!panel) return
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null)
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const activeInPanel = panel.contains(document.activeElement)

      if (!activeInPanel) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    }

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus()
    }, 0)

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <header
      className={cn(
        // Nur Farben interpolieren. `transition-all` fuhr auch den
        // backdrop-filter von none auf blur(24px) hoch — ein Voll-Breite-Blur
        // über 300 ms ist auf schwacher Hardware der sichtbarste Ruckler der
        // Seite. Der Blur steht jetzt dauerhaft, nur die Fläche blendet auf.
        "fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-[background-color,border-color] duration-[220ms] ease-[var(--ease-premium)]",
        scrolled
          ? "border-b border-border bg-background/85"
          : "border-b border-transparent bg-background/0"
      )}
    >
      <Container width="wide" className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Logo />

        {/* Navigation im Meta-Register: derselbe Monospace wie Sektionsmarken
            und Maße. Der Header gehört damit sichtbar zur Ordnungsebene der
            Seite, nicht zum Inhalt. */}
        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-7 lg:flex xl:gap-10"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="t-mono group relative py-1 text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {item.label}
              {/* scaleX statt width: die Breiten-Animation kostete 223 Layouts
                  pro Hover-Durchlauf in einem fixierten Header. Der Strich
                  läuft links herein und rechts wieder heraus. */}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-signal transition-transform duration-[280ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.contact.phoneHref}
            className="t-mono-sm inline-flex items-center gap-2 whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="size-3.5 text-signal" />
            {site.contact.phone}
          </a>
          <Button asChild>
            <Link href="/#kontakt">Termin anfragen</Link>
          </Button>
        </div>

        {/* Unter lg zusätzlich ein direkter Anruf-Button neben dem Burger —
            sonst ist die Nummer auf Mobile zwei Taps entfernt. */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={site.contact.phoneHref}
            aria-label={`Anrufen: ${site.contact.phone}`}
            className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:text-signal focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Phone className="size-5" />
          </a>
          <button
            ref={toggleRef}
            className="-mr-1.5 inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:text-signal focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border bg-background/97 backdrop-blur-xl lg:hidden"
          >
            <Container className="py-4">
              <nav
                aria-label="Hauptnavigation (mobil)"
                className="flex flex-col"
              >
              {site.nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-border py-4 text-2xl font-semibold tracking-[-0.03em] text-foreground/90 transition-colors hover:text-signal"
                >
                  <span className="t-mono nums text-muted-foreground" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={site.contact.phoneHref}
                  className="t-mono-sm inline-flex items-center gap-2 text-muted-foreground"
                >
                  <Phone className="size-4 text-signal" />
                  {site.contact.phone}
                </a>
                <Button asChild size="lg">
                  <Link href="/#kontakt" onClick={() => setOpen(false)}>
                    Termin anfragen
                  </Link>
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
