"use server"

import { generateSQLFromNaturalLanguage, executeSQLQuery, explainSQLQuery } from "@/lib/ai/sql-generator"

export async function processNaturalLanguageQuery(question: string) {
  try {
    // Generate SQL from natural language
    const sqlQuery = await generateSQLFromNaturalLanguage(question)

    if (sqlQuery.includes("I cannot generate a SQL query for this question")) {
      return {
        success: false,
        error: "Could not generate a SQL query for this question",
        sqlQuery,
      }
    }

    // Execute the SQL query
    const results = await executeSQLQuery(sqlQuery)

    return {
      success: true,
      sqlQuery,
      results,
    }
  } catch (error) {
    console.error("Error processing natural language query:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function explainQuery(sqlQuery: string) {
  try {
    const explanation = await explainSQLQuery(sqlQuery)
    return {
      success: true,
      explanation,
    }
  } catch (error) {
    console.error("Error explaining SQL query:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
