/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TkButton } from "./TkButton"
import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"

type TkLoadingButtonProps = ComponentProps<typeof TkButton> & {
  loading?: boolean
}

export function TkLoadingButton({ loading, children, disabled, ...props }: TkLoadingButtonProps) {
  return (
    <TkButton disabled={loading || disabled} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </TkButton>
  )
}
