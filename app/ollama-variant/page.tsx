import { OllamaVariantGUI } from "@/components/ollama-variant-gui"

export default function OllamaVariantPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create Ollama Variant</h1>
      <OllamaVariantGUI />
    </div>
  )
}

