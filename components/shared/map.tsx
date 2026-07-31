import { MapPin, Navigation } from "lucide-react"
import { site } from "@/lib/site"

/**
 * Vorgeladene, design-konforme Karte. Google-Maps-Embed (ohne API-Key) wird per
 * CSS-Filter ins dunkle Theme überführt, sodass sie sofort sichtbar ist und zum
 * Obsidian-Look passt.
 */
export function MapEmbed() {
  const query = encodeURIComponent(`WrapCut ${site.address.city}`)
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <div className="group relative h-full min-h-72 w-full overflow-hidden border border-border">
      <iframe
        title={`Standort ${site.name} in ${site.address.city}`}
        src={`https://maps.google.com/maps?q=${query}&z=13&ie=UTF8&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0 grayscale-[0.2] [filter:invert(0.92)_hue-rotate(180deg)_brightness(0.95)_contrast(0.9)]"
      />
      {/* Tonung passend zur Marke (lässt Interaktion durch) */}
      <div className="pointer-events-none absolute inset-0 bg-brand/10 mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />

      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2.5 border border-border bg-background/90 px-3.5 py-2 text-sm backdrop-blur-md">
        <MapPin className="size-4 text-signal" />
        <span className="font-medium text-foreground">
          {site.name} · {site.address.postalCode} {site.address.city}
        </span>
      </div>

      <a
        href={directions}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 bottom-4 inline-flex items-center gap-2 border border-border bg-background/90 px-3.5 py-2 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:border-signal hover:text-signal"
      >
        <Navigation className="size-4 text-signal" />
        Route planen
      </a>
    </div>
  )
}
