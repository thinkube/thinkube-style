/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge } from "@/components/ui/badge"
import { ReactNode } from "react"

interface TkSuccessBadgeProps {
  children: ReactNode
  className?: string
}

/**
 * TkSuccessBadge - Green success badge
 * Thinkube-approved component from thinkube-style
 */
export function TkSuccessBadge({ children, className = "" }: TkSuccessBadgeProps) {
  return (
    <Badge variant="success" className={className}>
      {children}
    </Badge>
  )
}
