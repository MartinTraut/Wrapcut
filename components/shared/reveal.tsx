"use client"

import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Vier bewusste Bewegungsarten statt einer Monokultur. Kein `filter: blur()` —
 * das erzwingt pro Frame ein Neu-Rastern der gesamten Fläche und war auf
 * Container mit Bildern gelegt. `scale` erzeugt dieselbe Tiefenwirkung,
 * läuft aber vollständig auf dem Compositor.
 */
export const revealVariants = {
  /** Standard: knapper Aufstieg, für Text und Listen. */
  rise: {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
  },
  /** Vorhang: für Bilder und Medien — das Motiv schiebt sich frei. */
  curtain: {
    hidden: { opacity: 1, clipPath: "inset(0 0 100% 0)" },
    show: {
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.55, ease: EASE },
    },
  },
  /** Seitlich: für Blöcke, die gegen die Leserichtung einlaufen. */
  slideX: {
    hidden: { opacity: 0, x: -36 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  },
  /** Heranziehen: für Karten und Kacheln. */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.44, ease: EASE } },
  },
} satisfies Record<string, Variants>

export type RevealVariant = keyof typeof revealVariants

/**
 * Baut die Variante mit eingerechneter Verzögerung.
 *
 * Wichtig: `<motion.div transition={{ delay }}>` wird von Framer ignoriert,
 * sobald die Ziel-Variante eine eigene `transition` mitbringt — die
 * Target-Transition schlägt die Prop. Genau das war hier der Fall: sämtliche
 * `delay`-Angaben im Projekt (about, cta-band, page-hero, hero) liefen ins
 * Leere, alle Blöcke einer Section starteten gleichzeitig. Die Verzögerung
 * muss deshalb in die Variante selbst.
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
  as?: "div" | "section" | "li" | "span" | "figure"
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
  stagger = 0.07,
  ...props
}: React.ComponentProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        show: { transition: { delayChildren: 0.05, staggerChildren: stagger } },
      }}
      {...(props as object)}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  variant = "rise",
  as = "div",
  ...props
}: React.ComponentProps<"div"> & {
  as?: "div" | "li" | "figure"
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
