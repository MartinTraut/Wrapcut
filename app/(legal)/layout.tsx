import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { Container } from "@/components/shared/container"
import { Footer } from "@/components/sections/footer"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="border-b border-border">
        <Container className="flex h-16 items-center justify-between lg:h-20">
          <Logo />
          <Link
            href="/"
            className="t-mono inline-flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Zur Startseite
          </Link>
        </Container>
      </header>
      {/* id/tabIndex wie im Marketing-Layout — sonst läuft der globale
          Skip-Link auf diesen beiden Seiten ins Leere. */}
      <main id="main" tabIndex={-1} className="py-20 lg:py-28">
        <Container className="max-w-3xl">{children}</Container>
      </main>
      <Footer />
    </>
  )
}
