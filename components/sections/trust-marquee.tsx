const items = [
  "Fahrzeugfolierung",
  "Lackschutz PPF",
  "Keramikversiegelung",
  "Scheibentönung",
  "Werbebeschriftung",
  "Mattfolierung",
  "Steinschlagschutz",
  "Teilfolierung",
  "Premium-Markenfolie",
]

/**
 * Laufband im Display-Register. Jeder zweite Begriff steht als Kontur statt
 * als Vollton — dadurch entsteht Rhythmus im Band selbst, und das Element
 * wird vom dekorativen Streifen zu einem typografischen Statement. Der
 * frühere Sparkles-Stern zwischen den Wörtern ist entfallen: ein Icon, das
 * neunmal dasselbe sagt, sagt nichts.
 */
export function TrustMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border py-7 lg:py-9">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10 lg:gap-14 lg:pr-14">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className={
                "font-display text-[clamp(1.6rem,3vw,3rem)] leading-none font-bold tracking-[-0.045em] whitespace-nowrap " +
                (i % 2 === 0 ? "text-foreground/85" : "text-outline")
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
