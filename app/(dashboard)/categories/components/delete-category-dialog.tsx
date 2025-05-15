"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Category } from "@/lib/data/schema"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { deleteCategory } from "@/lib/data/category-actions"

interface DeleteCategoryDialogProps {
  category: Category
  open: boolean
  onOpenChange: (open: boolean) => void
  onCategoryDeleted: (categoryId: string) => void
}

export function DeleteCategoryDialog({ category, open, onOpenChange, onCategoryDeleted }: DeleteCategoryDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const success = await deleteCategory(category.id)

      if (success) {
        toast({
          title: "Category deleted",
          description: "The category has been deleted successfully.",
        })
        onCategoryDeleted(category.id)
        router.refresh()
      } else {
        throw new Error("Failed to delete category")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category. It may be in use by products.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the category &quot;{category.name}&quot;. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
