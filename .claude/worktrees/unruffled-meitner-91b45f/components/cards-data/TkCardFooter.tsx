/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardFooter } from "@/components/ui/card"
import { ComponentProps } from "react"

type TkCardFooterProps = ComponentProps<typeof CardFooter>

/**
 * TkCardFooter - Thinkube wrapper for CardFooter
 * Thinkube-approved component from thinkube-style
 */
export function TkCardFooter(props: TkCardFooterProps) {
  return <CardFooter {...props} />
}
