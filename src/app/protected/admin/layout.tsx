import React from 'react'
import Header from '@/components/protected-components/header'
import Footer from '@/components/protected-components/footer'
import SideNav from '@/components/protected-components/admin/sidenav'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function AdminLayout({ children, }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <div className="shrink-0 z-50">
        <Header />
      </div>
      <div className="flex-1 relative overflow-hidden flex">
        <SidebarProvider className="absolute inset-0 h-full min-h-0 w-full">
          <SideNav />
          <SidebarInset className="flex-1 overflow-y-auto">
            <main className="h-full p-4">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
      <div className="shrink-0 z-50">
        <Footer />
      </div>
    </div>
  )
}