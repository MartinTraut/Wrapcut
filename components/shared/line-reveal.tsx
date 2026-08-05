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
  /* `ReactNode`, nicht `string`: sonst lässt sich in einer animierten Headline
     kein einzelnes Wort auszeichnen — genau das war in der Hero der Fall, wo
     das farbige „Folie" nur in der Reduced-Motion-Variante existierte. */
  lines: React.ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <span className={cn("block", className)}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
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
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              /* Die Zeile kommt nicht nur hoch, sie kommt leicht schräg und
                 von rechts unten — eine reine Vertikale liest sich wie ein
                 Textmarker, die Kombination wie gesetzt. Alles auf
                 `transform`, also compositor-seitig. */
              hidden: { y: "112%", x: "2.5%", skewY: 2.5 },
              show: {
                y: "0%",
                x: "0%",
                skewY: 0,
                transition: { duration: 0.9, ease: EASE },
              },
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
  lines: React.ReactNode[]
  className?: string
  lineClassName?: string
  stagger?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <span className={cn("block", className)}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
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
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "110%", skewY: 2 },
              show: {
                y: "0%",
                skewY: 0,
                transition: { duration: 0.8, ease: EASE },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
