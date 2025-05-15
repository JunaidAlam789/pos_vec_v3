"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

/**
 * Populates the sales analytics table with data from a completed order
 */
export async function populateSalesAnalytics(orderId: string) {
  try {
    // Get the order with all related data
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
        customer: true,
      },
    })

    if (!order || order.status !== "COMPLETED") {
      return { success: false, error: "Order not found or not completed" }
    }

    const orderDate = order.createdAt
    const hour = orderDate.getHours()
    const dayOfWeek = orderDate.getDay()
    const month = orderDate.getMonth() + 1
    const year = orderDate.getFullYear()

    // Create analytics entries for each order item
    const analyticsEntries = order.items.map((item) => {
      // Calculate profit (assuming we have cost data)
      // In a real system, you would get the actual cost from your inventory system
      const estimatedCost = item.price * 0.6 // Assuming 60% cost of goods sold
      const profit = item.price * item.quantity - estimatedCost * item.quantity

      return {
        date: new Date(orderDate.setHours(0, 0, 0, 0)), // Normalize to start of day
        productId: item.productId,
        productName: item.product.name,
        categoryId: item.product.categoryId,
        categoryName: item.product.category.name,
        quantity: item.quantity,
        revenue: item.price * item.quantity,
        cost: estimatedCost * item.quantity,
        profit: profit,
        discountAmount: 0, // Add discount logic if applicable
        hour,
        dayOfWeek,
        month,
        year,
        customerId: order.customerId,
        employeeId: null, // Add employee tracking if applicable
      }
    })

    // Insert the analytics entries
    await db.salesAnalytics.createMany({
      data: analyticsEntries,
    })

    return { success: true }
  } catch (error) {
    console.error("Error populating sales analytics:", error)
    return { success: false, error: String(error) }
  }
}

/**
 * Updates the order status and populates analytics if completed
 */
export async function updateOrderStatusWithAnalytics(id: string, status: string) {
  try {
    const updatedOrder = await db.order.update({
      where: { id },
      data: {
        status,
      },
    })

    // If the order is completed, populate analytics
    if (status === "COMPLETED") {
      await populateSalesAnalytics(id)
    }

    revalidatePath(`/orders/${id}`)
    revalidatePath("/orders")
    return updatedOrder
  } catch (error) {
    console.error(`Failed to update order status with id ${id}:`, error)
    throw error
  }
}

/**
 * Backfills sales analytics for historical orders
 */
export async function backfillSalesAnalytics() {
  try {
    // Get all completed orders that don't have analytics entries
    const completedOrders = await db.order.findMany({
      where: {
        status: "COMPLETED",
      },
    })

    let processedCount = 0
    for (const order of completedOrders) {
      const result = await populateSalesAnalytics(order.id)
      if (result.success) {
        processedCount++
      }
    }

    return { success: true, processedCount }
  } catch (error) {
    console.error("Error backfilling sales analytics:", error)
    return { success: false, error: String(error) }
  }
}
