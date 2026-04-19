/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { ReactNode } from "react"

interface TkErrorAlertProps {
  title?: string
  children: ReactNode
  className?: string
}

/**
 * TkErrorAlert - Red error/destructive alert
 * Thinkube-approved component from thinkube-style
 */
export function TkErrorAlert({ title, children, className = "" }: TkErrorAlertProps) {
  if (!title) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {children}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  )
}
