import Link from "next/link"
import { ChevronRight } from "lucide-react"

export type Crumb = { name: string; path: string }

/**
 * Sichtbare Brotkrumen. Muss zwingend mit dem BreadcrumbList-Schema
 * übereinstimmen — Google wertet abweichende Angaben als Manipulation.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Start", path: "/" }, ...items]

  return (
    <nav aria-label="Brotkrumen">
      {/* Meta-Register wie Sektionsmarken und Maße — die Brotkrumen gehören
          zur Ordnungsebene der Seite, nicht zum Inhalt. */}
      <ol className="t-mono flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-muted-foreground">
        {trail.map((item, i) => {
          const last = i === trail.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2.5">
              {i > 0 && (
                <ChevronRight className="size-3 shrink-0 opacity-45" aria-hidden />
              )}
              {last ? (
                <span aria-current="page" className="text-foreground/80">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
