# Project Brief — WrapCut.nrw (Relaunch)

> Autonom abgeleitet vom website-builder-Skill am 2026-06-08 aus:
> `https://wrapcut.nrw/` (URL / Relaunch).
> Bitte Annahmen prüfen und alle `TODO` vor Go-live auflösen.

## 1. Quelle & Ingestion

- **Typ:** Relaunch (Bestandsseite = Durable-One-Pager)
- **Analysiert:** Startseite wrapcut.nrw (einzige inhaltstragende Seite)
- **Extrahierte Fakten:** Fahrzeugfolierungs-/Lackschutz-Fachbetrieb aus Jüchen
  (Rhein-Kreis Neuss), Einzugsgebiet Neuss/Düsseldorf/Mönchengladbach.
  Telefon +49 176 60824446, Instagram @wrapcut.nrw, „zertifizierter Lackschutz
  Fachbetrieb", 3 Google-Bewertungen. Logo übernommen (Original-PNG).
- Unbekanntes (Adresse, E-Mail, Preise, Öffnungszeiten, USt-ID) → `TODO`.

## 2. Strategie

- **Zielgruppe:** Fahrzeughalter (privat & Gewerbe/Flotte) im Rhein-Kreis Neuss,
  die Optik-Upgrade oder Werterhalt suchen; Objektionen: Lackschäden,
  Reversibilität, Legalität (Tönung), Preis-Unsicherheit.
- **Branche / Premium-Anmutung:** Automotive-Detailing → dunkel, hochkontrastig,
  präzise, „Schutz + Design". Kein Klischee-Orange.
- **Fünf UX-Antworten:** Was → Hero/Leistungen · Für wen → Hero/FAQ ·
  Warum besser → Leistungen/Ablauf · Warum vertrauen → Stats/Bewertungen/Zerti.
  · Nächster Schritt → Kontakt (Anruf / WhatsApp / Formular).
- **Primäres Conversion-Ziel:** qualifizierte Anfrage (Anruf, WhatsApp, Formular).
- **Architektur:** Premium-One-Pager + /impressum + /datenschutz.
  Sections: Header · Hero · Trust-Marquee · Leistungen (Bento) · Stats · Ablauf
  · Galerie · Bewertungen · FAQ · Kontakt · Footer.

## 3. Designsystem (abgeleitet)

- **Farbe:** „Obsidian & Racing Green" (dark-first). Obsidian-Schwarz Basis,
  Off-White Text, Racing Green als Markenfarbe (harmoniert mit Original-Logo),
  helleres Signal-Grün für Akzente, Chrome-Verläufe (Lackschutz-Anmutung).
- **Typografie:** Archivo (Display, 600–900) + Inter (Body) + JetBrains Mono.
- **Spacing/Radius/Shadow:** großzügig; präzise Radien (0.5rem); wenige weiche
  Schatten; Hairline-Borders + tonale Panels für Tiefe.
- **Motion:** Reveal-on-Scroll (Blur+Y), Hover-Lift, Marquee, 180–450ms,
  `cubic-bezier(.22,1,.36,1)`; respektiert `prefers-reduced-motion`.

## 4. Copywriting

- **Sprache:** Deutsch. Ton: souverän, konkret, vertrauensbildend, ohne
  KI-Floskeln. Fakten aus Quelle erhalten; FAQ interview-artig (8 Fragen) für
  GEO/AI-Antworten.

## 5. Build

- **Stack:** Next.js 16 (App Router, TS) + Tailwind v4 + shadcn-Style UI +
  Framer Motion. `next build` läuft clean.
- **Shop:** nein.
- **Komponenten:** eigenes Reveal-System, Bento-Leistungen, Timeline-Ablauf,
  Galerie mit Hover-Zoom, Accordion-FAQ, mailto-Kontaktformular.

## 6. Annahmen

- PLZ Jüchen 41363 & ungefähre Geokoordinaten als Platzhalter gesetzt.
- E-Mail kontakt@wrapcut.nrw angenommen (TODO bestätigen).
- Galerie nutzt Beispiel-Stockfotos (Unsplash) als klar markierte Platzhalter.
- Öffnungszeiten Mo–Fr 9–18 Uhr angenommen.

## 7. Offene TODOs für den Kunden

- [ ] Exakte Adresse (Straße/Hausnr.), echte E-Mail, Öffnungszeiten, USt-ID.
- [ ] Impressum & Datenschutz rechtlich vervollständigen/prüfen.
- [ ] Echte Projektfotos statt Unsplash-Platzhalter (`next.config` Domain anpassen).
- [ ] OG-Bild `public/og.jpg` (1200×630) hinterlegen.
- [ ] Echten Google-Business-Link & Bewertungs-Schnitt/Anzahl bestätigen.
- [ ] Exakte Geokoordinaten (Google Maps) für LocalBusiness-Schema.

## 8. Run & Deploy

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # läuft clean
```

Deploy: Vercel-kompatibel. Domain wrapcut.nrw verbinden.
