"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash2, FileUp } from 'lucide-react'

interface Dataset {
  id: string
  name: string
  records: number
  size: string
  lastModified: string
}

const mockDatasets: Dataset[] = [
  { id: '1', name: 'Dataset A', records: 10000, size: '1.2 GB', lastModified: '2023-06-15' },
  { id: '2', name: 'Dataset B', records: 5000, size: '600 MB', lastModified: '2023-06-10' },
  { id: '3', name: 'Dataset C', records: 15000, size: '1.8 GB', lastModified: '2023-06-05' },
]

export function DatasetManager() {
  const [datasets, setDatasets] = useState<Dataset[]>(mockDatasets)
  const [newDatasetName, setNewDatasetName] = useState('')
  const [newDatasetFile, setNewDatasetFile] = useState<File | null>(null)

  const handleDeleteDataset = (id: string) => {
    setDatasets(datasets.filter(dataset => dataset.id !== id))
  }

  const handleAddDataset = () => {
    if (newDatasetName && newDatasetFile) {
      const newDataset: Dataset = {
        id: (datasets.length + 1).toString(),
        name: newDatasetName,
        records: Math.floor(Math.random() * 10000) + 1000,
        size: `${(newDatasetFile.size / (1024 * 1024)).toFixed(2)} MB`,
        lastModified: new Date().toISOString().split('T')[0],
      }
      setDatasets([...datasets, newDataset])
      setNewDatasetName('')
      setNewDatasetFile(null)
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Dataset Manager
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Dataset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Dataset</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newDatasetName}
                    onChange={(e) => setNewDatasetName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    File
                  </Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setNewDatasetFile(e.target.files?.[0] || null)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddDataset}>
                <FileUp className="mr-2 h-4 w-4" />
                Upload Dataset
              </Button>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Records</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datasets.map((dataset) => (
              <TableRow key={dataset.id}>
                <TableCell className="font-medium">{dataset.name}</TableCell>
                <TableCell>{dataset.records.toLocaleString()}</TableCell>
                <TableCell>{dataset.size}</TableCell><TableCell>{dataset.size}</TableCell>
                <TableCell>{dataset.lastModified}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteDataset(dataset.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

