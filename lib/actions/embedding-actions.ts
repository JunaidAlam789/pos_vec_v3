"use server"

import { db } from "@/lib/db"
import {
  generateEmbedding,
  prepareProductForEmbedding,
  prepareCategoryForEmbedding,
  prepareOrderForEmbedding,
  storeEmbedding,
} from "@/lib/ai/embeddings"

export async function generateAllEmbeddings(): Promise<{
  success: boolean
  productsProcessed: number
  categoriesProcessed: number
  ordersProcessed: number
  error?: string
}> {
  try {
    // Process products
    const products = await db.product.findMany({
      include: { category: true },
    })

    let productsProcessed = 0
    for (const product of products) {
      try {
        const content = prepareProductForEmbedding(product)
        const embedding = await generateEmbedding(content)
        await storeEmbedding(content, "product", product.id, embedding)
        productsProcessed++
      } catch (error) {
        console.error(`Error processing product ${product.id}:`, error)
      }
    }

    // Process categories
    const categories = await db.category.findMany()

    let categoriesProcessed = 0
    for (const category of categories) {
      try {
        const content = prepareCategoryForEmbedding(category)
        const embedding = await generateEmbedding(content)
        await storeEmbedding(content, "category", category.id, embedding)
        categoriesProcessed++
      } catch (error) {
        console.error(`Error processing category ${category.id}:`, error)
      }
    }

    // Process orders
    const orders = await db.order.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    let ordersProcessed = 0
    for (const order of orders) {
      try {
        const content = prepareOrderForEmbedding(order)
        const embedding = await generateEmbedding(content)
        await storeEmbedding(content, "order", order.id, embedding)
        ordersProcessed++
      } catch (error) {
        console.error(`Error processing order ${order.id}:`, error)
      }
    }

    return {
      success: true,
      productsProcessed,
      categoriesProcessed,
      ordersProcessed,
    }
  } catch (error) {
    console.error("Error generating embeddings:", error)
    return {
      success: false,
      productsProcessed: 0,
      categoriesProcessed: 0,
      ordersProcessed: 0,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Function to update embeddings when records are created or updated
export async function updateProductEmbedding(product: any): Promise<boolean> {
  try {
    const content = prepareProductForEmbedding(product)
    const embedding = await generateEmbedding(content)
    await storeEmbedding(content, "product", product.id, embedding)
    return true
  } catch (error) {
    console.error(`Error updating embedding for product ${product.id}:`, error)
    return false
  }
}

export async function updateCategoryEmbedding(category: any): Promise<boolean> {
  try {
    const content = prepareCategoryForEmbedding(category)
    const embedding = await generateEmbedding(content)
    await storeEmbedding(content, "category", category.id, embedding)
    return true
  } catch (error) {
    console.error(`Error updating embedding for category ${category.id}:`, error)
    return false
  }
}

export async function updateOrderEmbedding(order: any): Promise<boolean> {
  try {
    const content = prepareOrderForEmbedding(order)
    const embedding = await generateEmbedding(content)
    await storeEmbedding(content, "order", order.id, embedding)
    return true
  } catch (error) {
    console.error(`Error updating embedding for order ${order.id}:`, error)
    return false
  }
}
