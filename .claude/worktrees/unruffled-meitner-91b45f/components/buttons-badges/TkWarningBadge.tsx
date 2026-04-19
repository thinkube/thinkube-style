/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge } from "@/components/ui/badge"
import { ReactNode } from "react"

interface TkWarningBadgeProps {
  children: ReactNode
  className?: string
}

/**
 * TkWarningBadge - Amber warning badge
 * Thinkube-approved component from thinkube-style
 */
export function TkWarningBadge({ children, className = "" }: TkWarningBadgeProps) {
  return (
    <Badge variant="warning" className={className}>
      {children}
    </Badge>
  )
}
