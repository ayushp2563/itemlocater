// components/SearchForm.tsx
'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X } from 'lucide-react' // Import icons

interface SearchFormProps {
  initialSearch?: string
}

export default function SearchForm({ initialSearch = '' }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [isPending, startTransition] = useTransition()

  // Update search when URL changes
  useEffect(() => {
    const currentSearch = searchParams.get('search') || ''
    setSearchTerm(currentSearch)
  }, [searchParams])

  // Handle search input change
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      router.push(`/dashboard?${params.toString()}`)
    })
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm('')
    startTransition(() => {
      router.push('/dashboard')
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by item name or location..."
            className="pl-9 pr-12" // Make room for icons
            aria-label="Search items"
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              className="absolute right-2 h-7 w-7 p-0"
              onClick={clearSearch}
              disabled={isPending}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {isPending && (
          <p className="mt-2 text-sm text-gray-500">Searching...</p>
        )}
      </CardContent>
    </Card>
  )
}