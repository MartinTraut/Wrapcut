# WrapCut — Projektregeln

Premium-Relaunch von **wrapcut.nrw** (Fahrzeugfolierung & Lackschutz, Jüchen).
Die globalen Design-, SEO- und Motion-Standards aus `~/.claude/CLAUDE.md`
gelten unverändert. Hier steht nur, was für **dieses** Repo gilt — jede Regel
steht hier, weil ihr Fehlen schon einmal Zeit gekostet hat.

## Stack

Next.js 16 App Router (Turbopack), React 19, TypeScript, Tailwind v4,
Framer Motion 12, Lenis. Siehe auch `AGENTS.md`: Next 16 weicht von den
Trainingsdaten ab, im Zweifel `node_modules/next/dist/docs/` lesen.

## Lokal arbeiten

- **Dev-Server auf Port 3006** (3000 und 3010 belegen fremde Projekte).
- Der Server muss **abgekoppelt** gestartet werden, sonst räumt das Harness
  ihn am Ende des Zuges ab:
  ```bash
  nohup npm run dev -- --port 3006 > <scratchpad>/dev.log 2>&1 & disown
  ```
- `npm install` braucht einen eigenen Cache: in `~/.npm/_cacache` liegen
  root-eigene Dateien. Kein `sudo`, sondern `--cache <scratchpad>/npmcache`.
- Browser-QA über Playwright im Scratchpad-venv, Chromium mit
  `--use-gl=swiftshader --enable-unsafe-swiftshader`.

## Inhalte: keine erfundenen Fakten

Die Altseite ist die einzige Quelle für Preise, Dauern, Haltbarkeiten und
Stammdaten. Was dort nicht steht, steht auch hier nicht — offene Punkte
werden als Kundenfrage geführt, nicht geschätzt. Öffnungszeiten sind nirgends
belegt, deshalb durchgängig „Termine nach Vereinbarung".

**Globale Suchen-und-Ersetzen über `lib/*.ts` sind gefährlich.** Eine
pauschale Entfernung von Gedankenstrichen hat `"1.600 – 8.000 €"` zu
`"1.600, 8.000 €"` gemacht — aus einer Spanne wurden zwei Festpreise. Bei
Inhaltsdateien jeden Treffer einzeln ansehen; Zahlen sind Aussagen, keine
Typografie.

## Sicherheit

- `RESEND_API_KEY` kommt vom Kunden. **Niemals** einen Key erzeugen oder in
  Code schreiben.
- `.env.local` wird nie committet.
- Die Kontakt-Route muss laut scheitern (503), wenn die Konfiguration fehlt.
  Kein vorgetäuschter Erfolg.

## Fallen, die hier schon zugeschnappt sind

**IntersectionObserver zählt das eigene `clip-path` mit.** Der
`curtain`-Reveal versteckt sein Element mit `inset(0 0 100% 0)`, also auf
null Höhe. Mit `amount: 0.15` wartet der Beobachter dann auf eine
Sichtbarkeit, die erst die Animation herstellen würde, die auf ihn wartet —
das Element bleibt für immer unsichtbar. **Alles, was im Ruhezustand keine
Fläche hat, braucht `amount: 0`.** Betrifft `curtain` in `reveal.tsx` ebenso
wie den auf 0 gesetzten Textblock in `hover-reveal.tsx`.

**Unbekannte Texthöhen animiert man mit `grid-template-rows: 0fr → 1fr`.**
Nicht mit geratenen `max-height`-Werten. Der innere Träger braucht dabei
`overflow: hidden` und, wenn er ein `<span>` ist, zusätzlich `display: block`.

**`overflow: hidden` hält Lenis nicht auf.** Lenis setzt `scrollTop` selbst
und scrollt hinter Overlays munter weiter. Overlays holen sich die Instanz
über `window.__lenis` und rufen `stop()` / `start()`.

**`img.src` ist bei `next/image` immer der größte Kandidat.** Wer die
tatsächlich geladene Auflösung messen will, liest `currentSrc`.

**Framer ignoriert `transition={{ delay }}`**, sobald die Ziel-Variante eine
eigene `transition` mitbringt. Die Verzögerung muss in die Variante.

## Arbeitsweise im Code

- Nach jeder strukturellen Änderung an JSX **erst `npx tsc --noEmit`**, dann
  Screenshots. Abgebrochene Verschachtelungen und JSX-Kommentare in
  Return-Position haben hier mehrfach den Build zerlegt.
- Vor dem Melden: `npx tsc --noEmit`, `npx eslint .`, `npm run build`.
- Layout-Fragen werden **im Browser gemessen**, nicht geschätzt — Textbreiten,
  `getBoundingClientRect`, `currentSrc`, `getComputedStyle`. Eine Headline
  „wirkt zerrissen" ist eine Messung wert, keine Vermutung.
- Mobil ist der Regelfall, nicht der Nachtrag: 390 px auf horizontalen
  Überlauf und Bildgewicht prüfen, bevor etwas als fertig gilt.
- Kommentare erklären **warum**, mit der konkreten Beobachtung dahinter
  (gemessene Werte, der Fehler, den die Lösung verhindert). Kein
  Wiederholen dessen, was der Code ohnehin sagt.
