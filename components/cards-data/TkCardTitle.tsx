/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardTitle } from "@/components/ui/card"
import { ComponentProps } from "react"

type TkCardTitleProps = ComponentProps<typeof CardTitle>

/**
 * TkCardTitle - Thinkube wrapper for CardTitle
 * Thinkube-approved component from thinkube-style
 */
export function TkCardTitle(props: TkCardTitleProps) {
  return <CardTitle {...props} />
}
