'use client'
import React, { useEffect, useState } from 'react'
import { Cycles } from '@/types/globaltype'
import { CycleCard } from './CycleCard'
import { useSession } from 'next-auth/react'
import type { Session as NextAuthSession } from 'next-auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Cycl() {
  const { data: session, status } = useSession() as {
    data: NextAuthSession | null
    status: 'authenticated' | 'loading' | 'unauthenticated'
  }

  const [data, setData] = useState<Cycles>()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const router = useRouter()

  useEffect(() => {
    if (status !== 'authenticated' || !session?.accessToken) return

    const link = 'https://a2sv-application-platform-backend-team8.onrender.com/cycles'
    const func = async () => {
      const res = await fetch(link, { method: 'GET' })
      const hold = await res.json()
      if (!res.ok) {
        throw new Error(hold.message || 'Failed to fetch cycles')
      }
      setData(hold)
    }
    func()
  }, [session?.accessToken, status])

  
  const totalCycles = data?.data.cycles.length || 0
  const totalPages = Math.ceil(totalCycles / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCycles = data?.data.cycles.slice(indexOfFirstItem, indexOfLastItem) || []

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center py-4">
        <h2 className="text-lg font-semibold text-center sm:text-left">Application Cycles</h2>
        <Button
          className="mt-2 sm:mt-0"
          onClick={() => {
            router.push('/dashboard/admin/admincycles/createcycles')
          }}
        >
          Create Cycle
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {currentCycles.map((dat) => (
            <Link key={dat.id} href={`/dashboard/admin/admincycles/managecycles/${dat.id}`}>
              <CycleCard cycle={dat} />
            </Link>
          ))}
        </div>
      </div>

      
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Cycl
