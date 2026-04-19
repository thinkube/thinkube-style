/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge } from "@/components/ui/badge"
import { Check, Loader2 } from "lucide-react"

interface TkSubwayProgressProps {
  steps: string[]
  current: number
  isRunning?: boolean
  className?: string
}

/**
 * TkSubwayProgress - Subway/metro line style progress indicator
 * Thinkube-approved component from thinkube-style
 */
export function TkSubwayProgress({
  steps,
  current,
  isRunning = false,
  className = "",
}: TkSubwayProgressProps) {
  const totalSteps = steps.length

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Current Step Info */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {current >= totalSteps ? (
            <Check className="h-4 w-4 text-[var(--color-success)]" />
          ) : isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : null}
          <span className="text-sm font-medium">
            {current >= totalSteps
              ? "Complete!"
              : current > 0
              ? steps[current - 1]
              : "Ready to start"}
          </span>
        </div>
        <Badge variant="outline">
          {current} / {totalSteps}
        </Badge>
      </div>

      {/* The Subway Line */}
      <div className="relative px-4 py-6">
        {/* Background line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border -translate-y-1/2" />

        {/* Progress line */}
        <div
          className="absolute top-1/2 left-4 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500"
          style={{
            width:
              current >= totalSteps
                ? "calc(100% - 2rem)"
                : `calc(${(current / totalSteps) * 100}% - 1rem)`,
          }}
        />

        {/* Stations/Circles */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isComplete = stepNumber < current
            const isCurrent = stepNumber === current
            const isPending = stepNumber > current

            return (
              <div
                key={index}
                className="flex flex-col items-center relative group cursor-help"
              >
                {/* Circle */}
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isComplete
                      ? "bg-primary border-primary"
                      : isCurrent
                      ? "bg-primary border-primary ring-4 ring-primary/20 scale-125"
                      : "bg-background border-border"
                  }`}
                />

                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
                    {step}
                  </div>
                  <div className="w-2 h-2 bg-primary rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
