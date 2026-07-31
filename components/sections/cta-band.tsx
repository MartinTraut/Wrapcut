import Link from "next/link"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { Magnetic } from "@/components/shared/magnetic"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

/**
 * Abschluss jeder Landingpage. Die Unterseiten tragen kein eigenes Formular —
 * es gibt genau eines, auf der Startseite, damit Anfragen nicht über mehrere
 * Wege mit unterschiedlichem Kontext hereinkommen.
 */
export function CtaBand({
  headline,
  text,
  service,
}: {
  headline: string
  text: string
  /**
   * Leistung, aus der heraus der Nutzer kommt. Wird als Query-Parameter an
   * `/#kontakt` gehängt und dort im Formular vorausgewählt — sonst muss man
   * die Leistung, die man gerade gelesen hat, erneut aussuchen.
   */
  service?: string
}) {
  const kontaktHref = service
    ? `/?leistung=${encodeURIComponent(service)}#kontakt`
    : "/#kontakt"
  return (
    <section className="section-tight relative overflow-hidden border-y border-border">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_100%_at_75%_50%,#000,transparent_75%)]"
      />
      <Container width="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
          <Reveal>
            <h2 className="t-h2 text-balance">{headline}</h2>
            <p className="t-lead mt-6 max-w-xl text-muted-foreground text-pretty">
              {text}
            </p>
            <p className="t-mono-sm nums mt-7 text-muted-foreground">
              <span className="font-semibold text-signal">
                {String(site.reviews.rating).replace(".", ",")} von 5
              </span>{" "}
              bei {site.reviews.count} Google-Bewertungen · {site.availability}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-3">
            <Magnetic className="w-full">
              <Button asChild size="lg" className="w-full">
                <Link href={kontaktHref}>
                  Angebot anfragen
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild variant="outline" size="lg">
                <a href={site.contact.phoneHref}>
                  <Phone />
                  Anrufen
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
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
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
