/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Switch } from "@/components/ui/switch"
import { ComponentProps } from "react"

type TkSwitchProps = ComponentProps<typeof Switch>

/**
 * TkSwitch - Thinkube wrapper for Switch
 * Thinkube-approved component from thinkube-style
 */
export function TkSwitch(props: TkSwitchProps) {
  return <Switch {...props} />
}
