/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Select } from "@/components/ui/select"
import { ComponentProps } from "react"

type TkSelectProps = ComponentProps<typeof Select>

/**
 * TkSelect - Thinkube wrapper for Select
 * Thinkube-approved component from thinkube-style
 */
export function TkSelect(props: TkSelectProps) {
  return <Select {...props} />
}
