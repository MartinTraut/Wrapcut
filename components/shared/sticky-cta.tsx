"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { FileText, MessageCircle, Phone } from "lucide-react"

import { site } from "@/lib/site"

/**
 * Handlungsleiste am unteren Rand — nur auf Touch-Größen.
 *
 * Auf dem Telefon ist der Header-CTA nach dem ersten Scroll außer Reichweite
 * des Daumens. Diese Leiste hält Anruf und WhatsApp dauerhaft dort, wo die
 * Hand ohnehin liegt. Sie erscheint bewusst **nicht** sofort: über dem Hero
 * würde sie die eigenen Buttons doppeln. Erst ab einem Bildschirm Scrollweg.
 *
 * `pb-[env(safe-area-inset-bottom)]` ist Pflicht, nicht Kosmetik — ohne das
 * liegt die Leiste auf iPhones unter der Gestenleiste und ist halb blockiert.
 */
export function StickyCta() {
  const [visible, setVisible] = React.useState(false)
  const visibleRef = React.useRef(false)
  const { scrollY } = useScroll()

  /*
   * Schwelle vor dem Setter prüfen, nicht danach.
   *
   * `setVisible(value > 700)` läuft bei jedem Scroll-Tick — 60 bis 120 mal
   * pro Sekunde. React verwirft den identischen Wert zwar, aber der Aufruf
   * plus Scheduler-Durchlauf passiert trotzdem, und das während Lenis
   * ohnehin den Main Thread belegt. Der Ref-Vergleich macht daraus zwei
   * State-Updates pro Seitenbesuch.
   */
  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > 700
    if (next === visibleRef.current) return
    visibleRef.current = next
    setVisible(next)
  })

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: "0%" }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/92 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
        >
          {/*
            Drei Wege, einer primär.
            Vorher standen hier nur Anruf und WhatsApp, der als primär
            gesetzte CTA („Kostenloses Angebot") war auf dem Telefon zwischen
            Hero und Kontaktabschnitt nirgends erreichbar, weil der
            Header-Button unter `sm` ausgeblendet ist. Wer nicht telefonieren
            will, hatte damit auf der halben Seite keinen Weg zur Anfrage.
          */}
          <div className="flex gap-2.5">
            <Link
              href="/#kontakt"
              className="flex h-13 flex-[1.4] items-center justify-center gap-2 rounded-full bg-brand font-semibold text-brand-foreground shadow-[0_0_24px_-8px_var(--brand)] transition-transform duration-200 active:translate-y-px"
            >
              <FileText className="size-4" aria-hidden />
              Angebot
            </Link>
            <a
              href={site.contact.phoneHref}
              className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full border border-input font-semibold text-foreground transition-colors duration-200 active:translate-y-px"
              aria-label={`Anrufen: ${site.contact.phone}`}
            >
              <Phone className="size-4" aria-hidden />
              Anrufen
            </a>
            <a
              href={site.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-13 shrink-0 items-center justify-center rounded-full border border-input text-foreground transition-colors duration-200 active:translate-y-px"
              aria-label="Per WhatsApp schreiben"
            >
              <MessageCircle className="size-4" aria-hidden />
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
