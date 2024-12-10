"use client"

import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from 'lucide-react'

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useAuth(false)

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}

