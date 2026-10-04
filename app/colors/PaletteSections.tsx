/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { teal, sand, tide, dusk, chart, chartVars, seqScales, divScales } from "@/lib/palette";

function Strip({ label, colors, names }: { label: string; colors: readonly string[]; names: readonly string[] }) {
  return (
    <div className="mb-6">
      <div className="text-sm font-medium mb-2">{label}</div>
      <div className="grid grid-cols-11 gap-1">
        {colors.map((c, i) => (
          <div key={names[i]} className="flex flex-col gap-1 min-w-0">
            <div className="h-12 w-full border border-border" style={{ backgroundColor: c }} />
            <span className="text-[10px] font-medium truncate">{names[i]}</span>
            <code className="text-[10px] text-muted-foreground font-mono truncate">{c}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoleBar({ label, vars, note }: { label: string; vars: readonly string[]; note: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{note}</span>
      </div>
      <div className="flex gap-[2px] h-10">
        {vars.map((v) => (
          <div key={v} className="flex-1" style={{ backgroundColor: v }} title={v} />
        ))}
      </div>
      <div className="flex gap-[2px] mt-1">
        {vars.map((v) => (
          <code key={v} className="flex-1 text-[10px] text-muted-foreground font-mono text-center truncate">
            {v.startsWith("var(--") ? v.slice(6, -1) : v}
          </code>
        ))}
      </div>
    </div>
  );
}

export function PaletteSections() {
  const steps = Object.keys(teal);
  return (
    <>
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Brand Families</TkCardTitle>
          <TkCardDescription>
            Tints and shades of the logo teal and the icon cream, the same in both themes:
            --tk-teal-50 … --tk-teal-950 and --tk-sand-50 … --tk-sand-950.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <Strip label="Teal" colors={Object.values(teal)} names={steps} />
          <Strip label="Sand (cream to brown)" colors={Object.values(sand)} names={steps} />
        </TkCardContent>
      </TkCard>

      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Gradients</TkCardTitle>
          <TkCardDescription>
            From the logo teal through neighbouring hues: --tk-tide-1 … 7 and --tk-dusk-1 … 7.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <RoleBar label="Tide — teal, green, yellow" vars={tide} note="--tk-tide-1 … 7" />
          <RoleBar label="Dusk — teal, blue, violet, pink" vars={dusk} note="--tk-dusk-1 … 7" />
        </TkCardContent>
      </TkCard>

      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Chart Roles</TkCardTitle>
          <TkCardDescription>
            These follow the theme — toggle it to compare. Series colours keep their fixed order.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <RoleBar label="Series" vars={chartVars} note={chart.map((s) => s.name).join(" · ")} />
        </TkCardContent>
      </TkCard>

      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Sequential Scales</TkCardTitle>
          <TkCardDescription>
            Amounts, low to high: --seq-&lt;name&gt;-1 … 7. The first is the default, also written as
            --seq-1 … 7. Low is light on a light page and dark on a dark page.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          {Object.entries(seqScales).map(([name, vars], i) => (
            <RoleBar key={name} label={i === 0 ? `${name} (default)` : name} vars={vars} note="low → high" />
          ))}
        </TkCardContent>
      </TkCard>

      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Diverging Scales</TkCardTitle>
          <TkCardDescription>
            Two sides of a baseline with a grey middle: --div-&lt;name&gt;-1 … 7. The first is the
            default, also written as --div-1 … 7.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          {Object.entries(divScales).map(([name, vars], i) => (
            <RoleBar key={name} label={i === 0 ? `${name} (default)` : name} vars={vars} note="below ← baseline → above" />
          ))}
        </TkCardContent>
      </TkCard>
    </>
  );
}
