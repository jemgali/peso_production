import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function requireAdmin() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  const { data: userData, error: dbError } = await supabase
    .from('users')
    .select('user_role')
    .eq('user_id', user.id)
    .single()

  // console.log("SERVER SIDE USER ID:", user.id)
  // console.log("SERVER SIDE DB DATA:", userData)
  // console.log("SERVER SIDE DB ERROR:", dbError)

  // Match the fallback logic used in user-profile.tsx
  const role = userData?.user_role || user.user_metadata?.role

  if (role !== 'admin') {
    redirect('/home')
  }
  
  return user 
}