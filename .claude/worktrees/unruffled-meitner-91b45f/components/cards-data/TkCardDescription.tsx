/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardDescription } from "@/components/ui/card"
import { ComponentProps } from "react"

type TkCardDescriptionProps = ComponentProps<typeof CardDescription>

/**
 * TkCardDescription - Thinkube wrapper for CardDescription
 * Thinkube-approved component from thinkube-style
 */
export function TkCardDescription(props: TkCardDescriptionProps) {
  return <CardDescription {...props} />
}
