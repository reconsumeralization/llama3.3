import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import AuthProvider from "@/components/auth-provider"
import SessionProvider from "@/components/session-provider"
import ErrorBoundary from "@/components/error-boundary";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LLaMA 3.3 Fine-Tuning System',
  description: 'A comprehensive system for fine-tuning LLaMA 3.3 models',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ErrorBoundary>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <SessionProvider>
                <div className="flex h-full">
                  <Sidebar />
                  <div className="flex-1 flex flex-col">
                    <header className="border-b">
                      <div className="flex items-center justify-between p-4">
                        <h1 className="text-2xl font-bold">LLaMA 3.3 Fine-Tuning</h1>
                        <ModeToggle />
                      </div>
                    </header>
                    <main className="flex-1 overflow-y-auto bg-background">
                      <div className="container mx-auto py-6">
                        {children}
                      </div>
                    </main>
                  </div>
                </div>
              </SessionProvider>
            </ThemeProvider>
          </AuthProvider>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  )
}

