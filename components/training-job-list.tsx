"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import type { FineTuningJob } from "@/types"
import { monitorTrainingJob } from "@/lib/training-monitor"
import { logger } from "@/utils/logger"

const mockJobs: FineTuningJob[] = [
  {
    id: "1",
    status: "running",
    progress: 45,
    modelConfig: {
      learningRate: 0.0001,
      batchSize: 32,
      epochs: 10,
      warmupSteps: 500,
    },
    createdAt: new Date("2023-06-01T10:00:00Z"),
    updatedAt: new Date("2023-06-01T11:30:00Z"),
    error: null,
  },
  {
    id: "2",
    status: "completed",
    progress: 100,
    modelConfig: {
      learningRate: 0.0002,
      batchSize: 64,
      epochs: 5,
      warmupSteps: 250,
    },
    createdAt: new Date("2023-05-28T14:00:00Z"),
    updatedAt: new Date("2023-05-28T18:45:00Z"),
    error: null,
  },
]

export function TrainingJobList() {
  const [jobs, setJobs] = useState<FineTuningJob[]>(mockJobs)
  const { toast } = useToast()

  const updateJobs = useCallback(() => {
    setJobs((currentJobs) =>
      currentJobs.map((job) => {
        if (job.status === "running") {
          return monitorTrainingJob(job)
        }
        return job
      })
    )
  }, [])

  useEffect(() => {
    const interval = setInterval(updateJobs, 5000) // Check every 5 seconds
    return () => clearInterval(interval)
  }, [updateJobs])

  useEffect(() => {
    jobs.forEach((job) => {
      if (job.status === "failed") {
        logger.log('error', `Training job ${job.id} failed`, { job })
        toast({
          title: "Training Job Failed",
          description: `Job ${job.id} has failed. Check the logs for more information.`,
          variant: "destructive",
        })
      } else if (job.status === "completed") {
        logger.log('info', `Training job ${job.id} completed successfully`, { job })
        toast({
          title: "Training Job Completed",
          description: `Job ${job.id} has completed successfully.`,
        })
      }
    })
  }, [jobs, toast])

  const handleStop = useCallback((id: string) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === id ? { ...job, status: 'stopped' as const } : job
    ))
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge variant="default">Running</Badge>
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "stopped":
        return <Badge variant="secondary">Stopped</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-muted">
        <CardTitle>Training Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{job.id}</TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={job.progress} className="w-[60%]" />
                      <span>{job.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.createdAt.toLocaleString()}</TableCell>
                  <TableCell>{job.updatedAt.toLocaleString()}</TableCell>
                  <TableCell>
                    {job.status === 'running' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleStop(job.id)}
                      >
                        Stop
                      </Button>
                    )}
                    {job.status === 'completed' && (
                      <Button variant="outline" size="sm">View Results</Button>
                    )}
                    {job.status === 'failed' && (
                      <Button variant="outline" size="sm">View Logs</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {jobs.some(job => job.status === "failed") && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Training Job Failure Detected</AlertTitle>
            <AlertDescription>
              One or more training jobs have failed. Please check the logs and consider adjusting your model configuration.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

