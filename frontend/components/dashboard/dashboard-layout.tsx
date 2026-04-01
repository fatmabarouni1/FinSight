"use client"

import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { WatchlistDrawer } from "./watchlist-drawer"
import { useState } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [watchlistOpen, setWatchlistOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[220px]">
        <TopNav />
        <main className="p-6">
          {children}
        </main>
      </div>
      <WatchlistDrawer open={watchlistOpen} onOpenChange={setWatchlistOpen} />
    </div>
  )
}
