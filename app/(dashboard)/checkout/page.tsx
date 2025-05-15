"use client"

import { CheckoutForm } from "./components/checkout-form"
import { CartSummary } from "./components/cart-summary"
import { useCart } from "@/lib/context/cart-context"

export default function CheckoutPage() {
  const { items } = useCart()

  return (
    <div className="flex-1 p-4 md:p-8 pt-4 md:pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Checkout</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Checkout form */}
        <div className="lg:col-span-2 space-y-6">
          <CheckoutForm />
        </div>

        {/* Right column - Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
