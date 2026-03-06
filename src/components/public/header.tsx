'use client'

import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import UserProfile from '@/components/protected-components/user-profile'
import type { User } from '@supabase/supabase-js'

const Header = () => {
    const pathname = usePathname()
    const [activeTab, setActiveTab] = React.useState('home')
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

    useEffect(() => {
      const updateActiveTab = () => {
        const hash = window.location.hash
        if (pathname === '/home') {
          if (hash === '#about') setActiveTab('about')
          else if (hash === '#programs') setActiveTab('programs')
          else if (hash === '#contact') setActiveTab('contact')
          else setActiveTab('home')
        } else if (pathname === '/auth/login') {
          setActiveTab('login')
        }
      }
      updateActiveTab()
      window.addEventListener('hashchange', updateActiveTab)
      return () => window.removeEventListener('hashchange', updateActiveTab)
    }, [pathname]);

  return (
    <header className="bg-primary text-white p-4 flex gap-4 items-center w-full shadow-md sticky top-0 z-50">
      <Image src="/assets/peso_logo.png" alt="PESO Logo" width={60} height={60} />
      <div>
        <h1 className="text-2xl font-bold">Public Employment Service Office</h1>
        <h2 className="text-sm">City Government of Baguio</h2>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="ml-auto">
            <TabsList variant="line" >
                <Link href="/home"><TabsTrigger value="home" className="text-white ">Home</TabsTrigger></Link>
                <Link href="/home#about"><TabsTrigger value="about" className="text-white">About</TabsTrigger></Link>
                <Link href="/home#programs"><TabsTrigger value="programs" className="text-white">Programs</TabsTrigger></Link>
                <Link href="/home#contact"><TabsTrigger value="contact" className="text-white">Contact</TabsTrigger></Link>
                {!user && (
                  <Link href="/auth/login">
                    <TabsTrigger value="login" className="text-white">Login</TabsTrigger>
                  </Link>
                )}
            </TabsList>
        </Tabs>
        {user && <UserProfile user={user} />}
      </div>
    </header>
  )
}

export default Header