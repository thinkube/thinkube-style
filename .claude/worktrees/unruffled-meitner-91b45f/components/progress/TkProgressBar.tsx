/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge } from "@/components/ui/badge"
import { Check, Loader2 } from "lucide-react"

interface TkProgressBarProps {
  current: number
  total: number
  currentLabel?: string
  showPercentage?: boolean
  isRunning?: boolean
  className?: string
}

/**
 * TkProgressBar - Simple progress bar with current step display
 * Thinkube-approved component from thinkube-style
 */
export function TkProgressBar({
  current,
  total,
  currentLabel,
  showPercentage = true,
  isRunning = false,
  className = "",
}: TkProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm">
        <span className="font-medium">
          Step {current} of {total}
        </span>
        {showPercentage && (
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="h-2 bg-secondary overflow-hidden rounded-full">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {currentLabel && current > 0 && current <= total && (
        <div className="flex items-center gap-2 text-sm">
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <Check className="h-4 w-4 text-[var(--color-success)]" />
          )}
          <span className={isRunning ? "text-foreground" : "text-[var(--color-success)]"}>
            {currentLabel}
          </span>
        </div>
      )}
    </div>
  )
}

interface TkProgressBarWithRecentStepsProps {
  steps: string[]
  current: number
  isRunning?: boolean
  title?: string
  className?: string
}

/**
 * TkProgressBarWithRecentSteps - Progress bar showing recent completed steps
 * Thinkube-approved component from thinkube-style
 */
export function TkProgressBarWithRecentSteps({
  steps,
  current,
  isRunning = false,
  title = "Progress",
  className = "",
}: TkProgressBarWithRecentStepsProps) {
  const progress = (current / steps.length) * 100
  const recentSteps = steps.slice(Math.max(0, current - 3), current)

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{title}</span>
          <span className="text-muted-foreground">
            {current} / {steps.length}
          </span>
        </div>
        <div className="h-2 bg-secondary overflow-hidden rounded-full">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Recent Steps */}
      {recentSteps.length > 0 && (
        <div className="space-y-1">
          {recentSteps.map((step, index) => {
            const actualIndex = Math.max(0, current - 3) + index
            const isCurrent = actualIndex === current - 1

            return (
              <div
                key={actualIndex}
                className={`flex items-center gap-2 px-2 py-1 text-sm ${
                  isCurrent ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {isCurrent && isRunning ? (
                  <Loader2 className="h-3 w-3 animate-spin text-primary flex-shrink-0" />
                ) : (
                  <Check className="h-3 w-3 text-[var(--color-success)] flex-shrink-0" />
                )}
                <span>{step}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
