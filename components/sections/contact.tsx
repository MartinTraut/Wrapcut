"use client"

import * as React from "react"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHead } from "@/components/shared/section-head"
import { Reveal } from "@/components/shared/reveal"
import { Button } from "@/components/ui/button"
import { Field, Input, Textarea } from "@/components/ui/field"
import { services, site } from "@/lib/site"

/**
 * Kontakt: drei direkte Wege plus ein Formular.
 *
 * Das Formular versendet über `mailto:` — bewusst, nicht als Notlösung. Ein
 * echter Versand bräuchte einen Mailanbieter mit API-Schlüssel; solange der
 * nicht vom Kunden vorliegt, wäre jedes „Danke, Nachricht gesendet!"
 * schlicht gelogen. Ein `mailto:` funktioniert dagegen ab der ersten Minute
 * und macht für den Nutzer sichtbar, was passiert.
 *
 * Damit das nicht wie ein Rückschritt wirkt, stehen Anruf und WhatsApp
 * gleichrangig daneben — bei einem Handwerksbetrieb sind das ohnehin die
 * Wege, die Kunden bevorzugen.
 *
 * Sobald ein Versandschlüssel vorliegt, ersetzt eine Route-Handler-Anbindung
 * `buildMailto` — die Feldstruktur bleibt unverändert.
 */
