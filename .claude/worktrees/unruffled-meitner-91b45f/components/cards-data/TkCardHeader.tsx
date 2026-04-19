/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardHeader } from "@/components/ui/card"
import { ComponentProps } from "react"

type TkCardHeaderProps = ComponentProps<typeof CardHeader>

/**
 * TkCardHeader - Thinkube wrapper for CardHeader
 * Thinkube-approved component from thinkube-style
 */
export function TkCardHeader(props: TkCardHeaderProps) {
  return <CardHeader {...props} />
}
