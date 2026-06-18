"use client"
import React, { useContext } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext';
import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs';
import { useState } from 'react'
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  // const [first, setfirst] = useState(second)
  const [projectlist, setprojectlist] = useState([])
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  return (
    <Sidebar>
      <SidebarHeader />
      <div className='flex font-bold p-2'>
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <h2 className='text-2xl'>Think & Build</h2></div>
      <Button className='font-bold'>+ Add New Project</Button>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel><h1 className='text-lg'>Projects</h1>
        </SidebarGroupLabel>
        {projectlist.length === 0 && <h2 className='text-sm text-gray-500 p-1'>No Projects</h2>}
      </SidebarContent>
      <SidebarFooter>
        <div>
          <h2 className="text-sm">Remaining credits: {
            userDetail?.credits ?? 0
          }</h2>
          <Button className='font-bold w-full '>+ Add Credits</Button>
          <div className='flex gap-2 items-center bg-gray-100 p-2 rounded-md mt-2'>
            <UserButton />
            <span className='text-sm '>Settings</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}