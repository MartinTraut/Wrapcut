import { SprayCan, ShieldHalf, Gem, SunDim, Sparkles, Type } from "lucide-react"

/**
 * Ein Icon je Leistung, an genau einer Stelle definiert — Startseite,
 * Leistungsübersicht und Standortseiten müssen dasselbe Zeichen zeigen.
 */
export const serviceIcons: Record<string, React.ElementType> = {
  fahrzeugfolierung: SprayCan,
  lackschutzfolie: ShieldHalf,
  keramikversiegelung: Gem,
  scheibentoenung: SunDim,
  chromdelete: Sparkles,
  werbebeschriftung: Type,
}

export function ServiceIcon({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const Icon = serviceIcons[slug] ?? Sparkles
  return <Icon className={className} aria-hidden />
}
