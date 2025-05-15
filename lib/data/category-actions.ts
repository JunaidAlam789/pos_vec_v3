"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import type { Category } from "./schema"
// Import the embedding update function at the top of the file
import { updateCategoryEmbedding } from "@/lib/actions/embedding-actions"

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return categories
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const category = await db.category.findUnique({
      where: { id },
    })
    return category
  } catch (error) {
    console.error(`Failed to fetch category with id ${id}:`, error)
    return null
  }
}

// Update the createCategory function to also update embeddings
export async function createCategory(category: Omit<Category, "id">): Promise<Category> {
  try {
    const newCategory = await db.category.create({
      data: category,
    })

    // Update the embedding for the new category
    try {
      await updateCategoryEmbedding(newCategory)
    } catch (embeddingError) {
      console.error("Failed to create embedding for category:", embeddingError)
      // Continue even if embedding creation fails
    }

    revalidatePath("/categories")
    revalidatePath("/products")
    return newCategory
  } catch (error) {
    console.error("Failed to create category:", error)
    throw error
  }
}

// Update the updateCategory function to also update embeddings
export async function updateCategory(id: string, category: Partial<Category>): Promise<Category> {
  try {
    const updatedCategory = await db.category.update({
      where: { id },
      data: category,
    })

    // Update the embedding for the updated category
    try {
      await updateCategoryEmbedding(updatedCategory)
    } catch (embeddingError) {
      console.error("Failed to update embedding for category:", embeddingError)
      // Continue even if embedding update fails
    }

    revalidatePath("/categories")
    revalidatePath("/products")
    return updatedCategory
  } catch (error) {
    console.error(`Failed to update category with id ${id}:`, error)
    throw error
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    // Check if category is used by any products
    const productsUsingCategory = await db.product.count({
      where: { categoryId: id },
    })

    if (productsUsingCategory > 0) {
      throw new Error("Category is in use by products and cannot be deleted")
    }

    await db.category.delete({
      where: { id },
    })
    revalidatePath("/categories")
    return true
  } catch (error) {
    console.error(`Failed to delete category with id ${id}:`, error)
    return false
  }
}
