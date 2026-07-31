import { cn } from "@/lib/utils"

/**
 * Eine gemeinsame Satzkante für die ganze Seite.
 *
 * Vorher lagen zwei Breiten nebeneinander (80rem und 96rem) — dadurch sprang
 * die linke Kante zwischen zwei aufeinanderfolgenden Sections um bis zu 80 px
 * hin und her. Bei einem Layout, das seine Ordnung über durchgehende
 * Haarlinien herstellt, ist das der auffälligste denkbare Fehler. Deshalb
 * teilen sich `default` und `wide` jetzt dieselbe Bühne; der horizontale
 * Rhythmus entsteht über die Textspalten (max-w-xl/2xl) innerhalb der Bühne,
 * nicht über die Bühne selbst.
 */
const widths = {
  narrow: "max-w-3xl",
  default: "max-w-[96rem]",
  wide: "max-w-[96rem]",
  bleed: "max-w-none px-0 sm:px-0 lg:px-0",
} as const

export type ContainerWidth = keyof typeof widths

export function Container({
  className,
  children,
  width = "default",
  ...props
}: React.ComponentProps<"div"> & { width?: ContainerWidth }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        widths[width],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
