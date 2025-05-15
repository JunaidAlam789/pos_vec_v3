"use server"

import { generateText } from "ai"
import { semanticSearch, getRecordDetails } from "@/lib/ai/embeddings"
import { defaultModel } from "@/lib/ai/config"

export async function processChatbotQuery(query: string) {
  try {
    // Perform semantic search to find relevant store data
    const searchResults = await semanticSearch(query, 5)

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

    // Format the context from search results
    const context = detailedResults
      .map((result) => {
        return `
        Content Type: ${result.contentType}
        Content: ${result.content}
        Similarity Score: ${result.similarity}
        `
      })
      .join("\n\n")

    // Generate a response using the AI model with the context
    const { text } = await generateText({
      model: defaultModel,
      system: `You are a helpful assistant for a POS (Point of Sale) system. 
      You have access to store data including products, categories, orders, and customers.
      Use the provided context from semantic search to answer the user's question.
      If the context doesn't contain enough information to answer the question, say so politely.
      Always be concise, accurate, and helpful.`,
      prompt: `
      User Query: ${query}
      
      Context from Store Data:
      ${context}
      
      Please provide a helpful response based on this information.
      `,
    })

    return {
      success: true,
      response: text,
      searchResults: detailedResults,
    }
  } catch (error) {
    console.error("Error processing chatbot query:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
