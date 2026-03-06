import React from "react"
import { requireAdmin } from '@/lib/admin-auth-utils'

export default async function AdminSchedule() {
    const user = await requireAdmin()
    return (
        <>
            Admin Schedule
        </>
    )
}