"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface CompanyHeaderProps {
  ticker: string
  name: string
  sector: string
  score: number
  lastUpdated: string
  loading?: boolean
}

function getScoreColor(score: number) {
  if (score >= 70) return "bg-accent text-accent-foreground"
  if (score >= 40) return "bg-warning text-warning-foreground"
  return "bg-destructive text-destructive-foreground"
}

function getScoreLabel(score: number) {
  if (score >= 70) return "Strong"
  if (score >= 40) return "Moderate"
  return "Weak"
}

export function CompanyHeader({
  ticker,
  name,
  sector,
  score,
  lastUpdated,
  loading,
}: CompanyHeaderProps) {
  if (loading) {
    return <CompanyHeaderSkeleton />
  }

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-card">
      <div className="flex items-start justify-between">
        {/* Left side - Company Info */}
        <div className="flex items-center gap-4">
          {/* Company Logo Placeholder */}
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">
            {ticker.slice(0, 2)}
          </div>
          
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{name}</h1>
              <Badge variant="secondary" className="text-sm font-medium bg-secondary text-secondary-foreground">
                {ticker}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="outline" className="text-xs border-border/50">
                {sector}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Updated {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Score and Actions */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Star className="h-4 w-4" />
            Add to Watchlist
          </Button>
          
          {/* Global Score */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center h-16 w-16 rounded-xl text-2xl font-bold",
                getScoreColor(score)
              )}
            >
              {score}
            </div>
            <span className="text-xs font-medium text-muted-foreground mt-1">
              {getScoreLabel(score)} / 100
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CompanyHeaderSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-border/50 bg-card animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-secondary" />
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-48 bg-secondary rounded" />
              <div className="h-6 w-16 bg-secondary rounded" />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-5 w-24 bg-secondary rounded" />
              <div className="h-4 w-28 bg-secondary rounded" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-9 w-32 bg-secondary rounded" />
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-xl bg-secondary" />
            <div className="h-3 w-16 bg-secondary rounded mt-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
