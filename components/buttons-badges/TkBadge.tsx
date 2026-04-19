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
} as const

type TkBadgeStatus = keyof typeof statusMap

type TkBadgeCategory = "core" | "optional" | "user"

type TkBadgeProps = Omit<ComponentProps<typeof Badge>, "variant"> & {
  status?: TkBadgeStatus
  category?: TkBadgeCategory
  /** @deprecated Use `status` or `category` instead */
  variant?: ComponentProps<typeof Badge>["variant"]
}

export function TkBadge({ status, category, variant, ...props }: TkBadgeProps) {
  const resolvedVariant = status
    ? statusMap[status]
    : category
      ? "outline"
      : variant

  return <Badge variant={resolvedVariant} {...props} />
}
