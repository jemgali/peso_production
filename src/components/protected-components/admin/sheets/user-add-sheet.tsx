"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import UserAddForm from "@/components/protected-components/forms/user-add-form"

export default function AddUserSheet() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New User</SheetTitle>
          <SheetDescription>
            Fill out the details below to create a new user account.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
            {/* You could pass an onSuccess={() => setIsOpen(false)} to close the sheet automatically */}
            <UserAddForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}