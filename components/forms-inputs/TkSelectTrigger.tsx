/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SelectTrigger } from "@/components/ui/select"
import { ComponentProps } from "react"

type TkSelectTriggerProps = ComponentProps<typeof SelectTrigger>

/**
 * TkSelectTrigger - Thinkube wrapper for SelectTrigger
 * Thinkube-approved component from thinkube-style
 */
export function TkSelectTrigger(props: TkSelectTriggerProps) {
  return <SelectTrigger {...props} />
}
