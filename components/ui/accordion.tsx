"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

function Accordion(
  props: React.ComponentProps<typeof AccordionPrimitive.Root>
) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-start justify-between gap-5 py-7 text-left text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors outline-none hover:text-signal focus-visible:text-signal sm:text-xl [&[data-state=open]]:text-signal",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="mt-1.5 size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-[var(--ease-premium)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-signal" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-[0.975rem] leading-relaxed text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      {/* Einzug auf die Textspalte des Triggers: der Index links steht frei,
          Frage und Antwort teilen sich dieselbe Achse. */}
      <div className={cn("max-w-2xl pr-6 pb-7 sm:pl-[3rem]", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
