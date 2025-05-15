import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id
    const data = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Validate status if it's being updated
    if (data.status) {
      const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "COMPLETED", "CANCELLED"]
      if (!validStatuses.includes(data.status)) {
        return NextResponse.json({ error: "Invalid order status" }, { status: 400 })
      }
    }

    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(updatedOrder)
  } catch (error: any) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: error.message || "Failed to update order" }, { status: 500 })
  }
}
