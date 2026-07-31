import { cn } from "@/lib/utils"

/**
 * Sektionsmarke im Meta-Register: Monospace, versal, weit gesperrt.
 *
 * Der optionale `index` nummeriert die Sections der Startseite (01 … 09).
 * Eine durchlaufende Nummerierung macht aus einer Reihe gleichrangiger
 * Blöcke eine Sequenz — der Leser weiß jederzeit, wo im Dokument er steht.
 * Die Zahl steht in Signalfarbe, das Label bleibt gedeckt: der Akzent
 * markiert die Position, nicht den Inhalt.
 */
export function Eyebrow({
  children,
  index,
  className,
}: {
  children: React.ReactNode
  index?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "t-mono flex items-center gap-3 text-muted-foreground",
        className,
      )}
    >
      {index ? (
        <span className="nums text-signal" aria-hidden>
          {index}
        </span>
      ) : null}
      <span className="h-px w-6 bg-border" aria-hidden />
      {children}
    </span>
  )
}
