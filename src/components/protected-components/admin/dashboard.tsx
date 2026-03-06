import React from "react"
import { requireAdmin } from '@/lib/admin-auth-utils'

export default async function AdminDashboard() {
    const user = await requireAdmin()
    return (
        <>
            Admin Dashboard
        </>
    )
}