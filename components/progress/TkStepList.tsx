/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Loader2, Circle } from "lucide-react"

interface TkStepListProps {
  steps: string[]
  current: number
  isRunning?: boolean
  maxHeight?: string
  className?: string
}

/**
 * TkStepList - Scrollable step list for detailed progress tracking
 * Thinkube-approved component from thinkube-style
 */
export function TkStepList({
  steps,
  current,
  isRunning = false,
  maxHeight = "max-h-64",
  className = "",
}: TkStepListProps) {
  return (
    <div className={`${maxHeight} overflow-y-auto space-y-1 ${className}`}>
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isComplete = stepNumber < current
        const isCurrent = stepNumber === current
        const isPending = stepNumber > current

        return (
          <div
            key={index}
            className={`flex items-center gap-2 px-2 py-1 text-sm transition-colors ${
              isCurrent ? "bg-primary/10 text-primary font-medium" : ""
            } ${isComplete ? "text-muted-foreground" : ""} ${
              isPending ? "text-muted-foreground/50" : ""
            }`}
          >
            {isComplete && (
              <Check className="h-3 w-3 text-[var(--color-success)] flex-shrink-0" />
            )}
            {isCurrent && (
              <Loader2 className="h-3 w-3 animate-spin text-primary flex-shrink-0" />
            )}
            {isPending && <Circle className="h-3 w-3 flex-shrink-0" />}
            <span className="flex-1">{step}</span>
            <span className="text-xs text-muted-foreground">{stepNumber}</span>
          </div>
        )
      })}
    </div>
  )
}

interface TkDotProgressProps {
  steps: string[]
  current: number
  isRunning?: boolean
  currentLabel?: string
  showBadge?: boolean
  className?: string
}

/**
 * TkDotProgress - Minimal dot-based progress indicator
 * Thinkube-approved component from thinkube-style
 */
export function TkDotProgress({
  steps,
  current,
  isRunning = false,
  currentLabel,
  showBadge = false,
  className = "",
}: TkDotProgressProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {showBadge && (
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Installation Progress</span>
          <span className="text-muted-foreground">
            {current} / {steps.length}
          </span>
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isComplete = stepNumber < current
          const isCurrent = stepNumber === current

          return (
            <div
              key={index}
              className={`h-2 w-2 transition-all ${
                isComplete
                  ? "bg-[var(--color-success)]"
                  : isCurrent
                  ? "bg-primary animate-pulse"
                  : "bg-border"
              }`}
              title={step}
            />
          )
        })}
      </div>
      {currentLabel && current > 0 && current <= steps.length && (
        <div className="flex items-center gap-2 text-sm pt-2 border-t">
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <Check className="h-4 w-4 text-[var(--color-success)]" />
          )}
          <span>{currentLabel}</span>
        </div>
      )}
    </div>
  )
}
