import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { InstagramIcon } from "@/components/shared/icons"

import { Container } from "@/components/shared/container"
import { Logo } from "@/components/shared/logo"
import { locations } from "@/lib/landing"
import { site, services } from "@/lib/site"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border">
      <div
        aria-hidden
        className="bg-hex pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]"
      />

      <Container className="relative pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo className="w-[11rem]" />
            <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground text-pretty">
              {site.tagline}, Fahrzeugfolierung, Lackschutz und Scheibentönung
              aus {site.address.city}, für den ganzen Rhein-Kreis Neuss.
            </p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-input px-5 py-2.5 text-sm transition-colors duration-200 hover:border-brand/70 hover:text-brand focus-ring"
            >
              <InstagramIcon className="size-4" />
              {site.social.instagramHandle}
            </a>
          </div>

          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2 id="footer-services" className="t-label text-muted-foreground">
              Leistungen
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {services.map((service) => (
                <li key={service.slug}>
                  {/* `py-2` ist hier kein Abstand, sondern Trefferfläche: die
                      Zeilen waren 21 px hoch und damit deutlich unter den
                      44 px, die auf Touch erreichbar sind. */}
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="-my-2 inline-flex min-h-11 items-center py-2 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-ring"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="t-label text-muted-foreground">Kontakt</h2>
            {/* `not-italic` weil <address> per Browser-Default kursiv steht —
                ein kursiver Adressblock liest sich wie ein Zitat. */}
            <address className="mt-6 flex flex-col gap-4 not-italic">
              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-1 flex min-h-11 items-start gap-3 py-1 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-ring"
              >
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </span>
              </a>
              <a
                href={site.contact.phoneHref}
                className="-my-1 flex min-h-11 items-center gap-3 py-1 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-ring"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                <span className="nums">{site.contact.phone}</span>
              </a>
              <a
                href={site.contact.emailHref}
                className="-my-1 flex min-h-11 items-center gap-3 py-1 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-ring"
              >
                <Mail className="size-4 shrink-0" aria-hidden />
                {site.contact.email}
              </a>
            </address>
            <p className="mt-5 text-sm text-muted-foreground">
              {site.availability}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="t-label text-muted-foreground">Rechtliches</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              <li>
                <Link
                  href="/impressum"
                  className="-my-2 inline-flex min-h-11 items-center py-2 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-ring"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="-my-2 inline-flex min-h-11 items-center py-2 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-ring"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Einzugsgebiet: die sechs Städte mit eigener Seite werden verlinkt,
            der Rest bleibt Text. Ein Link auf eine nicht existierende Seite
            wäre schlechter als eine schlichte Nennung und die sechs echten
            Links sind bei einem lokalen Betrieb das wirksamste interne
            Ranking-Signal, das ohne Backlinks zu bekommen ist. */}
        <nav
          aria-label="Einzugsgebiet"
          className="mt-14 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground"
        >
          <p>
            Wir arbeiten für Kunden aus{" "}
            {site.serviceArea.map((city, i) => {
              const location = locations.find((l) => l.city === city)
              const separator =
                i === site.serviceArea.length - 1
                  ? "."
                  : i === site.serviceArea.length - 2
                    ? " und "
                    : ", "

              return (
                <span key={city}>
                  {location ? (
                    <Link
                      href={`/standorte/${location.slug}`}
                      className="-my-1 inline-flex min-h-11 items-center py-1 text-foreground/85 underline underline-offset-4 transition-colors duration-200 hover:text-brand focus-ring"
                    >
                      {city}
                    </Link>
                  ) : (
                    city
                  )}
                  {separator}
                </span>
              )
            })}
          </p>
        </nav>

        <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="nums">
            © {year} {site.name}. Alle Rechte vorbehalten.
          </p>
          <p>{site.businessName}</p>
        </div>
      </Container>
    </footer>
  )
}
