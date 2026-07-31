import type { MetadataRoute } from "next"
import { site, services } from "@/lib/site"
import { locations } from "@/lib/landing"

/**
 * Nur indexierbare Seiten. Impressum und Datenschutz tragen robots
 * `index: false` — sie in der Sitemap zu listen wäre ein widersprüchliches
 * Signal an Google.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/leistungen`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${site.url}/leistungen/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/standorte`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...locations.map((l) => ({
      url: `${site.url}/standorte/${l.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
