/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

interface TkBrandIconProps {
  icon: string
  alt: string
  size?: number
  className?: string
}

/**
 * TkBrandIcon - Thinkube brand icon with automatic light/dark mode switching
 * Thinkube-approved component from thinkube-style
 */
export function TkBrandIcon({ icon, alt, size = 20, className = "" }: TkBrandIconProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <img
        src={`/icons/${icon}.svg`}
        alt={alt}
        style={{ width: size, height: size }}
        className="dark:hidden"
      />
      <img
        src={`/icons/${icon}_inverted.svg`}
        alt={alt}
        style={{ width: size, height: size }}
        className="hidden dark:block"
      />
    </div>
  )
}
