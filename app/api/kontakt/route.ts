import { NextResponse } from "next/server"
import { site } from "@/lib/site"

/**
 * Serverseitiger Versand der Kontaktanfrage.
 *
 * Setzt RESEND_API_KEY und KONTAKT_EMPFAENGER voraus. Fehlt die Konfiguration,
 * antwortet die Route mit 503 und einer klaren Meldung — das Formular zeigt
 * dann den Fallback (Anruf, WhatsApp, direkte E-Mail) an. Bewusst kein
 * stiller Erfolg: eine verlorene Anfrage ist ein verlorener Auftrag.
 */

type Payload = {
  name: string
  email: string
  phone: string
  vehicle: string
  service: string
  message: string
  consent: boolean
  /** Honeypot – für Menschen unsichtbar, muss leer bleiben. */
  website?: string
}

const SERVICES = [
  "Voll- oder Teilfolierung",
  "Lackschutzfolie (PPF)",
  "Keramikversiegelung",
  "Scheibentönung",
  "Chromleisten & Dekor",
  "Werbebeschriftung",
  "Beratung / Sonstiges",
]

function validate(data: Partial<Payload>) {
  const errors: Record<string, string> = {}

  if (!data.name?.trim() || data.name.trim().length < 2) {
    errors.name = "Bitte geben Sie Ihren Namen an."
  }
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an."
  }
  if (!data.phone?.trim() || data.phone.replace(/\D/g, "").length < 6) {
    errors.phone = "Bitte geben Sie eine Telefonnummer für den Rückruf an."
  }
  if (!data.service || !SERVICES.includes(data.service)) {
    errors.service = "Bitte wählen Sie eine Leistung."
  }
  if (!data.consent) {
    errors.consent = "Ohne Ihre Einwilligung dürfen wir die Daten nicht verarbeiten."
  }

  return errors
}

export async function POST(request: Request) {
  let data: Partial<Payload>
  try {
    data = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültige Anfrage." },
      { status: 400 },
    )
  }

  // Honeypot: Bots füllen jedes Feld aus. Wir tun so, als sei alles gut,
  // verschicken aber nichts.
  if (data.website) {
    return NextResponse.json({ ok: true })
  }

  const errors = validate(data)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.KONTAKT_EMPFAENGER ?? site.contact.email
  const from = process.env.KONTAKT_ABSENDER

  if (!apiKey || !from) {
    console.error(
      "[kontakt] RESEND_API_KEY oder KONTAKT_ABSENDER fehlt – Anfrage konnte nicht versendet werden.",
    )
    return NextResponse.json(
      {
        ok: false,
        message:
          "Der Versand ist gerade nicht möglich. Bitte rufen Sie uns an oder schreiben Sie uns per WhatsApp.",
      },
      { status: 503 },
    )
  }

  const lines = [
    `Name: ${data.name}`,
    `Telefon: ${data.phone}`,
    `E-Mail: ${data.email}`,
    `Fahrzeug: ${data.vehicle || "keine Angabe"}`,
    `Leistung: ${data.service}`,
    "",
    data.message || "(keine Nachricht)",
  ]

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Anfrage ${data.service} – ${data.name}`,
        text: lines.join("\n"),
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error("[kontakt] Resend antwortete mit", response.status, detail)
      return NextResponse.json(
        {
          ok: false,
          message:
            "Die Anfrage konnte nicht zugestellt werden. Bitte rufen Sie uns an oder schreiben Sie uns per WhatsApp.",
        },
        { status: 502 },
      )
    }
  } catch (error) {
    console.error("[kontakt] Versand fehlgeschlagen:", error)
    return NextResponse.json(
      {
        ok: false,
        message:
          "Die Anfrage konnte nicht zugestellt werden. Bitte rufen Sie uns an oder schreiben Sie uns per WhatsApp.",
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
