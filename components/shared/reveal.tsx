"use client"

import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Vier Bewegungsarten statt einer Monokultur.
 *
 * Kein `filter: blur()` — das erzwingt pro Frame ein Neu-Rastern der ganzen
 * Fläche und ist auf Containern mit Bildern die häufigste Ursache für
 * ruckelnde Reveals. `scale` erzeugt dieselbe Tiefenwirkung und läuft
 * vollständig auf dem Compositor.
 */
export const revealVariants = {
  /** Standard: knapper Aufstieg, für Text und Listen. */
  rise: {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  },
  /** Vorhang: für Bilder und Medien — das Motiv schiebt sich frei. */
  curtain: {
    hidden: { opacity: 1, clipPath: "inset(0 0 100% 0)" },
    show: {
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.7, ease: EASE },
    },
  },
  /** Seitlich: für Blöcke, die gegen die Leserichtung einlaufen. */
  slideX: {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  },
  /** Heranziehen: für Karten und Kacheln. */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
  },
} satisfies Record<string, Variants>

export type RevealVariant = keyof typeof revealVariants

/**
 * Baut die Variante mit eingerechneter Verzögerung.
 *
 * Wichtig und leicht zu übersehen: `<motion.div transition={{ delay }}>` wird
 * von Framer ignoriert, sobald die Ziel-Variante eine eigene `transition`
 * mitbringt — die Target-Transition schlägt die Prop. Jede `delay`-Angabe
 * liefe damit ins Leere und alle Blöcke einer Section starteten gleichzeitig.
 * Die Verzögerung muss deshalb in die Variante selbst.
 */
function withDelay(variant: RevealVariant, delay: number): Variants {
  const base = revealVariants[variant]
  if (!delay) return base
  return {
    hidden: base.hidden,
    show: {
      ...base.show,
      transition: { ...(base.show as { transition: object }).transition, delay },
    },
  }
}

type RevealProps = React.ComponentProps<"div"> & {
  delay?: number
  variant?: RevealVariant
  as?: "div" | "section" | "li" | "span" | "figure" | "article"
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
  as = "div",
  ...props
}: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={cn(className)}
      variants={withDelay(variant, delay)}
      initial="hidden"
      whileInView="show"
      // `amount` statt Pixel-Margin: bei sehr hohen Blöcken (Bildspalten,
      // Prozessliste) ist ein Anteil des Elements das robustere Kriterium.
      viewport={{ once: true, amount: 0.15 }}
      {...(props as object)}
    >
      {children}
    </MotionTag>
  )
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
  ...props
}: React.ComponentProps<"div"> & {
  stagger?: number
  as?: "div" | "ul" | "ol"
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        show: { transition: { delayChildren: 0.06, staggerChildren: stagger } },
      }}
      {...(props as object)}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({
  children,
  className,
  variant = "rise",
  as = "div",
  ...props
}: React.ComponentProps<"div"> & {
  as?: "div" | "li" | "figure" | "article"
  variant?: RevealVariant
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={cn(className)}
      variants={revealVariants[variant]}
      {...(props as object)}
    >
      {children}
    </MotionTag>
  )
}
