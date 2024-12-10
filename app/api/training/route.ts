import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prepareTrainingData } from "@/utils/training-data"
import type { TrainingExample } from "@/types/training"

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { componentsData, styleSystem, builderName } = await req.json()

    const trainingExamples = await prepareTrainingData(
      componentsData,
      styleSystem,
      builderName
    )

    // Here you would typically upload to your storage solution
    // For demo purposes, we'll just return the processed data
    return NextResponse.json({ success: true, data: trainingExamples })
  } catch (error) {
    console.error("Error processing training data:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process training data" },
      { status: 500 }
    )
  }
}

