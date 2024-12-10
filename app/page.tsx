"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Cog, PlayCircle, BarChart2, Download, Sliders, Rocket, RefreshCw } from 'lucide-react'
import { DashboardChart } from "@/components/dashboard-chart"
import { ModelComparisonChart } from "@/components/model-comparison-chart"
import { RecentJobs } from "@/components/recent-jobs"
import { SystemStatus } from "@/components/system-status"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { EnvironmentVariables } from "@/components/environment-variables"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalModels: 25,
    activeJobs: 3,
    avgAccuracy: 89.2,
    deployedModels: 7
  })
  const { toast } = useToast()

  const refreshStats = async () => {
    // In a real app, this would be an API call
    setStats(prevStats => ({
      totalModels: prevStats.totalModels + 1,
      activeJobs: Math.floor(Math.random() * 5) + 1,
      avgAccuracy: parseFloat((prevStats.avgAccuracy + (Math.random() * 0.5 - 0.25)).toFixed(1)),
      deployedModels: prevStats.deployedModels + (Math.random() > 0.7 ? 1 : 0)
    }))
    toast({
      title: "Dashboard Updated",
      description: "Latest stats have been fetched.",
    })
  }

  useEffect(() => {
    const interval = setInterval(refreshStats, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Dashboard</h2>
        <Button onClick={refreshStats} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Models" value={stats.totalModels} icon={Database} change="+2 from last week" />
        <StatsCard title="Active Training Jobs" value={stats.activeJobs} icon={PlayCircle} change="2 queued" />
        <StatsCard title="Average Accuracy" value={`${stats.avgAccuracy}%`} icon={BarChart2} change="+2.1% from last month" />
        <StatsCard title="Deployed Models" value={stats.deployedModels} icon={Rocket} change="3 pending deployment" />
      </div>
      <div className="mt-6">
        <EnvironmentVariables />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Training Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChart />
          </CardContent>
        </Card>
        <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Model Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ModelComparisonChart />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RecentJobs className="col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300" />
        <SystemStatus className="col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300" />
      </div>
    </motion.div>
  )
}

function StatsCard({ title, value, icon: Icon, change }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  )
}

