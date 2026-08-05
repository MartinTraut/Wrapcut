import { site, services, testimonials, type Faq } from "@/lib/site"

/**
 * Ein verbundener @graph statt isolierter Schnipsel.
 *
 * Jeder Knoten bekommt eine stabile @id und referenziert die anderen darüber.
 * Getrennte Script-Blöcke zwingen Google, den Zusammenhang zu erraten; ein
 * Graph macht ihn explizit — LocalBusiness gehört zur WebSite, die Leistungen
 * gehören zum LocalBusiness, das FAQ gehört zu genau der Seite, die es zeigt.
 *
 * **Ausgegeben wird nur, was auf der jeweiligen Seite sichtbar ist.** Deshalb
 * nimmt diese Komponente Props statt alles fest zu verdrahten, und deshalb
 * steht sie in den einzelnen `page.tsx` statt im Root-Layout: im Layout würde
 * das FAQPage-Objekt der Startseite auf jeder Unterseite mitlaufen, auch dort,
 * wo überhaupt kein FAQ steht.
 */
export function JsonLd({
  faqs,
  breadcrumbs,
  service,
}: {
  /** Nur setzen, wenn das FAQ auf dieser Seite sichtbar ist. */
  faqs?: Faq[]
  /** Ohne die Startseite — die wird automatisch vorangestellt. */
  breadcrumbs?: { name: string; path: string }[]
  service?: { name: string; description: string; path: string; areaServed?: string }
} = {}) {
  const businessId = `${site.url}/#business`
  const websiteId = `${site.url}/#website`

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.url,
      name: site.name,
      inLanguage: "de-DE",
      publisher: { "@id": businessId },
    },
    {
      "@type": ["LocalBusiness", "AutoBodyShop"],
      "@id": businessId,
      name: site.businessName,
      alternateName: site.name,
      url: site.url,
      description: site.description,
      telephone: site.contact.phone,
      email: site.contact.email,
      image: `${site.url}/logo-wrapcut.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.contact.phone,
        email: site.contact.email,
        contactType: "customer service",
        areaServed: "DE",
        availableLanguage: ["de"],
      },
      // Belegt aus dem Google-Profil der Bestandsseite — nicht geschätzt.
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: site.reviews.rating,
        reviewCount: site.reviews.count,
        bestRating: 5,
      },
      /*
       * Die sechs Rezensionen im Wortlaut, nicht nur die Durchschnittsnote.
       * `aggregateRating` allein ist eine Zahl ohne Deckung; erst die
       * einzelnen `Review`-Knoten mit Autor und Datum machen sie für Google
       * und für Antwortsysteme überprüfbar.
       */
      review: testimonials.map((t) => ({
        "@type": "Review",
        author: { "@type": "Person", name: t.name },
        datePublished: t.date,
        reviewBody: t.text,
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
      })),
      areaServed: site.serviceArea.map((city) => ({
        "@type": "City",
        name: city,
      })),
      sameAs: [site.social.instagram, site.social.googleMaps],
      // Öffnungszeiten stehen nirgends belegt vor, deshalb bewusst kein
      // openingHoursSpecification. Lieber keine Angabe als eine erfundene.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Leistungen",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            // `@id` und `url` machen den Leistungsknoten referenzierbar —
            // ohne sie ist er ein anonymes Objekt, auf das die Leistungsseite
            // nicht zeigen kann.
            "@type": "Service",
            "@id": `${site.url}/leistungen/${s.slug}#service`,
            url: `${site.url}/leistungen/${s.slug}`,
            name: s.name,
            description: s.tagline,
            provider: { "@id": businessId },
            areaServed: site.address.city,
          },
        })),
      },
    },
  ]

  if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${site.url}${service.path}#service`,
      url: `${site.url}${service.path}`,
      name: service.name,
      description: service.description,
      serviceType: service.name,
      provider: { "@id": businessId },
      areaServed: service.areaServed ?? site.address.city,
    })
  }

  if (breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${site.url}${breadcrumbs[breadcrumbs.length - 1].path}#breadcrumb`,
      itemListElement: [{ name: "Startseite", path: "/" }, ...breadcrumbs].map(
        (crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: `${site.url}${crumb.path === "/" ? "" : crumb.path}`,
        }),
      ),
    })
  }

  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${site.url}${breadcrumbs?.length ? breadcrumbs[breadcrumbs.length - 1].path : ""}#faq`,
      inLanguage: "de-DE",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    })
  }

  return (
    <script
      type="application/ld+json"
      // Der Graph ist statisch aus lib/site.ts und lib/landing.ts erzeugt, es
      // fließt keine Nutzereingabe hinein — JSON.stringify ist ausreichend.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  )
}
