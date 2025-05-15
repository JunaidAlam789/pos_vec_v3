import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerInfo, items, subtotal, tax, total, notes } = body

    // Validate input
    if (!customerInfo || !items || items.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 })
    }

    // Check if customer exists, if not create a new one
    let customer = await db.user.findUnique({
      where: { email: customerInfo.email },
    })

    if (!customer) {
      customer = await db.user.create({
        data: {
          name: customerInfo.name,
          email: customerInfo.email,
          role: "CUSTOMER",
        },
      })
    }

    // Create the order
    const order = await db.order.create({
      data: {
        customerId: customer.id,
        status: "PENDING",
        total,
 //       paymentStatus: "PENDING",
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
  //      notes,
      },
    })

    // Update product stock
    for (const item of items) {
      await db.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 })
  }
}
