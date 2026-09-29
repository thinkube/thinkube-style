/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkBrandIcon } from "@/components/brand-icons";
import { PaletteSections } from "./PaletteSections";
import { TokenMap } from "./TokenMap";

interface ColorSwatchProps {
  label: string;
  variable: string;
  fgVariable?: string;
  className?: string;
}

function ColorSwatch({ label, variable, fgVariable, className }: ColorSwatchProps) {
  return (
    <div className={`flex flex-col gap-1 ${className || ""}`}>
      <div
        className="h-20 w-full border border-border flex items-end p-2"
        style={{ backgroundColor: `var(${variable})` }}
      >
        {fgVariable && (
          <span
            className="text-xs font-medium"
            style={{ color: `var(${fgVariable})` }}
          >
            Foreground
          </span>
        )}
      </div>
      <span className="text-xs font-medium">{label}</span>
      <code className="text-[10px] text-muted-foreground font-mono">{variable}</code>
    </div>
  );
}

function ColorPair({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-20 w-full border border-border flex items-center justify-center"
        style={{ backgroundColor: `var(${bg})`, color: `var(${fg})` }}
      >
        <span className="text-sm font-medium">Aa</span>
      </div>
      <span className="text-xs font-medium">{label}</span>
      <code className="text-[10px] text-muted-foreground font-mono">{bg}</code>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <TkPageWrapper
      title="Color Palette"
      description="All design tokens with live light/dark mode preview — toggle the theme to compare"
    >
      {/* Core surfaces */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Surfaces</TkCardTitle>
        </TkCardHeader>
        <TkCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <ColorPair label="Background" bg="--background" fg="--foreground" />
            <ColorPair label="Card" bg="--card" fg="--card-foreground" />
            <ColorPair label="Popover" bg="--popover" fg="--popover-foreground" />
            <ColorPair label="Muted" bg="--muted" fg="--muted-foreground" />
            <ColorPair label="Secondary" bg="--secondary" fg="--secondary-foreground" />
            <ColorSwatch label="Border" variable="--border" />
            <ColorSwatch label="Input" variable="--input" />
            <ColorSwatch label="Ring" variable="--ring" />
          </div>
        </TkCardContent>
      </TkCard>

      {/* Brand colors */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Brand</TkCardTitle>
        </TkCardHeader>
        <TkCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <ColorPair label="Primary" bg="--primary" fg="--primary-foreground" />
            <ColorPair label="Accent" bg="--accent" fg="--accent-foreground" />
          </div>
        </TkCardContent>
      </TkCard>

      {/* Semantic colors */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Semantic</TkCardTitle>
        </TkCardHeader>
        <TkCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <ColorPair label="Success" bg="--success" fg="--success-foreground" />
            <ColorPair label="Warning" bg="--warning" fg="--warning-foreground" />
            <ColorPair label="Destructive" bg="--destructive" fg="--destructive-foreground" />
            <ColorPair label="Info" bg="--info" fg="--info-foreground" />
          </div>
        </TkCardContent>
      </TkCard>

      <PaletteSections />

      {/* Typography colors in context */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Typography in Context</TkCardTitle>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground">Heading — foreground</h3>
            <p className="text-sm text-muted-foreground mt-1">Body text — muted-foreground</p>
            <p className="text-sm text-primary mt-1">Link or accent — primary</p>
            <p className="text-sm mt-1 border-l-4 border-destructive bg-destructive/10 pl-2">Error message — destructive</p>
            <p className="text-sm mt-1 border-l-4 border-success bg-success/10 pl-2">Success message — success</p>
            <p className="text-sm mt-1 border-l-4 border-warning bg-warning/25 pl-2">Warning message — warning</p>
            <p className="text-sm mt-1 border-l-4 border-info bg-info/10 pl-2">Info message — info</p>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Icon color options — switch to dark mode to compare */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Dark Mode Icon Color Options</TkCardTitle>
          <TkCardDescription>
            Switch to dark mode to compare these options. The icons use the logo teal in light mode and Soft Parchment (#ede4d6) in dark mode.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          {(() => {
            const icons = ["tk_logo", "tk_ai", "tk_dashboard", "tk_code", "tk_data", "tk_devops"];
            const options = [
              { label: "Current (teal / Soft Parchment)", color: undefined, hex: "#006680 / #ede4d6" },
              { label: "Warm Cream", color: "#f2ebe0", hex: "#f2ebe0" },
              { label: "Soft Parchment", color: "#ede4d6", hex: "#ede4d6" },
              { label: "Light Sand", color: "#f5efe6", hex: "#f5efe6" },
            ];
            return (
              <div className="space-y-6">
                {options.map((opt) => (
                  <div key={opt.hex}>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-5 h-5 border border-border"
                        style={{ backgroundColor: opt.color || "var(--foreground)" }}
                      />
                      <span className="text-sm font-semibold">{opt.label}</span>
                      <code className="text-xs text-muted-foreground font-mono">{opt.hex}</code>
                    </div>
                    <div className="flex gap-6">
                      {icons.map((icon) => (
                        <div key={icon} className="flex flex-col items-center gap-2">
                          <TkBrandIcon icon={icon} alt={icon} size={40} color={opt.color} />
                          <span className="text-[10px] text-muted-foreground">
                            {icon.replace("tk_", "")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </TkCardContent>
      </TkCard>

      <TokenMap />
    </TkPageWrapper>
  );
}
