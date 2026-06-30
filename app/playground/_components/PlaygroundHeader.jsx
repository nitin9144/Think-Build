"use client"
import React from 'react'
import Image from 'next/image'
// import button from 'react-bootstrap/Button'
import { Button } from '@/components/ui/button'
const PlaygroundHeader = () => {
  return (
    <div className="flex items-center justify-between mb-4 shadow" >
        <Image src="/logo.svg" alt="Logo" width={50} height={50} /> 
        <Button>Save</Button>
    </div>
  )
}

export default PlaygroundHeader
