"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from 'lucide-react'

interface LogEntry {
  timestamp: string
  level: "info" | "warning" | "error"
  message: string
}

export function LogViewer({ jobId }: { jobId: string }) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const generateMockLogs = (): LogEntry[] => {
    const levels: ("info" | "warning" | "error")[] = ["info", "warning", "error"];
    return Array.from({ length: 20 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      level: levels[Math.floor(Math.random() * levels.length)],
      message: `Mock log entry ${i + 1}`,
    }));
  };

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLogs(generateMockLogs());
    } catch (error) {
      console.error("Error generating mock logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getLogEntryColor = (level: string) => {
    switch (level) {
      case "info":
        return "text-blue-500"
      case "warning":
        return "text-yellow-500"
      case "error":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Log Viewer for Job {jobId}
          <Button onClick={fetchLogs} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <ScrollArea className="h-64 w-full">
            {logs.map((log, index) => (
              <div key={index} className={`mb-2 ${getLogEntryColor(log.level)}`}>
                <span className="font-mono text-sm">{log.timestamp}</span>{" "}
                <span className="font-semibold">[{log.level.toUpperCase()}]</span>{" "}
                {log.message}
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

