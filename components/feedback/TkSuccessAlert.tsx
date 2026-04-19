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

export function TkSuccessAlert({ title, children, className = "" }: TkSuccessAlertProps) {
  return (
    <Alert variant="success" className={className}>
      <CheckCircle2 className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
