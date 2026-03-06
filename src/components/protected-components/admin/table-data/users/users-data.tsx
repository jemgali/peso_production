import React from 'react'
import { createClient } from '@/lib/supabase/server' 
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

const UsersData = async () => {
  const supabase = await createClient()

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .order('user_first_name', { ascending: true })

  if (error) {
    console.error('Error fetching users:', error)
    return <div className="p-4 text-red-500">Failed to load users data.</div>
  }

  // Pass the fetched data to the client-side DataTable component
  return <DataTable columns={columns} data={users || []} />
}

export default UsersData