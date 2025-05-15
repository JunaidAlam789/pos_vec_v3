import type React from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "../components/mobile-nav"
import { LandingCart } from "../components/landing-cart"
import { ThemeProvider } from "@/components/theme-provider"
import { LandingCartProvider } from "@/lib/context/landing-cart-context"

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LandingCartProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="flex flex-col min-h-screen">
          {/* Navigation */}
          <header className="border-b">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
              <Link href="/landingpage" className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-xl font-bold">ShopEase</span>
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/landingpage#products" className="text-sm font-medium hover:underline underline-offset-4">
                  Products
                </Link>
                <Link href="/landingpage#categories" className="text-sm font-medium hover:underline underline-offset-4">
                  Categories
                </Link>
                <Link href="/landingpage#about" className="text-sm font-medium hover:underline underline-offset-4">
                  About
                </Link>
                <Link
                  href="/landingpage#testimonials"
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Testimonials
                </Link>
                <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
                  Dashboard
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="sm" className="hidden md:flex">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="hidden md:flex">
                  <Link href="/dashboard">Shop Now</Link>
                </Button>
                <LandingCart />
                <MobileNav />
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="w-full py-6 md:py-12 border-t">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <Link href="/landingpage" className="flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6" />
                    <span className="text-xl font-bold">ShopEase</span>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your one-stop shop for quality products at affordable prices.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shop</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/landingpage#products" className="text-sm hover:underline">
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link href="/landingpage#categories" className="text-sm hover:underline">
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm hover:underline">
                        New Arrivals
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm hover:underline">
                        Sale
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Company</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/landingpage#about" className="text-sm hover:underline">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm hover:underline">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm hover:underline">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm hover:underline">
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Help</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-sm hover:underline">
                        Shipping & Returns
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm hover:underline">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm hover:underline">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm hover:underline">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
                <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 ShopEase. All rights reserved.</p>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <Link href="#" className="text-gray-500 hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </LandingCartProvider>
  )
}
