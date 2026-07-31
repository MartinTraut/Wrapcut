"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { Tilt } from "@/components/shared/tilt"
import { processSteps } from "@/lib/site"

export function Process() {
  const listRef = React.useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()

  // Die Verbindungslinie wächst mit dem Scrollfortschritt der Liste mit —
  // aus einer statischen Aufzählung wird eine geführte Sequenz.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  })
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  })

  return (
    <section
      id="ablauf"
      className="section relative scroll-mt-20 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-card/30 via-transparent to-transparent"
      />
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow index="04">So arbeiten wir</Eyebrow>
          <h2 className="t-h2 mt-7 text-balance">
            Präzision ist
            <span className="text-muted-foreground block">kein Zufall.</span>
          </h2>
          <p className="t-lead mt-6 max-w-md text-muted-foreground text-pretty">
            Ein klar geführter Ablauf, von der ehrlichen Beratung bis zur
            kompromisslosen Endkontrolle. Qualität entsteht in der Vorbereitung,
            nicht in der Eile.
          </p>
          <Tilt max={4} className="mt-10 hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden border border-border">
              <Image
                src="/originals/img-20.jpeg"
                alt="Präzise Folienverlegung in der WrapCut-Werkstatt"
                fill
                sizes="(min-width: 1024px) 40vw, 1px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </Tilt>
        </Reveal>

        <RevealGroup className="relative">
          {/* Ruhende Spur … */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.45rem] w-px bg-border"
          />
          {/* … und der mitwachsende Fortschritt darüber. */}
          <motion.div
            aria-hidden
            style={{
              scaleY: reduce ? 1 : lineScale,
              transformOrigin: "top",
            }}
            className="absolute top-2 bottom-2 left-[1.45rem] w-px bg-gradient-to-b from-signal via-signal/70 to-signal/20"
          />
          <ol ref={listRef} className="space-y-9">
            {processSteps.map((step) => (
              <RevealItem as="li" key={step.step} className="relative flex gap-6">
                <div className="t-mono-sm nums relative z-10 flex size-12 shrink-0 items-center justify-center border border-border bg-background font-medium text-muted-foreground">
                  {step.step}
                </div>
                <div className="pt-2">
                  <h3 className="t-h3">{step.title}</h3>
                  <p className="mt-2.5 max-w-lg leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </Container>
    </section>
  )
}
