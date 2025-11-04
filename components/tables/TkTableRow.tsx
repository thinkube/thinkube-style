/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TableRow } from "@/components/ui/table"
import { ComponentProps } from "react"

type TkTableRowProps = ComponentProps<typeof TableRow>

/**
 * TkTableRow - Thinkube wrapper for TableRow
 * Thinkube-approved component from thinkube-style
 */
export function TkTableRow(props: TkTableRowProps) {
  return <TableRow {...props} />
}
