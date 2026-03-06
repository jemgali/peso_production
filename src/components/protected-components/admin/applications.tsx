import React from "react"
import { requireAdmin } from '@/lib/admin-auth-utils'

export default async function AdminApplications() {
    const user = await requireAdmin()
    return (
        <>
            Admin Applications
        </>
    )
}