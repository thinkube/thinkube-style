/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { ThemeToggle } from "../theme-toggle"

export interface TkAppHeaderProps {
  title?: string
  logo?: string
  logoAlt?: string
  children?: ReactNode
}

export function TkAppHeader({
  title = "Thinkube",
  logo = "/logo.svg",
  logoAlt = "Thinkube",
  children
}: TkAppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 shadow-lg bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Image
              src={logo}
              alt={logoAlt}
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold">{title}</h1>
          </div>

          <div className="flex-1 flex justify-center">
            {children}
          </div>

          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
