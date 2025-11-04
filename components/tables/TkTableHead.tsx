/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TableHead } from "@/components/ui/table"
import { ComponentProps } from "react"

type TkTableHeadProps = ComponentProps<typeof TableHead>

/**
 * TkTableHead - Thinkube wrapper for TableHead
 * Thinkube-approved component from thinkube-style
 */
export function TkTableHead(props: TkTableHeadProps) {
  return <TableHead {...props} />
}
