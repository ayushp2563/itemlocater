import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Item {
  id: string
  name: string
  location: string
}

interface UpdateItemFormProps {
  item: Item
  onUpdate: (item: Item) => void
  onCancel: () => void
}

export default function UpdateItemForm({ item, onUpdate, onCancel }: UpdateItemFormProps) {
  const [name, setName] = useState(item.name)
  const [location, setLocation] = useState(item.location)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({ ...item, name, location })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        aria-label="Item name"
      />
      <Input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        aria-label="Item location"
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Update</Button>
      </div>
    </form>
  )
}