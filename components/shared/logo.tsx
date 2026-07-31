import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

/**
 * Original-Logo der Bestandsseite (Racing-Green-Wortmarke).
 * Auf dunklem Untergrund wird es per Filter sauber in Weiß ausgegeben,
 * da das Original zweifarbig für hellen Hintergrund gestaltet wurde.
 */
export function Logo({
  className,
  variant = "brand",
}: {
  className?: string
  variant?: "brand" | "light" | "original"
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, Startseite`}
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/logo-wrapcut.png"
        alt={`${site.name}, Fahrzeugfolierung & Lackschutz Jüchen`}
        width={1920}
        height={387}
        priority
        className={cn(
          "h-7 w-auto sm:h-8",
          // "brand": Original-Zweifarbigkeit (grünes WRAP + weißes CUT),
          // Grün angehoben für Kontrast auf dunklem Untergrund.
          variant === "brand" &&
            "[filter:brightness(1.55)_saturate(1.5)_contrast(1.05)]",
          variant === "light" && "[filter:brightness(0)_invert(1)]"
        )}
      />
    </Link>
  )
}
