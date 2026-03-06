"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import UserEditForm from "@/forms/user-edit-form"

// We import the User type from your columns file so TypeScript knows what 'user' looks like
import { type User } from "@/protected-components/admin/table-data/users/columns" 

export default function UserEditSheet({ user }: { user: User }) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const router = useRouter()

  const handleSuccess = () => {
    setIsEditOpen(false) // Close the sheet
    router.refresh()     // Refresh the Server Component to grab updated Supabase data
  }

  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setIsEditOpen(true)}
      >
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </Button>

      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit User</SheetTitle>
            <SheetDescription>
              Update the profile details for {user.user_first_name} {user.user_last_name}.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <UserEditForm 
              userId={user.user_id} 
              onSuccess={handleSuccess}
              onCancel={() => setIsEditOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}