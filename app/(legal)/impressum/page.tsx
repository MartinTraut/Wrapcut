import type { Metadata } from "next"
import { site } from "@/lib/site"
import { BreadcrumbJsonLd } from "@/components/shared/json-ld"

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${site.name}, Fahrzeugfolierung & Lackschutz in Jüchen.`,
  // Ohne eigenes canonical schlägt das Root-Metadata durch und zeigt auf die
  // Startseite — ein widersprüchliches Signal zu noindex.
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
}

export default function ImpressumPage() {
  return (
    <article className="space-y-8">
      <BreadcrumbJsonLd items={[{ name: "Impressum", path: "/impressum" }]} />
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight">Impressum</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
        </p>
      </header>

      <Block title="Diensteanbieter">
        {/* TODO: Vollständige rechtliche Angaben ergänzen */}
        <p>
          {site.legalName}
          <br />
          TODO: Inhaber / vertretungsberechtigte Person
          <br />
          {site.address.street}
          <br />
          {site.address.postalCode} {site.address.city}
          <br />
          {site.address.countryName}
        </p>
      </Block>

      <Block title="Kontakt">
        <p>
          Telefon: {site.contact.phone}
          <br />
          E-Mail: {site.contact.email}
        </p>
      </Block>

      <Block title="Umsatzsteuer-ID">
        <p>
          {/* TODO: USt-IdNr. nach § 27 a UStG ergänzen, falls vorhanden */}
          TODO: Umsatzsteuer-Identifikationsnummer
        </p>
      </Block>

      <Block title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          {/* TODO: Name & Anschrift des Verantwortlichen */}
          TODO: Name, {site.address.postalCode} {site.address.city}
        </p>
      </Block>

      <Block title="Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            className="text-signal underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </Block>

      <p className="border-t border-border pt-6 text-xs text-muted-foreground">
        Hinweis: Dieses Impressum enthält Platzhalter (TODO), die vor
        Veröffentlichung mit den echten rechtlichen Angaben zu befüllen sind.
      </p>
    </article>
  )
}

function Block({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      <div className="leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}
