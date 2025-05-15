"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface TopProduct {
  productId: string
  productName: string
  quantity: number
  revenue: number
  profit: number
}

interface TopProductsProps {
  products: TopProduct[]
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Your best performing products by revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.productId} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{product.productName}</p>
                <p className="text-sm text-muted-foreground">
                  {product.quantity} units • {formatCurrency(product.profit)} profit
                </p>
              </div>
              <div className="font-medium">{formatCurrency(product.revenue)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
