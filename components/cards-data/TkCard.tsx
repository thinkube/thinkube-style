/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card } from "@/components/ui/card"
import { ComponentProps } from "react"

type TkCardProps = ComponentProps<typeof Card>

/**
 * TkCard - Thinkube wrapper for Card
 * Thinkube-approved component from thinkube-style
 */
export function TkCard(props: TkCardProps) {
  return <Card {...props} />
}
