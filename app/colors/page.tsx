"use client";

import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardHeader, TkCardTitle } from "@/components/cards-data";

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
            <p className="text-sm text-destructive mt-1">Error message — destructive</p>
            <p className="text-sm text-success mt-1">Success message — success</p>
            <p className="text-sm text-warning mt-1">Warning message — warning</p>
            <p className="text-sm text-info mt-1">Info message — info</p>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Combined view: all tokens side by side */}
      <TkCard>
        <TkCardHeader>
          <TkCardTitle>All Tokens</TkCardTitle>
        </TkCardHeader>
        <TkCardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {[
              { label: "background", v: "--background" },
              { label: "foreground", v: "--foreground" },
              { label: "card", v: "--card" },
              { label: "card-fg", v: "--card-foreground" },
              { label: "popover", v: "--popover" },
              { label: "popover-fg", v: "--popover-foreground" },
              { label: "primary", v: "--primary" },
              { label: "primary-fg", v: "--primary-foreground" },
              { label: "secondary", v: "--secondary" },
              { label: "secondary-fg", v: "--secondary-foreground" },
              { label: "muted", v: "--muted" },
              { label: "muted-fg", v: "--muted-foreground" },
              { label: "accent", v: "--accent" },
              { label: "accent-fg", v: "--accent-foreground" },
              { label: "destructive", v: "--destructive" },
              { label: "destructive-fg", v: "--destructive-foreground" },
              { label: "border", v: "--border" },
              { label: "input", v: "--input" },
              { label: "ring", v: "--ring" },
              { label: "success", v: "--success" },
              { label: "success-fg", v: "--success-foreground" },
              { label: "warning", v: "--warning" },
              { label: "warning-fg", v: "--warning-foreground" },
              { label: "info", v: "--info" },
              { label: "info-fg", v: "--info-foreground" },
            ].map((token) => (
              <div key={token.v} className="flex flex-col gap-1">
                <div
                  className="h-12 w-full border border-border"
                  style={{ backgroundColor: `var(${token.v})` }}
                />
                <span className="text-[10px] font-medium truncate">{token.label}</span>
              </div>
            ))}
          </div>
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
