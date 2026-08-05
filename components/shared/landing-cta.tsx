import Image from "next/image"
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
        {/*
          Zweispaltig ab `lg`, weil der Block sonst zu zwei Dritteln leer steht:
          Der Text bindet rund 34 rem, das Panel ist über 70 rem breit. Statt
          die Fläche zu verkleinern, trägt die rechte Hälfte jetzt ein Foto —
          der Abschluss jeder Unterseite zeigt damit noch einmal das Ergebnis,
          über das gerade gelesen wurde.
        */}
        <div className="ring-iris relative isolate overflow-hidden rounded-3xl bg-surface lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:items-stretch">
          <div
            aria-hidden
            className="bg-hex pointer-events-none absolute inset-0 -z-10 opacity-60"
          />
          <div className="relative max-w-[34rem] px-7 py-12 sm:px-12 lg:py-16 lg:pl-14">
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

          {/* Das Foto läuft bis an die Panelkante und wird nach links hin
              ausgeblendet, damit es als Fläche des Blocks liest und nicht als
              eingeklebte Kachel. Rein dekorativ, deshalb leerer Alt-Text. */}
          <div className="relative hidden min-h-[24rem] lg:block">
            <Image
              src="/originals/img-17.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="img-punch object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-r from-surface via-surface/55 via-38% to-transparent"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
