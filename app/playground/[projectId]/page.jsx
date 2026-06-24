import Link from 'next/link'

const PlaygroundPage = ({ params, searchParams }) => {
  const { projectId } = params
  const frameId = searchParams?.frameId ?? 'unknown'

  return (
    <main className="min-h-screen bg-white p-8">
      
    </main>
  )
}

export default PlaygroundPage
