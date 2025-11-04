/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { ReactNode } from "react"

interface TkInfoAlertProps {
  title?: string
  children: ReactNode
  className?: string
}

/**
 * TkInfoAlert - Blue informational alert
 * Thinkube-approved component from thinkube-style
 */
export function TkInfoAlert({ title, children, className = "" }: TkInfoAlertProps) {
  if (!title) {
    // Simple alert without title
    return (
      <Alert className={`border-[var(--color-info)]/40 bg-[var(--color-info)]/5 ${className}`}>
        <Info className="h-4 w-4 text-[var(--color-info)]" />
        <AlertDescription className="text-[var(--color-info)]">
          {children}
        </AlertDescription>
      </Alert>
    )
  }

  // Alert with title
  return (
    <Alert className={`border-[var(--color-info)]/40 bg-[var(--color-info)]/5 ${className}`}>
      <Info className="h-4 w-4 text-[var(--color-info)]" />
      <AlertTitle className="text-[var(--color-info)]">{title}</AlertTitle>
      <AlertDescription className="text-[var(--color-info)]">
        {children}
      </AlertDescription>
    </Alert>
  )
}

// Export Alert primitives with Tk prefix
export { Alert as TkAlert } from "@/components/ui/alert"
export { AlertDescription as TkAlertDescription } from "@/components/ui/alert"
export { AlertTitle as TkAlertTitle } from "@/components/ui/alert"
