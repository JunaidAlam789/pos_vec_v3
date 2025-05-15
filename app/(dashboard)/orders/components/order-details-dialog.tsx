"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Loader2, Package, MapPin, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateOrderStatus } from "@/lib/data/actions"
import { toast } from "@/components/ui/use-toast"

interface OrderDetailsDialogProps {
  orderId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

type OrderDetails = {
  id: string
  orderNumber: string
  status: string
  total: string
  subtotal: string
  tax: string
  createdAt: string
  paymentMethod: string
  shippingAddress: {
    address: string
    city: string
    state: string
    zipCode: string
  }
  customer: {
    id: string
    name: string
    email: string
  }
  items: {
    id: string
    quantity: number
    price: string
    product: {
      id: string
      name: string
      image: string
    }
  }[]
}

export function OrderDetailsDialog({ orderId, open, onOpenChange }: OrderDetailsDialogProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [statusLoading, setStatusLoading] = useState(false)

  const fetchOrderDetails = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch order details: ${response.statusText}`)
      }
      const data = await response.json()
      setOrderDetails(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch order details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open && orderId) {
      fetchOrderDetails()
    }
  }, [open, orderId])

  const handleStatusChange = async (newStatus: string) => {
    if (!orderDetails) return

    setStatusLoading(true)
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrderDetails({
        ...orderDetails,
        status: newStatus,
      })
      toast({
        title: "Order status updated",
        description: `Order #${orderDetails.orderNumber || orderId} status changed to ${newStatus.toLowerCase()}`,
      })
      router.refresh()
    } catch (err) {
      toast({
        title: "Failed to update status",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setStatusLoading(false)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success"
      case "PENDING":
        return "warning"
      case "PROCESSING":
        return "default"
      case "DELIVERED":
        return "success"
      case "SHIPPED":
        return "default"
      case "CANCELLED":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {orderDetails?.orderNumber ? `Order #${orderDetails.orderNumber}` : `Order #${orderId}`}
          </DialogTitle>
          <DialogDescription>Order details and items</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={fetchOrderDetails}>
              Try Again
            </Button>
          </div>
        ) : orderDetails ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Order Status</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getStatusBadgeVariant(orderDetails.status)} className="mr-2">
                    {orderDetails.status.toLowerCase()}
                  </Badge>
                  <div className="flex-1">
                    <Select
                      defaultValue={orderDetails.status}
                      onValueChange={handleStatusChange}
                      disabled={statusLoading}
                    >
                      <SelectTrigger className="h-8 w-[130px]">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date Placed</h3>
                <p className="mt-1">{formatDate(orderDetails.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
                <p className="mt-1">{orderDetails.customer.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="mt-1">{orderDetails.customer.email}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Order Items</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {item.product.image && (
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${Number.parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">${(Number.parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {orderDetails.shippingAddress && (
              <>
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Shipping Address
                  </h3>
                  <div className="text-sm">
                    <p>{orderDetails.shippingAddress.address}</p>
                    <p>
                      {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
                      {orderDetails.shippingAddress.zipCode}
                    </p>
                  </div>
                </div>
                <Separator />
              </>
            )}

            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Information
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Method</p>
                  <p className="text-sm">{orderDetails.paymentMethod || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-sm">${Number.parseFloat(orderDetails.subtotal || "0").toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tax</p>
                  <p className="text-sm">${Number.parseFloat(orderDetails.tax || "0").toFixed(2)}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <h3 className="font-medium">Total</h3>
              <p className="text-lg font-bold">${Number.parseFloat(orderDetails.total).toFixed(2)}</p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={() => window.print()}>Print Order</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">No order details found</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
