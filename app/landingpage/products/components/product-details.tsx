"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { ShoppingCart, Check, Truck, RotateCcw, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useLandingCart } from "@/lib/context/landing-cart-context"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/data/schema"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useLandingCart()

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    })
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= product.stock) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Product name and badges */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category?.name || "Uncategorized"}
          </Badge>
          {product.stock <= 10 && (
            <Badge variant="destructive" className="text-xs">
              Low Stock
            </Badge>
          )}
          {product.stock > 10 && (
            <Badge variant="secondary" className="text-xs">
              In Stock
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-primary">{formatCurrency(Number(product.price))}</span>
        {/* You can add a discount price comparison here if needed */}
      </div>

      {/* Short description */}
      <p className="text-muted-foreground">{product.description || "No description available for this product."}</p>

      <Separator />

      {/* Quantity selector and add to cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <Input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
            >
              +
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">{product.stock} available</span>
        </div>

        <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>

      <Separator />

      {/* Product features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">30-day return policy</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">Quality guaranteed</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">Secure checkout</span>
        </div>
      </div>

      <Separator />

      {/* Product details tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-4">
          <div className="space-y-4">
            <p>
              {product.description ||
                `This premium product is designed to meet all your needs. Crafted with high-quality materials 
                and attention to detail, it's built to last and provide exceptional performance.`}
            </p>
            <p>
              Experience the difference with our product's unique features and elegant design. Perfect for everyday use
              and special occasions alike.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">SKU</span>
                <span>{product.id.substring(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Category</span>
                <span>{product.category?.name || "Uncategorized"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Weight</span>
                <span>0.5 kg</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Dimensions</span>
                <span>10 × 10 × 10 cm</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Material</span>
                <span>Premium</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Color</span>
                <span>Various</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="pt-4">
          <div className="space-y-4">
            <p>We offer the following shipping options:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Standard Shipping (3-5 business days): $5.99</li>
              <li>Express Shipping (1-2 business days): $12.99</li>
              <li>Free Standard Shipping on orders over $50</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Please note that shipping times may vary depending on your location and availability. International
              shipping options are also available at checkout.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
