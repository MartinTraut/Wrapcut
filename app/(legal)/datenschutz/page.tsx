import type { Metadata } from "next"
import { site } from "@/lib/site"
import { BreadcrumbJsonLd } from "@/components/shared/json-ld"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${site.name}, Fahrzeugfolierung in Jüchen.`,
  // Siehe Impressum: sonst erbt die Seite den Canonical der Startseite.
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
}

export default function DatenschutzPage() {
  return (
    <article className="space-y-8">
      <BreadcrumbJsonLd items={[{ name: "Datenschutz", path: "/datenschutz" }]} />
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Datenschutz­erklärung
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Stand: Juni 2026 · Informationen gemäß Art. 13 DSGVO
        </p>
      </header>

      <p className="leading-relaxed text-muted-foreground">
        Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend
        informieren wir Sie über die Verarbeitung Ihrer Daten beim Besuch dieser
        Website und bei der Kontaktaufnahme.
      </p>

      <Block title="1. Verantwortlicher">
        <p>
          {site.legalName}
          {/* TODO: vollständige Verantwortlichen-Angaben ergänzen */}
          <br />
          {site.address.postalCode} {site.address.city}
          <br />
          E-Mail: {site.contact.email} · Telefon: {site.contact.phone}
        </p>
      </Block>

      <Block title="2. Hosting">
        <p>
          {/* TODO: Hosting-Anbieter konkretisieren (z. B. Vercel Inc.) */}
          Diese Website wird bei einem externen Dienstleister gehostet. Beim
          Aufruf werden serverseitig technisch notwendige Zugriffsdaten
          (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Seite) verarbeitet.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an sicherer Bereitstellung).
        </p>
      </Block>

      <Block title="3. Kontaktaufnahme & Anfrageformular">
        <p>
          Wenn Sie uns über das Formular, per E-Mail, Telefon oder WhatsApp
          kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten (Name,
          Kontaktdaten, Fahrzeug- und Anfragedetails) ausschließlich zur
          Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
          und lit. f DSGVO. Die Daten werden gelöscht, sobald sie für den Zweck
          nicht mehr erforderlich sind und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </p>
      </Block>

      <Block title="4. Schriftarten">
        <p>
          Schriftarten werden über{" "}
          <code className="rounded bg-card px-1.5 py-0.5 text-xs">
            next/font
          </code>{" "}
          beim Build lokal eingebunden und selbst gehostet. Es findet keine
          Verbindung zu Google-Servern statt.
        </p>
      </Block>

      <Block title="5. Externe Inhalte (Instagram, Google)">
        <p>
          {/* TODO: konkrete Einbindungen/Drittdienste prüfen & ergänzen */}
          Unsere Website verlinkt auf externe Profile (z. B. Instagram) und
          Google-Bewertungen. Beim Klick auf solche Links gelten die
          Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
      </Block>

      <Block title="6. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
          Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
          Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21 DSGVO).
          Zudem steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu.
        </p>
      </Block>

      <p className="border-t border-border pt-6 text-xs text-muted-foreground">
        Hinweis: Diese Datenschutzerklärung ist eine Vorlage mit Platzhaltern
        (TODO) und vor Veröffentlichung rechtlich zu prüfen und zu
        vervollständigen.
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
      <h2 className="text-xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}
