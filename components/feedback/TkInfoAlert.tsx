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

export function TkInfoAlert({ title, children, className = "" }: TkInfoAlertProps) {
  return (
    <Alert variant="info" className={className}>
      <Info className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

export { Alert as TkAlert } from "@/components/ui/alert"
export { AlertDescription as TkAlertDescription } from "@/components/ui/alert"
export { AlertTitle as TkAlertTitle } from "@/components/ui/alert"
