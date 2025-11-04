/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Table } from "@/components/ui/table"
import { ComponentProps } from "react"

type TkTableProps = ComponentProps<typeof Table>

/**
 * TkTable - Thinkube wrapper for Table
 * Thinkube-approved component from thinkube-style
 */
export function TkTable(props: TkTableProps) {
  return <Table {...props} />
}
