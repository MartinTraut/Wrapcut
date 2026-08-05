import { cn } from "@/lib/utils"

export type ContainerWidth = "default" | "narrow"

/**
 * Eine einzige Satzkante für die ganze Seite.
 *
 * `default` und `narrow` teilen dieselbe äußere Kante und unterscheiden sich
 * nur in der Maximalbreite des Inhalts. Zwei verschiedene *linke* Kanten
 * nebeneinander lassen die Seite bei jedem Sectionwechsel springen — auf
 * einem Layout, das mit Haarlinien arbeitet, fällt das sofort auf.
 * Rhythmus entsteht über `max-w-*` **innerhalb** der Bühne, nicht über den
 * Container.
 */
export function Container({
  children,
  className,
  width = "default",
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  width?: ContainerWidth
  as?: "div" | "section" | "header" | "footer"
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        width === "narrow" ? "max-w-5xl" : "max-w-[96rem]",
        className,
      )}
    >
      {children}
    </Tag>
  )
}
