/**
 * Zentrale Single-Source-of-Truth für alle Seiteninhalte & Stammdaten.
 *
 * Alle Stammdaten, Bewertungen, Rezensionen und Leistungstexte stammen aus der
 * Bestandsseite wrapcut.nrw (Stand 30.07.2026). Nichts ist erfunden.
 * Verbleibende Unsicherheiten sind explizit als TODO markiert.
 */

export const site = {
  name: "WrapCut",
  /** Google-Business-Name der Bestandsseite */
  businessName: "Wrapcut – Ihr Folienexperte aus NRW / Jüchen",
  legalName: "WrapCut.nrw", // TODO: vollständige Firmierung + Rechtsform (Impressum, §5 DDG)
  domain: "wrapcut.nrw",
  url: "https://wrapcut.nrw",
  tagline: "Schutz & Design für Ihr Fahrzeug",
  description:
    "Fahrzeugfolierung, Lackschutzfolie (PPF), Keramikversiegelung und Scheibentönung in Jüchen – für Neuss, Mönchengladbach und Düsseldorf.",

  // ---- NAP (Name / Address / Phone) — Local-SEO-kritisch, aus der Bestandsseite ----
  contact: {
    phone: "+49 176 60824446",
    phoneHref: "tel:+4917660824446",
    whatsappHref: "https://wa.me/4917660824446",
    email: "info@wrapcut.nrw",
    emailHref: "mailto:info@wrapcut.nrw",
  },

  address: {
    street: "Neusser Str. 111",
    postalCode: "41363",
    city: "Jüchen",
    region: "Nordrhein-Westfalen",
    country: "DE",
    countryName: "Deutschland",
  },

  /** Exakte Koordinaten des Standorts (aus dem Kartenblock der Bestandsseite) */
  geo: {
    latitude: 51.0991222,
    longitude: 6.5215858,
  },

  /** Belegte Google-Bewertungen der Bestandsseite */
  reviews: {
    rating: 5,
    count: 24,
  },

  /**
   * Öffnungszeiten sind nirgends belegt – bewusst keine Angabe.
   * Stattdessen wird durchgängig "Termine nach Vereinbarung" kommuniziert.
   */
  availability: "Termine nach Vereinbarung",

  // Einzugsgebiet (Originalwortlaut Footer der Bestandsseite)
  serviceArea: [
    "Jüchen",
    "Neuss",
    "Grevenbroich",
    "Mönchengladbach",
    "Düsseldorf",
    "Korschenbroich",
    "Kaarst",
    "Willich",
    "Meerbusch",
    "Viersen",
    "Krefeld",
  ],

  social: {
    instagram: "https://instagram.com/wrapcut.nrw",
    instagramHandle: "@wrapcut.nrw",
    googleMaps:
      "https://www.google.com/maps?cid=0x47bf4dfa432761f3:0x299f3a7742b52470",
  },

  /**
   * Absolute Anker (/#…) statt reiner Hashes: Die Navigation steht auch auf
   * den Landingpages, von dort muss sie zur Startseite zurückführen.
   * SmoothScroll fängt sie ab, solange man bereits auf "/" ist.
   */
  nav: [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Galerie", href: "/#galerie" },
    { label: "Ablauf", href: "/#ablauf" },
    { label: "Standorte", href: "/standorte" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kontakt", href: "/#kontakt" },
  ],
} as const

export type Service = {
  slug: string
  name: string
  tagline: string
  description: string
  benefits: string[]
  keywords: string[]
  image: string
}

/** Leistungen im Wortlaut der Bestandsseite, sprachlich geschärft. */
export const services: Service[] = [
  {
    slug: "fahrzeugfolierung",
    name: "Voll- & Teilfolierung",
    tagline: "Neue Farbe. Ohne Lackierung. Reversibel.",
    description:
      "Mit einer Vollverklebung bekommt Ihr Fahrzeug einen komplett neuen Look, ganz ohne Lackierung. Ob matt, glänzend, metallic, satin oder mit individuellem Design: Wir verwandeln Ihr Fahrzeug in ein Unikat. Die Folierung ist rückstandslos entfernbar, der Originallack bleibt darunter geschützt.",
    benefits: [
      "Matt, Glanz, Metallic, Satin & Design",
      "Schützt zugleich den Originallack",
      "Rückstandslos entfernbar, leasingfreundlich",
      "Auch einzelne Teile: Dach, Haube, Spiegel",
    ],
    keywords: ["Vollfolierung", "Car Wrapping", "Folierung", "Mattfolie"],
    image: "/originals/img-01.jpg",
  },
  {
    slug: "lackschutzfolie",
    name: "Lackschutzfolie (PPF)",
    tagline: "Unsichtbarer Panzer gegen Steinschlag.",
    description:
      "Die Lackschutzfolie (PPF) schützt den Originallack zuverlässig vor Steinschlägen, Kratzern, Insektenresten, Streusalz und UV-Strahlung – nahezu unsichtbar. Besonders beanspruchte Bereiche wie Front, Motorhaube, Kotflügel, Spiegel und Einstiege bleiben dauerhaft geschützt. Auf Wunsch auch als farbige PPF.",
    benefits: [
      "Nahezu unsichtbarer Steinschlagschutz",
      "Selbstheilende Oberfläche bei Wärme",
      "Erhält den Wiederverkaufswert",
      "Teilfront oder Rundumschutz",
    ],
    keywords: ["PPF", "Lackschutz", "Steinschlagschutz", "Paint Protection Film"],
    image: "/originals/img-22.jpeg",
  },
  {
    slug: "keramikversiegelung",
    name: "Keramikversiegelung",
    tagline: "Tiefenglanz, der Wasser abperlen lässt.",
    description:
      "Eine Keramikversiegelung bildet eine widerstandsfähige Schutzschicht auf dem Lack und sorgt für intensiven Tiefenglanz, langanhaltenden Schutz und deutlich leichtere Pflege. Schmutz, Wasser und Umwelteinflüsse haften wesentlich schlechter – das Fahrzeug bleibt länger sauber.",
    benefits: [
      "Starker Abperleffekt",
      "Schutz vor UV, Säure & Verschmutzung",
      "Spürbar leichtere Wäsche",
      "Kombinierbar mit Lackschutzfolie",
    ],
    keywords: ["Keramikversiegelung", "Coating", "Nanoversiegelung", "Lackversiegelung"],
    image: "/originals/img-15.jpg",
  },
  {
    slug: "scheibentoenung",
    name: "Scheibentönung",
    tagline: "Mehr Privatsphäre. Weniger Hitze.",
    description:
      "Professionelle Tönungsfolie senkt die Innenraumtemperatur, reduziert Blendung und schützt vor neugierigen Blicken. Sauber verlegt, blasenfrei und in den gesetzlich zulässigen Tönungsgraden – damit Ihr Fahrzeug auch nach der Tönung TÜV-konform bleibt.",
    benefits: [
      "Weniger Hitze und Blendung",
      "Mehr Privatsphäre & Sichtschutz",
      "Schützt den Innenraum",
      "Sauber & blasenfrei verlegt",
    ],
    keywords: ["Scheibentönung", "Tönungsfolie", "Sonnenschutzfolie", "Auto tönen"],
    image: "/originals/img-07.jpg",
  },
  {
    slug: "chromdelete",
    name: "Chromleisten & Dekor",
    tagline: "Akzente setzen. Oberflächen schützen.",
    description:
      "Ob Carbon, Schwarz glänzend, matt oder individuelles Design: Wir folieren Zierleisten und Dekorelemente präzise und langlebig. Sie schützen damit gleichzeitig die Originaloberfläche und setzen gezielte Akzente – jederzeit rückrüstbar.",
    benefits: [
      "Chrom Delete in Schwarz oder Carbon",
      "Schützt die Originaloberfläche",
      "Präzise Kanten, langlebig verlegt",
      "Jederzeit rückrüstbar",
    ],
    keywords: ["Chrom Delete", "Zierleisten folieren", "Dekorfolierung", "Carbon Optik"],
    image: "/originals/img-13.jpg",
  },
  {
    slug: "werbebeschriftung",
    name: "Werbebeschriftung",
    tagline: "Ihr Fahrzeug als rollende Visitenkarte.",
    description:
      "Vom dezenten Schriftzug bis zur vollflächigen Beschriftung im Digitaldruck: Wir setzen Logo und Botschaft präzise um, für das Einzelfahrzeug ebenso wie für die Flotte. Einmalige Investition statt laufender Werbekosten – und jederzeit änderbar oder rückstandslos entfernbar.",
    benefits: [
      "Wirbt rund um die Uhr, auch im Stand",
      "Einmalige Investition, keine Klickkosten",
      "Für Einzelfahrzeug & Flotte",
      "Änderbar und rückstandsfrei entfernbar",
    ],
    keywords: [
      "Fahrzeugbeschriftung",
      "Werbebeschriftung",
      "Flottenbeschriftung",
      "Carwrapping Werbung",
    ],
    image: "/originals/img-18.jpg",
  },
]

export type Supplier = { name: string; logo?: string }

/**
 * Folienhersteller im Originalwortlaut der Bestandsseite:
 * "3M, Avery, Hexis, Orafol, Bodyfence, KPMF".
 * Für KPMF liegt kein Logo vor – wird als Text ausgegeben.
 */
export const suppliers: Supplier[] = [
  { name: "Avery Dennison", logo: "/originals/img-09.jpg" },
  { name: "3M", logo: "/originals/img-11.jpg" },
  { name: "HEXIS", logo: "/originals/img-14.jpg" },
  { name: "ORAFOL", logo: "/originals/img-12.png" },
  { name: "BodyFence", logo: "/originals/img-06.png" },
  { name: "KPMF" },
]

export const about = {
  headline: "Wir arbeiten so lange an der Kante, bis man sie nicht mehr sieht.",
  lead: "Folierung aus Jüchen – für Leute, die genau da hinschauen.",
  text: "WrapCut ist Ihr Ansprechpartner rund um Folierungen im Rhein-Kreis Neuss. Wir sitzen in Jüchen, nur wenige Minuten von Neuss, Düsseldorf und Mönchengladbach entfernt, und beraten Sie ehrlich: welche Folie zu Ihrem Fahrzeug passt, was sie leistet und was sie nicht leistet. Auch dann, wenn die günstigere Variante die richtige ist.",
  supplierText:
    "Das Ergebnis steht und fällt mit der Folie. Deshalb verarbeiten wir ausschließlich Material von Avery Dennison, 3M, HEXIS, ORAFOL, BodyFence und KPMF – kein Baumarkt-Vinyl, keine Restposten.",
}

export type GalleryItem = {
  src: string
  label: string
  finish: string
  /** Grid-Position im Bento-Layout der Galerie */
  span: string
}

/** Echte WrapCut-Projekt- und Studiofotos der Bestandsseite. */
export const gallery: GalleryItem[] = [
  {
    src: "/originals/img-01.jpg",
    label: "Vollfolierung",
    finish: "Camo Design",
    span: "sm:col-span-4 sm:row-span-4",
  },
  {
    src: "/originals/img-03.jpg",
    label: "Vollfolierung",
    finish: "Satin Violett",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/originals/img-16.jpg",
    label: "Vollfolierung",
    finish: "Military Green",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/originals/img-08.jpg",
    label: "Folierung",
    finish: "Sportwagen",
    span: "sm:col-span-2 sm:row-span-3",
  },
  {
    src: "/originals/img-17.jpg",
    label: "Vollfolierung",
    finish: "Purple Gloss",
    span: "sm:col-span-4 sm:row-span-3",
  },
  {
    src: "/originals/img-13.jpg",
    label: "Folierung",
    finish: "Dunkelrot metallic",
    span: "sm:col-span-3 sm:row-span-2",
  },
  {
    src: "/originals/img-10.jpg",
    label: "Teilfolierung",
    finish: "Cabrio",
    span: "sm:col-span-3 sm:row-span-2",
  },
  {
    src: "/originals/img-15.jpg",
    label: "Folierung",
    finish: "Stealth Black",
    span: "sm:col-span-6 sm:row-span-2",
  },
]

export type Stat = { value: string; label: string }

/** Nur belegbare Werte – keine geschätzten Fahrzeugzahlen. */
export const stats: Stat[] = [
  { value: "5,0", label: "von 5 bei 24 Google-Bewertungen" },
  { value: "6", label: "Leistungen von Folierung bis Keramik" },
  { value: "5–10", label: "Jahre Haltbarkeit bei Markenfolie" },
  { value: "0 €", label: "für Beratung und Festpreis-Angebot" },
]

export type ProcessStep = { step: string; title: string; text: string }

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Beratung & Anfrage",
    text: "Sie schildern uns Fahrzeug, Wunschoptik und Ziel. Wir beraten ehrlich, welche Folie, welcher Schutz und welches Finish wirklich zu Ihnen passen.",
  },
  {
    step: "02",
    title: "Konzept & Angebot",
    text: "Sie erhalten ein klares Festpreis-Angebot mit Materialempfehlung, Umfang und Terminvorschlag, ohne versteckte Kosten.",
  },
  {
    step: "03",
    title: "Vorbereitung",
    text: "Gründliche Reinigung, Dekontamination und Vorbereitung der Oberfläche. Die Basis entscheidet über das Ergebnis. Hier sparen wir nie.",
  },
  {
    step: "04",
    title: "Präzise Umsetzung",
    text: "Saubere, millimetergenaue Verlegung in staubarmer Umgebung. Kanten, Übergänge und Details werden von Hand perfektioniert.",
  },
  {
    step: "05",
    title: "Abnahme & Übergabe",
    text: "Gemeinsame Endkontrolle, Pflegehinweise und Übergabe. Ihr Fahrzeug verlässt uns erst, wenn das Ergebnis kompromisslos sitzt.",
  },
]

