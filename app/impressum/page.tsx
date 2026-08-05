import type { Metadata } from "next"

import { LegalPage, MissingData } from "@/components/shared/legal-page"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Impressum",
  description: `Anbieterkennzeichnung nach § 5 DDG für ${site.name}, ${site.address.city}.`,
  alternates: { canonical: "/impressum" },
  // Das Impressum muss auffindbar sein — Google bewertet ein fehlendes oder
  // ausgeschlossenes Impressum bei lokalen Betrieben als Vertrauensmangel.
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      intro="Anbieterkennzeichnung nach § 5 DDG und § 18 Abs. 2 MStV."
    >
      <h2>Anbieter</h2>
      <p>
        {site.legalName}
        <br />
        Inhaber: Roberto <MissingData>Nachname</MissingData>
        <br />
        Rechtsform: <MissingData>z. B. Einzelunternehmen / GmbH</MissingData>
      </p>
      <p>
        {site.address.street}
        <br />
        {site.address.postalCode} {site.address.city}
        <br />
        {site.address.countryName}
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={site.contact.phoneHref}>{site.contact.phone}</a>
        <br />
        E-Mail: <a href={site.contact.emailHref}>{site.contact.email}</a>
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{" "}
        <MissingData>USt-IdNr. oder Hinweis auf Kleinunternehmerregelung</MissingData>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Roberto <MissingData>Nachname</MissingData>
        <br />
        {site.address.street}, {site.address.postalCode} {site.address.city}
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
        überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
        Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
        Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
        unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
        der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
        entsprechender Rechtsverletzungen entfernen wir diese Inhalte umgehend.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
        Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
        Rechtsverstöße überprüft; rechtswidrige Inhalte waren nicht erkennbar.
        Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links
        umgehend.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Die auf dieser Website gezeigten
        Fahrzeugaufnahmen stammen aus eigenen Arbeiten.
      </p>
    </LegalPage>
  )
}
