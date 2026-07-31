"use client"

import { Star, Quote } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal } from "@/components/shared/reveal"
import { SpotlightCard } from "@/components/shared/spotlight-card"
import { testimonials, site, type Testimonial } from "@/lib/site"

/** Kleines Google "G" als Inline-SVG (lucide hat kein Brand-Icon). */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="relative shrink-0">
      <div className="rounded-full bg-gradient-to-br from-signal/70 via-brand/40 to-transparent p-px">
        <div className="flex size-11 items-center justify-center rounded-full bg-card text-sm font-bold text-signal">
          {initials}
        </div>
      </div>
      <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border border-border bg-background shadow-sm">
        <GoogleG className="size-3" />
      </span>
    </div>
  )
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <SpotlightCard className="w-[20rem] shrink-0 sm:w-[23rem]">
      <article className="flex h-full flex-col border border-border bg-card/40 p-8 transition-[border-color,transform] duration-[240ms] ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-signal">
        <div className="flex items-center justify-between">
          <div className="flex" aria-label="5 von 5 Sternen">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-signal text-signal" />
            ))}
          </div>
          <Quote className="size-6 text-foreground/20" aria-hidden="true" />
        </div>

        <p className="mt-6 flex-1 leading-relaxed text-foreground/90">
          {testimonial.text}
        </p>

        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
          <Avatar name={testimonial.name} />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{testimonial.name}</div>
            <div className="text-xs text-muted-foreground">
              Google Rezension ·{" "}
              <time dateTime={testimonial.date} className="nums">
                {new Date(testimonial.date).toLocaleDateString("de-DE", {
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
      </article>
    </SpotlightCard>
  )
}

export function Testimonials() {
  // Verdoppelte Liste für nahtlosen Loop.
  const marqueeItems = [...testimonials, ...testimonials]

  return (
    <section id="bewertungen" className="section-tight scroll-mt-20">
      <Container width="wide">
        {/* Linksbündig wie der Rest der Seite — ein zentrierter Block mitten in
            einer sonst linksbündigen Komposition liest sich als Template.
            Die Regel gehört IN den Container, nicht auf ihn: außen lief sie
            von 0 bis zur vollen Fensterbreite, während dieselbe Linie in
            allen anderen Sections auf der Satzkante sitzt. */}
        <Reveal className="border-t border-border pt-10 [&>*]:max-w-2xl">
          <Eyebrow index="05">Kundenstimmen</Eyebrow>
          <h2 className="t-h2 mt-7 text-balance">
            Das sagen Kunden aus Jüchen und Umgebung.
          </h2>
          <div className="mt-7 inline-flex flex-wrap items-center gap-3 rounded-full border border-input px-5 py-2.5">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-signal text-signal" />
              ))}
            </span>
            <span className="t-mono-sm nums font-medium">
              5,0 von 5 bei {site.reviews.count} Google-Bewertungen
            </span>
          </div>
        </Reveal>
      </Container>

      {/* Auto-Scroll-Marquee, pausiert beim Hover. */}
      <Reveal className="group relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {/* Nutzt das globale `marquee`-Keyframe aus globals.css; das früher
            hier inline definierte `testimonials-marquee` war eine Dublette,
            die nur in der Laufzeit abwich. */}
        <div className="animate-marquee flex w-max gap-4 px-4 [animation-duration:46s] group-hover:[animation-play-state:paused]">
          {marqueeItems.map((testimonial, i) => (
            <ReviewCard
              key={`${testimonial.name}-${i}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </Reveal>

      <Container width="wide">
        <Reveal className="mt-12">
          <a
            href={site.social.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="t-mono inline-flex items-center gap-2.5 rounded-full border border-input px-5 py-3.5 transition-colors duration-300 ease-[var(--ease-premium)] hover:border-signal hover:text-signal focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <GoogleG className="size-4" />
            Alle {site.reviews.count} Bewertungen auf Google ansehen
          </a>
        </Reveal>
      </Container>
    </section>
  )
}
