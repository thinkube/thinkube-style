/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { ReactNode } from "react"

interface TkSuccessAlertProps {
  title?: string
  children: ReactNode
  className?: string
}

/**
 * TkSuccessAlert - Green success alert
 * Thinkube-approved component from thinkube-style
 */
export function TkSuccessAlert({ title, children, className = "" }: TkSuccessAlertProps) {
  if (!title) {
    return (
      <Alert className={`border-[var(--color-success)]/40 bg-[var(--color-success)]/5 ${className}`}>
        <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
        <AlertDescription className="text-[var(--color-success)]">
          {children}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className={`border-[var(--color-success)]/40 bg-[var(--color-success)]/5 ${className}`}>
      <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
      <AlertTitle className="text-[var(--color-success)]">{title}</AlertTitle>
      <AlertDescription className="text-[var(--color-success)]">
        {children}
      </AlertDescription>
    </Alert>
  )
}
