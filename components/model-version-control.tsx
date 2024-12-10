"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ModelVersion {
  id: string
  version: string
  description: string
  createdAt: string
  performance: number
}

const mockVersions: ModelVersion[] = [
  { id: '1', version: 'v1.0.0', description: 'Initial release', createdAt: '2023-06-01', performance: 0.85 },
  { id: '2', version: 'v1.1.0', description: 'Improved accuracy', createdAt: '2023-06-15', performance: 0.88 },
  { id: '3', version: 'v1.2.0', description: 'Added new features', createdAt: '2023-07-01', performance: 0.91 },
]

export function ModelVersionControl() {
  const [versions, setVersions] = useState<ModelVersion[]>(mockVersions)
  const [newVersion, setNewVersion] = useState({ version: '', description: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateVersion = () => {
    const newVersionEntry: ModelVersion = {
      id: (versions.length + 1).toString(),
      version: newVersion.version,
      description: newVersion.description,
      createdAt: new Date().toISOString().split('T')[0],
      performance: 0.9 + Math.random() * 0.05, // Mock performance score
    }
    setVersions([...versions, newVersionEntry])
    setNewVersion({ version: '', description: '' })
    setIsDialogOpen(false)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Model Version Control
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create New Version</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Version</DialogTitle>
                <DialogDescription>
                  Enter the details for the new model version.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    value={newVersion.version}
                    onChange={(e) => setNewVersion({ ...newVersion, version: e.target.value })}
                    placeholder="e.g., v1.3.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newVersion.description}
                    onChange={(e) => setNewVersion({ ...newVersion, description: e.target.value })}
                    placeholder="Describe the changes in this version"
                  />
                </div>
              </div>
              <Button onClick={handleCreateVersion}>Create Version</Button>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Version</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions.map((version) => (
              <TableRow key={version.id}>
                <TableCell>{version.version}</TableCell>
                <TableCell>{version.description}</TableCell>
                <TableCell>{version.createdAt}</TableCell>
                <TableCell>{version.performance.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

