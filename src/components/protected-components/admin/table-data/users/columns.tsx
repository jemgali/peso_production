"use client"

import { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { Button } from "@/components/ui/button"
import { Archive } from "lucide-react"

// Import our newly extracted component
import UserEditSheet from "@/protected-components/admin/sheets/user-edit-sheet"

export interface User {
  user_id: string
  user_last_name: string | null
  user_first_name: string | null
  user_middle_name: string | null
  user_suffix: string | null
  user_email: string
  user_role: string
}

const formatFullName = (user: User) => {
  const lastNamePart = user.user_last_name ? `${user.user_last_name},` : '';
  const otherParts = [
    user.user_first_name,
    user.user_suffix,
    user.user_middle_name,
  ].filter(Boolean).join(' ');
  const fullName = [lastNamePart, otherParts].filter(Boolean).join(' ').trim();
  return fullName.toUpperCase();
}

const RoleBadge = ({ role }: { role: string }) => {
  const normalizedRole = role.toLowerCase();
  
  let colorClasses = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

  if (normalizedRole === 'admin') {
    colorClasses = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  } else if (normalizedRole === 'employee') {
    colorClasses = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  } else if (normalizedRole === 'client') {
    colorClasses = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClasses}`}>
      {role}
    </span>
  )
}

export const columns: ColumnDef<User>[] = [
  {
    id: "index",
    header: "",
    cell: ({ row }) => <span className="font-medium text-muted-foreground">{row.index + 1}</span>,
    enableHiding: false,
    meta: {
      className: "w-0 whitespace-nowrap",
    },
  },
  {
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }) => (
      <div className="max-w-[80px] truncate" title={row.getValue("user_id")}>
        {row.getValue("user_id")}
      </div>
    ),
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium">{formatFullName(row.original)}</span>
    ),
  },
  {
    accessorKey: "user_email",
    header: "Email",
  },
  {
    accessorKey: "user_role",
    header: "User Role",
    cell: ({ row }) => <RoleBadge role={row.getValue("user_role")} />,
    meta: {
      className: "w-0 whitespace-nowrap",
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex justify-end gap-2">
          {/* Use the extracted Edit Sheet component */}
          <UserEditSheet user={user} />
          
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => {
              // TODO: Implement Archive/Delete flow here
              console.log("Archive user:", user.user_id)
            }}
          >
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
        </div>
      )
    },
    enableHiding: false,
    meta: {
      className: "",
    },
  },
]