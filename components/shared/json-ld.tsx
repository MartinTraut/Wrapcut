import { site, services, faqs, testimonials } from "@/lib/site"

/**
 * Strukturierte Daten als verbundener @graph mit @id-Referenzen.
 *
 * Aufteilung nach Sichtbarkeitsregel: Business und WebSite gelten global,
 * FAQPage wird ausschließlich dort ausgegeben, wo die FAQ-Section sichtbar ist
 * (Startseite). Alle Werte stammen aus lib/site.ts und sind belegt.
 */

const businessId = `${site.url}/#business`
const websiteId = `${site.url}/#website`

/**
 * Preisrahmen im Angebotskatalog — ausschließlich für die beiden Leistungen,
 * für die der Kunde selbst Zahlen publiziert hat (alte /faq-Seite). Für
 * Keramik, Scheibentönung, Chrom Delete und Werbebeschriftung existiert keine
 * belegte Angabe; dort bleibt das Offer bewusst ohne Preis, statt einen zu
 * schätzen.
 */
const offerPrices: Record<
  string,
  { "@type": string; priceCurrency: string; minPrice: number; maxPrice?: number }
> = {
  fahrzeugfolierung: {
    "@type": "PriceSpecification",
    priceCurrency: "EUR",
    minPrice: 1600,
    maxPrice: 8000,
  },
  lackschutzfolie: {
    "@type": "PriceSpecification",
    priceCurrency: "EUR",
    minPrice: 1600,
  },
}

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Business + WebSite — auf jeder Seite. */
export function BusinessJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AutoBodyShop", "LocalBusiness"],
        "@id": businessId,
        name: site.businessName,
        alternateName: site.name,
        legalName: site.legalName,
        url: site.url,
        // Mehrere echte Fotos statt nur des generierten OG-Bildes: Google
        // bevorzugt für LocalBusiness reale Aufnahmen in verschiedenen
        // Seitenverhältnissen.
        image: [
          `${site.url}/originals/img-01.jpg`,
          `${site.url}/originals/img-08.jpg`,
          `${site.url}/originals/img-15.jpg`,
          `${site.url}/opengraph-image`,
        ],
        logo: `${site.url}/logo-wrapcut.png`,
        description: site.description,
        telephone: site.contact.phone,
        email: site.contact.email,
        priceRange: "€€",
        currenciesAccepted: "EUR",
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
        hasMap: site.social.googleMaps,
        areaServed: site.serviceArea.map((a) => ({ "@type": "City", name: a })),
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.contact.phone,
            email: site.contact.email,
            contactType: "customer service",
            areaServed: "DE",
            availableLanguage: ["de"],
          },
        ],
        sameAs: [site.social.instagram, site.social.googleMaps],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Leistungen",
          // Die @id muss exakt die sein, die auch die Leistungsseite für
          // dieselbe Entität vergibt (`…/leistungen/<slug>#service`).
          // Vorher standen hier `…/#service-<slug>` und dort `…#service` —
          // zwei nie auflösbare IDs für dasselbe Angebot, der Graph zerfiel
          // in zwei unverbundene Service-Mengen.
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            ...(offerPrices[s.slug]
              ? { priceSpecification: offerPrices[s.slug] }
              : {}),
            itemOffered: {
              "@type": "Service",
              "@id": `${site.url}/leistungen/${s.slug}#service`,
              url: `${site.url}/leistungen/${s.slug}`,
              name: s.name,
              description: s.description,
              serviceType: s.keywords[0],
              areaServed: site.serviceArea.map((a) => ({
                "@type": "City",
                name: a,
              })),
              provider: { "@id": businessId },
            },
          })),
        },
        // Belegt: Google-Business-Daten der Bestandsseite (5,0 bei 24 Bewertungen)
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(site.reviews.rating),
          reviewCount: String(site.reviews.count),
          bestRating: "5",
          worstRating: "1",
        },
        review: testimonials.map((t) => ({
          "@type": "Review",
          author: { "@type": "Person", name: t.name },
          datePublished: t.date,
          reviewBody: t.text,
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
            worstRating: "1",
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        inLanguage: "de-DE",
        publisher: { "@id": businessId },
      },
    ],
  }

  return <JsonLdScript data={graph} />
}

/** WebPage + FAQPage — nur auf der Startseite, wo die FAQ sichtbar ist. */
export function HomeJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: `Fahrzeugfolierung ${site.address.city} | Lackschutz & PPF | ${site.name}`,
        isPartOf: { "@id": websiteId },
        about: { "@id": businessId },
        inLanguage: "de-DE",
        primaryImageOfPage: `${site.url}/opengraph-image`,
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        inLanguage: "de-DE",
        isPartOf: { "@id": websiteId },
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  }

  return <JsonLdScript data={graph} />
}

/**
 * Verbundener Graph für Landingpages: WebPage + BreadcrumbList + FAQPage,
 * optional die beworbene Service-Entität.
 *
 * Die FAQ-Fragen müssen exakt den auf der Seite sichtbaren entsprechen —
 * deshalb wird die Liste übergeben und nicht hier zusammengestellt.
 */
export function LandingJsonLd({
  path,
  name,
  description,
  crumbs,
  faqs: pageFaqs,
  service,
  itemList,
}: {
  path: string
  name: string
  description: string
  crumbs: { name: string; path: string }[]
  faqs: readonly { q: string; a: string }[]
  service?: {
    name: string
    description: string
    serviceType: string
    /** Wenn gesetzt, wird die Leistung auf diesen Ort bezogen. */
    areaServed?: string
  }
  /**
   * Nur für die beiden Hub-Seiten: macht maschinenlesbar, welche Kindseiten
   * unter der Silo-Spitze liegen. Ohne das bestand ihr Graph lediglich aus
   * WebPage + BreadcrumbList.
   */
  itemList?: { name: string; path: string }[]
}) {
  const url = `${site.url}${path}`
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      ...(itemList && itemList.length > 0
        ? {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: itemList.map((entry, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: entry.name,
                url: `${site.url}${entry.path}`,
              })),
            },
          }
        : {}),
      inLanguage: "de-DE",
      primaryImageOfPage: `${site.url}/opengraph-image`,
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [{ name: "Startseite", path: "/" }, ...crumbs].map(
        (item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.path}`,
        }),
      ),
    },
  ]

  if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.name,
      description: service.description,
      serviceType: service.serviceType,
      provider: { "@id": businessId },
      areaServed: service.areaServed
        ? { "@type": "City", name: service.areaServed }
        : site.serviceArea.map((a) => ({ "@type": "City", name: a })),
      mainEntityOfPage: { "@id": `${url}#webpage` },
    })
  }

  if (pageFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      inLanguage: "de-DE",
      isPartOf: { "@id": websiteId },
      mainEntity: pageFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    })
  }

  return <JsonLdScript data={{ "@context": "https://schema.org", "@graph": graph }} />
}

/** BreadcrumbList für Unterseiten (Impressum, Datenschutz). */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Startseite", path: "/" }, ...items].map(
      (item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${site.url}${item.path}`,
      }),
    ),
  }

  return <JsonLdScript data={data} />
}
