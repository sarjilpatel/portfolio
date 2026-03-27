"use client"

import * as React from "react"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard
} from "lucide-react"

export function AppSidebar({ 
  items = [], 
  activeTab = "", 
  onTabChange = () => {},
  onLogout = () => {},
  ...props 
}: { 
  items?: { id: string, label: string, icon: any }[], 
  activeTab?: string, 
  onTabChange?: (id: string) => void,
  onLogout?: () => void
} & React.ComponentProps<typeof Sidebar>) {
  
  const user = {
    name: "Admin User",
    email: "admin@portfolio.com",
    avatar: "https://github.com/shadcn.png",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props} className="border-r border-white/5">
      <SidebarHeader className="border-b border-white/5 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
            >
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="size-5 text-blue-500" />
                <span className="text-lg font-bold text-white tracking-tight">Portfolio CMS</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 uppercase text-[10px] font-bold tracking-widest px-4 py-2">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      tooltip={item.label}
                      onClick={() => onTabChange(item.id)}
                      isActive={activeTab === item.id}
                      className="rounded-md"
                    >
                      <Icon size={18} className={activeTab === item.id ? "text-blue-400" : "text-zinc-500"} />
                      <span className="font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 p-4 bg-black">
        <NavUser user={user} onLogout={onLogout} />
      </SidebarFooter>
    </Sidebar>
  )
}
