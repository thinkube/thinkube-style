/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from "@/lib/utils"

const statusColors = {
  healthy: "bg-success",
  unhealthy: "bg-destructive",
  pending: "bg-warning animate-pulse",
  warning: "bg-warning",
} as const

const sizes = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
} as const

interface TkStatusIndicatorProps {
  status: keyof typeof statusColors
  size?: keyof typeof sizes
  className?: string
}

export function TkStatusIndicator({ status, size = "md", className }: TkStatusIndicatorProps) {
  return (
    <span
      className={cn("rounded-full inline-block", sizes[size], statusColors[status], className)}
      aria-label={status}
    />
  )
}
