"use server"

import { db } from "@/lib/db"

/**
 * Get sales by time period (day, week, month, year)
 */
export async function getSalesByTimePeriod(period: "day" | "week" | "month" | "year", limit = 10) {
  try {
    let groupBy: any
    let orderBy: any

    switch (period) {
      case "day":
        // Group by date
        groupBy = {
          date: true,
        }
        orderBy = {
          date: "desc",
        }
        break
      case "week":
        // Group by year and week
        groupBy = {
          year: true,
          week: true,
        }
        orderBy = [{ year: "desc" }, { week: "desc" }]
        break
      case "month":
        // Group by year and month
        groupBy = {
          year: true,
          month: true,
        }
        orderBy = [{ year: "desc" }, { month: "desc" }]
        break
      case "year":
        // Group by year
        groupBy = {
          year: true,
        }
        orderBy = {
          year: "desc",
        }
        break
    }

    const results = await db.salesAnalytics.groupBy({
      by: groupBy,
      _sum: {
        revenue: true,
        profit: true,
        quantity: true,
      },
      orderBy,
      take: limit,
    })

    return results
  } catch (error) {
    console.error(`Failed to get sales by ${period}:`, error)
    return []
  }
}

/**
 * Get top selling products
 */
export async function getTopSellingProducts(limit = 10, startDate?: Date, endDate?: Date) {
  try {
    let dateFilter = {}
    if (startDate && endDate) {
      dateFilter = {
        date: {
          gte: startDate,
          lte: endDate,
        },
      }
    }

    const results = await db.salesAnalytics.groupBy({
      by: ["productId", "productName"],
      _sum: {
        quantity: true,
        revenue: true,
        profit: true,
      },
      where: dateFilter,
      orderBy: {
        _sum: {
          revenue: "desc",
        },
      },
      take: limit,
    })

    return results
  } catch (error) {
    console.error("Failed to get top selling products:", error)
    return []
  }
}

/**
 * Get sales by category
 */
export async function getSalesByCategory(limit = 10, startDate?: Date, endDate?: Date) {
  try {
    let dateFilter = {}
    if (startDate && endDate) {
      dateFilter = {
        date: {
          gte: startDate,
          lte: endDate,
        },
      }
    }

    const results = await db.salesAnalytics.groupBy({
      by: ["categoryId", "categoryName"],
      _sum: {
        quantity: true,
        revenue: true,
        profit: true,
      },
      where: dateFilter,
      orderBy: {
        _sum: {
          revenue: "desc",
        },
      },
      take: limit,
    })

    return results
  } catch (error) {
    console.error("Failed to get sales by category:", error)
    return []
  }
}

/**
 * Get sales by hour of day
 */
export async function getSalesByHourOfDay() {
  try {
    const results = await db.salesAnalytics.groupBy({
      by: ["hour"],
      _sum: {
        revenue: true,
        quantity: true,
      },
      orderBy: {
        hour: "asc",
      },
    })

    return results
  } catch (error) {
    console.error("Failed to get sales by hour of day:", error)
    return []
  }
}

/**
 * Get sales by day of week
 */
export async function getSalesByDayOfWeek() {
  try {
    const results = await db.salesAnalytics.groupBy({
      by: ["dayOfWeek"],
      _sum: {
        revenue: true,
        quantity: true,
      },
      orderBy: {
        dayOfWeek: "asc",
      },
    })

    return results
  } catch (error) {
    console.error("Failed to get sales by day of week:", error)
    return []
  }
}
