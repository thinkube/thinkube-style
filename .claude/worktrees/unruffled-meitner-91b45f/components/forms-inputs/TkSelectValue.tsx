/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SelectValue } from "@/components/ui/select"
import { ComponentProps } from "react"

type TkSelectValueProps = ComponentProps<typeof SelectValue>

/**
 * TkSelectValue - Thinkube wrapper for SelectValue
 * Thinkube-approved component from thinkube-style
 */
export function TkSelectValue(props: TkSelectValueProps) {
  return <SelectValue {...props} />
}
