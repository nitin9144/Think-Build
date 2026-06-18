import React from 'react'
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"
import AppHeader from './_components/AppHeader'
import { AppSidebar } from './_components/AppSidebar'

const Workspacelayout = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div>
                <AppHeader />
                {children}
            </div>
        </SidebarProvider>
    )
}

export default Workspacelayout
