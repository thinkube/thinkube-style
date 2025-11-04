/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Label } from "@/components/ui/label"
import { ComponentProps } from "react"

type TkLabelProps = ComponentProps<typeof Label>

/**
 * TkLabel - Thinkube wrapper for Label
 * Thinkube-approved component from thinkube-style
 */
export function TkLabel(props: TkLabelProps) {
  return <Label {...props} />
}
