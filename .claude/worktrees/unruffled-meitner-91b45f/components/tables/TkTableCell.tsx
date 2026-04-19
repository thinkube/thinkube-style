/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TableCell } from "@/components/ui/table"
import { ComponentProps } from "react"

type TkTableCellProps = ComponentProps<typeof TableCell>

/**
 * TkTableCell - Thinkube wrapper for TableCell
 * Thinkube-approved component from thinkube-style
 */
export function TkTableCell(props: TkTableCellProps) {
  return <TableCell {...props} />
}
