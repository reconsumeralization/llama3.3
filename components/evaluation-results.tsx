"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import type { EvaluationResult } from "@/types"
import { runAutomatedEvaluation } from "@/lib/evaluation"

export function EvaluationResults() {
  const [results, setResults] = useState<EvaluationResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleRunEvaluation = async () => {
    setIsLoading(true)
    try {
      const newResults = await runAutomatedEvaluation()
      setResults(newResults)
    } catch (error) {
      console.error("Error running evaluation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-muted">
        <CardTitle>Evaluation Results</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Button onClick={handleRunEvaluation} disabled={isLoading} className="mb-4 w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Evaluation...
            </>
          ) : (
            "Run Automated Evaluation"
          )}
        </Button>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Accuracy</TableHead>
                <TableHead>Perplexity</TableHead>
                <TableHead>F1 Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                  <TableCell>{result.accuracy.toFixed(2)}</TableCell>
                  <TableCell>{result.perplexity.toFixed(2)}</TableCell>
                  <TableCell>{result.f1Score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

