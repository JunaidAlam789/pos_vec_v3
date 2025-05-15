import type React from "react"
import { LandingCartProvider } from "@/lib/context/landing-cart-context"

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LandingCartProvider>{children}</LandingCartProvider>
}
