/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { RadioGroup } from "@/components/ui/radio-group"
import { ComponentProps } from "react"

type TkRadioGroupProps = ComponentProps<typeof RadioGroup>

/**
 * TkRadioGroup - Thinkube wrapper for RadioGroup
 * Thinkube-approved component from thinkube-style
 */
export function TkRadioGroup(props: TkRadioGroupProps) {
  return <RadioGroup {...props} />
}
