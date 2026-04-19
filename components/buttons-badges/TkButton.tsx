/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button } from "@/components/ui/button"
import { ComponentProps } from "react"

const intentMap = {
  primary: "default",
  secondary: "outline",
  danger: "destructive",
  ghost: "ghost",
} as const

type TkButtonIntent = keyof typeof intentMap

type TkButtonProps = Omit<ComponentProps<typeof Button>, "variant"> & {
  intent?: TkButtonIntent
  /** @deprecated Use `intent` instead */
  variant?: ComponentProps<typeof Button>["variant"]
}

export function TkButton({ intent, variant, ...props }: TkButtonProps) {
  const resolvedVariant = intent
    ? intentMap[intent]
    : variant

  return <Button variant={resolvedVariant} {...props} />
}
