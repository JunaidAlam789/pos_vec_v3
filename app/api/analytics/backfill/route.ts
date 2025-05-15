import { NextResponse } from "next/server"
import { backfillSalesAnalytics } from "@/lib/data/analytics-actions"

export async function GET() {
  try {
    const result = await backfillSalesAnalytics()

    if (result.success) {
      return NextResponse.json({
        message: "Analytics backfill completed successfully",
        processedCount: result.processedCount,
      })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Failed to backfill analytics:", error)
    return NextResponse.json({ error: "Failed to backfill analytics" }, { status: 500 })
  }
}
