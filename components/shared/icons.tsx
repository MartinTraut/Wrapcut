/**
 * Markenzeichen, die `lucide-react` bewusst nicht führt.
 *
 * Lucide hat Brand-Icons aus Lizenzgründen entfernt — ein Import von
 * `Instagram` schlägt deshalb erst beim Typecheck fehl, nicht beim Schreiben.
 * Die Glyphe steht hier einmal zentral, statt in jeder Section neu gezeichnet
 * zu werden, und übernimmt Strichstärke und Größe vom Aufrufer.
 */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
