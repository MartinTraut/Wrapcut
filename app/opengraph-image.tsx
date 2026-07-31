import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "WrapCut: Fahrzeugfolierung und Lackschutz in Jüchen"

/**
 * Social-Preview. Bisher verwies das Metadata-Set auf eine nie angelegte
 * /og.jpg — jeder Share auf WhatsApp, LinkedIn oder Slack lieferte ein 404.
 * Wird zur Buildzeit erzeugt, damit kein Asset gepflegt werden muss.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(120% 120% at 15% 20%, #1d3524 0%, #0b1410 55%, #080f0c 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#f4f7f2",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 44,
              background: "#5fbf82",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            WrapCut
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              maxWidth: 940,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Fahrzeugfolierung</span>
            <span style={{ color: "#5fbf82" }}>&amp; Lackschutz</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#a9b8ac",
              maxWidth: 900,
            }}
          >
            {`${site.address.city} · Rhein-Kreis Neuss — für Neuss, Mönchengladbach und Düsseldorf`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 26,
            color: "#8d9c90",
            borderTop: "1px solid rgba(244,247,242,0.14)",
            paddingTop: 26,
          }}
        >
          {/* Kein Stern-Glyph: Satori müsste dafür eine Fallback-Schrift
              nachladen, was den Build offline scheitern lässt. */}
          <span style={{ color: "#5fbf82", fontWeight: 700 }}>5,0 von 5</span>
          <span>{`bei ${site.reviews.count} Google-Bewertungen`}</span>
          <span>{site.domain}</span>
        </div>
      </div>
    ),
    size,
  )
}
