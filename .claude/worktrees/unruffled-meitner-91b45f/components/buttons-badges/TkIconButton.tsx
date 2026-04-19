/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button } from "@/components/ui/button"
import { ComponentProps } from "react"

type TkIconButtonProps = ComponentProps<typeof Button>

/**
 * TkIconButton - Button specifically for icon-only buttons
 * Thinkube-approved component from thinkube-style
 */
export function TkIconButton({ size = "icon", ...props }: TkIconButtonProps) {
  return <Button size={size} {...props} />
}
