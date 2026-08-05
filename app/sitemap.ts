import type { MetadataRoute } from "next"

import { locations, serviceSlugs } from "@/lib/landing"
import { site } from "@/lib/site"

/*
 * Kein `new Date()` als `lastModified`.
 *
 * Ein Zeitstempel, der bei jedem Build auf "jetzt" springt, behauptet
 * gegenüber Google eine Änderung, die nie stattgefunden hat. Nach ein paar
 * Deploys ohne Inhaltsänderung wird das Feld ignoriert — und dann fehlt es
 * genau dann, wenn sich wirklich etwas ändert. Stattdessen ein fester Stand,
 * der beim Inhaltsupdate mitgepflegt wird.
 */
const CONTENT_REVISION = new Date("2026-08-05")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: CONTENT_REVISION,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/leistungen`,
      lastModified: CONTENT_REVISION,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...serviceSlugs.map((slug) => ({
      url: `${site.url}/leistungen/${slug}`,
      lastModified: CONTENT_REVISION,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/standorte`,
      lastModified: CONTENT_REVISION,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...locations.map((location) => ({
      url: `${site.url}/standorte/${location.slug}`,
      lastModified: CONTENT_REVISION,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${site.url}/impressum`,
      lastModified: CONTENT_REVISION,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${site.url}/datenschutz`,
      lastModified: CONTENT_REVISION,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]
}
