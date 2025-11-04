/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface TkTabItem {
  value: string
  label: string
  icon?: LucideIcon
  content: ReactNode
}

interface TkTabsProps {
  tabs: TkTabItem[]
  defaultValue?: string
  className?: string
}

/**
 * TkTabs - Thinkube tab navigation with optional icons
 * Thinkube-approved component from thinkube-style
 */
export function TkTabs({ tabs, defaultValue, className = "" }: TkTabsProps) {
  const initialValue = defaultValue || (tabs.length > 0 ? tabs[0].value : "")

  return (
    <Tabs defaultValue={initialValue} className={`w-full ${className}`}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.icon && <tab.icon className="h-4 w-4 mr-2" />}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
