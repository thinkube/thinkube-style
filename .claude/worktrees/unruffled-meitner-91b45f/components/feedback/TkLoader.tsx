/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"

type TkLoaderProps = ComponentProps<typeof Loader2> & {
  size?: "sm" | "md" | "lg"
}

/**
 * TkLoader - Loader with standardized sizes
 * Thinkube-approved component from thinkube-style
 */
export function TkLoader({ size = "md", className = "", ...props }: TkLoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <Loader2
      className={`animate-spin ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
}
