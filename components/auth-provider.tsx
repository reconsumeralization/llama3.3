"use client"

import { useEffect } from 'react';

import { SessionProvider } from 'next-auth/react';

import { useToast } from '@/components/ui/use-toast';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { showToast } = useToast()

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('fetch')) {
        console.error('Auth fetch error:', event.error)
        showToast({
          title: "Authentication Error",
          description: "There was an issue with the authentication service. Please try again.",
          variant: "destructive",
        })
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [showToast])

  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  )
}
