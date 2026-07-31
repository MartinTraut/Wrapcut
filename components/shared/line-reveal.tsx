"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Zeilen-Masking für Headlines: jede Zeile sitzt in einem overflow-hidden-
 * Rahmen und schiebt sich von unten herein. Der Effekt, der eine Headline
 * teuer aussehen lässt — und rein auf transform läuft.
 *
 * Der Text wird als Array von Zeilen übergeben, damit die Umbrüche bewusst
 * gesetzt sind statt vom Viewport abzuhängen.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.06,
  trigger = "mount",
}: {
  lines: React.ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  /** "mount" für den Hero, "inView" für Sections weiter unten. */
  trigger?: "mount" | "inView"
}) {
  const animateProps =
    trigger === "mount"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.25 },
        }

  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      {...animateProps}
      variants={{
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "108%" },
              show: { y: "0%", transition: { duration: 0.44, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
