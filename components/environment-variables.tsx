"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

const envVars = [
  "OPENAI_API_KEY",
  "GITHUB_ID",
  "GITHUB_SECRET",
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET"
]

export function EnvironmentVariables() {
  const { toast } = useToast()
  const [copiedVar, setCopiedVar] = useState<string | null>(null)

  const copyToClipboard = (envVar: string) => {
    navigator.clipboard.writeText(`process.env.${envVar}`)
    setCopiedVar(envVar)
    toast({
      title: "Copied to clipboard",
      description: `${envVar} has been copied to your clipboard.`
    })
    setTimeout(() => setCopiedVar(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Environment Variables</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {envVars.map((envVar) => (
            <li key={envVar} className="flex justify-between items-center">
              <span>{envVar}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(envVar)}
              >
                {copiedVar === envVar ? "Copied!" : <Copy className="h-4 w-4" />}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

