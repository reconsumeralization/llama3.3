import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from 'lucide-react'
import { motion } from "framer-motion"

const systemComponents = [
  { name: "Training Server", status: "operational" },
  { name: "Data Storage", status: "operational" },
  { name: "Model Repository", status: "operational" },
  { name: "Evaluation Service", status: "degraded" },
]

export function SystemStatus({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="bg-muted">
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemComponents.map((component, index) => (
            <motion.div
              key={component.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <span>{component.name}</span>
              {component.status === "operational" ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

