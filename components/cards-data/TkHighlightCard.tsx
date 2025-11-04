/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface TkHighlightCardProps {
  title: string
  icon?: LucideIcon
  children: ReactNode
  className?: string
}

/**
 * TkHighlightCard - Card with primary border and optional icon
 * Thinkube-approved component from thinkube-style
 */
export function TkHighlightCard({ title, icon: Icon, children, className = "" }: TkHighlightCardProps) {
  return (
    <Card className={`border-primary ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
