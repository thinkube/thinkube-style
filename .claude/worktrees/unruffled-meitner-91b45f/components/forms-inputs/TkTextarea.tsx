/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Textarea } from "@/components/ui/textarea"
import { ComponentProps } from "react"

type TkTextareaProps = ComponentProps<typeof Textarea>

/**
 * TkTextarea - Thinkube wrapper for Textarea
 * Thinkube-approved component from thinkube-style
 */
export function TkTextarea(props: TkTextareaProps) {
  return <Textarea {...props} />
}
