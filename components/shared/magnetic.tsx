"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

/**
 * Magnetischer Wrapper: das Element folgt dem Cursor leicht, solange er in
 * Reichweite ist. Dezent gehalten (Standard-Stärke 0.25) — der Effekt soll
 * spürbar sein, nicht albern.
 *
 * Nur auf Zeigegeräten aktiv; auf Touch und bei prefers-reduced-motion
 * verhält sich die Komponente wie ein normales span.
 */
export function Magnetic({
  children,
  strength = 0.25,
  radius = 90,
  className,
}: {
  children: React.ReactNode
  strength?: number
  radius?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 })

  const handleMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const distance = Math.hypot(dx, dy)
    if (distance > radius + Math.max(rect.width, rect.height) / 2) return
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.span>
  )
}
