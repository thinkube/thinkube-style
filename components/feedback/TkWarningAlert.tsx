/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { ReactNode } from "react"

interface TkWarningAlertProps {
  title?: string
  children: ReactNode
  className?: string
}

/**
 * TkWarningAlert - Amber warning alert
 * Thinkube-approved component from thinkube-style
 */
export function TkWarningAlert({ title, children, className = "" }: TkWarningAlertProps) {
  if (!title) {
    return (
      <Alert className={`border-[var(--color-warning)]/40 bg-[var(--color-warning)]/5 ${className}`}>
        <AlertTriangle className="h-4 w-4 text-[var(--color-warning)]" />
        <AlertDescription className="text-[var(--color-warning)]">
          {children}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className={`border-[var(--color-warning)]/40 bg-[var(--color-warning)]/5 ${className}`}>
      <AlertTriangle className="h-4 w-4 text-[var(--color-warning)]" />
      <AlertTitle className="text-[var(--color-warning)]">{title}</AlertTitle>
      <AlertDescription className="text-[var(--color-warning)]">
        {children}
      </AlertDescription>
    </Alert>
  )
}
