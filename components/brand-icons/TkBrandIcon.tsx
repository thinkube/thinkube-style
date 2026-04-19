/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

interface TkBrandIconProps {
  icon: string
  alt: string
  size?: number
  className?: string
  color?: string
}

export function TkBrandIcon({ icon, alt, size = 20, className = "", color }: TkBrandIconProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`inline-block ${color ? "" : "text-[#006680] dark:text-foreground"} ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color || "currentColor",
        maskImage: `url(/icons/${icon}.svg)`,
        WebkitMaskImage: `url(/icons/${icon}.svg)`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  )
}
