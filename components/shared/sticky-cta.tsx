"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import { site } from "@/lib/site"

/**
 * Persistenter Handlungspfad auf Mobile. Für einen Handwerksbetrieb ist das
 * Telefon der Conversion-Kanal — ohne diese Leiste gibt es ab dem Hero bis zur
 * Kontakt-Section keinen sichtbaren Weg dorthin.
 *
 * Erscheint, sobald der Hero verlassen wurde, und verschwindet wieder, sobald
 * die Kontakt-Section sichtbar ist (dort stehen dieselben Ziele bereits).
 */
export function StickyCta() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const hero = document.querySelector("section")
    const contact = document.getElementById("kontakt")
    if (!hero) return

    let pastHero = false
    let atContact = false
    const sync = () => setVisible(pastHero && !atContact)

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting
        sync()
      },
      { rootMargin: "-40% 0px 0px 0px" },
    )
    heroObserver.observe(hero)

    const contactObserver = contact
      ? new IntersectionObserver(
          ([entry]) => {
            atContact = entry.isIntersecting
            sync()
          },
          { rootMargin: "0px 0px -20% 0px" },
        )
      : null
    if (contact && contactObserver) contactObserver.observe(contact)

    return () => {
      heroObserver.disconnect()
      contactObserver?.disconnect()
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden"
        >
          <div className="grid grid-cols-2 gap-2 p-2">
            <a
              href={site.contact.phoneHref}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary text-xs font-semibold tracking-[0.06em] uppercase text-primary-foreground transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Phone className="size-4" />
              Anrufen
            </a>
            <a
              href={site.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-input bg-background text-xs font-semibold tracking-[0.06em] uppercase transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
