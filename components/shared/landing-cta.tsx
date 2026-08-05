import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

/**
 * Abschluss jeder Unterseite: drei Wege, ein primärer.
 *
 * Auf den Landingpages endet der Text — anders als auf der Startseite steht
 * hier kein Formular darunter. Ohne einen eigenen Abschluss wäre das Ende der
 * Seite das Ende des Wegs. Der Anruf steht gleichrangig neben dem Formular,
 * weil das bei einem Handwerksbetrieb der bevorzugte Kanal ist.
 */
export function LandingCta({ context }: { context?: string }) {
  return (
    <section className="section">
      <Container>
        <div className="ring-iris relative overflow-hidden rounded-3xl bg-surface/50 px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div
            aria-hidden
            className="bg-hex pointer-events-none absolute inset-0 opacity-60"
          />
          <div className="relative max-w-[34rem]">
            <h2 className="font-display text-[clamp(1.8rem,2.4vw+1rem,2.9rem)] leading-[1.08] font-bold tracking-[-0.02em]">
              Angebot{" "}
              <span className="text-iris">kostenlos</span>, Einschätzung ehrlich.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {context
                ? `${context} `
                : "Sagen Sie uns, was Ihnen vorschwebt. "}
              Fotos per WhatsApp genügen für einen belastbaren Preisrahmen, ein
              verbindliches Festpreis-Angebot machen wir, sobald wir das
              Fahrzeug gesehen haben.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/#kontakt">Kostenloses Angebot</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={site.contact.phoneHref}>
                  <Phone />
                  <span className="nums">{site.contact.phone}</span>
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a
                  href={site.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle />
                  WhatsApp
                </a>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              {site.availability} · {site.address.street},{" "}
              {site.address.postalCode} {site.address.city}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