export function Contact() {
  const [vehicle, setVehicle] = React.useState("")
  const [service, setService] = React.useState("")
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [handedOver, setHandedOver] = React.useState(false)
  const phoneRef = React.useRef<HTMLInputElement>(null)

  const mailto = React.useMemo(() => {
    const subject = `Anfrage: ${service || "Folierung"}${vehicle ? `, ${vehicle}` : ""}`
    const body = [
      `Name: ${name}`,
      `Telefon: ${phone}`,
      `E-Mail: ${email}`,
      `Fahrzeug: ${vehicle}`,
      `Leistung: ${service}`,
      "",
      message,
    ].join("\n")
    // `encodeURIComponent` ist hier Pflicht, nicht Kosmetik: Umlaute und
    // Zeilenumbrüche zerlegen sonst die URL, und ein Semikolon im Freitext
    // könnte weitere Header anhängen.
    return `${site.contact.emailHref}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }, [name, phone, email, vehicle, service, message])

  return (
    <section id="kontakt" className="section-lg relative scroll-mt-24 overflow-hidden">
      <div
        aria-hidden
        className="bg-stage pointer-events-none absolute inset-0 -z-10"
      />

      <SectionHead
        label="Kontakt"
        titleLines={["Erzählen Sie uns", "von Ihrem Fahrzeug."]}
        lead="Beratung und Festpreis-Angebot kosten nichts. Sagen Sie uns, was Ihnen vorschwebt, wir melden uns mit einer ehrlichen Einschätzung."
        id="kontakt-titel"
      />

      <Container className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
        {/* Direkte Wege zuerst, bei einem Handwerksbetrieb greifen die
            meisten zum Telefon, bevor sie ein Formular ausfüllen. */}
        <Reveal className="lg:col-span-5">
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href={site.contact.phoneHref}
                // Bewusst kein `ring-iris`: eine cyan-magenta umrandete Karte
                // über zwei grau umrandeten liest sich im Kontext eines
                // Formulars wie ein Fehler- oder Selected-Zustand. Die
                // Hierarchie trägt hier der Volltonkreis mit dem Hörer.
                className="group flex items-center gap-5 rounded-2xl border border-brand/35 bg-brand/[0.06] p-6 transition-colors duration-200 hover:bg-brand/[0.1] focus-ring"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">
                    Direkt anrufen
                  </span>
                  <span className="nums mt-1 block text-lg font-semibold">
                    {site.contact.phone}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                /* WhatsApp trägt seine eigene Farbe, nicht die der Marke.
                   Grün ist bei diesem Kanal ein Wiedererkennungszeichen: die
                   Karte wird dadurch als Messenger gelesen, bevor das Wort
                   gelesen wird. Der Wert liegt in oklch statt beim
                   Original-Hex, damit er zur Helligkeitsreihe der übrigen
                   Farben passt und auf dem dunklen Grund nicht ausbrennt. */
                className="group relative flex items-center gap-5 rounded-2xl border border-[oklch(0.72_0.19_150/45%)] bg-[oklch(0.72_0.19_150/9%)] p-6 transition-colors duration-200 hover:border-[oklch(0.72_0.19_150/85%)] hover:bg-[oklch(0.72_0.19_150/16%)] focus-ring"
              >
                {/*
                  Der Schein liegt als Radialverlauf auf der Karte, nicht als
                  weichgezeichneter Kreis dahinter.

                  Vorher war es ein `size-32`-Kreis mit `blur-2xl`, den
                  `overflow-hidden` an der Kartenkante abschnitt. Auf 390 px
                  reichte er über die halbe Karte, und die Schnittkante lief
                  als sichtbare Linie quer durch den Rahmen — auf dem Telefon
                  las sich das wie ein zweiter, verrutschter Rahmen. Ein
                  Verlauf im Hintergrund kann nicht schneiden, braucht keinen
                  Filter und kostet nichts.
                */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-70 transition-opacity duration-[500ms] ease-[var(--ease-premium)] group-hover:opacity-100 [background:radial-gradient(70%_120%_at_12%_0%,oklch(0.72_0.19_150/26%),transparent_70%)]"
                />
                {/* Volltonkreis wie bei der Telefonkarte darüber. Als
                    Umrisskreis stand hier ein Ring in einem Rahmen in einem
                    Rahmen — drei Konturen auf drei Zentimetern. */}
                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-[oklch(0.78_0.19_150)] text-[oklch(0.22_0.05_150)] transition-transform duration-[280ms] ease-[var(--ease-premium)] group-hover:scale-105">
                  <MessageCircle className="size-5" aria-hidden />
                </span>
                <span className="relative">
                  <span className="block text-sm text-muted-foreground">
                    Fotos schicken per
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-[oklch(0.9_0.16_150)]">
                    WhatsApp
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-2xl border border-border bg-surface/30 p-6 transition-colors duration-200 hover:border-brand/50 focus-ring"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">
                    Studio besuchen
                  </span>
                  <span className="mt-1 block text-lg font-semibold">
                    {site.address.street}, {site.address.city}
                  </span>
                </span>
              </a>
            </li>
          </ul>

          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            {site.availability}. Wir sitzen in {site.address.city}, wenige
            Minuten von Neuss, Mönchengladbach und Düsseldorf.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            className="rounded-2xl border border-border bg-surface/30 p-7 lg:p-9"
            onSubmit={(event) => {
              event.preventDefault()
              // Genau eine Rückmeldemöglichkeit ist Pflicht — welche, darf der
              // Nutzer entscheiden. `required` auf beiden Feldern würde eine
              // Angabe erzwingen, die er vielleicht nicht machen will.
              if (!phone.trim() && !email.trim()) {
                setError(
                  "Bitte hinterlassen Sie eine Telefonnummer oder eine E-Mail-Adresse, sonst können wir nicht antworten.",
                )
                phoneRef.current?.focus()
                return
              }
              setError(null)
              setHandedOver(true)
              window.location.href = mailto
            }}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Ihr Name" required>
                {(props) => (
                  <Input
                    {...props}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Max Mustermann"
                  />
                )}
              </Field>

              {/* Telefon und E-Mail getrennt statt als Kombifeld: ein Feld für
                  beides erzwingt entweder die falsche Tastatur oder das
                  falsche Autofill. Getrennt bekommt jedes Feld `inputMode`,
                  `type` und `autoComplete`, die zu ihm passen. */}
              <Field id="phone" label="Telefon" hint="Am schnellsten für Rückfragen">
                {(props) => (
                  <Input
                    {...props}
                    ref={phoneRef}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0176 …"
                    aria-invalid={error ? true : undefined}
                  />
                )}
              </Field>

              <Field id="email" label="E-Mail" hint="Oder hier, wenn Ihnen das lieber ist">
                {(props) => (
                  <Input
                    {...props}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="name@beispiel.de"
                    aria-invalid={error ? true : undefined}
                  />
                )}
              </Field>

              <Field id="vehicle" label="Fahrzeug" hint="Marke, Modell, Baujahr">
                {(props) => (
                  <Input
                    {...props}
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    placeholder="BMW M2, 2023"
                  />
                )}
              </Field>

              <Field id="service" label="Leistung">
                {(props) => (
                  <div className="relative">
                    <select
                      {...props}
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-input bg-surface/60 px-4 text-base sm:text-[0.95rem] text-foreground transition-[border-color,box-shadow] duration-200 hover:border-input/80 focus-visible:border-brand focus-ring"
                    >
                      <option value="">Noch unklar, bitte beraten</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground"
                    >
                      ▾
                    </span>
                  </div>
                )}
              </Field>
            </div>

            <Field
              id="message"
              label="Ihr Vorhaben"
              hint="Wunschfarbe, Finish, Umfang, je konkreter, desto genauer das Angebot."
              className="mt-6"
            >
              {(props) => (
                <Textarea
                  {...props}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ich möchte mein Fahrzeug in Satin Schwarz folieren lassen und dazu die Front mit Lackschutz …"
                />
              )}
            </Field>

            {/* Fehler direkt über dem Absenden, nicht am Formularkopf: dort
                steht der Nutzer gerade, und der Fokus springt ins erste
                betroffene Feld. */}
            {error ? (
              <p
                role="alert"
                className="mt-6 rounded-lg border border-destructive/45 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit" size="lg">
                <Mail />
                Anfrage senden
              </Button>
              {/* Ehrlich sagen, was der Klick tut. Ein Button, der unerwartet
                  das Mailprogramm öffnet, wirkt kaputt, angekündigt wirkt er
                  wie eine bewusste Entscheidung. */}
              <p className="text-sm text-muted-foreground">
                Öffnet Ihr E-Mail-Programm mit fertig ausgefüllter Nachricht an{" "}
                <span className="text-foreground">{site.contact.email}</span>.
              </p>
            </div>

            {/* Der Ausweg aus der Sackgasse. Wer keinen Mail-Client
                registriert hat, auf Android und im Webmail-Alltag der
                Normalfall, klickt sonst und sieht nichts passieren, und das
                ausgerechnet am Ende des gesamten Conversion-Pfads. */}
            {handedOver ? (
              <p
                role="status"
                className="mt-5 rounded-lg border border-brand/35 bg-brand/[0.07] px-4 py-3.5 text-sm leading-relaxed text-foreground/90"
              >
                Ihr E-Mail-Programm sollte sich jetzt öffnen. Passiert nichts?
                Schreiben Sie direkt an{" "}
                <a
                  href={site.contact.emailHref}
                  className="text-brand underline underline-offset-4"
                >
                  {site.contact.email}
                </a>{" "}
                oder rufen Sie an:{" "}
                <a
                  href={site.contact.phoneHref}
                  className="nums text-brand underline underline-offset-4"
                >
                  {site.contact.phone}
                </a>
                .
              </p>
            ) : null}

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Ihre Angaben nutzen wir ausschließlich, um Ihre Anfrage zu
              beantworten. Details in unserer{" "}
              <a
                href="/datenschutz"
                className="text-foreground underline underline-offset-4 hover:text-brand"
              >
                Datenschutzerklärung
              </a>
              .
            </p>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}
