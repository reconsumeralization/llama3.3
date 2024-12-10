import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from 'lucide-react'

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const { status } = useAuth()

    if (status === "loading") {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )
    }

    if (status === "unauthenticated") {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

