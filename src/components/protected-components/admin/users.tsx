import React from "react"
import { requireAdmin } from '@/lib/admin-auth-utils'
import UsersData from './table-data/users/users-data'
import AddUserSheet from "./sheets/user-add-sheet"

export default async function AdminUsers() {
    const user = await requireAdmin()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">User Management</h1>
                <AddUserSheet /> 
            </div>
            <UsersData />
        </div>
    )
}