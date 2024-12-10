"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockDatasets = [
  { id: 1, name: "Dataset 1", size: "1.2 GB", records: 10000 },
  { id: 2, name: "Dataset 2", size: "800 MB", records: 7500 },
  { id: 3, name: "Dataset 3", size: "2.5 GB", records: 20000 },
]

export function DatasetList() {
  const [datasets, setDatasets] = useState(mockDatasets)

  const handleDelete = (id: number) => {
    setDatasets(datasets.filter((dataset) => dataset.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Datasets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Records</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datasets.map((dataset) => (
              <TableRow key={dataset.id}>
                <TableCell className="font-medium">{dataset.name}</TableCell>
                <TableCell>{dataset.size}</TableCell>
                <TableCell>{dataset.records}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(dataset.id)}
                  >
                    Delete
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

