"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Search, TrendingUp, ArrowUp, Clock, BarChart3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const recentSearches = ["AAPL", "MSFT", "GOOGL", "NVDA"]

const trendingTickers = [
  { ticker: "TSLA", change: "+4.2%", positive: true },
  { ticker: "META", change: "+2.8%", positive: true },
  { ticker: "AMD", change: "-1.5%", positive: false },
]

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  const handleSearch = (ticker: string) => {
    if (ticker) {
      router.push(`/dashboard?ticker=${ticker.toUpperCase()}`)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
        {/* Main Search Section */}
        <div className="w-full max-w-2xl text-center space-y-8">
          {/* Hero */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground text-balance">
              Analyze any stock
            </h1>
            <p className="text-lg text-muted-foreground">
              8 financial ratios &middot; 5-year history &middot; AI commentary
            </p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter a ticker symbol (e.g., AAPL)"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchValue)
                }
              }}
              className="h-14 pl-12 pr-24 text-lg rounded-xl border-border/50 bg-card shadow-sm focus:shadow-md transition-shadow"
            />
            <Button
              onClick={() => handleSearch(searchValue)}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-lg bg-primary hover:bg-primary/90"
            >
              Analyze
            </Button>
          </div>

          {/* Recent Searches */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Recent searches</span>
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {recentSearches.map((ticker) => (
                <Button
                  key={ticker}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSearch(ticker)}
                  className="rounded-full px-4 bg-card border border-border/50 hover:bg-secondary hover:border-primary/20"
                >
                  {ticker}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="fixed bottom-0 left-[220px] right-0 bg-card border-t border-border/50 px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Market Status */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground">Markets Open</span>
              <span className="text-sm text-muted-foreground">NYSE, NASDAQ</span>
            </div>

            {/* Trending Tickers */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </div>
              <div className="flex items-center gap-3">
                {trendingTickers.map((item) => (
                  <button
                    key={item.ticker}
                    onClick={() => handleSearch(item.ticker)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <span className="font-medium text-sm">{item.ticker}</span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs font-medium",
                        item.positive
                          ? "bg-accent/10 text-accent"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      <ArrowUp
                        className={cn(
                          "h-3 w-3 mr-0.5",
                          !item.positive && "rotate-180"
                        )}
                      />
                      {item.change}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State Illustration */}
        {!searchValue && (
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center justify-center p-8 rounded-2xl bg-secondary/30">
              <svg
                className="w-32 h-32 text-muted-foreground/30"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="20" y="70" width="12" height="30" rx="2" fill="currentColor" opacity="0.3" />
                <rect x="38" y="50" width="12" height="50" rx="2" fill="currentColor" opacity="0.5" />
                <rect x="56" y="35" width="12" height="65" rx="2" fill="currentColor" opacity="0.7" />
                <rect x="74" y="55" width="12" height="45" rx="2" fill="currentColor" opacity="0.4" />
                <rect x="92" y="25" width="12" height="75" rx="2" fill="currentColor" opacity="0.6" />
                <path
                  d="M26 60 L44 40 L62 25 L80 45 L98 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
              <p className="mt-4 text-sm text-muted-foreground">
                Enter a ticker to start analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
