/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use client"

import { useState, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react"
import { TkBrandIcon } from "../brand-icons/TkBrandIcon"

interface TkNavItem {
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
  logoIcon?: string
  logoText?: string
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  className?: string
}

/**
 * TkVerticalNav - Collapsible vertical navigation sidebar
 * Thinkube-approved component from thinkube-style
 */
export function TkVerticalNav({
  items,
  activeItem,
  onItemClick,
  logoIcon = "tk_logo",
  logoText = "Thinkube",
  collapsed: controlledCollapsed,
  onCollapsedChange,
  className = "",
}: TkVerticalNavProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])

  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed

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
      toggleGroup(item.id)
    } else {
      if (onItemClick) {
        onItemClick(item.id)
      }
      if (item.onClick) {
        item.onClick()
      }
    }
  }

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-card border-r border-border flex flex-col transition-all duration-300 ${className}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <TkBrandIcon icon={logoIcon} alt={logoText} size={32} />
            <span className="font-semibold">{logoText}</span>
          </div>
        )}
        {isCollapsed && <TkBrandIcon icon={logoIcon} alt={logoText} size={32} className="mx-auto" />}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-2">
        {items.map((item) => (
          <div key={item.id} className="mb-1">
            {!item.isGroup ? (
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeItem === item.id
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {item.lucideIcon && <item.lucideIcon className="w-5 h-5 flex-shrink-0" />}
                {item.brandIcon && <TkBrandIcon icon={item.brandIcon} alt={item.label} size={20} />}
                {!isCollapsed && <span className="text-sm font-medium text-left">{item.label}</span>}
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-primary transition-colors ${
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
                      <button
                        key={child.id}
                        onClick={() => handleItemClick(child)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeItem === child.id
                            ? "bg-primary/10 text-primary border-l-4 border-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-primary"
                        }`}
                      >
                        {child.lucideIcon && <child.lucideIcon className="w-4 h-4 flex-shrink-0" />}
                        {child.brandIcon && <TkBrandIcon icon={child.brandIcon} alt={child.label} size={16} />}
                        <span className="text-sm text-left">{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
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
