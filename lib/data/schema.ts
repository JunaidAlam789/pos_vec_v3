export type User = {
  id: string
  name: string
  email: string
  role: "ADMIN" | "STAFF" | "CUSTOMER"
  avatar?: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  sku: string
  categoryId: string
  stock: number
}

export type Category = {
  id: string
  name: string
  description: string
}

export type Order = {
  id: string
  customerId: string
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "COMPLETED" | "CANCELLED"
  total: number
  items: OrderItem[]
  createdAt: Date
}

export type OrderItem = {
  id: string
  productId: string
  quantity: number
  price: number
}

export type Payment = {
  id: string
  orderId: string
  amount: number
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
  method: "CREDIT_CARD" | "PAYPAL" | "CASH"
}

export type SalesAnalytics = {
  id: string
  date: Date
  productId: string
  productName: string
  categoryId: string
  categoryName: string
  quantity: number
  revenue: number
  cost: number
  profit: number
  discountAmount: number
  hour: number
  dayOfWeek: number
  month: number
  year: number
  customerId?: string
  employeeId?: string
}
