"use client"

import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

/**
 * Magnetischer Anzieheffekt für primäre Bedienelemente.
 *
 * Das Element folgt dem Zeiger leicht, solange er darüber steht, und federt
 * beim Verlassen zurück. Der Effekt macht einen Button spürbar „greifbar" —
 * aber nur, wenn er dezent bleibt: 0.28 Faktor, gedeckelt auf 12 px. Alles
 * darüber sieht nach Spielerei aus und trifft den Klickpunkt nicht mehr.
 *
 * Drei bewusste Entscheidungen:
 *
 * - **Kein `useState`.** Zeigerposition ist ein kontinuierlicher Wert; über
 *   State würde bei jeder Mausbewegung der React-Baum neu gerendert. Über
 *   MotionValues läuft das komplett außerhalb von React.
 * - **Nur bei echtem Hover** (`@media (hover: hover)` über `matchMedia`).
 *   Auf Touch gibt es keinen Zeiger; dort würde der Effekt beim Tippen
 *   einmal zucken und das Ziel verschieben.
 * - **`prefers-reduced-motion` schaltet ihn ganz ab**, nicht nur langsamer.
 */
/**
 * Media-Query als externe Datenquelle statt als Effekt-State.
 *
 * Die naheliegende Variante — `useEffect` plus `setState` — löst nach dem
 * ersten Render eine zweite Renderrunde aus und wird von den React-Regeln zu
 * Recht beanstandet. `useSyncExternalStore` liest den Wert direkt beim
 * Rendern, abonniert Änderungen und liefert für Server-Rendering einen
 * eigenen Rückfallwert: auf dem Server gibt es keinen Zeiger, also `false`.
 */
function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    [query],
  )

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export function Magnetic({
  children,
  strength = 0.28,
  max = 12,
  className,
}: {
  children: React.ReactNode
  strength?: number
  max?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const canHover = useMediaQuery("(hover: hover)")

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 })

  const active = canHover && !reduce

  const onMove = (event: React.MouseEvent) => {
    if (!active || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    x.set(Math.max(-max, Math.min(max, dx * strength)))
    y.set(Math.max(-max, Math.min(max, dy * strength)))
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={active ? { x: springX, y: springY } : undefined}
      className={className}
    >
      {children}
    </motion.span>
  )
}
