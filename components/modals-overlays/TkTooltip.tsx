/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

interface TkTooltipProps {
  children: ReactNode
  content: string | ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

/**
 * TkTooltip - Thinkube tooltip wrapper with consistent styling
 * Thinkube-approved component from thinkube-style
 */
export function TkTooltip({ children, content, side = "top", className = "" }: TkTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className={className}>
          {typeof content === "string" ? <p>{content}</p> : content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Export Tooltip primitives with Tk prefix
export { Tooltip as TkTooltipRoot } from "@/components/ui/tooltip"
export { TooltipContent as TkTooltipContent } from "@/components/ui/tooltip"
export { TooltipProvider as TkTooltipProvider } from "@/components/ui/tooltip"
export { TooltipTrigger as TkTooltipTrigger } from "@/components/ui/tooltip"
