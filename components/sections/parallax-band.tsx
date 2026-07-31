"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/shared/magnetic"
import { LineReveal } from "@/components/shared/line-reveal"

export function ParallaxBand() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  // Bei reduced-motion die Motion-Values auf Ruhewerte klemmen, statt das
  // style-Objekt wegzulassen: `style={undefined}` entfernt eine bereits
  // imperativ geschriebene Transform nicht mehr — das Bild blieb sonst
  // dauerhaft bei translateY(-12%) scale(1.15) hängen, also permanent
  // falsch beschnitten und um 15 % hochskaliert.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"])
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.15, 1.25])

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[60vh] items-center overflow-hidden py-28 lg:min-h-[70vh]"
    >
      {/* MotionConfig greift nicht auf Motion-Values aus useScroll — deshalb
          werden die Werte oben explizit geklemmt statt hier weggelassen. */}
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <Image
          src="/originals/img-18.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background to-transparent" />

      <Container>
        <div className="max-w-2xl">
          <h2 className="t-h2-hero text-balance">
            <LineReveal
              trigger="inView"
              lines={[
                <span key="1">Ein Steinschlag kostet</span>,
                <span key="2" className="text-chrome">
                  400 Euro Lackierer.
                </span>,
                <span key="3">Die Folie davor weniger.</span>,
              ]}
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className="t-lead mt-6 max-w-lg text-foreground/75 text-pretty"
          >
            Ob auffälliges Re-Design oder unsichtbarer Schutz: Wir sagen Ihnen
            vorher, was es kostet und was es bringt. Beratung und Angebot sind
            kostenlos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
            className="mt-8"
          >
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/#kontakt">
                  Lackschutz anfragen
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
