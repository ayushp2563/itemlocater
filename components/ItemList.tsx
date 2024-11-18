'use client'

import { useState, useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import UpdateItemForm from './UpdateItemForm'

interface Item {
  id: string
  name: string
  location: string
}

export default function ItemList({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState(initialItems)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const deleteItem = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/items/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        setItems(prevItems => prevItems.filter(item => item.id !== id))
        startTransition(() => {
          router.refresh()
        })
      }
    } catch (error) {
      console.error('Failed to delete item:', error)
    }
  }, [router])

  const startEditing = useCallback((item: Item) => {
    setEditingItem(item)
  }, [])

  const stopEditing = useCallback(() => {
    setEditingItem(null)
  }, [])

  const updateItem = useCallback(async (updatedItem: Item) => {
    try {
      const response = await fetch(`/api/items/${updatedItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      })
      
      if (response.ok) {
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === updatedItem.id ? updatedItem : item
          )
        )
        stopEditing()
        startTransition(() => {
          router.refresh()
        })
      }
    } catch (error) {
      console.error('Failed to update item:', error)
    }
  }, [router, stopEditing])

  return (
    <div className="space-y-4">
      {items.map(item => (
        <Card key={item.id}>
          <CardContent className="p-4">
            {editingItem && editingItem.id === item.id ? (
              <UpdateItemForm 
                item={editingItem} 
                onUpdate={updateItem} 
                onCancel={stopEditing} 
                //disabled={isPending}
              />
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.location}</p>
                </div>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => startEditing(item)}
                    disabled={isPending}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => deleteItem(item.id)}
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}