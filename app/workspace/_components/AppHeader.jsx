"use client"
import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
const AppHeader = () => {
  return (
    <div className='shadow flex items-center justify-between w-full h-16 px-4'>
      <SidebarTrigger/>
      <span className='font-bold text-lg'>Think & Build Workspace</span>
      <UserButton/>
    </div>
  )
}

export default AppHeader
