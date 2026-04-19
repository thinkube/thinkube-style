/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TkBadge } from "./TkBadge"

interface TkGpuBadgeProps {
  gpuCount: number
  size?: "sm" | "base"
  className?: string
}

/**
 * TkGpuBadge - Specialized badge for displaying GPU count with accent styling
 * Thinkube-approved component from thinkube-style
 */
export function TkGpuBadge({ gpuCount, size = "base", className = "" }: TkGpuBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    base: "text-base px-3 py-1",
  }

  return (
    <TkBadge
      className={`${sizeClasses[size]} border-warning/40 bg-warning/15 text-warning font-semibold ${className}`}
    >
      {gpuCount} GPU{gpuCount > 1 ? "s" : ""}
    </TkBadge>
  )
}
