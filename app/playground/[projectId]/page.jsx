"use client"
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PlaygroundHeader from '../_components/PlaygroundHeader'
import ChatSection from '../_components/ChatSection'
import WebsiteDesign from '../_components/WebsiteDesign'
import ElementSettingSection from '../_components/ElementSettingSection'

const PlaygroundPage = ({ params }) => {
  const { projectId } = params
  const searchParams = useSearchParams()
  const frameId = searchParams.get('frameId') || 'unknown'
  

  return (
    <main className="min-h-screen w-full bg-white">

      <PlaygroundHeader />
      {/* chat section */}
      <div className='flex'>
        <ChatSection />
        <WebsiteDesign />
        {/* <ElementSettingSection /> */}
      </div>
    </main>
  )
}

export default PlaygroundPage
