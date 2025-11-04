/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface TkDropdownMenuItem {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  variant?: "default" | "destructive"
}

interface TkDropdownMenuGroup {
  label?: string
  items: TkDropdownMenuItem[]
}

interface TkDropdownMenuProps {
  trigger: ReactNode
  groups: TkDropdownMenuGroup[]
  width?: string
  className?: string
}

/**
 * TkDropdownMenu - Thinkube dropdown menu with groups and icons
 * Thinkube-approved component from thinkube-style
 */
export function TkDropdownMenu({ trigger, groups, width = "w-56", className = "" }: TkDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={`${width} ${className}`}>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.label && <DropdownMenuLabel>{group.label}</DropdownMenuLabel>}
            <DropdownMenuGroup>
              {group.items.map((item, itemIndex) => (
                <DropdownMenuItem
                  key={itemIndex}
                  onClick={item.onClick}
                  className={item.variant === "destructive" ? "text-destructive" : ""}
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {groupIndex < groups.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
