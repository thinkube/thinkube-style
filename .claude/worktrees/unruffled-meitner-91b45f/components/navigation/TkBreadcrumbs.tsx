/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react"

interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

interface TkBreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  className?: string
}

/**
 * TkBreadcrumbs - Navigation breadcrumbs showing current location
 * Thinkube-approved component from thinkube-style
 */
export function TkBreadcrumbs({ items, separator = "/", className = "" }: TkBreadcrumbsProps) {
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (isLast) {
          return (
            <span key={index} className="text-muted-foreground">
              {item.label}
            </span>
          )
        }

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href ? (
              <a href={item.href} className="text-primary hover:underline">
                {item.label}
              </a>
            ) : item.onClick ? (
              <button onClick={item.onClick} className="text-primary hover:underline">
                {item.label}
              </button>
            ) : (
              <span className="text-primary">{item.label}</span>
            )}
            <span className="text-muted-foreground">{separator}</span>
          </div>
        )
      })}
    </div>
  )
}
