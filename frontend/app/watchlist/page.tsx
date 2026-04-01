"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Star,
  Bell,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface WatchlistItem {
  ticker: string
  name: string
  score: number
  change: number
  alert: boolean
}

const initialWatchlist: WatchlistItem[] = [
  { ticker: "AAPL", name: "Apple Inc.", score: 85, change: 2.4, alert: true },
  { ticker: "MSFT", name: "Microsoft Corporation", score: 88, change: 1.8, alert: true },
  { ticker: "GOOGL", name: "Alphabet Inc.", score: 72, change: -0.5, alert: false },
  { ticker: "NVDA", name: "NVIDIA Corporation", score: 91, change: 5.2, alert: true },
  { ticker: "AMZN", name: "Amazon.com Inc.", score: 68, change: -1.2, alert: false },
]

function getScoreColor(score: number) {
  if (score >= 70) return "bg-accent text-accent-foreground"
  if (score >= 40) return "bg-warning text-warning-foreground"
  return "bg-destructive text-destructive-foreground"
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(initialWatchlist)
  const [searchValue, setSearchValue] = useState("")

  const toggleAlert = (ticker: string) => {
    setWatchlist((prev) =>
      prev.map((item) =>
        item.ticker === ticker ? { ...item, alert: !item.alert } : item
      )
    )
  }

  const removeFromWatchlist = (ticker: string) => {
    setWatchlist((prev) => prev.filter((item) => item.ticker !== ticker))
  }

  const filteredWatchlist = watchlist.filter(
    (item) =>
      item.ticker.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Watchlist
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your favorite stocks and set price alerts
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Ticker
          </Button>
        </div>

        {/* Search Filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Filter watchlist..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 h-11 bg-card border-border/50"
          />
        </div>

        {/* Watchlist Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Star className="h-4 w-4" />
              <span className="text-sm">Tracked</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{watchlist.length}</p>
          </div>
          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Bell className="h-4 w-4" />
              <span className="text-sm">Alerts Active</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {watchlist.filter((w) => w.alert).length}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Avg Score</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Math.round(
                watchlist.reduce((acc, w) => acc + w.score, 0) / watchlist.length
              )}
            </p>
          </div>
        </div>

        {/* Watchlist Items */}
        <div className="space-y-3">
          {filteredWatchlist.length === 0 ? (
            <div className="text-center py-12 rounded-xl border border-border/50 bg-card">
              <Star className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No stocks in your watchlist</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Search for a ticker to add it to your watchlist
              </p>
            </div>
          ) : (
            filteredWatchlist.map((item) => (
              <div
                key={item.ticker}
                className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:shadow-sm transition-shadow"
              >
                <Link
                  href={`/dashboard?ticker=${item.ticker}`}
                  className="flex items-center gap-4 flex-1"
                >
                  {/* Company Logo */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                    {item.ticker.slice(0, 2)}
                  </div>

                  {/* Company Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {item.ticker}
                      </span>
                      <Badge
                        className={cn(
                          "text-sm font-semibold",
                          getScoreColor(item.score)
                        )}
                      >
                        {item.score}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                  </div>
                </Link>

                {/* Change */}
                <div
                  className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium",
                    item.change >= 0
                      ? "bg-accent/10 text-accent"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {item.change >= 0 ? (
                    <ArrowUp className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDown className="h-3.5 w-3.5" />
                  )}
                  {Math.abs(item.change)}%
                </div>

                {/* Alert Toggle */}
                <div className="flex items-center gap-3 ml-4">
                  <div className="flex items-center gap-2">
                    <Bell
                      className={cn(
                        "h-4 w-4",
                        item.alert ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <Switch
                      checked={item.alert}
                      onCheckedChange={() => toggleAlert(item.ticker)}
                    />
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromWatchlist(item.ticker)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
