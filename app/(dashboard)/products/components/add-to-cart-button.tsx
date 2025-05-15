"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/context/cart-context"
import { ShoppingCart, Check } from "lucide-react"
import type { Product } from "@/lib/data/schema"
import { Input } from "@/components/ui/input"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)

    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-24">
          <Input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
            className="h-10"
          />
        </div>
        <Button onClick={handleAddToCart} className="flex-1" disabled={added || product.stock <= 0}>
          {added ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
      {product.stock <= 0 && <p className="text-sm text-destructive">This product is out of stock</p>}
    </div>
  )
}
