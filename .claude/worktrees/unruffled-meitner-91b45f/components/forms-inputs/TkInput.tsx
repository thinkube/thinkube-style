/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Input } from "@/components/ui/input"
import { ComponentProps } from "react"

type TkInputProps = ComponentProps<typeof Input>

/**
 * TkInput - Thinkube wrapper for Input
 * Thinkube-approved component from thinkube-style
 */
export function TkInput(props: TkInputProps) {
  return <Input {...props} />
}
