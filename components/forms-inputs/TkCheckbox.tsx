/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Checkbox } from "@/components/ui/checkbox"
import { ComponentProps } from "react"

type TkCheckboxProps = ComponentProps<typeof Checkbox>

/**
 * TkCheckbox - Thinkube wrapper for Checkbox
 * Thinkube-approved component from thinkube-style
 */
export function TkCheckbox(props: TkCheckboxProps) {
  return <Checkbox {...props} />
}
