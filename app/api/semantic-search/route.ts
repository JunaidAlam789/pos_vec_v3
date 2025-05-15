import { type NextRequest, NextResponse } from "next/server"
import { semanticSearch, getRecordDetails } from "@/lib/ai/embeddings"

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 5 } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Perform semantic search
    const searchResults = await semanticSearch(query, limit)

    // Fetch detailed information for each result
    const detailedResults = await Promise.all(
      searchResults.map(async (result) => {
        const details = await getRecordDetails(result.contentType, result.recordId)
        return {
          ...result,
          details,
        }
      }),
    )

    return NextResponse.json({
      results: detailedResults,
    })
  } catch (error) {
    console.error("Error in semantic search API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
