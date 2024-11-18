'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddItemForm() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && location) {
      await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location }),
      })
      setName('')
      setLocation('')
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addItem} className="space-y-4">
          <Input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Item name"
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Item location"
          />
          <Button type="submit" className="w-full">Add Item</Button>
        </form>
      </CardContent>
    </Card>
  )
}