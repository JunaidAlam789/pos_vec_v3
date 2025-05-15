import { type NextRequest, NextResponse } from "next/server"
import { generateSQLFromNaturalLanguage, executeSQLQuery, explainSQLQuery } from "@/lib/ai/sql-generator"

export async function POST(request: NextRequest) {
  try {
    const { question, action } = await request.json()

    if (!question && action !== "explain") {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    // If action is explain, we expect a SQL query instead of a question
    if (action === "explain") {
      const explanation = await explainSQLQuery(question)
      return NextResponse.json({ explanation })
    }

    // Generate SQL from natural language
    const sqlQuery = await generateSQLFromNaturalLanguage(question)

    if (sqlQuery.includes("I cannot generate a SQL query for this question")) {
      return NextResponse.json(
        {
          error: "Could not generate a SQL query for this question",
          sqlQuery,
        },
        { status: 400 },
      )
    }

    // Execute the SQL query
    const results = await executeSQLQuery(sqlQuery)

    return NextResponse.json({
      sqlQuery,
      results,
    })
  } catch (error) {
    console.error("Error in chatbot API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
