"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Headline, die zeilenweise aus einer Maske geschoben wird.
 *
 * Was eine Headline teuer aussehen lässt, ist nicht ihre Größe, sondern wie
 * sie ankommt. Ein Block, der einfach eingeblendet wird, wirkt geladen; eine
 * Zeile, die hinter ihrer eigenen Oberkante hervorkommt, wirkt gesetzt.
 *
 * Zwei Dinge, die hier tragen und leicht falsch gemacht werden:
 *
 * - Die Maske ist ein `overflow-hidden`-Wrapper pro Zeile, kein `clip-path`.
 *   `clip-path` animiert nicht auf dem Compositor und stolpert zusätzlich
 *   über jeden 3D-Kontext weiter oben im Baum.
 * - Die Maske braucht Luft nach unten (`pb`), sonst schneidet sie die
 *   Unterlängen von g, j, p, q ab. Bei „Folierung" fällt genau das auf.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <span className={cn("block", className)}>
        {lines.map((line) => (
          <span key={line} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    )
  }

  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      animate="show"
      variants={{
        show: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "108%" },
              show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/**
 * Dieselbe Mechanik, aber ausgelöst beim Scrollen statt beim Laden.
 * Für Kapitel-Headlines unterhalb der Falz.
 */
export function LineRevealInView({
  lines,
  className,
  lineClassName,
  stagger = 0.09,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  stagger?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <span className={cn("block", className)}>
        {lines.map((line) => (
          <span key={line} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    )
  }

  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "108%" },
              show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
