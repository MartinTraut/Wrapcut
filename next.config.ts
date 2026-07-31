import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // hero.tsx forderte quality 92, erlaubt war nur 75 — Next stufte still
    // zurück. Beide Stufen jetzt explizit freigegeben.
    qualities: [75, 92],
    formats: ["image/avif", "image/webp"],
    // Keine remotePatterns: alle Bilder liegen lokal. Ein offener Image-
    // Optimizer wäre nur zusätzliche Angriffsfläche.
  },
}

export default nextConfig
