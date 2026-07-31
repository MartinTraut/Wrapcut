"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Karte mit cursor-folgendem Spotlight (radialer Glow), reines CSS-Var-Update,
 * performant ohne Re-Render. Auf Touch ohne Effekt (kein mousemove).
 */
export function SpotlightCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ref = React.useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("group/spot relative", className)}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx) var(--my), color-mix(in oklch, var(--signal) 16%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  )
}
