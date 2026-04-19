/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button } from "@/components/ui/button"
import { ComponentProps } from "react"

type TkButtonProps = ComponentProps<typeof Button>

/**
 * TkButton - Thinkube wrapper for Button
 * Thinkube-approved component from thinkube-style
 */
export function TkButton(props: TkButtonProps) {
  return <Button {...props} />
}
