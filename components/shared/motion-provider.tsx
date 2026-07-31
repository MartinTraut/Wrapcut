"use client"

import { MotionConfig } from "framer-motion"

/**
 * Lässt alle Framer-Motion-Animationen die System-Einstellung
 * „prefers-reduced-motion" respektieren (a11y: reduced-motion).
 * Ergänzt die rein CSS-basierte Regel in globals.css für JS-Animationen.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
