"use client"

import { useState } from "react"
import type { Category } from "@/lib/data/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EditCategoryDialog } from "./edit-category-dialog"
import { DeleteCategoryDialog } from "./delete-category-dialog"
import { PencilIcon, TrashIcon } from "lucide-react"

interface CategoriesTableProps {
  initialCategories: Category[]
}

export function CategoriesTable({ initialCategories }: CategoriesTableProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const handleCategoryUpdated = (updatedCategory: Category) => {
    setCategories(categories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)))
    setEditingCategory(null)
  }

  const handleCategoryDeleted = (deletedCategoryId: string) => {
    setCategories(categories.filter((category) => category.id !== deletedCategoryId))
    setDeletingCategory(null)
  }

  const handleCategoryCreated = (newCategory: Category) => {
    setCategories([...categories, newCategory])
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>A list of all categories in your store.</CardDescription>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <h3 className="mt-4 text-lg font-semibold">No categories found</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  You haven&apos;t created any categories yet. Add one below.
                </p>
              </div>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead className="min-w-[300px]">Description</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setEditingCategory(category)}>
                            <PencilIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeletingCategory(category)}>
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
          onCategoryUpdated={handleCategoryUpdated}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryDialog
          category={deletingCategory}
          open={!!deletingCategory}
          onOpenChange={(open) => !open && setDeletingCategory(null)}
          onCategoryDeleted={handleCategoryDeleted}
        />
      )}
    </>
  )
}
