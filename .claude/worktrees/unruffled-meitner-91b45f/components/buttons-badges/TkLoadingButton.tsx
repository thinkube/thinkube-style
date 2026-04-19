/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"

type TkLoadingButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean
}

/**
 * TkLoadingButton - Button with built-in loading state
 * Thinkube-approved component from thinkube-style
 */
export function TkLoadingButton({ loading, children, disabled, ...props }: TkLoadingButtonProps) {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
