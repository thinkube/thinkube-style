/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TableHeader } from "@/components/ui/table"
import { ComponentProps } from "react"

type TkTableHeaderProps = ComponentProps<typeof TableHeader>

/**
 * TkTableHeader - Thinkube wrapper for TableHeader
 * Thinkube-approved component from thinkube-style
 */
export function TkTableHeader(props: TkTableHeaderProps) {
  return <TableHeader {...props} />
}
