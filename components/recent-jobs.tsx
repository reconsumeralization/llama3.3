import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const recentJobs = [
  { id: "1", name: "Model A Fine-tuning", status: "completed", createdAt: "2023-06-10 14:30" },
  { id: "2", name: "Model B Fine-tuning", status: "running", createdAt: "2023-06-11 09:15" },
  { id: "3", name: "Model C Fine-tuning", status: "failed", createdAt: "2023-06-11 11:45" },
]

export function RecentJobs({ className }: { className?: string }) {
  return (
    <Card className={`${className} overflow-hidden`}>
      <CardHeader className="bg-muted">
        <CardTitle>Recent Jobs</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentJobs.map((job, index) => (
            <motion.li
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{job.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{job.createdAt}</p>
                </div>
                <Badge variant={job.status === "completed" ? "success" : job.status === "running" ? "default" : "destructive"}>
                  {job.status}
                </Badge>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

