/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SelectGroup } from "@/components/ui/select"
import { ComponentProps } from "react"

type TkSelectGroupProps = ComponentProps<typeof SelectGroup>

/**
 * TkSelectGroup - Thinkube wrapper for SelectGroup
 * Thinkube-approved component from thinkube-style
 */
export function TkSelectGroup(props: TkSelectGroupProps) {
  return <SelectGroup {...props} />
}
