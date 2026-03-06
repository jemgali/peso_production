'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface UserProfileProps {
    user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
    const router = useRouter()
    const [fullName, setFullName] = useState<string>('')
    const [dashboardRoute, setDashboardRoute] = useState<string>('/protected/client') 

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.id) return;
            
            const supabase = createClient()
            
            const { data, error } = await supabase
                .from('users')
                .select('user_first_name, user_last_name, user_role')
                .eq('user_id', user.id)
                .single<{ user_first_name: string | null, user_last_name: string | null, user_role: string | null }>()
                console.log("Database fetch result:", data, "Error:", error)
            let role = 'client';

            if (data) {
                const firstName = data.user_first_name || '';
                const lastName = data.user_last_name || '';
                setFullName(`${firstName} ${lastName}`.trim());
                
                if (data.user_role) role = data.user_role;
            } else {
                const metaFirst = user?.user_metadata?.user_first_name || '';
                const metaLast = user?.user_metadata?.user_last_name || '';
                setFullName(`${metaFirst} ${metaLast}`.trim());

                if (user?.user_metadata?.role) role = user.user_metadata.role;
            }

            if (role === 'admin') {
                setDashboardRoute('/protected/admin');
            } else if (role === 'employee') {
                setDashboardRoute('/protected/employee');
            } else {
                setDashboardRoute('/protected/client');
            }
        }

        fetchUserData()
    }, [user])

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/auth/login')
    }

    if (!user) return null;
    
    const displayName = fullName || user.email;

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button 
                variant="ghost"
                className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white shadow-sm hover:bg-white/20 hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 h-auto transition-all"
            >
                <span className="text-sm font-medium max-w-[150px] truncate">
                    { displayName }
                </span>
                <UserCircle className="w-6 h-6" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none truncate">{ fullName || 'Account' }</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">{ user.email }</p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => router.push(dashboardRoute)} className="cursor-pointer w-full">
                Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer w-full text-red-600 focus:text-red-600 focus:bg-red-50">
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile