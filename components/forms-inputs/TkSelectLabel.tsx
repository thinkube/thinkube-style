/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SelectLabel } from "@/components/ui/select"
import { ComponentProps } from "react"

type TkSelectLabelProps = ComponentProps<typeof SelectLabel>

/**
 * TkSelectLabel - Thinkube wrapper for SelectLabel
 * Thinkube-approved component from thinkube-style
 */
export function TkSelectLabel(props: TkSelectLabelProps) {
  return <SelectLabel {...props} />
}
