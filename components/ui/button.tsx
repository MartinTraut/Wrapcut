import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/*
 * Buttons in Satzschreibung, nicht versal.
 *
 * Versale Labels neben einer ebenfalls versalen Navigation lesen sich wie ein
 * Font-Fehler und nehmen kurzen deutschen CTAs die Lesbarkeit, statt sie zu
 * betonen. Die volle Rundung ist bewusst die einzige Stelle im System, an der
 * ein Pill-Radius vorkommt: Bedienelemente dürfen sich von Flächen abheben.
 *
 * Der Halo auf der Primärfläche ist kein Effektrest, sondern Konsequenz der
 * Farbe — eine leuchtende Fläche auf fast schwarzem Grund wirft Licht ab,
 * sonst liest sie sich wie ein aufgeklebter Sticker. Der Hover-Zustand kommt
 * aus dem Licht (Halo verdoppelt sich), nicht aus einem Helligkeitssprung.
 */
const buttonVariants = cva(
  /*
   * Fokus über die gemeinsame `.focus-ring`-Klasse (siehe globals.css), nicht
   * über Tailwinds `ring-*`: `ring-offset-*` zerlegt in v4 die
   * Ring-Komposition, der Schatten landet bei `0 0 0 0`.
   *
   * Und **keine `transition-all`**: die hat auch den Fokus-Outline animiert.
   * Der Ring wuchs damit über 240 ms von 3 px currentColor auf 2 px
   * Ringfarbe — für einen Tastaturnutzer, der schnell durchtabbt, ist der
   * Ring damit nie ganz da. Fokus ist ein Zustand, kein Übergang.
   */
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-clip-padding font-semibold tracking-[-0.01em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-[240ms] ease-[var(--ease-premium)] select-none focus-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "sheen bg-brand text-brand-foreground shadow-[0_0_28px_-6px_var(--brand)] hover:bg-[color-mix(in_oklch,var(--brand),white_12%)] hover:shadow-[0_0_48px_-8px_var(--brand)]",
        outline:
          "border-input bg-transparent text-foreground hover:border-brand/70 hover:bg-brand/[0.08]",
        ghost: "text-foreground hover:bg-surface-2",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        // Interaktionsziele: default 44 px, lg 56 px — beide auf oder über der
        // 44-px-Empfehlung, auch auf Touch.
        default: "h-11 gap-2 px-6 text-[0.95rem]",
        sm: "h-9 gap-1.5 px-4 text-[0.85rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-14 gap-2.5 px-8 text-[1.02rem]",
        icon: "size-11",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
