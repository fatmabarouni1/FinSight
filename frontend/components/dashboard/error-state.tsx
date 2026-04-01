"use client"

import { AlertTriangle } from "lucide-react"

interface ErrorStateProps {
  message: string
  description?: string
}

export function ErrorState({ message, description }: ErrorStateProps) {
  return (
    <div className="p-4 rounded-xl border border-warning/30 bg-warning/5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
          <AlertTriangle className="h-4 w-4 text-warning" />
        </div>
        <div>
          <p className="font-medium text-foreground">{message}</p>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
