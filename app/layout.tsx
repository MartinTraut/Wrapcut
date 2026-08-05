import type { Metadata, Viewport } from "next"
import { Archivo, Geist } from "next/font/google"

import { SmoothScroll } from "@/components/shared/smooth-scroll"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { StickyCta } from "@/components/shared/sticky-cta"
import { site } from "@/lib/site"

import "./globals.css"

/*
 * Zwei Familien, beide variabel.
 *
 * Archivo trägt die Display-Ebene: eng laufende Grotesk mit schweren
 * Schnitten, die auf 8rem noch Struktur hat statt zu verlaufen. Geist trägt
 * den Fließtext — offene Formen, hohe x-Höhe, auf dunklem Grund gut lesbar.
 * `display: "swap"` verhindert unsichtbaren Text während des Ladens.
 */
const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
})

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, Fahrzeugfolierung & Lackschutz in ${site.address.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Fahrzeugfolierung Jüchen",
    "Autofolierung Neuss",
    "Lackschutzfolie PPF",
    "Keramikversiegelung",
    "Scheibentönung",
    "Car Wrapping Rhein-Kreis Neuss",
  ],
  alternates: { canonical: "/" },
  /*
   * Ein Bild ist hier kein Nice-to-have. Ein Folierbetrieb bekommt einen
   * großen Teil seiner Klicks über die Instagram-Bio und über in WhatsApp
   * weitergereichte Links — ohne `og:image` zeigen beide eine leere graue
   * Karte, und genau die wird nicht angetippt.
   */
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: `${site.name}, Fahrzeugfolierung & Lackschutz in ${site.address.city}`,
    description: site.description,
    images: [
      {
        url: "/originals/img-03.jpg",
        width: 1200,
        height: 630,
        alt: `Fahrzeug nach der Folierung im Studio von ${site.name} in ${site.address.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, Fahrzeugfolierung & Lackschutz in ${site.address.city}`,
    description: site.description,
    images: ["/originals/img-03.jpg"],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#0a0b0e",
  // Zoom bleibt erlaubt — `maximum-scale` sperrt ihn für Nutzer aus, die ihn
  // brauchen, und ist eine der häufigsten stillen A11y-Verletzungen.
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        {/* `JsonLd` steht bewusst nicht hier, sondern in jeder `page.tsx`:
            im Layout liefe das FAQPage-Objekt der Startseite auf jeder
            Unterseite mit, auch dort, wo gar kein FAQ sichtbar ist. */}
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-brand focus:px-6 focus:py-3 focus:font-semibold focus:text-brand-foreground"
        >
          Zum Inhalt springen
        </a>
        <Header />
        {/* `tabIndex={-1}` ist Pflicht, sonst springt der Skip-Link zwar zur
            Position, der Fokus bleibt aber am Link stehen. */}
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  )
}
