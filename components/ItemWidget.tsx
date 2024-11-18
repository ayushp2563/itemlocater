'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Item {
  id: string
  name: string
  location: string
}

export default function ItemWidget() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data.slice(0, 5)))
  }, [])

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Recent Items</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id} className="text-sm">
              <span className="font-medium">{item.name}</span> - {item.location}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}