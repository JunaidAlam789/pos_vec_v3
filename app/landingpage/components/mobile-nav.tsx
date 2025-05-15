"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="#products"
            className="text-lg font-medium hover:underline underline-offset-4"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>
          <Link
            href="#categories"
            className="text-lg font-medium hover:underline underline-offset-4"
            onClick={() => setOpen(false)}
          >
            Categories
          </Link>
          <Link
            href="#about"
            className="text-lg font-medium hover:underline underline-offset-4"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="#testimonials"
            className="text-lg font-medium hover:underline underline-offset-4"
            onClick={() => setOpen(false)}
          >
            Testimonials
          </Link>
          <Link
            href="/dashboard"
            className="text-lg font-medium hover:underline underline-offset-4"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <div className="flex flex-col gap-2 mt-4">
            <Button asChild variant="outline" onClick={() => setOpen(false)}>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/dashboard">Shop Now</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
