"use client"

import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MetricCardProps {
  name: string
  value: string
  trend: number
  status: "good" | "warning" | "bad"
  loading?: boolean
}

function getStatusColor(status: MetricCardProps["status"]) {
  switch (status) {
    case "good":
      return "bg-accent"
    case "warning":
      return "bg-warning"
    case "bad":
      return "bg-destructive"
  }
}

export function MetricCard({ name, value, trend, status, loading }: MetricCardProps) {
  if (loading) {
    return <MetricCardSkeleton />
  }

  const isPositive = trend >= 0

  return (
    <div className="p-4 rounded-xl border border-border/50 bg-card hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {name}
        </span>
        <div className={cn("h-2.5 w-2.5 rounded-full", getStatusColor(status))} />
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        
        <div
          className={cn(
            "flex items-center gap-0.5 text-sm font-medium",
            isPositive ? "text-accent" : "text-destructive"
          )}
        >
          {isPositive ? (
            <ArrowUp className="h-3.5 w-3.5" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5" />
          )}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-1">vs last year</p>
    </div>
  )
}

export function MetricCardSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-border/50 bg-card animate-pulse">
      <div className="flex items-start justify-between mb-2">
        <div className="h-3 w-16 bg-secondary rounded" />
        <div className="h-2.5 w-2.5 rounded-full bg-secondary" />
      </div>
      <div className="flex items-end justify-between">
        <div className="h-8 w-20 bg-secondary rounded" />
        <div className="h-4 w-10 bg-secondary rounded" />
      </div>
      <div className="h-3 w-14 bg-secondary rounded mt-2" />
    </div>
  )
}
