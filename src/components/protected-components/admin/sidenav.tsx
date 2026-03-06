import React from 'react'
import Link from 'next/link'
import { Briefcase, Blocks, CalendarDays, Users, Megaphone, Handshake, FolderPlus, FileText } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '@/components/ui/sidebar'

const navItems = [
  { title: "Dashboard", url: "/protected/admin", icon: Blocks },
  { title: "Programs", url: "/protected/admin/programs", icon: Handshake },
  { title: "Announcements", url: "/protected/admin/announcements", icon: Megaphone },
  { title: "Applications", url: "/protected/admin/applications", icon: FolderPlus },
  { title: "Schedule", url: "/protected/admin/schedule", icon: CalendarDays },
  { title: "Users", url: "/protected/admin/users", icon: Users },
  { title: "Reports", url: "/protected/admin/reports", icon: FileText },
]

const SideNav = () => {
  return (
    <Sidebar 
      side="left" 
      variant="floating" 
      collapsible="icon"
      className="!absolute !h-full" 
    >
      <SidebarHeader className="p-3">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Briefcase className="size-4" />
            </div>
            <span className="truncate font-semibold text-sm">
              PESO System
            </span>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}

export default SideNav