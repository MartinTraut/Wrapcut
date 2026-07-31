import type { Metadata } from "next"
import { Archivo, Geist_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"
import { BusinessJsonLd } from "@/components/shared/json-ld"
import { MotionProvider } from "@/components/shared/motion-provider"

/**
 * Genau zwei Familien, mit klarer Rollentrennung:
 *
 * Archivo (Omnibus-Type) trägt Display UND Fließtext. Eine industrielle
 * Grotesk mit sehr geschlossenen Formen — in Display-Größen mit negativem
 * Tracking wird daraus ein dichter, plakativer Block, in 400 bleibt sie
 * ruhig lesbar. Ersetzt das frühere Paar Sora/Inter, das zwei Stimmen für
 * dieselbe Aufgabe benutzte.
 *
 * Geist Mono trägt ausschließlich die Meta-Ebene: Sektionsindizes, Maße,
 * Preise, Laufzeiten. Der Monospace misst, die Grotesk spricht.
 */
const fontDisplay = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const fontSans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
})

/** 53 Zeichen – wird in der SERP vollständig angezeigt. */
const title = "Fahrzeugfolierung Jüchen | Lackschutz & PPF | WrapCut"

/** 154 Zeichen – unter Googles Kürzungsgrenze von ~160. */
const description =
  "Fahrzeugfolierung, Lackschutzfolie (PPF), Keramik und Scheibentönung in Jüchen – für Neuss, Mönchengladbach und Düsseldorf. Kostenloses Festpreis-Angebot."

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name} Jüchen`,
  },
  description,
  keywords: [
    "Fahrzeugfolierung Jüchen",
    "Folierung Neuss",
    "Carwrapping Mönchengladbach",
    "Lackschutzfolie PPF Düsseldorf",
    "Keramikversiegelung Rhein-Kreis Neuss",
    "Scheibentönung Jüchen",
    "Auto folieren NRW",
    "WrapCut",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title,
    description,
    // Das Bild liefert app/opengraph-image.tsx über die Dateikonvention.
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={cn(fontDisplay.variable, fontSans.variable, fontMono.variable)}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:border focus:border-signal focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring focus:outline-none"
        >
          Zum Inhalt springen
        </a>
        <BusinessJsonLd />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
