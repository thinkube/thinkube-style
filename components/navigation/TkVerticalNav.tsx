/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use client"

import { useState, useEffect, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react"
import { TkBrandIcon } from "../brand-icons/TkBrandIcon"

export interface TkNavItem {
  id: string
  label: string
  lucideIcon?: LucideIcon
  brandIcon?: string
  href?: string
  onClick?: () => void
  isGroup?: boolean
  children?: TkNavItem[]
}

interface TkVerticalNavProps {
  items: TkNavItem[]
  activeItem?: string
  onItemClick?: (id: string) => void
  renderLink?: (props: { to: string; className: string; children: ReactNode }) => ReactNode
  logoIcon?: string
  logoText?: string
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  className?: string
}

export function TkVerticalNav({
  items,
  activeItem,
  onItemClick,
  renderLink,
  logoIcon = "tk_logo",
  logoText = "Thinkube",
  collapsed: controlledCollapsed,
  onCollapsedChange,
  className = "",
}: TkVerticalNavProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed

  const [expandedGroups, setExpandedGroups] = useState<string[]>(() => {
    return items.filter((item) => item.isGroup).map((item) => item.id)
  })

  useEffect(() => {
    if (!activeItem) return
    for (const item of items) {
      if (item.isGroup && item.children) {
        const hasActiveChild = item.children.some((child) => child.id === activeItem)
        if (hasActiveChild && !expandedGroups.includes(item.id)) {
          setExpandedGroups((prev) => [...prev, item.id])
        }
      }
    }
  }, [activeItem, items])

  const handleCollapsedChange = (newCollapsed: boolean) => {
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsed)
    } else {
      setInternalCollapsed(newCollapsed)
    }
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((g) => g !== groupId) : [...prev, groupId]
    )
  }

  const handleItemClick = (item: TkNavItem) => {
    if (item.isGroup) {
      if (isCollapsed) {
        handleCollapsedChange(false)
        setExpandedGroups((prev) =>
          prev.includes(item.id) ? prev : [...prev, item.id]
        )
      } else {
        toggleGroup(item.id)
      }
    } else {
      if (onItemClick) onItemClick(item.id)
      if (item.onClick) item.onClick()
    }
  }

  const activeClass = "bg-secondary text-foreground font-semibold border-l-4 border-l-foreground"
  const inactiveClass = "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"

  const renderNavItem = (item: TkNavItem, isChild = false) => {
    const isActive = activeItem === item.id
    const iconSize = isChild ? "w-4 h-4" : "w-5 h-5"
    const brandIconSize = isChild ? 16 : 20

    const className = `w-full flex items-center gap-3 px-3 py-2 transition-colors ${
      isActive ? activeClass : inactiveClass
    }`

    const content = (
      <>
        {item.lucideIcon && <item.lucideIcon className={`${iconSize} flex-shrink-0`} />}
        {item.brandIcon && <TkBrandIcon icon={item.brandIcon} alt={item.label} size={brandIconSize} />}
        {!isCollapsed && <span className="text-sm text-left">{item.label}</span>}
      </>
    )

    if (renderLink && item.href) {
      return renderLink({ to: item.href, className, children: content })
    }

    return (
      <button onClick={() => handleItemClick(item)} className={className}>
        {content}
      </button>
    )
  }

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-card border-r border-border flex flex-col transition-all duration-300 ${className}`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <TkBrandIcon icon={logoIcon} alt={logoText} size={32} />
            <span className="font-semibold">{logoText}</span>
          </div>
        )}
        {isCollapsed && <TkBrandIcon icon={logoIcon} alt={logoText} size={32} className="mx-auto" />}
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {items.map((item) => (
          <div key={item.id} className="mb-1">
            {!item.isGroup ? (
              renderNavItem(item)
            ) : (
              <>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2 ${inactiveClass} transition-colors ${
                    isCollapsed ? "" : "justify-between"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.lucideIcon && <item.lucideIcon className="w-5 h-5 flex-shrink-0" />}
                    {item.brandIcon && <TkBrandIcon icon={item.brandIcon} alt={item.label} size={20} />}
                    {!isCollapsed && <span className="text-sm font-medium text-left">{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        expandedGroups.includes(item.id) ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </button>
                {!isCollapsed && expandedGroups.includes(item.id) && item.children && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <div key={child.id}>{renderNavItem(child, true)}</div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCollapsedChange(!isCollapsed)}
          className="w-full"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}
