"use client"

import * as React from "react"
import { useInView, animate } from "framer-motion"

/**
 * Zählt eine Zahl beim Sichtbarwerden hoch. Nicht-numerische Werte
 * (z. B. "Zertifiziert") werden unverändert eingeblendet.
 */
export function CountUp({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const match = value.match(/^(\D*)([\d.,]+)(.*)$/)
  const prefix = match?.[1] ?? ""
  const numRaw = match?.[2] ?? ""
  const suffix = match?.[3] ?? ""
  const decimals = numRaw.includes(",") ? 1 : 0
  const target = numRaw ? parseFloat(numRaw.replace(",", ".")) : NaN

  const [display, setDisplay] = React.useState(
    Number.isNaN(target) ? value : `${prefix}0${suffix}`
  )

  React.useEffect(() => {
    if (!inView || Number.isNaN(target)) return
    const controls = animate(0, target, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const formatted = v
          .toFixed(decimals)
          .replace(".", ",")
        setDisplay(`${prefix}${formatted}${suffix}`)
      },
    })
    return () => controls.stop()
  }, [inView, target, decimals, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
