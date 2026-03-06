import React from "react"
import { requireAdmin } from '@/lib/admin-auth-utils'

export default async function AdminPrograms() {
    const user = await requireAdmin()
    return (
        <>
            Admin Programs
        </>
    )
}