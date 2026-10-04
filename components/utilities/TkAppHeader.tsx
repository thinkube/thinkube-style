/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use client"

import { ReactNode } from "react"
import { TkThemeToggle } from "../theme"

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
            <div
              role="img"
              aria-label={logoAlt}
              className="h-8 w-8 text-[#006680] dark:text-[#ede4d6]"
              style={{
                backgroundColor: "currentColor",
                maskImage: `url(${logo})`,
                WebkitMaskImage: `url(${logo})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
            <h1 className="text-xl font-bold">{title}</h1>
          </div>

          <div className="flex-1 flex justify-center">
            {children}
          </div>

          <div>
            <TkThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
