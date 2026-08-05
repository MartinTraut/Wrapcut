import { Quote, Star } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHead } from "@/components/shared/section-head"
import { Reveal } from "@/components/shared/reveal"
import { VelocityMarquee } from "@/components/shared/velocity-marquee"
import { site, testimonials, type Testimonial } from "@/lib/site"

/** Google-„G" als Inline-SVG — lucide führt keine Markenzeichen. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
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
      <div className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-sm font-bold text-muted-foreground">
        {initials}
      </div>
      <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border border-border bg-background">
        <GoogleG className="size-3" />
      </span>
    </div>
  )
}

/*
 * Bewusst keine gleiche Kartenhöhe.
 *
 * `h-full` plus `flex-1` auf dem Text zwang jede Karte auf die Höhe der
 * längsten Rezension. Bei der kürzesten („Super Preis-Leistungs-Verhältnis…")
 * standen dadurch rund 180 px Leere zwischen Text und Autorenzeile — vier
 * Boxen mit unterschiedlich großen Löchern lesen sich als Fehler, nicht als
 * Raster. Der Marquee-Track steht ohnehin auf `items-center`; die Karten
 * sitzen jetzt unterschiedlich hoch auf einer Mittelachse, und genau diesen
 * Rhythmus will ein Laufband.
 */
function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <article className="bg-iris-wash relative mx-2 flex w-[21rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-border p-8 transition-[border-color,transform] duration-[280ms] ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-brand/60 sm:w-[24rem]">
      {/* Farbkante an der Oberkante statt einer weiteren grauen Linie. */}
      <span aria-hidden className="bg-iris absolute inset-x-0 top-0 h-0.5" />

      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label="5 von 5 Sternen">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-brand text-brand" />
          ))}
        </div>
        <Quote className="size-7 text-brand/35" aria-hidden />
      </div>

      <p className="mt-6 text-[1.05rem] leading-relaxed text-foreground">
        {review.text}
      </p>

      <div className="mt-7 flex items-center gap-3 border-t border-border pt-6">
        <Avatar name={review.name} />
        <div className="leading-tight">
          <div className="text-sm font-semibold">{review.name}</div>
          <div className="text-xs text-muted-foreground">
            Google Rezension ·{" "}
            <time dateTime={review.date} className="nums">
              {new Date(review.date).toLocaleDateString("de-DE", {
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Reviews() {
  // Verdoppelte Liste — die Marquee springt bei -50 % zurück auf 0.
  const items = [...testimonials, ...testimonials]

  return (
    <section id="bewertungen" className="section-sm scroll-mt-24">
      <SectionHead
        label="Bewertungen"
        titleLines={["Was Kunden nach", "der Abholung sagen."]}
        lead="Ungefiltert von Google, jede dieser Rezensionen ist im Profil nachlesbar."
        action={
          <a
            href={site.social.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-wrap items-center gap-3 rounded-full border border-input px-5 py-3 transition-colors duration-200 hover:border-brand/70 focus-ring"
          >
            <GoogleG className="size-4" />
            <span className="nums text-sm font-medium">
              5,0 von 5 bei {site.reviews.count} Bewertungen ansehen
            </span>
          </a>
        }
        id="bewertungen-titel"
      />

      {/* Das Band läuft mit dem Scroll. Anders als bei einer festen
          Endlosschleife entsteht dadurch der Eindruck, dass die Rezensionen
          auf den Nutzer reagieren statt neben ihm abzulaufen. */}
      <Reveal className="mt-14 lg:mt-16">
        <VelocityMarquee className="mask-fade-x" baseSpeed={1.1}>
          <>
            {items.map((review, i) => (
              <ReviewCard key={`${review.name}-${i}`} review={review} />
            ))}
          </>
        </VelocityMarquee>
      </Reveal>

      <Container>
        <Reveal className="mt-10 text-sm text-muted-foreground">
          <p>
            Stand: {site.reviews.count} Bewertungen im Google-Unternehmensprofil
            von {site.businessName}.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
