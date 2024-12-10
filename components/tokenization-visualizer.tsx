"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock tokenizer function (replace with actual tokenizer in production)
const mockTokenize = (text: string): string[] => {
  return text.split(/\s+/).flatMap(word => {
    if (word.length > 5) {
      return [word.slice(0, 3), word.slice(3)]
    }
    return [word]
  })
}

export function TokenizationVisualizer() {
  const [inputText, setInputText] = useState('')
  const [tokens, setTokens] = useState<string[]>([])

  const handleTokenize = () => {
    setTokens(mockTokenize(inputText))
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Tokenization Visualizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Enter text to tokenize"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={handleTokenize}>Tokenize</Button>
          <div className="border rounded p-4 min-h-[100px] bg-muted">
            {tokens.map((token, index) => (
              <span
                key={index}
                className="inline-block bg-primary text-primary-foreground rounded px-1 py-0.5 m-1"
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

