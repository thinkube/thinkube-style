/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TableBody } from "@/components/ui/table"
import { ComponentProps } from "react"

type TkTableBodyProps = ComponentProps<typeof TableBody>

/**
 * TkTableBody - Thinkube wrapper for TableBody
 * Thinkube-approved component from thinkube-style
 */
export function TkTableBody(props: TkTableBodyProps) {
  return <TableBody {...props} />
}
