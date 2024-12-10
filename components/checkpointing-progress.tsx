import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CheckpointingProgressProps {
  currentSamples: number
  totalSamples: number
  checkpointInterval: number
  lastCheckpointId: string
}

export function CheckpointingProgress({
  currentSamples,
  totalSamples,
  checkpointInterval,
  lastCheckpointId,
}: CheckpointingProgressProps) {
  const progress = (currentSamples / totalSamples) * 100
  const checkpoints = Math.floor(currentSamples / checkpointInterval)
  const estimatedTimeRemaining = ((totalSamples - currentSamples) / currentSamples) * (Date.now() - new Date(lastCheckpointId.split('-')[1]).getTime()) / 1000

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generation Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{currentSamples} / {totalSamples} samples</span>
          <span>{checkpoints} checkpoints</span>
        </div>
        <div className="text-sm">
          <p><strong>Last Checkpoint ID:</strong> {lastCheckpointId || "N/A"}</p>
          <p><strong>Estimated Time Remaining:</strong> {estimatedTimeRemaining.toFixed(2)} seconds</p>
        </div>
      </CardContent>
    </Card>
  )
}

