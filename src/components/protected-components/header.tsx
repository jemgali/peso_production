'use client'

import React, { useState, useEffect} from 'react'
import Image from 'next/image'
import UserProfile from './user-profile'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const Header = () => {
    const [user, setUser] = React.useState<User | null>(null)
    
        useEffect(() => {
            const supabase = createClient()
            const checkUser = async () => {
              const { data: { user } } = await supabase.auth.getUser()
              setUser(user)
            }
            checkUser()
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
              setUser(session?.user || null)
            }
          ) 
          return () => { subscription.unsubscribe() }
        }, [])

  return (
    <header className="bg-primary text-white p-4 flex gap-4 items-center justify-between w-full shadow-md">
      <div className="flex">
        <Image src="/assets/peso_logo.png" alt="PESO Logo" width={60} height={60} />
        <div>
            <h1 className="text-2xl font-bold">Public Employment Service Office</h1>
            <h2 className="text-sm">City Government of Baguio</h2>
        </div>
      </div>
        {user && <UserProfile user={user} />}
    </header>
  )
}

export default Header