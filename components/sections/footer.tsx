import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { InstagramIcon } from "@/components/shared/icons"
import { Logo } from "@/components/shared/logo"
import { Container } from "@/components/shared/container"
import { site, services } from "@/lib/site"
import { locations } from "@/lib/landing"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border pb-24 lg:pb-0">
      <Container width="wide" className="py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Fachbetrieb für Fahrzeugfolierung, Lackschutz, Keramikversiegelung
              &amp; Scheibentönung in Jüchen, für den gesamten Rhein-Kreis
              Neuss.
            </p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="mt-7 inline-flex size-11 items-center justify-center border border-border text-muted-foreground transition-colors duration-200 hover:border-signal hover:text-signal"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>

          <div>
            <h2 className="t-mono text-muted-foreground">
              Leistungen
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/leistungen/${s.slug}`}
                    className="text-sm text-foreground/75 transition-colors hover:text-signal"
                  >
                    {s.name.replace(/­/g, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="t-mono text-muted-foreground">
              Einzugsgebiet
            </h2>
            <ul className="mt-5 space-y-3">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/standorte/${l.slug}`}
                    className="text-sm text-foreground/75 transition-colors hover:text-signal"
                  >
                    Folierung {l.city}
                  </Link>
                </li>
              ))}
              <li className="text-sm text-muted-foreground">
                sowie Willich, Meerbusch, Viersen &amp; Krefeld
              </li>
            </ul>
          </div>

          <div>
            <h2 className="t-mono text-muted-foreground">
              Kontakt
            </h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="flex items-center gap-3 text-foreground/75 transition-colors hover:text-signal"
                >
                  <Phone className="size-4 text-muted-foreground" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="flex items-center gap-3 text-foreground/75 transition-colors hover:text-signal"
                >
                  <Mail className="size-4 text-muted-foreground" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-foreground/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <address className="not-italic">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="t-mono mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-muted-foreground sm:flex-row">
          <p>
            © {year} {site.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/impressum" className="transition-colors hover:text-foreground">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-foreground">
              Datenschutz
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
