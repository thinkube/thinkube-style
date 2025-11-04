/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardContent } from "@/components/ui/card"
import { ComponentProps } from "react"

type TkCardContentProps = ComponentProps<typeof CardContent>

/**
 * TkCardContent - Thinkube wrapper for CardContent
 * Thinkube-approved component from thinkube-style
 */
export function TkCardContent(props: TkCardContentProps) {
  return <CardContent {...props} />
}
