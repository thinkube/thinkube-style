/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface TkCodeBlockProps extends Omit<ComponentProps<"pre">, "className"> {
  /** Additional CSS classes */
  className?: string
  /** Code/log content to display */
  children: React.ReactNode
  /** Maximum height (default: 96 = 24rem) */
  maxHeight?: string
  /** Background opacity variant */
  variant?: "solid" | "translucent"
}

/**
 * TkCodeBlock - Thinkube component for displaying code or logs
 *
 * Features:
 * - Monospace font
 * - Scrollable with proper overflow handling
 * - Theme-aware background
 * - Consistent padding and styling
 *
 * @example
 * ```tsx
 * <TkCodeBlock>
 *   {logContent}
 * </TkCodeBlock>
 * ```
 */
export function TkCodeBlock({
  children,
  className,
  maxHeight = "h-96",
  variant = "solid",
  ...props
}: TkCodeBlockProps) {
  return (
    <pre
      className={cn(
        "text-xs font-mono overflow-auto whitespace-pre-wrap break-words p-4 rounded-lg",
        variant === "solid" ? "bg-muted" : "bg-muted/30",
        maxHeight,
        className
      )}
      {...props}
    >
      {children}
    </pre>
  )
}
