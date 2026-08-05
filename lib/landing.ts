/**
 * Inhalte der Landingpages: /leistungen/[slug] und /standorte/[stadt].
 *
 * Quellenlage wie in lib/site.ts: Preise, Dauern und Haltbarkeiten stammen
 * wörtlich aus der Bestandsseite wrapcut.nrw (Stand 30.07.2026) und sind dort
 * öffentlich publiziert. Wo kein Wert belegt ist, steht bewusst keiner.
 * Entfernungen und Routen sind geografische Angaben, bewusst als Näherung
 * ("rund", "je nach Verkehr") formuliert.
 */

import type { Faq } from "@/lib/site"

// ---------------------------------------------------------------------------
// Leistungsseiten
// ---------------------------------------------------------------------------

export type ServiceDetail = {
  /** <title> — bewusst unter 60 Zeichen */
  metaTitle: string
  metaDescription: string
  h1: string
  /** Einleitung direkt unter der H1 */
  lead: string
  /** Fachliche Abschnitte, je ein H2 */
  sections: { heading: string; body: string[] }[]
  /** Harte Eckdaten für den Faktenkasten. Nur belegte Werte. */
  facts: { label: string; value: string }[]
  /** Preisangabe der Bestandsseite. Fehlt, wenn nichts publiziert war. */
  price?: { headline: string; items: { label: string; value: string }[] }
  /** Für wen sich die Leistung besonders lohnt */
  suitedFor: string[]
  /** Bildstrecke aus den echten Projektfotos */
  gallery: { src: string; alt: string }[]
  faqs: Faq[]
  /** Interne Verlinkung: verwandte Leistungen */
  related: string[]
}

