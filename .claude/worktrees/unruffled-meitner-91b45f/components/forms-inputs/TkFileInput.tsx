/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Input } from "@/components/ui/input"
import { ComponentProps } from "react"

type TkFileInputProps = Omit<ComponentProps<typeof Input>, "type">

/**
 * TkFileInput - Thinkube wrapper for file input
 * Thinkube-approved component from thinkube-style
 */
export function TkFileInput(props: TkFileInputProps) {
  return <Input type="file" {...props} />
}
