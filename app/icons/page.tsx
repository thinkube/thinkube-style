/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState } from "react";
import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkBrandIcon } from "@/components/brand-icons";
import { TkInput } from "@/components/forms-inputs";
import { logoIcons, serviceIcons, lucideIcons, charIcons } from "@/lib/brand-icons";

const GROUPS: { title: string; description: string; names: readonly string[]; size: number }[] = [
  { title: "Logos", description: "Drawn by brand/build_logo.py.", names: logoIcons, size: 72 },
  { title: "Service icons", description: "Thinkube symbols in the hexagon, drawn in brand/icons.mjs.", names: serviceIcons, size: 40 },
  {
    title: "Lucide icons",
    description: "Lucide icons in the hexagon. Add one with node brand/add_lucide.mjs <name> && node brand/build_icons.mjs.",
    names: lucideIcons,
    size: 40,
  },
  { title: "Characters", description: "Digits and letters in the hexagon, from brand/chars.json.", names: charIcons, size: 32 },
];

export default function IconsPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  return (
    <TkPageWrapper
      title="Icons"
      description="Every icon in public/icons, listed from lib/brand-icons.ts. Use the name shown under an icon: <TkBrandIcon icon=&quot;lucide/server&quot; alt=&quot;Servers&quot; />"
    >
      <div className="mb-6 max-w-sm">
        <TkInput placeholder="Search icons" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {GROUPS.map((group) => {
        const names = group.names.filter((n) => n.toLowerCase().includes(q));
        if (names.length === 0) return null;
        return (
          <TkCard key={group.title} className="mb-8">
            <TkCardHeader>
              <TkCardTitle>
                {group.title} ({names.length})
              </TkCardTitle>
              <TkCardDescription>{group.description}</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-3">
                {names.map((name) => (
                  <div key={name} className="flex flex-col items-center gap-2 p-3 border border-border min-w-0">
                    <TkBrandIcon icon={name} alt={name} size={group.size} />
                    <code className="text-[10px] font-mono text-muted-foreground text-center break-all">{name}</code>
                  </div>
                ))}
              </div>
            </TkCardContent>
          </TkCard>
        );
      })}
    </TkPageWrapper>
  );
}
