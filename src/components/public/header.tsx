'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/dist/client/link'

const Header = () => {
    const pathname = usePathname()
    const [activeTab, setActiveTab] = React.useState('home')

    useEffect(() => {
      const updateActiveTab = () => {
        const hash = window.location.hash
        if (pathname === '/home') {
          if (hash === '#about') setActiveTab('about')
          else if (hash === '#programs') setActiveTab('programs')
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="ml-auto">
            <TabsList variant="line" >
                <Link href="/home"><TabsTrigger value="home" className="text-white ">Home</TabsTrigger></Link>
                <Link href="/home#about"><TabsTrigger value="about" className="text-white">About</TabsTrigger></Link>
                <Link href="/home#programs"><TabsTrigger value="programs" className="text-white">Programs</TabsTrigger></Link>
                <Link href="/auth/login"><TabsTrigger value="login" className="text-white">Login</TabsTrigger></Link>
            </TabsList>
        </Tabs>
    </header>
  )
}

export default Header