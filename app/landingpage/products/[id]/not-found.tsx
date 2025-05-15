import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center">
      <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-3xl font-bold mb-2">Product Not Found</h1>
      <p className="text-muted-foreground mb-6">Sorry, we couldn't find the product you're looking for.</p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/landingpage#products">Browse Products</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/landingpage">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
