/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge } from "@/components/ui/badge"
import { ComponentProps } from "react"

const statusMap = {
  healthy: "success",
  unhealthy: "destructive",
  pending: "secondary",
  warning: "warning",
  active: "default",
} as const

const categoryMap = {
  core: "default",
  optional: "secondary",
  user: "outline",
} as const

const appearanceMap = {
  prominent: "default",
  muted: "secondary",
  outlined: "outline",
} as const

export type TkBadgeStatus = keyof typeof statusMap
export type TkBadgeCategory = keyof typeof categoryMap
export type TkBadgeAppearance = keyof typeof appearanceMap

type TkBadgeProps = Omit<ComponentProps<typeof Badge>, "variant"> & {
  status?: TkBadgeStatus
  category?: TkBadgeCategory
  appearance?: TkBadgeAppearance
}

export function TkBadge({ status, category, appearance, ...props }: TkBadgeProps) {
  const resolvedVariant = status
    ? statusMap[status]
    : category
      ? categoryMap[category]
      : appearance
        ? appearanceMap[appearance]
        : "outline"

  return <Badge variant={resolvedVariant} {...props} />
}
