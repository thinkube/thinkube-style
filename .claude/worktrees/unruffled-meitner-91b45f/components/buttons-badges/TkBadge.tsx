/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge } from "@/components/ui/badge"
import { ComponentProps } from "react"

type TkBadgeProps = ComponentProps<typeof Badge>

/**
 * TkBadge - Thinkube wrapper for Badge
 * Thinkube-approved component from thinkube-style
 */
export function TkBadge(props: TkBadgeProps) {
  return <Badge {...props} />
}
