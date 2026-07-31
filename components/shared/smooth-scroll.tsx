"use client"

import * as React from "react"
import Lenis from "lenis"

/**
 * Gedämpftes Scrolling. Verändert das Gefühl der gesamten Seite mit einer
 * einzigen Maßnahme und ersetzt `scroll-behavior: smooth` inklusive der harten
 * Anker-Sprünge.
 *
 * Deaktiviert sich vollständig bei prefers-reduced-motion — dann greift wieder
 * das native Scrollverhalten des Browsers.
 */
export function SmoothScroll() {
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (query.matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Anker-Links über Lenis führen, damit sie mitgedämpft werden.
    // Auch "/#kontakt" wird abgefangen, aber nur wenn man bereits auf der
    // Zielseite steht — sonst muss Next normal navigieren.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"], a[href*="#"]',
      ) as HTMLAnchorElement | null
      const href = link?.getAttribute("href")
      if (!href) return

      const [path, id] = href.split("#")
      if (!id) return
      if (path && path !== window.location.pathname) return

      const target = document.getElementById(id)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: -80 })
      history.replaceState(null, "", `#${id}`)

      // preventDefault unterdrückt auch die native Fokusverschiebung. Für
      // Sprungziele mit tabindex (Skip-Link → #main) muss der Fokus mit,
      // sonst tabbt man nach dem Sprung weiter im Header.
      if (target.hasAttribute("tabindex")) {
        target.focus({ preventScroll: true })
      }
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