export type Testimonial = {
  name: string
  text: string
  source: string
  /** ISO-Datum, aus dem Google-Datensatz der Bestandsseite abgeleitet */
  date: string
}

/** Die sechs echten Google-Rezensionen der Bestandsseite, wortgetreu. */
export const testimonials: Testimonial[] = [
  {
    name: "Manuel Attig",
    text: "Ich habe meinen neuen Porsche 911 hier folieren lassen und bin sehr zufrieden. Auch im Nachgang wird hier Kundenservice großgeschrieben und kleinere Beanstandungen sofort behoben. Mein nächstes Auto lasse ich wieder hier folieren. Vielen Dank!",
    source: "Google",
    date: "2026-06-25",
  },
  {
    name: "Kevin Peltzer",
    text: "Wir arbeiten seit längerer Zeit mit WrapCut zusammen und sind rundum zufrieden. Roberto berät uns stets kompetent, ehrlich und lösungsorientiert. Die Ausführung der Arbeiten ist immer äußerst sauber, präzise und von hoher Qualität. Unsere komplette Fahrzeugflotte wird regelmäßig bei WrapCut foliert, und die Ergebnisse überzeugen jedes Mal aufs Neue.",
    source: "Google",
    date: "2026-06-18",
  },
  {
    name: "Thomas Junge",
    text: "WrapCut ist einer der Top-Folierer in der Umgebung und macht auch Lackschutz, was nur die wenigsten können. Egal ob Werbebeschriftung oder komplettes Design.",
    source: "Google",
    date: "2026-04-30",
  },
  {
    name: "Michelle Geisinger",
    text: "Super Preis-Leistungs-Verhältnis, dazu noch eine perfekte Arbeit geleistet und auch sonst einfach nur wunschlos glücklich. Kann ich nur von Herzen empfehlen. :)",
    source: "Google",
    date: "2026-04-25",
  },
  {
    name: "RSTriac",
    text: "Ich habe vor kurzem mein Fahrzeug bei WrapCut NRW folieren lassen und bin top zufrieden mit dem Ergebnis 👍🏼",
    source: "Google",
    date: "2026-05-25",
  },
  {
    name: "Manuel Ullrich",
    text: "Bin mit einer etwas kniffligeren Anfrage aufgetaucht und mit dem Ergebnis sehr zufrieden. Da es mir schwerfällt die richtigen Worte zu finden, gibt es hier ein Foto. Seht für euch selbst, was man hier erwarten kann.",
    source: "Google",
    date: "2025-12-08",
  },
]

