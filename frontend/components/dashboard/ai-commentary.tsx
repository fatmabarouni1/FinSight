"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Sparkles, CheckCircle2, AlertTriangle, XCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AICommentaryProps {
  strengths: string[]
  weaknesses: string[]
  risks: string[]
  recommendation: string
  confidence: "High" | "Medium" | "Low"
  loading?: boolean
}

function getConfidenceColor(confidence: AICommentaryProps["confidence"]) {
  switch (confidence) {
    case "High":
      return "bg-accent/10 text-accent"
    case "Medium":
      return "bg-warning/10 text-warning"
    case "Low":
      return "bg-destructive/10 text-destructive"
  }
}

export function AICommentary({
  strengths,
  weaknesses,
  risks,
  recommendation,
  confidence,
  loading,
}: AICommentaryProps) {
  if (loading) {
    return <AICommentarySkeleton />
  }

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Analysis</h3>
          <Badge className={cn("ml-2", getConfidenceColor(confidence))}>
            {confidence} Confidence
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <RefreshCcw className="h-4 w-4" />
          Regenerate analysis
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-4 rounded-lg bg-secondary/30 border-l-4 border-accent">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            <h4 className="font-semibold text-foreground">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {strengths.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-4 rounded-lg bg-secondary/30 border-l-4 border-destructive">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="h-4 w-4 text-destructive" />
            <h4 className="font-semibold text-foreground">Weaknesses</h4>
          </div>
          <ul className="space-y-2">
            {weaknesses.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div className="p-4 rounded-lg bg-secondary/30 border-l-4 border-warning">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h4 className="font-semibold text-foreground">Risks</h4>
          </div>
          <ul className="space-y-2">
            {risks.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-warning mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendation */}
        <div className="p-4 rounded-lg bg-secondary/30 border-l-4 border-primary">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-primary" />
            <h4 className="font-semibold text-foreground">Recommendation</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  )
}

export function AICommentarySkeleton() {
  return (
    <div className="p-6 rounded-xl border border-border/50 bg-card animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-secondary rounded" />
          <div className="h-6 w-28 bg-secondary rounded" />
          <div className="h-6 w-32 bg-secondary rounded ml-2" />
        </div>
        <div className="h-8 w-40 bg-secondary rounded" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-secondary/30">
            <div className="h-5 w-24 bg-secondary rounded mb-3" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-secondary rounded" />
              <div className="h-4 w-3/4 bg-secondary rounded" />
              <div className="h-4 w-5/6 bg-secondary rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
