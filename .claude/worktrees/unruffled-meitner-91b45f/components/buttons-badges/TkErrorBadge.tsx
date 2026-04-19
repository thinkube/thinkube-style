/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge } from "@/components/ui/badge"
import { ReactNode } from "react"

interface TkErrorBadgeProps {
  children: ReactNode
  className?: string
}

/**
 * TkErrorBadge - Red error/destructive badge
 * Thinkube-approved component from thinkube-style
 */
export function TkErrorBadge({ children, className = "" }: TkErrorBadgeProps) {
  return (
    <Badge variant="destructive" className={className}>
      {children}
    </Badge>
  )
}
