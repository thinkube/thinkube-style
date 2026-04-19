/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SelectContent } from "@/components/ui/select"
import { ComponentProps } from "react"

type TkSelectContentProps = ComponentProps<typeof SelectContent>

/**
 * TkSelectContent - Thinkube wrapper for SelectContent
 * Thinkube-approved component from thinkube-style
 */
export function TkSelectContent(props: TkSelectContentProps) {
  return <SelectContent {...props} />
}
