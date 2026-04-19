/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Separator } from "@/components/ui/separator"
import { ComponentProps } from "react"

type TkSeparatorProps = ComponentProps<typeof Separator>

/**
 * TkSeparator - Thinkube wrapper for Separator
 * Thinkube-approved component from thinkube-style
 */
export function TkSeparator(props: TkSeparatorProps) {
  return <Separator {...props} />
}

// Export Separator primitive with Tk prefix
export { Separator as TkSeparatorRoot } from "@/components/ui/separator"
