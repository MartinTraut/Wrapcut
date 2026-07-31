"use client"

import * as React from "react"
import {
  Phone,
  MessageCircle,
  MapPin,
  CalendarClock,
  Check,
  Loader2,
  AlertTriangle,
} from "lucide-react"
import { InstagramIcon } from "@/components/shared/icons"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapEmbed } from "@/components/shared/map"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const SERVICES = [
  "Voll- oder Teilfolierung",
  "Lackschutzfolie (PPF)",
  "Keramikversiegelung",
  "Scheibentönung",
  "Chromleisten & Dekor",
  "Werbebeschriftung",
  "Beratung / Sonstiges",
]

/** Landingpage-Slug → Auswahlwert im Formular. */
const SERVICE_BY_SLUG: Record<string, string> = {
  fahrzeugfolierung: "Voll- oder Teilfolierung",
  lackschutzfolie: "Lackschutzfolie (PPF)",
  keramikversiegelung: "Keramikversiegelung",
  scheibentoenung: "Scheibentönung",
  chromdelete: "Chromleisten & Dekor",
  werbebeschriftung: "Werbebeschriftung",
}

type Status = "idle" | "submitting" | "success" | "error"

const directLinks = [
  {
    href: site.contact.phoneHref,
    icon: Phone,
    label: "Anrufen",
    value: site.contact.phone,
    external: false,
  },
  {
    href: site.contact.whatsappHref,
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Direkt schreiben",
    external: true,
  },
  {
    href: site.social.instagram,
    icon: InstagramIcon,
    label: "Instagram",
    value: site.social.instagramHandle,
    external: true,
  },
]

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle")
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = React.useState("")

  // Der Fokus muss dem Zustandswechsel folgen — sonst landet er nach dem
  // Absenden auf BODY, weil das auslösende Element aus dem DOM verschwindet
  // bzw. `disabled` wird.
  const successRef = React.useRef<HTMLHeadingElement>(null)
  const alertRef = React.useRef<HTMLDivElement>(null)

  /**
   * Vorauswahl aus `?leistung=<slug>`. Die Landingpages haben kein eigenes
   * Formular und verlinken hierher; ohne diese Übergabe stand das Feld
   * „Gewünschte Leistung" nach dem Sprung wieder leer, und der Nutzer musste
   * die gerade gelesene Leistung erneut auswählen.
   *
   * Bewusst direkt auf dem DOM-Knoten statt über State oder
   * `useSearchParams`: die Startseite bleibt damit statisch vorgerendert und
   * es entsteht keine Hydration-Abweichung.
   */
  const serviceRef = React.useRef<HTMLSelectElement>(null)

  React.useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("leistung")
    const preset = slug ? SERVICE_BY_SLUG[slug] : undefined
    if (preset && serviceRef.current && !serviceRef.current.value) {
      serviceRef.current.value = preset
    }
  }, [])

  React.useEffect(() => {
    if (status === "success") successRef.current?.focus()
    if (status === "error") alertRef.current?.focus()
  }, [status])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus("submitting")
    setErrors({})
    setErrorMessage("")

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          vehicle: data.get("vehicle"),
          service: data.get("service"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setErrors(result.errors ?? {})
        setErrorMessage(
          result.message ??
            "Bitte prüfen Sie die markierten Felder und versuchen Sie es erneut.",
        )
        setStatus("error")
        return
      }

      form.reset()
      setStatus("success")
    } catch {
      setErrorMessage(
        "Die Verbindung ist fehlgeschlagen. Bitte rufen Sie uns an oder schreiben Sie uns per WhatsApp.",
      )
      setStatus("error")
    }
  }

  return (
    <section
      id="kontakt"
      className="section relative scroll-mt-20 overflow-hidden"
    >
      {/* Messraster statt Farb-Glow: die Kontaktfläche liest sich als
          Arbeitsblatt, nicht als beleuchtetes Banner. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(90%_70%_at_50%_0%,#000,transparent_75%)]" />
      </div>

      <Container width="wide">
        {/* Die Regel läuft über die volle Bühnenbreite, der Satz bleibt in der
            Lesespalte — eine auf max-w-2xl beschnittene Linie liest sich als
            abgeschnittener Rahmen, nicht als Ordnungslinie. */}
        <div className="border-t border-border pt-10">
          <div className="max-w-2xl">
            <Eyebrow index="07">Kontakt</Eyebrow>
            <h2 className="t-h2 mt-7 text-balance">
              Bereit für den <span className="text-outline">neuen Look?</span>
            </h2>
            <p className="t-lead mt-6 max-w-xl text-muted-foreground text-pretty">
              Kurz Fahrzeug und Ziel schildern, Sie bekommen ein ehrliches
              Festpreis-Angebot. Am schnellsten per Anruf oder WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          {/* Linke Spalte: Direktkontakt, Standort, Karte */}
          <div className="flex flex-col gap-5">
            {/* Auf Mobile untereinander — dreispaltig bricht die Telefonnummer */}
            <div className="grid gap-3 sm:grid-cols-3">
              {directLinks.map(({ href, icon: Icon, label, value, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex min-h-14 items-center gap-3.5 border border-border p-4 transition-colors duration-200 ease-[var(--ease-premium)] hover:border-signal focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:flex-col sm:items-start sm:gap-4"
                >
                  <Icon className="size-4.5 shrink-0 text-signal" />
                  <span className="leading-tight">
                    <span className="t-mono block text-muted-foreground">
                      {label}
                    </span>
                    <span className="mt-1.5 block text-sm font-semibold">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            {/* Standort & Verfügbarkeit */}
            <div className="grid gap-5 border border-border p-5 sm:grid-cols-2">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">
                  <span className="block font-semibold text-foreground">
                    {site.address.street}
                  </span>
                  {site.address.postalCode} {site.address.city}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CalendarClock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">
                  <span className="block font-semibold text-foreground">
                    {site.availability}
                  </span>
                  Anruf oder WhatsApp genügt
                </span>
              </div>
            </div>

            <div className="h-56 lg:h-64">
              <MapEmbed />
            </div>
          </div>

          {/* Rechte Spalte: Formular */}
          <div className="border border-border bg-card/30 p-6 sm:p-9">
            {status === "success" ? (
              // role="status" + gezielter Fokus: vorher wurde das Formular
              // ersetzt, ohne dass Screenreader etwas erfuhren und ohne dass
              // der Fokus mitwanderte (er fiel auf BODY).
              <div
                role="status"
                className="flex h-full min-h-80 flex-col items-center justify-center text-center"
              >
                <div className="flex size-14 items-center justify-center rounded-full border border-signal/40 text-signal">
                  <Check className="size-7" />
                </div>
                <h3 ref={successRef} tabIndex={-1} className="t-h3 mt-5 outline-none">
                  Anfrage ist raus
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Wir haben Ihre Anfrage erhalten und melden uns zeitnah zurück.
                  Wenn es eilt, erreichen Sie uns direkt unter{" "}
                  <a
                    href={site.contact.phoneHref}
                    className="font-semibold text-signal underline-offset-2 hover:underline"
                  >
                    {site.contact.phone}
                  </a>
                  .
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setStatus("idle")}
                >
                  Neue Anfrage
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-4">
                {status === "error" && errorMessage && (
                  <div
                    ref={alertRef}
                    role="alert"
                    tabIndex={-1}
                    className="flex items-start gap-3 border border-destructive/40 bg-destructive/10 p-3.5 text-sm text-foreground outline-none"
                  >
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <span>
                      {errorMessage}{" "}
                      <a
                        href={site.contact.emailHref}
                        className="font-semibold underline underline-offset-2"
                      >
                        Alternativ direkt per E-Mail
                      </a>
                      .
                    </span>
                  </div>
                )}

                {/* Honeypot – visuell und für Screenreader ausgeblendet */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="sr-only"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Name" error={errors.name}>
                    <Input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Ihr Name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                  </Field>
                  <Field id="phone" label="Telefon" error={errors.phone}>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="Für den Rückruf"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="email" label="E-Mail" error={errors.email}>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@beispiel.de"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </Field>
                  <Field
                    id="vehicle"
                    label="Fahrzeug (Farbe & Baujahr)"
                    error={errors.vehicle}
                    optional
                  >
                    <Input
                      id="vehicle"
                      name="vehicle"
                      placeholder="z. B. BMW M3, schwarz, 2021"
                    />
                  </Field>
                </div>

                <Field id="service" label="Gewünschte Leistung" error={errors.service}>
                  <select
                    id="service"
                    name="service"
                    required
                    ref={serviceRef}
                    defaultValue=""
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    // Gleiche Kette wie Input/Textarea, inklusive Fokusring —
                    // vorher wich das Select hier ab.
                    className="flex h-12 w-full border border-input bg-card/40 px-4 text-sm text-foreground shadow-sm transition-colors outline-none focus-visible:border-signal/60 focus-visible:ring-2 focus-visible:ring-signal/25"
                  >
                    <option value="" disabled>
                      Bitte wählen
                    </option>
                    {SERVICES.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </Field>

                <Field id="message" label="Nachricht" error={errors.message} optional>
                  <Textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Erzählen Sie uns von Ihrem Wunschprojekt"
                  />
                </Field>

                <div className="grid gap-1.5">
                  <label className="flex cursor-pointer items-start gap-3 py-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={
                        errors.consent ? "consent-error" : undefined
                      }
                      className="mt-0.5 size-5 shrink-0 cursor-pointer border border-input bg-card/40 accent-[var(--primary)] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    />
                    <span>
                      Ich habe die{" "}
                      <a
                        href="/datenschutz"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        Datenschutzerklärung
                      </a>{" "}
                      gelesen und stimme der Verarbeitung meiner Daten zur
                      Bearbeitung der Anfrage zu.
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="consent-error" className="text-sm text-destructive">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* aria-disabled statt disabled: ein `disabled` Button wird
                    vom Browser geblurrt, der Fokus fiel dadurch auf BODY. */}
                <Button
                  type="submit"
                  size="lg"
                  aria-disabled={status === "submitting"}
                  aria-busy={status === "submitting"}
                  onClick={(e) => {
                    if (status === "submitting") e.preventDefault()
                  }}
                  className="mt-1 w-full aria-disabled:pointer-events-none aria-disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Wird gesendet
                    </>
                  ) : (
                    "Festpreis anfragen"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string
  label: string
  error?: string
  /** Kennzeichnet die zwei freiwilligen Felder — vorher war der Unterschied
   *  erst nach dem Absenden sichtbar (WCAG 3.3.2). */
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    // `group/field` + der Strich unten: beim Fokus läuft eine 1px-Linie von
    // links unter das Feld. Das Formular war zuvor die einzige Fläche der
    // Seite ganz ohne Bewegung — ausgerechnet die Conversion-Fläche.
    <div className="group/field relative grid gap-1.5">
      <Label htmlFor={id} className={cn(error && "text-destructive")}>
        {label}
        {optional ? (
          <span className="ml-2 font-normal text-muted-foreground normal-case">
            optional
          </span>
        ) : null}
      </Label>
      <div className="relative">
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-[220ms] ease-[var(--ease-out-expo)] group-focus-within/field:scale-x-100"
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
