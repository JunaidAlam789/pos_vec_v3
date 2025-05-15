"use client"

import { useCart } from "@/lib/context/cart-context"
import { formatCurrency } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartSummary() {
  const { items, removeItem, updateQuantity, subtotal, tax, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="flex justify-center mb-4">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(({ product, quantity }) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative rounded-md overflow-hidden bg-muted">
                      <Image
                        src={product.image || "/placeholder.svg?height=40&width=40"}
                        alt={product.name}
                        className="object-cover"
                        width={40}
                        height={40}
                        priority
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-muted-foreground mr-2">
                          {formatCurrency(Number(product.price))}
                        </span>
                        <span className="text-xs">×</span>
                        <Input
                          type="number"
                          min={1}
                          max={product.stock}
                          value={quantity}
                          onChange={(e) => updateQuantity(product.id, Number.parseInt(e.target.value) || 1)}
                          className="w-12 h-6 text-xs ml-2"
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(Number(product.price) * quantity)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => removeItem(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-1.5 pt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax (10%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex items-center justify-between font-medium pt-2 border-t mt-2">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}
