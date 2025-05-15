import { Suspense } from "react"
import type { Metadata } from "next"
import { getCategories } from "@/lib/data/actions"
import { CategoriesTable } from "./components/categories-table"
import { CreateCategoryButton } from "./components/create-category-button"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Categories",
  description: "Manage product categories for your store",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage product categories for your store</p>
        </div>
        <CreateCategoryButton />
      </div>
      <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
        <CategoriesTable initialCategories={categories} />
      </Suspense>
    </div>
  )
}
