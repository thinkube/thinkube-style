/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SelectItem } from "@/components/ui/select"
import { ComponentProps } from "react"

type TkSelectItemProps = ComponentProps<typeof SelectItem>

/**
 * TkSelectItem - Thinkube wrapper for SelectItem
 * Thinkube-approved component from thinkube-style
 */
export function TkSelectItem(props: TkSelectItemProps) {
  return <SelectItem {...props} />
}
