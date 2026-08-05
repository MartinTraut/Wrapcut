import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Sichtbares Label, Eingabe und Hilfetext als eine Einheit.
 *
 * Platzhalter sind keine Labels: sobald der Nutzer tippt, verschwindet die
 * Beschriftung, und wer das Formular danach kontrolliert, weiß nicht mehr,
 * was in welchem Feld steht. Deshalb hier grundsätzlich ein sichtbares
 * `<label>` mit `htmlFor`, plus optionaler Hilfetext, der über
 * `aria-describedby` angebunden ist.
 */
export function Field({
  id,
  label,
  hint,
  required,
  children,
  className,
}: {
  id: string
  label: string
  hint?: string
  required?: boolean
  children: (props: {
    id: string
    "aria-describedby"?: string
    required?: boolean
  }) => React.ReactNode
  className?: string
}) {
  const hintId = hint ? `${id}-hint` : undefined

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <LabelPrimitive.Root
        htmlFor={id}
        className="text-sm font-medium text-foreground/90"
      >
        {label}
        {required ? (
          <span className="ml-1 text-brand" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            optional
          </span>
        )}
      </LabelPrimitive.Root>
      {children({ id, "aria-describedby": hintId, required })}
      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

/*
 * Drei Details, die hier nicht dekorativ sind:
 *
 * - **`text-base` bis `sm`, erst darüber kleiner.** iOS Safari zoomt beim
 *   Fokussieren in jedes Feld, dessen Schrift unter 16 px liegt. 15.2 px
 *   (`text-[0.95rem]`) reicht dafür nicht — die optische Feinjustierung
 *   passiert deshalb erst ab Desktop, wo es keinen Auto-Zoom gibt.
 * - **Fokus über `outline`, nicht `ring`.** Siehe Begründung in `button.tsx`:
 *   `outline-none` in derselben Klasse hätte jeden späteren Fokus-Outline
 *   stillgelegt.
 * - **Platzhalter ohne Abstufung.** Die Platzhalter tragen echte
 *   Beispieldaten („BMW M2, 2023"), sind also Inhalt. Mit `/60` lagen sie
 *   bei 3,8 : 1 und damit unter der Lesetext-Grenze.
 */
const fieldStyles =
  "w-full rounded-lg border border-input bg-surface/60 px-4 text-base sm:text-[0.95rem] text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/80 hover:border-input/80 focus-visible:border-brand focus-ring"

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input className={cn(fieldStyles, "h-12", className)} {...props} />
  )
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(fieldStyles, "min-h-32 resize-y py-3.5 leading-relaxed", className)}
      {...props}
    />
  )
}