export const serviceDetails: Record<string, ServiceDetail> = {
  fahrzeugfolierung: {
    metaTitle: "Fahrzeugfolierung Jüchen | Voll- & Teilfolierung",
    metaDescription:
      "Voll- und Teilfolierung in Jüchen: matt, glänzend, metallic oder satin. Rückstandslos entfernbar, Markenfolie, Festpreis. Für Neuss & Mönchengladbach.",
    h1: "Fahrzeugfolierung in Jüchen",
    lead: "Neue Farbe, ohne den Lack anzufassen. Voll- und Teilfolierung in matt, glänzend, metallic, satin oder mit eigenem Design, reversibel und mit Markenfolie verlegt.",
    sections: [
      {
        heading: "Was eine Folierung wirklich verändert",
        body: [
          "Bei der Fahrzeugfolierung wird die Karosserie mit einer Farbfolie beklebt. Der Originallack bleibt vollständig erhalten und liegt geschützt darunter: vor UV-Strahlung, Flugrost, leichten Kratzern und Witterung. Anders als eine Lackierung ist das Ergebnis reversibel, die Folie lässt sich bei intaktem Lack rückstandsfrei entfernen.",
          "Genau das macht die Folierung für Leasingfahrzeuge attraktiv: individuelles Design während der Laufzeit, Originalzustand bei der Rückgabe. Und für alle anderen: Sie können die Entscheidung revidieren, ohne dass ein Lackierer sie korrigieren muss.",
        ],
      },
      {
        heading: "Voll- oder Teilfolierung?",
        body: [
          "Eine Vollfolierung verändert das Fahrzeug komplett. Sie ist die aufwendigere Variante, weil jedes Bauteil einzeln bearbeitet wird, Türgriffe, Spiegel, Spoilerkanten und Einstiege werden dafür demontiert, damit die Folie unter die Kante läuft und nicht davor endet.",
          "Eine Teilfolierung setzt gezielt Akzente: Dach in Schwarz glänzend, Motorhaube in Carbonoptik, Spiegelkappen, Dachreling oder Zierleisten. Das ist deutlich günstiger und für viele der bessere Einstieg, gerade, wenn das Fahrzeug in der Grundfarbe bleiben soll.",
          "Welche Variante zu Ihrem Fahrzeug passt, klären wir vorher ehrlich. Auch dann, wenn die kleinere Lösung die richtige ist.",
        ],
      },
      {
        heading: "Warum die Folie über das Ergebnis entscheidet",
        body: [
          "Wir verarbeiten ausschließlich Material von Avery Dennison, 3M, HEXIS, ORAFOL, BodyFence und KPMF. Billige Folie versagt genau da zuerst, wo es auffällt: an den Kanten, in der Farbstabilität und beim Entfernen, dann bleibt Kleber auf dem Lack.",
          "Die Verarbeitung entscheidet über den Rest. Gründliche Reinigung und Dekontamination, staubarme Umgebung, saubere Übergänge. Fehler beim Verlegen zeigen sich oft erst nach Monaten und dann ist meist die komplette Folie zu erneuern.",
        ],
      },
    ],
    facts: [
      { label: "Haltbarkeit", value: "5–10 Jahre bei Markenfolie" },
      { label: "Dauer Vollfolierung", value: "in der Regel 3–5 Tage" },
      { label: "Oberflächen", value: "matt, glänzend, metallic, satin, Design" },
      { label: "Rückbau", value: "rückstandslos entfernbar" },
    ],
    price: {
      headline: "Preisrahmen Vollfolierung",
      items: [
        { label: "Vollfolierung, je nach Fahrzeug und Folie", // Der Halbgeviertstrich bleibt: „1.600, 8.000 €" las sich als zwei
        // Festpreise statt als Spanne — bei einer Preisangabe ist das keine
        // Typografie, sondern eine falsche Aussage.
        value: "1.600 – 8.000 €" },
        { label: "Teilfolierung, Beratung & Angebot", value: "kostenlos" },
      ],
    },
    suitedFor: [
      "Leasingfahrzeuge, die im Originalzustand zurück müssen",
      "Fahrzeuge, deren Farbe nicht ab Werk lieferbar war",
      "Firmenflotten mit einheitlicher Optik",
      "Alles, was auffallen soll, ohne den Lack zu verlieren",
    ],
    gallery: [
      { src: "/originals/img-01.jpg", alt: "Vollfolierung in einem Camo-Design" },
      { src: "/originals/img-17.jpg", alt: "Vollfolierung in Purple Gloss" },
      { src: "/originals/img-16.jpg", alt: "Vollfolierung in Military Green" },
      { src: "/originals/img-03.jpg", alt: "Vollfolierung in Satin Violett" },
    ],
    faqs: [
      {
        q: "Was kostet eine Vollfolierung bei WrapCut?",
        a: "Je nach Fahrzeug und Folie meist zwischen 1.600 € und 8.000 €. Der Preis hängt an der Fahrzeuggröße, der gewählten Folie und vor allem am Demontageaufwand: Ein Fahrzeug mit vielen Anbauteilen, Spoilern und komplexen Sicken kostet mehr Arbeitszeit als eine glatte Limousine. Nach einer Besichtigung in Jüchen oder anhand Ihrer Fahrzeugdaten erhalten Sie ein Festpreis-Angebot. Beratung und Angebot sind kostenlos.",
      },
      {
        q: "Wie lange dauert eine komplette Fahrzeugfolierung?",
        a: "In der Regel 3 bis 5 Tage, abhängig von der Komplexität des Designs. Der größte Teil davon ist nicht das Aufbringen der Folie, sondern die Vorbereitung: Reinigung, Dekontamination und die Demontage der Anbauteile. Eine Teilfolierung ist je nach Umfang oft an einem Tag erledigt. Den verbindlichen Zeitrahmen nennen wir Ihnen mit dem Angebot.",
      },
      {
        q: "Ist eine Fahrzeugfolierung in Deutschland erlaubt?",
        a: "Ja, Fahrzeugfolierungen sind erlaubt. Wichtig ist, dass keine sicherheitsrelevanten Bereiche beeinträchtigt werden und reflektierende oder verbotene Farben vermieden werden, eine Folie darf beispielsweise nicht spiegeln oder mit Behördenfahrzeugen verwechselbar sein. Ändert sich die Fahrzeugfarbe grundlegend, ist die neue Farbe der Zulassungsstelle zu melden. Für Scheibentönungen gilt zusätzlich, dass die Folie eine ABE besitzen muss.",
      },
      {
        q: "Kann ich zwischen verschiedenen Folienarten wählen?",
        a: "Ja, wir bieten eine Vielzahl von Folienarten an, matte, glänzende, metallic, satinierte und strukturierte Oberflächen sowie individuelle Designs im Digitaldruck. Zur Beratung bringen wir Musterfächer der Hersteller mit ans Fahrzeug, denn eine Folie wirkt auf einem A5-Muster grundsätzlich anders als auf einer gewölbten Motorhaube im Tageslicht.",
      },
      {
        q: "Beschädigt die Folie meinen Originallack?",
        a: "Nein, im Gegenteil, sie schützt ihn. Bei intaktem Originallack lässt sich eine fachgerecht verlegte Markenfolie später rückstandsfrei entfernen, der Lack darunter erscheint wie am ersten Tag. Problematisch wird es nur bei bereits nachlackierten oder beschädigten Stellen: Sitzt der Lack dort nicht fest, kann er sich beim Entfernen mit lösen. Solche Stellen sprechen wir vor Auftragsbeginn offen an.",
      },
    ],
    related: ["lackschutzfolie", "chromdelete", "werbebeschriftung"],
  },

  lackschutzfolie: {
    metaTitle: "Lackschutzfolie (PPF) Jüchen | Steinschlagschutz",
    metaDescription:
      "Lackschutzfolie PPF in Jüchen: nahezu unsichtbarer Schutz vor Steinschlag und Kratzern, selbstheilend. Frontpaket ab ca. 1.600 €. Für Neuss & Düsseldorf.",
    h1: "Lackschutzfolie (PPF) in Jüchen",
    lead: "Transparenter Schutz vor Steinschlag, Kratzern, Streusalz und Insektenresten. Nahezu unsichtbar, selbstheilend und rückstandsfrei wieder abnehmbar.",
    sections: [
      {
        heading: "Was Lackschutzfolie leistet",
        body: [
          "Eine Lackschutzfolie (PPF, Paint Protection Film) ist eine transparente Schutzfolie, die auf lackierte Fahrzeugbereiche aufgebracht wird. Sie nimmt auf, was sonst im Lack landet: Steinschläge von der Autobahn, Kratzer an Türgriffmulden, Streusalz im Winter, Insektenreste und UV-Strahlung.",
          "Der Unterschied zur Farbfolierung ist grundlegend. Eine Farbfolie verändert die Optik. Eine Lackschutzfolie verändert nichts, sie ist nach der Montage nahezu unsichtbar und passt sich der Fahrzeugform an. Sie sehen weiter Ihren Originallack, nur eben unbeschädigt.",
        ],
      },
      {
        heading: "Selbstheilend und was das wirklich bedeutet",
        body: [
          "Viele moderne Lackschutzfolien haben eine selbstheilende Oberfläche: Durch Wärme, etwa Sonneneinstrahlung oder warmes Wasser, schließen sich feine Kratzer in der Folienschicht wieder. Das betrifft Waschstraßenkratzer und oberflächliche Gebrauchsspuren.",
          "Was die Folie nicht kann: tiefe Beschädigungen rückgängig machen. Ein Steinschlag, der durch die Folienschicht geht, bleibt sichtbar, dann ist allerdings die Folie beschädigt und nicht der Lack. Genau darum geht es.",
        ],
      },
      {
        heading: "Welche Bereiche sich zuerst lohnen",
        body: [
          "Die Fahrzeugfront zuerst, weil dort der Steinschlag ankommt: Motorhaube, Stoßfänger, Kotflügel und Außenspiegel. Danach die Stellen, an denen Gebrauchsspuren entstehen: Einstiegsbereiche, Türgriffmulden und Ladekanten.",
          "Auf Wunsch schützen wir das komplette Fahrzeug. Grundsätzlich lassen sich nahezu alle lackierten Bereiche folieren. Auf Wunsch auch als farbige PPF, dann kombinieren Sie Schutz und Farbwechsel in einem Arbeitsgang.",
          "Für maximalen Schutz kombinieren viele Fahrzeugbesitzer die Lackschutzfolie zusätzlich mit einer Keramikversiegelung: PPF auf die beanspruchten Flächen, Keramik über den Rest.",
        ],
      },
      {
        heading: "Pflege, damit die Folie hält, was sie verspricht",
        body: [
          "Eine Lackschutzfolie ist pflegeleicht, aber nicht pflegefrei. Waschen Sie das Fahrzeug von Hand oder in einer schonenden Waschanlage und verzichten Sie auf aggressive Reiniger, die Kanten und Oberfläche angreifen.",
          "Insektenreste und Vogelkot gehören zeitnah herunter, nicht erst beim nächsten Waschtermin: Beides ist sauer und arbeitet sich mit Sonne und Zeit in jede Oberfläche. Für die regelmäßige Pflege gibt es Produkte, die ausdrücklich für Folien gemacht sind, damit bleibt der schmutzabweisende Effekt erhalten.",
        ],
      },
    ],
    facts: [
      // Die Altseite (/faq-lackschutzfolie) nennt „etwa 7 bis 10 Jahre".
      // Der frühere Wert 7–12 stammte aus einer älteren Fassung derselben
      // Seite — bei einer Haltbarkeitsangabe zählt der Stand, den der Betrieb
      // heute selbst veröffentlicht.
      { label: "Haltbarkeit", value: "7–10 Jahre" },
      { label: "Dauer Frontpaket", value: "häufig an einem Tag" },
      { label: "Optik", value: "transparent, nahezu unsichtbar" },
      { label: "Besonderheit", value: "selbstheilend bei feinen Kratzern" },
    ],
    price: {
      headline: "Preisrahmen Lackschutz",
      items: [
        { label: "Frontpaket", value: "ab ca. 1.600 €" },
        { label: "Komplettfahrzeug", value: "ab ca. 4.500 €" },
      ],
    },
    suitedFor: [
      "Neufahrzeuge, solange der Lack noch makellos ist",
      "Sportwagen und Fahrzeuge mit empfindlichem Lack",
      "Leasingfahrzeuge mit strengen Rückgabebedingungen",
      "Oldtimer und Liebhaberfahrzeuge",
    ],
    gallery: [
      { src: "/originals/img-22.jpeg", alt: "Fahrzeug mit aufgebrachter Lackschutzfolie" },
      { src: "/originals/img-08.jpg", alt: "Sportwagen in der WrapCut-Halle in Jüchen" },
      { src: "/originals/img-15.jpg", alt: "Schwarz foliertes Fahrzeug in der WrapCut-Halle" },
      { src: "/originals/img-10.jpg", alt: "Cabrio mit Teilfolierung in der WrapCut-Halle" },
    ],
    faqs: [
      {
        q: "Was kostet eine Lackschutzfolie?",
        a: "Ein Frontpaket beginnt bei rund 1.600 €, ein Komplettfahrzeug bei rund 4.500 €. Die Spanne entsteht durch das Fahrzeug, die geschützten Bereiche und die verwendete Folie: Eine Teilfolierung der Fahrzeugfront ist deutlich günstiger als ein kompletter Rundumschutz. Nach einer individuellen Beratung erstellen wir ein passendes Festpreis-Angebot für Ihr Fahrzeug.",
      },
      {
        q: "Wie lange hält eine Lackschutzfolie?",
        a: "Etwa 7 bis 10 Jahre bei fachgerechter Montage und regelmäßiger Pflege. Die tatsächliche Standzeit hängt an Qualität, Pflege und Beanspruchung, ein Fahrzeug mit hoher Autobahnlaufleistung fordert die Folie stärker als ein Wochenendwagen. Da die Folie das Opfer bringt und nicht der Lack, ist ein Austausch nach Jahren deutlich günstiger als eine Lackaufbereitung.",
      },
      {
        q: "Ist die Lackschutzfolie wirklich unsichtbar?",
        a: "Hochwertige transparente Lackschutzfolien sind nach der Montage nahezu unsichtbar. Die Folie passt sich der Fahrzeugform an und erhält den originalen Look. Sichtbar sind bei genauem Hinsehen allenfalls die Folienkanten, deshalb verlegen wir, wo es das Bauteil zulässt, um die Kante herum, sodass der Abschluss im Spalt verschwindet statt auf der Fläche zu liegen.",
      },
      {
        q: "Kann die Lackschutzfolie wieder entfernt werden?",
        a: "Ja, hochwertige Lackschutzfolie kann bei fachgerechter Entfernung wieder abgezogen werden, ohne den Originallack zu beschädigen. Der Lack darunter bleibt geschützt und im Originalzustand, bei Leasingrückgaben ist das oft der entscheidende Punkt. Wichtig ist, dass das Entfernen mit kontrollierter Wärme geschieht und nicht kalt und mit Gewalt.",
      },
      {
        q: "Kann man ein gebrauchtes Fahrzeug noch mit PPF schützen?",
        a: "Ja, entscheidend ist der Zustand des Lacks. Vor der Montage wird der Lack professionell vorbereitet und von Wachs, Versiegelungen und Rückständen befreit. Je nach Zustand ist vorher eine Lackaufbereitung oder Politur nötig, denn was unter der Folie liegt, bleibt für Jahre so, wie es ist. Vorhandene Kratzer würden unter der Folie konserviert statt verschwinden.",
      },
      {
        q: "Was ist besser: Lackschutzfolie oder Keramikversiegelung?",
        a: "Sie lösen unterschiedliche Probleme. Eine Keramikversiegelung verbessert die Oberfläche, erleichtert die Reinigung und sorgt für Glanz und Abperleffekt. Eine Lackschutzfolie bietet zusätzlich physischen Schutz vor Steinschlägen und Kratzern, den keine Versiegelung leisten kann. Für maximalen Schutz kombinieren viele Fahrzeugbesitzer beides: PPF auf die beanspruchten Flächen, Keramik über den Rest.",
      },
      {
        q: "Wie lange dauert die Montage einer Lackschutzfolie?",
        a: "Eine Teilfront lässt sich häufig innerhalb eines Tages umsetzen. Ein kompletter Fahrzeugschutz braucht entsprechend mehr Zeit, weil jedes Bauteil einzeln zugeschnitten, verlegt und an den Kanten sauber abgesetzt wird. Wie lange es bei Ihrem Fahrzeug dauert, sagen wir Ihnen verbindlich mit dem Angebot, damit Sie planen können und nicht auf Zuruf ohne Auto dastehen.",
      },
      {
        q: "Wie pflege ich ein Fahrzeug mit Lackschutzfolie richtig?",
        a: "Handwäsche oder eine schonende Waschanlage, keine aggressiven Reiniger. Insektenreste sollten Sie regelmäßig und zeitnah entfernen, weil sie sauer sind und sich mit Sonne und Zeit in jede Oberfläche arbeiten. Für die laufende Pflege gibt es Produkte, die ausdrücklich für Folien gemacht sind, damit bleibt die schmutzabweisende Oberfläche erhalten und die Folie erreicht die Standzeit, für die Sie bezahlt haben.",
      },
      {
        q: "Warum sollte Lackschutzfolie von einem Fachbetrieb verlegt werden?",
        a: "Weil das Ergebnis fast vollständig an der Vorbereitung und an den Kanten hängt. Der Lack wird professionell gereinigt und von Wachs und Rückständen befreit, die Folie präzise auf das Bauteil zugeschnitten und, wo es geht, um die Kante herum verlegt. Sauber abgesetzte Kanten sind der Unterschied zwischen einer Folie, die nach Jahren noch unsichtbar ist, und einer, die sich an den Rändern löst und Schmutz zieht.",
      },
      {
        q: "Für welche Fahrzeuge lohnt sich eine Lackschutzfolie besonders?",
        a: "Für Neufahrzeuge, solange der Lack noch makellos ist, und für alles, dessen Lack teuer oder empfindlich ist: Sportwagen, hochwertige Fahrzeuge, Oldtimer und Liebhaberfahrzeuge. Bei Leasingfahrzeugen kommt ein handfestes Argument dazu, der Lack geht im Originalzustand zurück, und Steinschläge an der Front sind einer der häufigsten Abzugspunkte bei der Rückgabe.",
      },
    ],
    related: ["keramikversiegelung", "fahrzeugfolierung", "scheibentoenung"],
  },

  keramikversiegelung: {
    metaTitle: "Keramikversiegelung Jüchen | Lackversiegelung",
    metaDescription:
      "Keramikversiegelung in Jüchen: Tiefenglanz, starker Abperleffekt und deutlich leichtere Pflege. Kombinierbar mit Lackschutzfolie. Für den Rhein-Kreis Neuss.",
    h1: "Keramikversiegelung in Jüchen",
    lead: "Eine widerstandsfähige Schutzschicht auf dem Lack: intensiver Tiefenglanz, starker Abperleffekt und ein Fahrzeug, das spürbar länger sauber bleibt.",
    sections: [
      {
        heading: "Was eine Keramikversiegelung verändert",
        body: [
          "Die Versiegelung bildet eine harte, chemisch gebundene Schicht auf dem Lack. Schmutz, Wasser und Umwelteinflüsse haften darauf wesentlich schlechter, Regen perlt in Tropfen ab und nimmt Staub gleich mit. Der sichtbarste Effekt ist der Tiefenglanz: Die Oberfläche reflektiert gleichmäßiger, dunkle Lacke wirken deutlich satter.",
          "Der praktische Effekt ist die Pflege. Ein versiegeltes Fahrzeug lässt sich mit weniger Aufwand und weniger Chemie sauber bekommen, weil der Schmutz kaum Halt findet. Das schont auf Dauer auch den Lack, weil weniger geschrubbt werden muss.",
        ],
      },
      {
        heading: "Was sie nicht leistet",
        body: [
          "Eine Keramikversiegelung ist kein mechanischer Schutz. Sie hält keinen Steinschlag auf und verhindert keine tiefen Kratzer, dafür ist sie schlicht zu dünn. Wer physischen Schutz will, braucht eine Lackschutzfolie.",
          "Die stärkste Kombination ist deshalb beides: Lackschutzfolie auf die beanspruchten Flächen an Front und Einstiegen, Keramikversiegelung über den Rest. Was für Ihr Fahrzeug sinnvoll ist, sagen wir Ihnen ehrlich in der Beratung, auch wenn das heißt, dass eine der beiden Maßnahmen reicht.",
        ],
      },
      {
        heading: "Die Vorbereitung ist der eigentliche Aufwand",
        body: [
          "Eine Versiegelung konserviert den Zustand, den sie vorfindet. Deshalb liegt der Arbeitsaufwand vor dem Auftragen: Wäsche, Dekontamination von Flugrost und Teerresten, je nach Lackzustand eine Politur. Erst auf einer sauberen, korrigierten Oberfläche kann die Keramikschicht chemisch anbinden.",
          "Auf einem ungepflegten Lack aufgetragen, hält die Versiegelung schlechter und friert vorhandene Swirls unter Hochglanz ein. Wir sagen Ihnen vorher, was Ihr Lack braucht.",
        ],
      },
    ],
    facts: [
      { label: "Effekt", value: "Tiefenglanz & starker Abperleffekt" },
      { label: "Schützt vor", value: "UV, Säure, Verschmutzung" },
      { label: "Pflege", value: "spürbar leichtere Wäsche" },
      { label: "Kombination", value: "ideal zusammen mit PPF" },
    ],
    suitedFor: [
      "Dunkle Lacke, bei denen jeder Waschkratzer sichtbar ist",
      "Fahrzeuge, die viel draußen stehen",
      "Alle, die Pflegeaufwand reduzieren wollen",
      "Als Ergänzung zu einer bestehenden Lackschutzfolie",
    ],
    gallery: [
      { src: "/originals/img-15.jpg", alt: "Dunkler Lack mit Hochglanz-Finish in der WrapCut-Halle" },
      { src: "/originals/img-20.jpeg", alt: "Folienarbeit mit Heißluftföhn in der WrapCut-Halle" },
      { src: "/originals/img-08.jpg", alt: "Sportwagen in der WrapCut-Halle in Jüchen" },
    ],
    faqs: [
      {
        q: "Wie lange hält eine Keramikversiegelung?",
        a: "Das hängt stark von Pflege und Beanspruchung ab, deshalb nennen wir hier bewusst keine Pauschalzahl. Entscheidend sind Waschverhalten, Standort des Fahrzeugs und die verwendete Chemie: Aggressive Reiniger und häufige Bürstenwäschen bauen jede Versiegelung schneller ab. Was für Ihr Fahrzeug realistisch ist, besprechen wir bei der Beratung anhand des konkreten Produkts.",
      },
      {
        q: "Ersetzt eine Keramikversiegelung die Lackschutzfolie?",
        a: "Nein. Die Versiegelung verbessert die Oberfläche, Glanz, Abperleffekt und Reinigungsverhalten, bietet aber keinen physischen Schutz vor Steinschlägen und Kratzern. Genau das leistet nur eine Lackschutzfolie. Wenn Sie sich für eines entscheiden müssen: Steht Autobahnfahren im Vordergrund, ist PPF an der Front wichtiger. Geht es um Optik und Pflegeaufwand, ist die Keramik die richtige Wahl.",
      },
      {
        q: "Kann man ein foliertes Fahrzeug versiegeln?",
        a: "Ja, das ist sogar eine sinnvolle Kombination. Auch Folienoberflächen profitieren von der leichteren Reinigung und dem Abperleffekt, gerade matte Folien lassen sich sonst schwer sauber halten, weil Schmutz sich in der Struktur festsetzt. Wichtig ist ein für Folie freigegebenes Produkt; das wählen wir passend zur verlegten Folie aus.",
      },
      {
        q: "Muss der Lack vorher poliert werden?",
        a: "Je nach Zustand ja. Eine Versiegelung konserviert die Oberfläche so, wie sie ist, vorhandene Swirls und feine Kratzer verschwinden nicht, sondern werden unter Hochglanz sichtbarer. Bei einem neuen oder gut gepflegten Fahrzeug genügt eine gründliche Wäsche mit Dekontamination. Was Ihr Lack braucht, beurteilen wir vor Ort und sagen es Ihnen vor dem Angebot.",
      },
    ],
    related: ["lackschutzfolie", "fahrzeugfolierung", "scheibentoenung"],
  },

  scheibentoenung: {
    metaTitle: "Scheibentönung Jüchen | Tönungsfolie mit ABE",
    metaDescription:
      "Scheibentönung in Jüchen: weniger Hitze und Blendung, mehr Privatsphäre. Folien mit ABE, TÜV-konform, in 2–4 Stunden erledigt. Für Neuss & Mönchengladbach.",
    h1: "Scheibentönung in Jüchen",
    lead: "Weniger Hitze, weniger Blendung, mehr Privatsphäre. Sauber und blasenfrei verlegt, ausschließlich mit Folien, die eine ABE besitzen.",
    sections: [
      {
        heading: "Was die Tönung im Alltag bringt",
        body: [
          "Der spürbarste Effekt ist die Temperatur: Eine gute Tönungsfolie hält einen erheblichen Teil der Wärmestrahlung draußen. Der Innenraum heizt sich im Sommer langsamer auf, die Klimaanlage muss weniger arbeiten.",
          "Dazu kommt der UV-Schutz für den Innenraum. Armaturenbrett, Leder und Kunststoffe bleichen deutlich langsamer aus. Und der offensichtliche Punkt: Von außen ist weniger zu sehen, was auf Parkplätzen mit Gepäck im Fond ein echter Vorteil ist.",
        ],
      },
      {
        heading: "Was in Deutschland erlaubt ist",
        body: [
          "Die hinteren Seitenscheiben und die Heckscheibe dürfen getönt werden. Frontscheibe und vordere Seitenscheiben sind reglementiert, hier gilt die Vorgabe, dass die Sicht des Fahrers nicht beeinträchtigt werden darf.",
          "Wir verwenden ausschließlich Folien mit gültiger Allgemeiner Betriebserlaubnis (ABE). Damit bleibt Ihr Fahrzeug legal und TÜV-konform. Die zugehörigen Unterlagen bekommen Sie bei der Übergabe mit, die gehören ins Fahrzeug, nicht in eine Schublade zu Hause.",
        ],
      },
      {
        heading: "Warum blasenfrei nicht selbstverständlich ist",
        body: [
          "Tönungsfolie wird von innen auf gewölbtes Glas verlegt. Die Folie muss dafür mit Wärme in Form gebracht werden, bevor sie ans Glas kommt, wird dieser Schritt übersprungen, entstehen Falten an den Rändern der Heckscheibe.",
          "Der zweite Punkt ist Sauberkeit: Jedes Staubkorn zwischen Folie und Glas bleibt für die Lebensdauer der Folie sichtbar. Deshalb arbeiten wir in staubarmer Umgebung und reinigen das Glas mehrfach, bevor die Folie überhaupt ausgepackt wird.",
        ],
      },
    ],
    facts: [
      { label: "Dauer", value: "in der Regel 2–4 Stunden" },
      { label: "Zulassung", value: "ausschließlich Folien mit ABE" },
      { label: "Bereich", value: "hintere Seitenscheiben & Heck" },
      { label: "Effekt", value: "weniger Hitze, Blendung & Ausbleichen" },
    ],
    suitedFor: [
      "Familienfahrzeuge mit Kindern auf der Rückbank",
      "Kombis und SUV mit Gepäck im sichtbaren Bereich",
      "Fahrzeuge mit hellem oder empfindlichem Innenraum",
      "Alle, die im Sommer weniger Hitze im Auto wollen",
    ],
    gallery: [
      { src: "/originals/img-07.jpg", alt: "Fahrzeug mit getönten Scheiben" },
      { src: "/originals/img-15.jpg", alt: "Schwarz foliertes Fahrzeug in der WrapCut-Halle" },
      { src: "/originals/img-13.jpg", alt: "Dunkelrot folierter Audi in der WrapCut-Halle" },
    ],
    faqs: [
      {
        q: "Wie lange dauert eine Scheibentönung?",
        a: "In der Regel 2 bis 4 Stunden, je nach Fahrzeug. Der Unterschied entsteht vor allem an der Heckscheibe: Stark gewölbte Heckscheiben müssen aufwendiger vorgeformt werden als flache. Sie können das Fahrzeug also am selben Tag wieder mitnehmen. Direkt danach sollten die Scheiben allerdings ein paar Tage geschlossen bleiben, damit die Folie in Ruhe austrocknen kann.",
      },
      {
        q: "Ist Scheibentönung legal?",
        a: "Ja, wenn die Folien eine ABE besitzen und die Frontscheibe sowie die vorderen Seitenscheiben nicht getönt werden. Für die hinteren Seitenscheiben und die Heckscheibe gibt es keine Begrenzung des Tönungsgrades. Wir verlegen ausschließlich Folien mit gültiger ABE und geben Ihnen die Unterlagen für das Fahrzeug mit, sodass Sie bei einer Kontrolle oder beim TÜV nachweisen können, dass die Folie zulässig ist.",
      },
      {
        q: "Was bringt eine Scheibentönung konkret?",
        a: "Vier Dinge: UV- und Hitzeschutz, mehr Privatsphäre, eine sportlichere Optik und Schutz vor dem Ausbleichen des Innenraums. Im Sommer ist der Temperaturunterschied der Punkt, den Kunden am deutlichsten rückmelden, der Innenraum heizt sich langsamer auf und kühlt schneller wieder herunter.",
      },
      {
        q: "Kann eine Tönungsfolie wieder entfernt werden?",
        a: "Ja. Die Folie wird mit Wärme gelöst und der verbleibende Kleberest rückstandsfrei abgenommen. Wichtig ist dabei, an der Heckscheibe vorsichtig vorzugehen, weil dort die Heizdrähte direkt unter der Folie liegen, die reißen bei unsachgemäßem Abziehen mit ab. Das ist einer der Gründe, warum wir vom Selbstversuch mit dem Föhn abraten.",
      },
    ],
    related: ["fahrzeugfolierung", "lackschutzfolie", "chromdelete"],
  },

  chromdelete: {
    metaTitle: "Chrom Delete & Zierleisten folieren | Jüchen",
    metaDescription:
      "Chrom Delete in Jüchen: Zierleisten, Fensterrahmen und Dekorelemente in Schwarz glänzend, matt oder Carbon folieren. Präzise, langlebig, jederzeit rückrüstbar.",
    h1: "Chrom Delete & Dekorfolierung",
    lead: "Chromleisten, Fensterrahmen und Dekorelemente in Schwarz glänzend, matt oder Carbonoptik, präzise verlegt, langlebig und jederzeit rückrüstbar.",
    sections: [
      {
        heading: "Der kleinste Eingriff mit der größten Wirkung",
        body: [
          "Chrom prägt die Wahrnehmung eines Fahrzeugs stärker, als die Fläche vermuten lässt. Fensterrahmen, Kühlergrillspangen, Zierleisten und Türgriffe in Schwarz statt Chrom lassen dieselbe Karosserie sofort ruhiger und moderner wirken, ohne dass ein einziges Blechteil die Farbe wechselt.",
          "Deshalb ist Chrom Delete für viele der erste Schritt: überschaubarer Aufwand, sofort sichtbares Ergebnis und vollständig reversibel. Wer danach mehr will, kann jederzeit auf eine Teil- oder Vollfolierung aufbauen.",
        ],
      },
      {
        heading: "Warum das mehr Arbeit ist, als es aussieht",
        body: [
          "Zierleisten sind schmal, gewölbt und laufen selten gerade. Genau deshalb entscheidet hier die Kante über das Ergebnis: Eine Folie, die einen Millimeter vor dem Übergang endet, ist auf zwei Meter Entfernung sichtbar, ein Chromstreifen, der stehen bleibt, ebenso.",
          "Wo es das Bauteil zulässt, demontieren wir statt zu schneiden. Die Folie läuft dann um die Kante herum und endet auf der Rückseite. Das dauert länger, hält aber, weil kein Folienrand der Waschanlage ausgesetzt ist.",
        ],
      },
      {
        heading: "Schutz als Nebeneffekt",
        body: [
          "Die Folie deckt nicht nur ab, sie schützt auch. Chrom und lackierte Zierteile sind an Türgriffen und Einstiegen genau die Stellen, an denen Gebrauchsspuren zuerst entstehen. Unter der Folie bleibt die Originaloberfläche unberührt.",
          "Beim Rückbau gilt dasselbe wie bei jeder Folierung: fachgerecht mit Wärme entfernt, bleibt darunter der Originalzustand. Für Leasingfahrzeuge ist das der entscheidende Punkt.",
        ],
      },
    ],
    facts: [
      { label: "Oberflächen", value: "Schwarz glänzend, matt, Carbon" },
      { label: "Typische Teile", value: "Fensterrahmen, Grill, Zierleisten, Griffe" },
      { label: "Schutz", value: "Originaloberfläche bleibt unberührt" },
      { label: "Rückbau", value: "jederzeit rückrüstbar" },
    ],
    suitedFor: [
      "Fahrzeuge, deren Ausstattungslinie viel Chrom mitbringt",
      "Leasingfahrzeuge, die zurück in den Originalzustand müssen",
      "Als Einstieg vor einer größeren Folierung",
      "Kombination mit Scheibentönung für ein durchgehend dunkles Bild",
    ],
    gallery: [
      { src: "/originals/img-13.jpg", alt: "Dunkelrot folierter Audi in der WrapCut-Halle" },
      { src: "/originals/img-15.jpg", alt: "Schwarz foliertes Fahrzeug in der WrapCut-Halle" },
      { src: "/originals/img-10.jpg", alt: "Cabrio mit Teilfolierung in der WrapCut-Halle" },
    ],
    faqs: [
      {
        q: "Was gehört alles zu einem Chrom Delete?",
        a: "Üblicherweise die Fensterrahmen und Fensterleisten, die Spangen im Kühlergrill, Zierleisten an Flanke und Heck sowie, je nach Fahrzeug, Türgriffe, Spiegelfüße und Auspuffblenden. Sie können das aber frei zusammenstellen: Manche Kunden wollen nur die Fensterlinie schwarz, weil das den größten Effekt für den geringsten Aufwand bringt. Wir gehen das Fahrzeug mit Ihnen zusammen durch.",
      },
      {
        q: "Hält die Folie an schmalen Zierleisten dauerhaft?",
        a: "Ja, wenn die Kante stimmt. Der kritische Punkt ist nicht die Fläche, sondern der Rand: Endet die Folie auf der Sichtseite, greifen Waschanlage und Hochdruckreiniger sie mit der Zeit an. Wo das Bauteil demontierbar ist, führen wir die Folie deshalb um die Kante auf die Rückseite. Dann liegt kein Folienrand mehr frei und die Verklebung hält so lange wie die Folie selbst.",
      },
      {
        q: "Kann ich statt Folie das Chrom nicht einfach lackieren lassen?",
        a: "Können ja, sinnvoll meist nicht. Chrom ist ein schwieriger Untergrund für Lack und muss dafür aufwendig angeschliffen und grundiert werden, danach ist der Originalzustand unwiederbringlich weg. Bei Leasingfahrzeugen ist das ein Problem, bei Wiederverkauf oft auch. Die Folierung ist günstiger, schneller und lässt sich rückstandsfrei wieder entfernen.",
      },
    ],
    related: ["fahrzeugfolierung", "scheibentoenung", "lackschutzfolie"],
  },

  werbebeschriftung: {
    metaTitle: "Werbebeschriftung & Fahrzeugbeschriftung | Jüchen",
    metaDescription:
      "Fahrzeugbeschriftung in Jüchen: vom Schriftzug bis zur Vollbeklebung im Digitaldruck, für Einzelfahrzeug und Flotte. Einmalig investiert statt laufend gezahlt.",
    h1: "Werbebeschriftung für Fahrzeuge",
    lead: "Vom dezenten Schriftzug bis zur vollflächigen Beklebung im Digitaldruck, für das Einzelfahrzeug ebenso wie für die komplette Flotte.",
    sections: [
      {
        heading: "Rollende Werbung, die nach der Montage nichts mehr kostet",
        body: [
          "Ihr Fahrzeug wirbt überall dort, wo es unterwegs oder geparkt ist, auf der Fahrt zum Kunden ebenso wie in der Zeit davor auf dem Parkplatz. Täglich erreichen Sie damit potenziell hunderte bis tausende Menschen im eigenen Einzugsgebiet.",
          "Der wirtschaftliche Unterschied zu Online- oder Printwerbung liegt in der Struktur: Nach der Beklebung entstehen keine laufenden Kosten. Keine Klickpreise, keine Anzeigenschaltung, keine monatliche Verlängerung. Eine einmalige Investition, die über Jahre sichtbar bleibt.",
        ],
      },
      {
        heading: "Vom Handwerkerfahrzeug bis zur einheitlichen Flotte",
        body: [
          "Für Einzelfahrzeuge reicht oft eine klare Kombination aus Logo, Leistung und Kontakt, lesbar aus Entfernung, nicht überfrachtet. Die häufigste Schwäche im Straßenbild sind zu viele Informationen in zu kleiner Schrift: Was man in drei Sekunden an einer Ampel nicht erfassen kann, wirkt gar nicht.",
          "Für Flotten kommt Wiedererkennung dazu. Wir setzen ein Layout so um, dass es auf Transporter, Kombi und PKW gleichermaßen funktioniert, gleiche Bildsprache, an die jeweilige Karosserie angepasst statt stumpf skaliert.",
        ],
      },
      {
        heading: "Änderbar und rückstandsfrei entfernbar",
        body: [
          "Beschriftungen lassen sich jederzeit erweitern, ändern oder komplett entfernen. Neue Telefonnummer, zusätzliche Leistung, geändertes Logo: Das betrifft in der Regel nur die betroffenen Elemente, nicht die gesamte Beklebung.",
          "Beim Verkauf oder bei der Leasingrückgabe wird die Beschriftung fachgerecht abgenommen. Der Lack darunter ist über die Jahre vor UV geschützt gewesen und in aller Regel besser erhalten als die umliegende Fläche.",
        ],
      },
    ],
    facts: [
      { label: "Umfang", value: "Schriftzug bis Vollbeklebung" },
      { label: "Verfahren", value: "Digitaldruck & Plottfolie" },
      { label: "Zielgruppe", value: "Einzelfahrzeug & Flotte" },
      { label: "Laufende Kosten", value: "keine nach der Montage" },
    ],
    suitedFor: [
      "Handwerksbetriebe mit festem Einzugsgebiet",
      "Dienstleister, die täglich zum Kunden fahren",
      "Firmen mit mehreren Fahrzeugen und einheitlichem Auftritt",
      "Fensterbeklebung für Ladenlokale und Büros",
    ],
    gallery: [
      { src: "/originals/img-18.jpg", alt: "Fahrzeug in der WrapCut-Halle in Jüchen" },
      { src: "/originals/img-01.jpg", alt: "Vollfolierung in einem Camo-Design" },
      { src: "/originals/img-16.jpg", alt: "Vollfolierung in Military Green" },
    ],
    faqs: [
      {
        q: "Brauche ich ein fertiges Design oder entsteht das bei euch?",
        a: "Beides geht. Wenn Sie Logo und Corporate Design haben, setzen wir das um, dafür brauchen wir die Daten möglichst als Vektorgrafik, damit die Kanten auch auf zwei Metern Breite sauber bleiben. Wenn nichts vorliegt, entwickeln wir einen Vorschlag auf Basis Ihres Fahrzeugs und Ihrer Leistungen. Sie sehen vor der Produktion immer eine Visualisierung am konkreten Fahrzeugmodell.",
      },
      {
        q: "Muss ich die Beschriftung meiner Versicherung oder dem Leasinggeber melden?",
        a: "Dem Leasinggeber ja, der Versicherung in der Regel nicht. Leasingverträge enthalten häufig Vorgaben zu Veränderungen am Fahrzeug, auch wenn die Beschriftung rückstandsfrei entfernbar ist, sollten Sie das vorab klären. Bei der Kfz-Versicherung ändert eine Beschriftung normalerweise nichts, eine gewerbliche Nutzung des Fahrzeugs allerdings schon.",
      },
      {
        q: "Kann ich die Beschriftung später ändern lassen?",
        a: "Ja, und das ist einer der Vorteile gegenüber einer Lackierung. Einzelne Elemente wie Telefonnummer, Domain oder eine zusätzliche Leistung lassen sich austauschen, ohne die gesamte Beklebung zu erneuern. Wichtig ist nur, dass die umliegende Folie noch in gutem Zustand ist, bei stark gealterter Folie kann eine Neubeklebung des Bauteils die sauberere Lösung sein.",
      },
      {
        q: "Beschriftet ihr auch Schaufenster und Ladenlokale?",
        a: "Ja, Fensterbeklebung gehört dazu. Das reicht von Öffnungszeiten und Logo auf der Eingangstür über Sichtschutzfolie im Bürobereich bis zur vollflächigen Schaufenstergestaltung. Die Arbeit ist der Fahrzeugbeschriftung technisch verwandt, nur dass die Fläche eben plan ist, was manches einfacher und die sichtbaren Kanten dafür kritischer macht.",
      },
    ],
    related: ["fahrzeugfolierung", "chromdelete", "scheibentoenung"],
  },
}

