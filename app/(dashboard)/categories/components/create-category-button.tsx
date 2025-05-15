"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { CreateCategoryDialog } from "./create-category-dialog"

export function CreateCategoryButton() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <Button onClick={() => setShowCreateDialog(true)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Category
      </Button>
      <CreateCategoryDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  )
}
