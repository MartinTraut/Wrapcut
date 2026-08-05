"use client"

import * as React from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"

/** Grundtempo in Prozent der Laufbreite pro Sekunde. */
const BASE_SPEED = 1.8

/** Hält einen Wert im Intervall [min, max) — auch bei negativer Eingabe. */
function wrap(min: number, max: number, value: number) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

/**
 * Laufband, dessen Tempo an der Scrollgeschwindigkeit hängt.
 *
 * Ein Band, das immer gleich schnell läuft, ist Dekoration: es passiert neben
 * dem Nutzer, nicht mit ihm. Hier beschleunigt es beim Scrollen und kehrt die
 * Laufrichtung um, sobald der Nutzer die Richtung wechselt — die Seite
 * reagiert also auf die Hand am Rad. Im Stillstand bleibt ein ruhiges
 * Grundtempo, damit die Zeile nicht einfriert.
 *
 * Warum `useAnimationFrame` statt einer CSS-Keyframe: die Position muss pro
 * Frame aus der aktuellen Geschwindigkeit fortgeschrieben werden. Das geht
 * nur imperativ — aber ausschließlich über eine MotionValue auf `transform`,
 * also ohne React-Re-Render und ohne Layout pro Frame.
 *
 * `children` muss vom Aufrufer **verdoppelt** übergeben werden; der Umlauf
 * springt bei -50 % zurück auf 0 und ist dadurch nahtlos.
 */
export function VelocityMarquee({
  children,
  className,
  baseSpeed = BASE_SPEED,
}: {
  children: React.ReactNode
  className?: string
  baseSpeed?: number
}) {
  const reduce = useReducedMotion()

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  // `clamp: false` ist der Punkt: nur ohne Deckelung wächst der Faktor über
  // schnelles Scrollen hinaus und das Band zieht spürbar an.
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = React.useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * -baseSpeed * (delta / 1000)
    const factor = velocityFactor.get()

    // Richtungswechsel folgt dem Scroll, nicht dem Grundtempo.
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1

    moveBy += moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={"flex overflow-hidden " + (className ?? "")}>
      <motion.div
        className="flex shrink-0 items-center"
        style={reduce ? undefined : { x }}
      >
        {children}
      </motion.div>
    </div>
  )
}
