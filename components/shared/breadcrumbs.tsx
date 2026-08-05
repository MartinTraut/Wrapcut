import Link from "next/link"

import { Container } from "@/components/shared/container"

/**
 * Sichtbare Brotkrumen, passend zum BreadcrumbList im Graph.
 *
 * Ein BreadcrumbList im Schema ohne sichtbare Entsprechung auf der Seite ist
 * eine Auszeichnung ohne Inhalt — Google erwartet beides. Der letzte Eintrag
 * ist kein Link, sondern die aktuelle Position, und trägt `aria-current`.
 */
export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; path: string }[]
}) {
  const items = [{ name: "Start", path: "/" }, ...trail]

  return (
    <Container>
      <nav aria-label="Brotkrumen" className="pt-28 lg:pt-32">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={item.path} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-foreground/80">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="rounded-sm transition-colors duration-200 hover:text-foreground focus-ring"
                  >
                    {item.name}
                  </Link>
                )}
                {isLast ? null : (
                  <span aria-hidden className="text-border">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </Container>
  )
}
