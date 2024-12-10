"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Database, Cog, PlayCircle, BarChart2, Download, Sliders, LogOut, Menu } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSession, signOut } from "next-auth/react"

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Data Preparation', href: '/data-preparation', icon: Database },
  { name: 'AI-Generated Data', href: '/ai-generated-data', icon: Database },
  { name: 'Model Configuration', href: '/model-configuration', icon: Cog },
  { name: 'Training', href: '/training', icon: PlayCircle },
  { name: 'Evaluation', href: '/evaluation', icon: BarChart2 },
  { name: 'Model Export', href: '/model-export', icon: Download },
  { name: 'Hyperparameter Tuning', href: '/hyperparameter-tuning', icon: Sliders },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const SidebarContent = (
    <>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          LLaMA Fine-Tuning
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent" : "transparent"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <Button
          onClick={() => signOut()}
          className="w-full"
          variant="outline"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </>
  )

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)]">
            {SidebarContent}
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="hidden h-screen border-r bg-background md:flex md:w-60 md:flex-col">
        <ScrollArea className="flex flex-col flex-1">
          {SidebarContent}
        </ScrollArea>
      </div>
    </>
  )
}

