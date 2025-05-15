"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/data/schema"
import { Card } from "@/components/ui/card"

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.image || "/placeholder.svg?height=600&width=600")

  // For now, we'll use the main image and some placeholder images
  // In a real application, you would have multiple product images
  const images = [
    product.image || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Product+View+2",
    "/placeholder.svg?height=600&width=600&text=Product+View+3",
    "/placeholder.svg?height=600&width=600&text=Product+View+4",
  ]

  return (
    <div className="space-y-4">
      {/* Main image */}
      <Card className="overflow-hidden rounded-lg border bg-background">
        <div className="relative aspect-square">
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </Card>

      {/* Thumbnail images */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md border",
              selectedImage === image ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-muted-foreground",
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 10vw"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
