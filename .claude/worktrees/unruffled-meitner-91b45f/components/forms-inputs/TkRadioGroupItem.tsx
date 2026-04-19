/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { RadioGroupItem } from "@/components/ui/radio-group"
import { ComponentProps } from "react"

type TkRadioGroupItemProps = ComponentProps<typeof RadioGroupItem>

/**
 * TkRadioGroupItem - Thinkube wrapper for RadioGroupItem
 * Thinkube-approved component from thinkube-style
 */
export function TkRadioGroupItem(props: TkRadioGroupItemProps) {
  return <RadioGroupItem {...props} />
}
