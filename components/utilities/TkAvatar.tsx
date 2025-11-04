/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ComponentProps } from "react"

type TkAvatarProps = ComponentProps<typeof Avatar> & {
  src?: string
  fallback: string
}

/**
 * TkAvatar - Thinkube wrapper for Avatar with fallback
 * Thinkube-approved component from thinkube-style
 */
export function TkAvatar({ src, fallback, ...props }: TkAvatarProps) {
  return (
    <Avatar {...props}>
      {src && <AvatarImage src={src} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
