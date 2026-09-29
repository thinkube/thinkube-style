/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";

// Palette tokens have their own sections; fonts and the radius are not colours.
const SKIP = /^--(font-|radius$|tk-|chart-|seq-|div-)/;
const ALIAS = /^var\((--[\w-]+)\)$/;

type Colour = { token: string; value: string; roles: string[] };

// Reads the colour tokens that styles.css declares on :root and .dark, as
// written in the stylesheet, and groups every role under the colour it
// points to. Stylesheets from other origins (fonts) cannot be read and hold
// no tokens.
function readColours(dark: boolean): Colour[] {
  const root: Record<string, string> = {};
  const darkDecl: Record<string, string> = {};
  const walk = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule && (rule.selectorText === ":root" || rule.selectorText === ".dark")) {
        const target = rule.selectorText === ":root" ? root : darkDecl;
        for (const name of Array.from(rule.style)) {
          if (name.startsWith("--") && !SKIP.test(name)) target[name] = rule.style.getPropertyValue(name).trim();
        }
      } else if ("cssRules" in rule) {
        walk((rule as CSSGroupingRule).cssRules);
      }
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    walk(rules);
  }

  const decl = dark ? { ...root, ...darkDecl } : root;
  const base = (name: string): string => {
    const m = decl[name]?.match(ALIAS);
    return m && decl[m[1]] !== undefined ? base(m[1]) : name;
  };
  const colours = new Map<string, Colour>();
  for (const name of Object.keys(decl)) {
    const b = base(name);
    if (!colours.has(b)) colours.set(b, { token: b, value: decl[b], roles: [] });
    if (b !== name) colours.get(b)!.roles.push(name);
  }
  return [...colours.values()];
}

export function TokenMap() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [colours, setColours] = useState<Colour[]>([]);

  useEffect(() => {
    const observer = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => setColours(readColours(dark)), [dark]);

  return (
    <TkCard className="mb-8">
      <TkCardHeader>
        <TkCardTitle>Colours and Roles</TkCardTitle>
        <TkCardDescription>
          Components ask for a role, such as --card or --ring, never for a colour. The theme decides the
          colour of each role, and several roles share one colour. Each colour below is written once in
          styles.css; the roles under it point to it. This list is read from the stylesheet ({dark ? "dark" : "light"} theme).
        </TkCardDescription>
      </TkCardHeader>
      <TkCardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colours.map((c) => (
            <div key={c.token} className="flex gap-3 items-start">
              <div className="h-12 w-12 shrink-0 border border-border" style={{ backgroundColor: `var(${c.token})` }} />
              <div className="min-w-0">
                <code className="text-xs font-mono font-semibold">{c.token}</code>
                <div className="text-[10px] text-muted-foreground font-mono truncate">{c.value}</div>
                {c.roles.length > 0 && (
                  <div className="text-[11px] mt-1 break-words">{c.roles.join(", ")}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </TkCardContent>
    </TkCard>
  );
}
