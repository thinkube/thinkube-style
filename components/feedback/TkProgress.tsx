/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Progress } from "@/components/ui/progress"
import { ComponentProps } from "react"

type TkProgressProps = ComponentProps<typeof Progress>

/**
 * TkProgress - Thinkube wrapper for Progress
 * Thinkube-approved component from thinkube-style
 */
export function TkProgress(props: TkProgressProps) {
  return <Progress {...props} />
}
