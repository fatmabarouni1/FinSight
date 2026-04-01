"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Star, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface WatchlistDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const watchlistItems = [
  { ticker: "AAPL", name: "Apple Inc.", score: 85, alert: true },
  { ticker: "MSFT", name: "Microsoft Corp.", score: 78, alert: true },
  { ticker: "GOOGL", name: "Alphabet Inc.", score: 72, alert: false },
  { ticker: "NVDA", name: "NVIDIA Corp.", score: 91, alert: true },
  { ticker: "AMZN", name: "Amazon.com Inc.", score: 65, alert: false },
]

function getScoreColor(score: number) {
  if (score >= 70) return "bg-accent text-accent-foreground"
  if (score >= 40) return "bg-warning text-warning-foreground"
  return "bg-destructive text-destructive-foreground"
}

export function WatchlistDrawer({ open, onOpenChange }: WatchlistDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[380px] sm:w-[420px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Watchlist
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-3">
          {watchlistItems.map((item) => (
            <div
              key={item.ticker}
              className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{item.ticker}</span>
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={cn("font-semibold", getScoreColor(item.score))}>
                  {item.score}
                </Badge>
                
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Switch checked={item.alert} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