export type Faq = { q: string; a: string }

/**
 * Interview-artiges FAQ, inhaltlich aus den 30 echten Q&A der Bestandsseite
 * (/fahrzeugfolierung und /faq-lackschutzfolie) verdichtet.
 * Jede Antwort beginnt mit der direkten Antwort, danach folgen die Details.
 */
export const faqs: Faq[] = [
  {
    q: "Was kostet eine Fahrzeugfolierung bei WrapCut in Jüchen?",
    a: "Das hängt von Fahrzeuggröße, Umfang und Folie ab – deshalb nennen wir keinen Pauschalpreis, sondern kalkulieren Ihr Fahrzeug konkret. In die Kalkulation fließen Fahrzeuggröße und Modell, der Umfang der Folierung, die verwendete Folie, Farbe und Oberfläche sowie der Aufwand für Demontagearbeiten ein. Nach einer Besichtigung in Jüchen oder anhand Ihrer Fahrzeugdaten erhalten Sie ein individuelles Festpreis-Angebot ohne versteckte Kosten. Beratung und Angebot sind kostenlos.",
  },
  {
    q: "Wie lange hält eine Fahrzeugfolierung wirklich?",
    a: "Bei hochwertiger Markenfolie und guter Pflege sind etwa 5 bis 10 Jahre realistisch. Die tatsächliche Haltbarkeit hängt von der Folienqualität, der Fahrzeugnutzung und der Pflege ab – ein täglich draußen stehendes Fahrzeug altert schneller als ein Garagenwagen. Wir verarbeiten ausschließlich Material von Avery Dennison, 3M, HEXIS, ORAFOL, BodyFence und KPMF, weil billige Folie genau hier zuerst versagt: an Kanten, in der Farbstabilität und beim Entfernen.",
  },
  {
    q: "Beschädigt eine Folierung den Originallack meines Autos?",
    a: "Nein, im Gegenteil – sie schützt ihn. Eine fachgerecht verlegte Folie schirmt den darunterliegenden Lack vor UV-Strahlung, leichten Kratzern, Schmutz und Witterung ab. Bei intaktem Originallack lässt sich die Folie später rückstandsfrei entfernen, der Lack darunter erscheint wie am ersten Tag. Genau deshalb ist Folierung bei Leasingfahrzeugen so beliebt: individuelles Design während der Laufzeit, Originalzustand bei der Rückgabe.",
  },
  {
    q: "Was ist der Unterschied zwischen Lackschutzfolie (PPF) und einer normalen Folierung?",
    a: "Eine Farbfolierung verändert die Optik, eine Lackschutzfolie schützt vor mechanischer Beschädigung. Die Farbfolierung macht Ihr Fahrzeug matt, glänzend, metallic oder satiniert. Die Lackschutzfolie (PPF) ist dagegen meist transparent und selbstheilend: Sie liegt nahezu unsichtbar über dem Lack und nimmt Steinschläge und Kratzer auf. Beides lässt sich kombinieren – etwa PPF an der Front und eine Farbfolierung auf der restlichen Karosserie. Für maximalen Schutz kombinieren viele Kunden PPF zusätzlich mit einer Keramikversiegelung.",
  },
  {
    q: "Kann sich eine Lackschutzfolie wirklich selbst reparieren?",
    a: "Ja, feine Kratzer verschwinden bei Wärme von selbst. Viele moderne Lackschutzfolien haben eine selbstheilende Oberfläche: Durch Sonneneinstrahlung oder warmes Wasser schließen sich oberflächliche Kratzer in der Folienschicht wieder. Tiefere Beschädigungen bleiben allerdings sichtbar – die Folie ist ein Schutz, kein Unfallschutz.",
  },
  {
    q: "Welche Bereiche am Fahrzeug lohnen sich für Lackschutzfolie besonders?",
    a: "Zuerst die Fahrzeugfront, weil dort der Steinschlag ankommt. Typisch geschützt werden Motorhaube, Stoßfänger, Kotflügel und Außenspiegel, dazu Einstiegsbereiche, Türgriffmulden und Ladekanten – also die Stellen, an denen Gebrauchsspuren zuerst entstehen. Auf Wunsch folieren wir auch das komplette Fahrzeug. Besonders lohnt sich PPF bei Neufahrzeugen, Sportwagen, Leasingfahrzeugen, empfindlichen Lacken sowie bei Oldtimern und Liebhaberfahrzeugen.",
  },
  {
    q: "Wie lange dauert die Folierung meines Fahrzeugs?",
    a: "Eine Teilfolierung oder Scheibentönung ist je nach Umfang oft an einem Tag erledigt, eine komplette Vollfolierung braucht in der Regel mehrere Tage. Der Grund: Neben der eigentlichen Montage gehört eine gründliche Reinigung und Vorbereitung dazu, und die entscheidet über das Ergebnis. Ein PPF-Frontpaket schaffen wir häufig innerhalb eines Tages, ein kompletter Fahrzeugschutz braucht entsprechend länger. Den verbindlichen Zeitrahmen nennen wir Ihnen zusammen mit dem Angebot.",
  },
  {
    q: "Ist eine getönte Scheibe in Deutschland überhaupt erlaubt?",
    a: "Ja, im gesetzlich zulässigen Rahmen. Die hinteren Seitenscheiben und die Heckscheibe dürfen getönt werden, Frontscheibe und vordere Seitenscheiben sind reglementiert. Wir verwenden ausschließlich Folien mit gültiger Allgemeiner Betriebserlaubnis (ABE), sodass Ihr Fahrzeug auch nach der Tönung legal und TÜV-konform bleibt.",
  },
  {
    q: "Lohnt sich eine Folierung bei einem Leasingfahrzeug?",
    a: "Ja, das ist einer der häufigsten Gründe für eine Folierung. Sie gestalten Ihr Fahrzeug während der Leasinglaufzeit individuell und schützen gleichzeitig den Originallack. Bei der Rückgabe wird die Folie fachgerecht entfernt und das Fahrzeug ist im Ursprungszustand – häufig sogar mit besser erhaltenem Lack als ohne Folierung. Klären Sie die Rückgabebedingungen dennoch vorab mit Ihrem Leasinggeber.",
  },
  {
    q: "Kann man ein bereits gebrauchtes Fahrzeug noch folieren oder mit PPF schützen?",
    a: "Ja, entscheidend ist der Zustand des Lacks. Vor der Montage wird der Lack professionell vorbereitet: gereinigt und von Wachs, Versiegelungen und anderen Rückständen befreit. Je nach Zustand kann vorher eine Lackaufbereitung oder Politur nötig sein, damit die Folie sauber haftet und das Ergebnis stimmt. Bei beschädigtem Lack sprechen wir das offen an, bevor wir anfangen.",
  },
  {
    q: "Wie pflege ich ein foliertes Fahrzeug richtig?",
    a: "Wie einen guten Lack – nur etwas umsichtiger. Empfehlenswert sind Handwäsche oder schonende Waschanlagen und milde Reinigungsmittel. Verzichten Sie auf aggressive Chemikalien und gehen Sie mit dem Hochdruckreiniger vorsichtig an Kanten und Folienrändern um. Insektenreste und Vogelkot sollten Sie zeitnah entfernen. Passende Pflegeprodukte für Folien und die konkreten Hinweise für Ihr Fahrzeug bekommen Sie bei der Übergabe von uns.",
  },
  {
    q: "Was ist besser: Lackschutzfolie oder Keramikversiegelung?",
    a: "Sie lösen unterschiedliche Probleme – die Kombination ist der stärkste Schutz. Eine Keramikversiegelung verbessert die Oberfläche, erleichtert die Reinigung und sorgt für Tiefenglanz und Abperleffekt. Eine Lackschutzfolie bietet zusätzlich physischen Schutz gegen Steinschläge und Kratzer, den keine Versiegelung leisten kann. Wenn Sie beides wollen: PPF auf die beanspruchten Flächen, Keramik über den Rest. Was für Ihr Fahrzeug sinnvoll ist, sagen wir Ihnen ehrlich in der Beratung.",
  },
  {
    q: "Welche Fahrzeuge könnt ihr folieren?",
    a: "Nahezu alle – vom Kleinwagen bis zum Wohnmobil. Dazu gehören Autos, Sportwagen, Oldtimer, Motorräder, Transporter, Firmenfahrzeuge und Wohnmobile. Für Firmenkunden folieren wir auch komplette Fahrzeugflotten einheitlich, inklusive Werbebeschriftung. Wenn Sie unsicher sind, ob Ihr Fahrzeug geeignet ist: kurz anrufen, das klären wir in zwei Minuten.",
  },
  {
    q: "In welchem Umkreis arbeitet WrapCut?",
    a: "Unser Studio steht in Jüchen an der Neusser Str. 111, zentral im Rhein-Kreis Neuss. Kunden kommen regelmäßig aus Neuss, Grevenbroich, Mönchengladbach, Düsseldorf, Korschenbroich, Kaarst, Willich, Meerbusch, Viersen und Krefeld zu uns – von Neuss, Düsseldorf und Mönchengladbach sind es jeweils nur wenige Minuten. Auch aus dem weiteren Umkreis lohnt sich die Anfahrt, gerade bei Vollfolierungen und Lackschutz. Sprechen Sie uns einfach an.",
  },
  {
    q: "Warum sollte eine Folierung vom Fachbetrieb kommen und nicht aus der Garage?",
    a: "Weil man die Unterschiede genau dort sieht, wo es zählt: an den Kanten. Eine professionelle Folierung braucht Erfahrung, saubere und staubarme Arbeitsbedingungen sowie die richtige Verarbeitungstechnik. Ein Fachbetrieb sorgt für eine perfekte Vorbereitung, saubere Kanten und Übergänge, ein gleichmäßiges Ergebnis ohne Blasen und für Haltbarkeit über Jahre. Fehler beim Verlegen zeigen sich oft erst nach Monaten – dann ist die Folie meist komplett zu erneuern.",
  },
]