// ---------------------------------------------------------------------------
// Standortseiten
// ---------------------------------------------------------------------------

export type Location = {
  slug: string
  /** Stadtname im Nominativ */
  city: string
  /** "aus Neuss" / "aus Mönchengladbach" – für Fließtext */
  metaTitle: string
  metaDescription: string
  lead: string
  /** Näherungsangaben – bewusst nicht auf die Nachkommastelle */
  distanceKm: number
  driveMinutes: string
  route: string
  /** Ortsteile, aus denen die Anfahrt genauso funktioniert */
  districts: string[]
  /** Zwei bis drei Absätze mit echtem Ortsbezug */
  body: string[]
  /** Leistungen, die auf dieser Seite zuerst genannt werden */
  focus: string[]
  faqs: Faq[]
}

export const locations: Location[] = [
  {
    slug: "neuss",
    city: "Neuss",
    metaTitle: "Fahrzeugfolierung Neuss | Lackschutz & PPF",
    metaDescription:
      "Fahrzeugfolierung, Lackschutzfolie und Scheibentönung für Neuss. Studio in Jüchen, rund 18 km über die A46. Markenfolie, Festpreis, kostenlose Beratung.",
    lead: "Folierung, Lackschutz und Scheibentönung für Neuss, unser Studio steht in Jüchen, rund 18 Kilometer über die A46.",
    distanceKm: 18,
    driveMinutes: "20 bis 25 Minuten",
    route: "A46 Richtung Neuss",
    districts: [
      "Neuss-Mitte",
      "Holzheim",
      "Grimlinghausen",
      "Norf",
      "Reuschenberg",
      "Weckhoven",
      "Rosellen",
    ],
    body: [
      "Neuss ist der größte Ort im Rhein-Kreis Neuss und für uns die naheliegendste Nachbarschaft: Vom Studio an der Neusser Str. 111 in Jüchen führt die A46 direkt dorthin. Die Straße vor unserer Tür heißt nicht zufällig so, sie ist historisch die Verbindung dorthin.",
      "Für eine Vollfolierung oder ein PPF-Komplettpaket bleibt das Fahrzeug ohnehin mehrere Tage bei uns, da spielt die Anfahrt keine Rolle. Für kürzere Arbeiten wie Scheibentönung oder Chrom Delete lohnt sich der Weg trotzdem, weil Sie das Fahrzeug am selben Tag wieder mitnehmen.",
      "Wenn Sie aus Neuss kommen und nicht sicher sind, ob sich die Fahrt lohnt: Rufen Sie vorher an. Wir sagen Ihnen am Telefon, was für Ihr Fahrzeug realistisch ist und was es ungefähr kostet, bevor Sie losfahren.",
    ],
    focus: ["lackschutzfolie", "fahrzeugfolierung", "scheibentoenung"],
    faqs: [
      {
        q: "Wie komme ich von Neuss zu WrapCut nach Jüchen?",
        a: "Über die A46 in Richtung Mönchengladbach, Abfahrt Jüchen, von Neuss aus sind das rund 18 Kilometer und je nach Verkehr 20 bis 25 Minuten. Sie finden uns an der Neusser Str. 111 in 41363 Jüchen. Aus den südlichen Neusser Stadtteilen wie Norf oder Rosellen ist es entsprechend kürzer. Parkplätze sind direkt am Studio vorhanden.",
      },
      {
        q: "Holt ihr Fahrzeuge in Neuss ab?",
        a: "Sprechen Sie uns darauf an, das klären wir im Einzelfall, abhängig vom Umfang des Auftrags und vom Termin. Bei mehrtägigen Arbeiten wie einer Vollfolierung lässt sich das eher einrichten als bei einer zweistündigen Scheibentönung. Für Firmenkunden mit mehreren Fahrzeugen finden wir in der Regel eine Lösung.",
      },
      {
        q: "Arbeitet ihr auch für Autohäuser und Betriebe in Neuss?",
        a: "Ja. Wir arbeiten sowohl mit Privatkunden als auch mit Firmen- und Flottenkunden, und beim Lackschutz auch vor Ort beim Autohaus statt nur in unserer Halle. Für Betriebe in Neuss, die Fahrzeuge vor der Auslieferung mit PPF schützen oder eine Flotte einheitlich beschriften lassen wollen, ist das der übliche Weg.",
      },
    ],
  },
  {
    slug: "moenchengladbach",
    city: "Mönchengladbach",
    metaTitle: "Fahrzeugfolierung Mönchengladbach | PPF & Tönung",
    metaDescription:
      "Fahrzeugfolierung, Lackschutzfolie und Scheibentönung für Mönchengladbach. Studio in Jüchen, rund 15 km über die A46. Markenfolie und Festpreis-Angebot.",
    lead: "Folierung, Lackschutz und Scheibentönung für Mönchengladbach, rund 15 Kilometer von Jüchen, direkt über die A46.",
    distanceKm: 15,
    driveMinutes: "20 Minuten",
    route: "A46 Richtung Mönchengladbach",
    districts: [
      "Rheydt",
      "Odenkirchen",
      "Giesenkirchen",
      "Wickrath",
      "Hardt",
      "Neuwerk",
    ],
    body: [
      "Mönchengladbach liegt für uns westlich, Neuss östlich, Jüchen sitzt genau dazwischen. Über die A46 sind Sie in rund zwanzig Minuten bei uns, aus den östlichen Stadtteilen wie Wickrath oder Odenkirchen entsprechend schneller.",
      "Gefragt ist aus Mönchengladbach vor allem zweierlei: Lackschutzfolie für Neuwagen, solange der Lack noch makellos ist, und Werbebeschriftung für Betriebe mit Fahrzeugen im täglichen Einsatz. Beides sind Arbeiten, bei denen die Ausführung über Jahre sichtbar bleibt, deshalb lohnt sich der Weg zu einem Betrieb, der die Kanten sauber macht.",
      "Für die Beratung müssen Sie nicht vorbeikommen. Schicken Sie uns Fahrzeugdaten und Fotos, dann bekommen Sie eine belastbare Einschätzung, bevor Sie einen Termin machen.",
    ],
    focus: ["lackschutzfolie", "werbebeschriftung", "fahrzeugfolierung"],
    faqs: [
      {
        q: "Wie weit ist es von Mönchengladbach nach Jüchen?",
        a: "Rund 15 Kilometer, je nach Verkehr etwa zwanzig Minuten über die A46. Aus den östlichen Stadtteilen wie Wickrath, Odenkirchen oder Giesenkirchen ist es kürzer. Unser Studio liegt an der Neusser Str. 111 in 41363 Jüchen, Parkplätze sind vorhanden. Termine vergeben wir nach Vereinbarung, damit Sie nicht umsonst fahren.",
      },
      {
        q: "Macht ihr Werbebeschriftung auch beim Kunden vor Ort in Mönchengladbach?",
        a: "Ja, Werbebeschriftung setzen wir sowohl bei uns in der Halle als auch beim Kunden vor Ort um. Für Betriebe mit mehreren Fahrzeugen ist das oft praktischer, weil die Fahrzeuge nicht einzeln überführt werden müssen. Voraussetzung ist eine geeignete Fläche: Beschriftung braucht Windstille, Sauberkeit und eine halbwegs konstante Temperatur, damit die Folie sauber anlegt.",
      },
      {
        q: "Lohnt sich die Fahrt aus Mönchengladbach für eine Scheibentönung?",
        a: "Das entscheiden Sie, die Tönung selbst dauert in der Regel 2 bis 4 Stunden, Sie nehmen das Fahrzeug also am selben Tag wieder mit. Bei einer Anfahrt von rund zwanzig Minuten ist das ein halber Tag insgesamt. Wenn Sie ohnehin über eine Kombination mit Chrom Delete oder Lackschutz nachdenken, lässt sich beides in einem Termin erledigen.",
      },
    ],
  },
  {
    slug: "duesseldorf",
    city: "Düsseldorf",
    metaTitle: "Fahrzeugfolierung Düsseldorf | Lackschutz & PPF",
    metaDescription:
      "Fahrzeugfolierung und Lackschutzfolie für Düsseldorf. Studio in Jüchen, rund 30 km über die A46. Markenfolie, Festpreis-Angebot, kostenlose Beratung.",
    lead: "Folierung und Lackschutz für Düsseldorf, rund 30 Kilometer westlich, über die A46 in gut einer halben Stunde erreichbar.",
    distanceKm: 30,
    driveMinutes: "30 bis 40 Minuten",
    route: "A46 Richtung Grevenbroich / Jüchen",
    districts: [
      "Bilk",
      "Oberkassel",
      "Flingern",
      "Golzheim",
      "Gerresheim",
      "Benrath",
    ],
    body: [
      "Düsseldorf ist von uns aus die weiteste der nahen Städte, rund 30 Kilometer über die A46. Trotzdem kommen regelmäßig Kunden von dort, und der Grund ist meistens derselbe: Bei einer Vollfolierung oder einem PPF-Komplettpaket steht das Fahrzeug ohnehin mehrere Tage im Studio. Die einmalige Anfahrt fällt gegenüber dem Ergebnis kaum ins Gewicht.",
      "Was uns aus Düsseldorf am häufigsten erreicht, sind Anfragen für hochwertige Fahrzeuge: Lackschutzfolie auf Neuwagen, PPF an Sportwagenfronten, Keramikversiegelung auf dunklen Lacken. Also genau die Arbeiten, bei denen man hinterher an der Kante sieht, wer sie gemacht hat.",
      "Wenn Sie unsicher sind, ob sich die Fahrt lohnt: Schicken Sie uns vorab Fahrzeugdaten und Fotos. Sie bekommen eine ehrliche Einschätzung und einen Preisrahmen, bevor Sie sich auf die A46 setzen.",
    ],
    focus: ["lackschutzfolie", "keramikversiegelung", "fahrzeugfolierung"],
    faqs: [
      {
        q: "Lohnt sich die Fahrt von Düsseldorf nach Jüchen?",
        a: "Für mehrtägige Arbeiten auf jeden Fall, für kurze eher nach Abwägung. Rund 30 Kilometer über die A46 bedeuten je nach Verkehr 30 bis 40 Minuten. Bei einer Vollfolierung oder einem PPF-Komplettpaket bleibt das Fahrzeug mehrere Tage bei uns, da fahren Sie die Strecke zweimal insgesamt. Bei einer zweistündigen Scheibentönung sollten Sie den halben Tag einplanen.",
      },
      {
        q: "Kann ich mein Fahrzeug über mehrere Tage bei euch lassen?",
        a: "Ja, das ist bei Vollfolierungen und komplettem Lackschutz sogar der Normalfall, solche Arbeiten dauern in der Regel 3 bis 5 Tage. Das Fahrzeug steht während dieser Zeit in unserer Halle und nicht draußen. Den genauen Zeitrahmen nennen wir Ihnen zusammen mit dem Angebot, damit Sie die Zeit ohne Fahrzeug planen können.",
      },
      {
        q: "Macht ihr auch Lackschutz für Sportwagen und hochwertige Fahrzeuge?",
        a: "Ja, das ist einer unserer Schwerpunkte. Gerade bei Sportwagen lohnt sich PPF an der Front besonders, weil tiefe Frontschürzen und flache Motorhauben den Steinschlag direkt abbekommen. Ein Kunde hat seinen neuen Porsche 911 bei uns folieren lassen, die Google-Rezension dazu steht auf unserer Startseite. Für empfindliche und hochwertige Lacke arbeiten wir ausschließlich mit Markenfolie.",
      },
    ],
  },
  {
    slug: "grevenbroich",
    city: "Grevenbroich",
    metaTitle: "Fahrzeugfolierung Grevenbroich | PPF & Tönung",
    metaDescription:
      "Fahrzeugfolierung, Lackschutzfolie und Scheibentönung für Grevenbroich. Nur rund 8 km bis Jüchen. Markenfolie, Festpreis, kostenlose Beratung.",
    lead: "Folierung, Lackschutz und Scheibentönung für Grevenbroich, mit rund 8 Kilometern unser nächster Nachbar.",
    distanceKm: 8,
    driveMinutes: "10 bis 15 Minuten",
    route: "B59 oder A46",
    districts: [
      "Grevenbroich-Mitte",
      "Kapellen",
      "Wevelinghoven",
      "Gustorf",
      "Neurath",
      "Elsen",
    ],
    body: [
      "Grevenbroich ist die nächstgelegene Stadt: rund 8 Kilometer, über die B59 oder die A46 in gut zehn Minuten. Näher liegt niemand, und entsprechend unkompliziert ist alles, auch die kurzen Termine.",
      "Das ist der praktische Unterschied zu weiter entfernten Kunden: Für eine Scheibentönung, einen Chrom Delete oder eine Teilfolierung bringen Sie das Fahrzeug morgens und holen es am selben Tag wieder ab, ohne dass der Tag draufgeht. Auch ein kurzer Beratungstermin am Fahrzeug ist realistisch, statt alles per Telefon und Foto zu klären.",
      "Kommen Sie einfach vorbei, am besten nach vorheriger Absprache, damit jemand Zeit für Sie hat und Sie nicht vor verschlossener Halle stehen.",
    ],
    focus: ["scheibentoenung", "chromdelete", "fahrzeugfolierung"],
    faqs: [
      {
        q: "Wie weit ist WrapCut von Grevenbroich entfernt?",
        a: "Rund 8 Kilometer, über die B59 oder die A46 etwa zehn bis fünfzehn Minuten. Damit sind wir für Grevenbroich der nächstgelegene Folierungsbetrieb. Sie finden uns an der Neusser Str. 111 in 41363 Jüchen. Aus den westlichen Ortsteilen wie Neurath oder Gustorf ist die Fahrt noch kürzer.",
      },
      {
        q: "Kann ich für eine Beratung spontan vorbeikommen?",
        a: "Melden Sie sich vorher kurz an, wir arbeiten nach Terminvereinbarung, damit jemand tatsächlich Zeit für Sie hat. Ein Anruf am selben Tag reicht meistens. Bei Ihrer Nähe zu uns ist ein kurzer Termin am Fahrzeug ohnehin die bessere Beratung als Fotos: Farben und Oberflächen wirken auf dem Musterfächer anders als auf Ihrer Motorhaube im Tageslicht.",
      },
      {
        q: "Bekomme ich kleinere Arbeiten am selben Tag erledigt?",
        a: "Ja, das ist bei kurzer Anfahrt der Normalfall. Eine Scheibentönung dauert in der Regel 2 bis 4 Stunden, eine Teilfolierung oder ein Chrom Delete je nach Umfang ebenfalls oft nur einen Tag. Sie bringen das Fahrzeug morgens und holen es nachmittags ab. Nur Vollfolierungen und kompletter Lackschutz brauchen mehrere Tage.",
      },
    ],
  },
  {
    slug: "korschenbroich",
    city: "Korschenbroich",
    metaTitle: "Fahrzeugfolierung Korschenbroich | PPF & Tönung",
    metaDescription:
      "Fahrzeugfolierung, Lackschutzfolie und Scheibentönung für Korschenbroich. Rund 11 km bis Jüchen. Markenfolie, Festpreis-Angebot, kostenlose Beratung.",
    lead: "Folierung, Lackschutz und Scheibentönung für Korschenbroich, rund 11 Kilometer über die Landstraße.",
    distanceKm: 11,
    driveMinutes: "15 Minuten",
    route: "über Glehn und die L361",
    districts: [
      "Korschenbroich-Mitte",
      "Kleinenbroich",
      "Glehn",
      "Liedberg",
      "Pesch",
      "Herrenshoff",
    ],
    body: [
      "Korschenbroich liegt zwischen Mönchengladbach und Neuss und damit unmittelbar in unserem Einzugsgebiet, rund 11 Kilometer, über Glehn in einer knappen Viertelstunde.",
      "Für Sie heißt das: Auch kurze Arbeiten lohnen sich. Scheibentönung, Chrom Delete oder eine Teilfolierung sind je nach Umfang an einem Tag erledigt, Sie nehmen das Fahrzeug am selben Nachmittag wieder mit. Für Vollfolierung und kompletten Lackschutz planen Sie entsprechend mehrere Tage ein.",
      "Was wir Ihnen vorher sagen können, sagen wir vorher: Fahrzeug, Wunsch und ein paar Fotos genügen für eine belastbare Einschätzung samt Preisrahmen. Der Termin steht dann erst, wenn Sie wissen, worauf Sie sich einlassen.",
    ],
    focus: ["fahrzeugfolierung", "scheibentoenung", "lackschutzfolie"],
    faqs: [
      {
        q: "Wie komme ich von Korschenbroich nach Jüchen?",
        a: "Über Glehn und die L361 sind es rund 11 Kilometer und etwa eine Viertelstunde. Alternativ über die A46, was bei viel Verkehr auf der Landstraße die schnellere Variante sein kann. Unser Studio liegt an der Neusser Str. 111 in 41363 Jüchen. Aus Kleinenbroich und Glehn ist die Strecke noch kürzer.",
      },
      {
        q: "Bietet ihr auch Teilfolierungen für kleinere Budgets an?",
        a: "Ja, und häufig ist das die sinnvollere Entscheidung. Ein foliertes Dach, eine Motorhaube in Carbonoptik oder ein Chrom Delete verändern das Erscheinungsbild deutlich, zu einem Bruchteil der Kosten einer Vollfolierung, die je nach Fahrzeug und Folie zwischen 1.600 € und 8.000 € liegt. Wir sagen Ihnen ehrlich, welche Teilmaßnahme bei Ihrem Fahrzeug den größten Effekt bringt.",
      },
      {
        q: "Was kostet die Beratung?",
        a: "Nichts. Beratung und Festpreis-Angebot sind bei uns kostenlos, unabhängig davon, ob Sie danach beauftragen. Sie bekommen eine Einschätzung zu Material, Umfang und Aufwand sowie einen verbindlichen Preis und wenn eine günstigere Lösung die bessere ist, sagen wir das auch. Rufen Sie an oder schicken Sie uns Fotos Ihres Fahrzeugs.",
      },
    ],
  },
  {
    slug: "kaarst",
    city: "Kaarst",
    metaTitle: "Fahrzeugfolierung Kaarst | Lackschutz & Tönung",
    metaDescription:
      "Fahrzeugfolierung, Lackschutzfolie und Scheibentönung für Kaarst. Rund 20 km bis Jüchen über die A46. Markenfolie, Festpreis, kostenlose Beratung.",
    lead: "Folierung, Lackschutz und Scheibentönung für Kaarst, rund 20 Kilometer, über die A46 in gut zwanzig Minuten.",
    distanceKm: 20,
    driveMinutes: "20 bis 25 Minuten",
    route: "A57 und A46 Richtung Jüchen",
    districts: [
      "Kaarst-Mitte",
      "Büttgen",
      "Holzbüttgen",
      "Vorst",
      "Driesch",
    ],
    body: [
      "Kaarst liegt nordöstlich von uns, zwischen Neuss und Willich. Über A57 und A46 sind es rund 20 Kilometer und etwa zwanzig bis fünfundzwanzig Minuten bis zum Studio in Jüchen.",
      "Aus Kaarst und Büttgen erreichen uns vor allem Anfragen zu Lackschutzfolie und Vollfolierung, also Arbeiten, bei denen das Fahrzeug mehrere Tage im Studio bleibt und die einmalige Anfahrt keine Rolle spielt. Für Firmenkunden aus dem Gewerbegebiet gilt dasselbe wie überall: Flottenbeschriftung setzen wir auch vor Ort um.",
      "Ob sich der Weg für Ihr Vorhaben lohnt, klären wir vorab am Telefon. Sie bekommen eine Einschätzung zu Aufwand, Dauer und Preisrahmen, bevor Sie einen Termin vereinbaren.",
    ],
    focus: ["lackschutzfolie", "fahrzeugfolierung", "werbebeschriftung"],
    faqs: [
      {
        q: "Wie lange fahre ich von Kaarst nach Jüchen?",
        a: "Rund 20 Kilometer über A57 und A46, je nach Verkehr zwanzig bis fünfundzwanzig Minuten. Unser Studio liegt an der Neusser Str. 111 in 41363 Jüchen, Parkplätze sind direkt vorhanden. Aus Büttgen und Holzbüttgen ist die Strecke vergleichbar, da beide über dieselbe Autobahnauffahrt laufen.",
      },
      {
        q: "Beschriftet ihr auch Firmenflotten aus Kaarst?",
        a: "Ja, sowohl bei uns in der Halle als auch beim Kunden vor Ort. Für Flotten ist die Beschriftung vor Ort meist praktischer, weil die Fahrzeuge nicht einzeln überführt werden müssen und der Betrieb weiterlaufen kann. Wir stimmen das Layout einmal ab und setzen es dann auf allen Fahrzeugen um, an die jeweilige Karosserie angepasst statt einfach skaliert.",
      },
      {
        q: "Kann ich vorab ein Angebot bekommen, ohne vorbeizukommen?",
        a: "Ja. Schicken Sie uns Fahrzeugmodell, Baujahr, den gewünschten Umfang und ein paar Fotos, daraus erstellen wir einen belastbaren Preisrahmen. Ein verbindliches Festpreis-Angebot machen wir, sobald wir das Fahrzeug gesehen haben, weil der Zustand des Lacks und der Demontageaufwand den Preis maßgeblich bestimmen. Beides ist kostenlos.",
      },
    ],
  },
]

export const serviceSlugs = Object.keys(serviceDetails)

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}
