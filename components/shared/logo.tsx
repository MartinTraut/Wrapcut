import { cn } from "@/lib/utils"

/**
 * Das Logo in der Iridescence der Marke.
 *
 * Die Originaldatei ist ein PNG mit dunkelgrüner Zeichnung auf Transparenz —
 * gedacht für hellen Grund. Auf fast schwarzem Untergrund verschwindet sie
 * fast vollständig, und über `filter` bekommt man sie nicht sauber
 * eingefärbt: Helligkeit allein macht aus Dunkelgrün ein schmutziges Grau,
 * `hue-rotate` kippt die Kontur mit.
 *
 * Deshalb der umgekehrte Weg: die PNG-Datei dient als **Maske**, die Farbe
 * kommt aus dem Verlauf darunter. Das Ergebnis ist eine exakt
 * deckungsgleiche Kontur in der Markenfarbe, unabhängig davon, welche Farbe
 * in der Datei steht — und es bleibt automatisch richtig, falls der Kunde
 * später eine andere Logodatei liefert.
 *
 * `aria-hidden` plus danebenstehender Text wäre hier falsch: das Logo IST
 * der Firmenname. Es bekommt deshalb ein `role="img"` mit Label.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="WrapCut, Folientechnik"
      className={cn(
        "bg-iris block w-[8.5rem] sm:w-[10rem]",
        // Seitenverhältnis der Datei (1920 × 387) fest verdrahtet, damit die
        // Maske nicht verzerrt und kein Layout-Shift entsteht.
        "aspect-[1920/387]",
        className,
      )}
      style={{
        WebkitMaskImage: "url(/logo-wrapcut.png)",
        maskImage: "url(/logo-wrapcut.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  )
}
