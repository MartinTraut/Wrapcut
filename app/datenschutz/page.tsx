import type { Metadata } from "next"

import { LegalPage, MissingData } from "@/components/shared/legal-page"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Wie ${site.name} mit personenbezogenen Daten umgeht, Verantwortlicher, Zwecke, Rechtsgrundlagen und Ihre Rechte.`,
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
}

/*
 * Bewusst kein Standardtext von der Stange.
 *
 * Übliche Generator-Datenschutzerklärungen zählen Google Analytics, Google
 * Fonts, Karten-Embeds und Cookie-Banner auf. Nichts davon findet auf dieser
 * Seite statt, und eine Erklärung, die Verarbeitungen behauptet, die es nicht
 * gibt, ist genauso falsch wie eine, die welche verschweigt. Der Text unten
 * beschreibt ausschließlich, was der Code tatsächlich tut:
 *
 * - Schriften laufen über `next/font/google` und werden zur Bauzeit
 *   mitgeliefert — zur Laufzeit geht keine Anfrage an Google.
 * - Das Kontaktformular baut einen `mailto:`-Link. Die Eingaben verlassen den
 *   Browser nie in Richtung dieses Servers.
 * - Kein Analytics, kein Tag Manager, kein Karten-iframe, keine Cookies.
 *
 * Wenn sich das ändert (Versandroute mit Resend, Analytics, Karten-Embed),
 * muss dieser Text mitwachsen.
 */
export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Diese Seite kommt ohne Tracking, ohne Cookies und ohne eingebettete Dienste Dritter aus. Was trotzdem an Daten anfällt, steht hier."
    >
      <h2>Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        {site.legalName}, Roberto <MissingData>Nachname</MissingData>
        <br />
        {site.address.street}, {site.address.postalCode} {site.address.city}
        <br />
        Telefon: <a href={site.contact.phoneHref}>{site.contact.phone}</a>
        <br />
        E-Mail: <a href={site.contact.emailHref}>{site.contact.email}</a>
      </p>

      <h2>Aufruf dieser Website (Server-Logfiles)</h2>
      <p>
        Beim Aufruf dieser Website verarbeitet unser Hosting-Anbieter
        automatisch technische Zugriffsdaten, die Ihr Browser übermittelt:
        IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Adresse,
        übertragene Datenmenge, Referrer sowie Browser- und Betriebssystemtyp.
        Diese Daten sind für den Betrieb und die Sicherheit der Website
        technisch erforderlich.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
        Interesse liegt in der stabilen und sicheren Bereitstellung der
        Website. Eine Zusammenführung dieser Daten mit anderen Datenquellen
        findet nicht statt.
      </p>
      <p>
        Hosting-Anbieter und Speicherdauer der Logfiles:{" "}
        <MissingData>
          Anbieter, Sitz und Auftragsverarbeitungsvertrag
        </MissingData>
      </p>

      <h2>Kontaktaufnahme</h2>
      <h3>Kontaktformular</h3>
      <p>
        Das Formular auf dieser Website überträgt Ihre Eingaben nicht an unseren
        Server. Es öffnet stattdessen Ihr eigenes E-Mail-Programm mit einer
        vorbereiteten Nachricht. Ob und mit welchem Inhalt Sie diese Nachricht
        absenden, entscheiden ausschließlich Sie. Die Verarbeitung findet also
        erst statt, wenn uns Ihre E-Mail erreicht.
      </p>
      <h3>E-Mail, Telefon und WhatsApp</h3>
      <p>
        Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren,
        verarbeiten wir die von Ihnen übermittelten Angaben, in der Regel Name,
        Kontaktdaten, Fahrzeugdaten und Ihr Anliegen —, um Ihre Anfrage zu
        beantworten und ein Angebot zu erstellen.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf
        den Abschluss eines Vertrags gerichtet ist, im Übrigen Art. 6 Abs. 1
        lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
        Wir löschen diese Daten, sobald sie für den Zweck nicht mehr
        erforderlich sind, und beachten dabei gesetzliche Aufbewahrungsfristen —
        insbesondere die handels- und steuerrechtlichen Fristen von sechs bzw.
        zehn Jahren.
      </p>
      <p>
        Hinweis zu WhatsApp: Wenn Sie uns über WhatsApp schreiben, verarbeitet
        auch der Betreiber des Dienstes (WhatsApp Ireland Ltd.) Daten nach
        seinen eigenen Bestimmungen. Auf diese Verarbeitung haben wir keinen
        Einfluss. Wenn Sie das vermeiden möchten, nutzen Sie bitte E-Mail oder
        Telefon.
      </p>

      <h2>Keine Cookies, kein Tracking</h2>
      <p>
        Diese Website setzt keine Cookies, verwendet keine Analyse- oder
        Reichweitenmessung und bindet keine Werbenetzwerke ein. Deshalb gibt es
        hier auch keinen Cookie-Banner, es gibt schlicht nichts einzuwilligen.
      </p>

      <h2>Schriftarten</h2>
      <p>
        Die verwendeten Schriften (Archivo und Geist) werden bei der Erstellung
        der Website mitgeliefert und von unserem eigenen Server ausgeliefert.
        Beim Aufruf der Seite wird <em>keine</em> Verbindung zu Google-Servern
        aufgebaut, und es wird keine IP-Adresse an Google übertragen.
      </p>

      <h2>Externe Links</h2>
      <p>
        Diese Website verlinkt auf Instagram, WhatsApp und Google Maps. Diese
        Dienste werden nicht eingebettet, sondern nur verlinkt, eine
        Datenübertragung findet erst statt, wenn Sie einen dieser Links
        anklicken. Es gelten dann die Datenschutzbestimmungen des jeweiligen
        Anbieters.
      </p>

      <h2>Ihre Rechte</h2>
      <p>Sie haben uns gegenüber jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>
          Widerspruch gegen Verarbeitungen, die auf einem berechtigten Interesse
          beruhen (Art. 21 DSGVO)
        </li>
      </ul>
      <p>
        Für alle diese Anliegen genügt eine formlose Nachricht an{" "}
        <a href={site.contact.emailHref}>{site.contact.email}</a>.
      </p>
      <p>
        Unabhängig davon steht Ihnen ein Beschwerderecht bei einer
        Aufsichtsbehörde zu (Art. 77 DSGVO). Zuständig ist für uns die
        Landesbeauftragte für Datenschutz und Informationsfreiheit
        Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.
      </p>

      <h2>SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite wird ausschließlich verschlüsselt übertragen. Sie erkennen
        das an dem Schloss-Symbol in der Adresszeile Ihres Browsers und an dem
        Präfix <em>https://</em>.
      </p>

      <h2>Stand</h2>
      <p>
        Diese Datenschutzerklärung beschreibt den technischen Stand der Website
        zum 5. August 2026. Sobald sich die eingesetzte Technik ändert, etwa
        durch einen serverseitigen Formularversand oder eine eingebettete Karte
, wird sie angepasst.
      </p>
    </LegalPage>
  )
}
