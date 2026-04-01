"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

interface ScoreBreakdownProps {
  score: number
  breakdown: {
    profitability: number
    risk: number
    growth: number
  }
}

function getScoreColor(score: number) {
  if (score >= 70) return "bg-accent text-accent-foreground"
  if (score >= 40) return "bg-warning text-warning-foreground"
  return "bg-destructive text-destructive-foreground"
}

export function ScoreTooltip({ score, breakdown }: ScoreBreakdownProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center justify-center h-14 w-14 rounded-xl text-xl font-bold",
                getScoreColor(score)
              )}
            >
              {score}
            </div>
            <Info className="h-4 w-4 text-muted-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="w-64 p-4">
          <div className="space-y-3">
            <p className="font-semibold text-foreground">Score Breakdown</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Profitability (40%)
                </span>
                <span className="text-sm font-medium text-foreground">
                  {breakdown.profitability}
                </span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${breakdown.profitability}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk (30%)</span>
                <span className="text-sm font-medium text-foreground">
                  {breakdown.risk}
                </span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full"
                  style={{ width: `${breakdown.risk}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Growth (30%)</span>
                <span className="text-sm font-medium text-foreground">
                  {breakdown.growth}
                </span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${breakdown.growth}%` }}
                />
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
