"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/data/schema"

export type LandingCartItem = {
  product: Product
  quantity: number
}

type LandingCartContextType = {
  items: LandingCartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  tax: number
  total: number
}

const LandingCartContext = createContext<LandingCartContextType | undefined>(undefined)

export function LandingCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LandingCartItem[]>([])

  // Load cart from localStorage on client side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("landing-cart")
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to load landing cart from localStorage:", error)
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("landing-cart", JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save landing cart to localStorage:", error)
    }
  }, [items])

  const addItem = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prevItems, { product, quantity }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <LandingCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        total,
      }}
    >
      {children}
    </LandingCartContext.Provider>
  )
}

export function useLandingCart() {
  const context = useContext(LandingCartContext)
  if (context === undefined) {
    throw new Error("useLandingCart must be used within a LandingCartProvider")
  }
  return context
}
