"use client"

import * as React from "react"
import Lenis from "lenis"
import { usePathname } from "next/navigation"

/**
 * Lenis als Scroll-Fundament der Seite.
 *
 * Warum überhaupt: sämtliche scroll-gebundene Choreografie (Hero-Parallaxe,
 * gepinnte Leistungskarten, Geschwindigkeits-Laufband) rechnet gegen
 * `scrollY`. Nativer Maus-Scroll springt in 100-px-Stufen — die Animationen
 * ruckeln dann sichtbar, obwohl sie sauber gerechnet sind. Lenis
 * interpoliert dazwischen und macht aus Stufen eine Kurve.
 *
 * Drei Fallen, die hier bewusst behandelt werden:
 *
 * 1. `prefers-reduced-motion` schaltet Lenis komplett ab. Erzwungenes
 *    weiches Scrollen ist genau das, was Betroffene abwählen wollen.
 * 2. Anker-Links (`/#kontakt`) müssen abgefangen werden, sonst springt der
 *    Browser hart und Lenis läuft danach gegen die neue Position an. Der
 *    Fokus wird dabei selbst gesetzt — sonst führt der Sprung visuell zum
 *    Ziel, die Tastatur steht aber weiter oben.
 * 3. Der Abgleich läuft über `requestAnimationFrame`, nicht über ein
 *    Intervall: alles andere driftet gegen die Bildrate.
 */
declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function SmoothScroll() {
  const pathname = usePathname()

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.05,
      // Exponentielles Ausklingen: schnell ansetzen, weich auslaufen.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    /*
     * Die Instanz wird am `window` hinterlegt, damit Overlays den Scroll
     * anhalten können. `overflow: hidden` genügt dafür nicht: Lenis setzt
     * `scrollTop` programmatisch und scrollt auch dann noch weiter. Ohne
     * `lenis.stop()` scrollt die Seite hinter der geöffneten Lightbox mit.
     */
    window.__lenis = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onClick = (event: MouseEvent) => {
      // Modifizierte Klicks gehören dem Browser (neuer Tab, Download …).
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)
        return

      const anchor = (event.target as HTMLElement).closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href) return

      // Nav-Links sind absolut (`/#kontakt`), damit sie auch von Unterseiten
      // funktionieren. Abfangen darf man sie nur auf der Zielseite selbst.
      const hash = href.startsWith("#")
        ? href
        : href.startsWith("/#") && pathname === "/"
          ? href.slice(1)
          : null
      if (!hash || hash === "#") return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()
      // `stopPropagation` zusätzlich zu `preventDefault`: sonst läuft der
      // Klick weiter zum Router-Handler von `next/link`, der ebenfalls zum
      // Hash scrollt — und dann scrollen zwei Systeme gleichzeitig auf
      // dasselbe Ziel, mit unterschiedlichem Offset.
      event.stopPropagation()

      // Die Header-Höhe messen statt konstant 88 anzunehmen: der Header ist
      // 80 px hoch, und bei einem festen Wert landete die Kapitelüberschrift
      // rund 280 px zu tief, also auf Bildschirmmitte, mit dem Ende des
      // Vorkapitels darüber.
      const header = document.querySelector("header")
      const offset = -((header?.getBoundingClientRect().height ?? 80) + 16)
      lenis.scrollTo(target as HTMLElement, { offset })

      const focusable = target as HTMLElement
      if (focusable.tabIndex < 0) focusable.tabIndex = -1
      focusable.focus({ preventScroll: true })
      history.replaceState(null, "", hash)
    }

    /*
     * Capture-Phase, nicht Bubble.
     *
     * React 19 delegiert seine Events an den Root-Container, der *unterhalb*
     * von `document` liegt. In der Bubble-Phase liefe der `onClick` von
     * `next/link` also vor diesem Handler — die Router-Navigation wäre bereits
     * angestoßen, bevor `preventDefault()` überhaupt ausgeführt wird. In der
     * Capture-Phase kommt dieser Handler zuerst.
     */
    document.addEventListener("click", onClick, true)
    return () => {
      document.removeEventListener("click", onClick, true)
      cancelAnimationFrame(frame)
      lenis.destroy()
      delete window.__lenis
    }
  }, [pathname])

  return null
}
