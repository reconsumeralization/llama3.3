import { AIGeneratedDataGUI } from "@/components/ai-generated-data-gui"

export default function AIGeneratedDataPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">AI-Generated Training Data</h1>
      <AIGeneratedDataGUI />
    </div>
  )
}

