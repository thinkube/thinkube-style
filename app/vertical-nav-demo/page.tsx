"use client";

import { useState } from "react";
import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkVerticalNav } from "@/components/navigation/TkVerticalNav";
import type { TkNavItem } from "@/components/navigation/TkVerticalNav";
import { LayoutDashboard, Boxes, Layers, Container, Puzzle, Shield, Sliders, Lock, Key } from "lucide-react";

const demoItems: TkNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    lucideIcon: LayoutDashboard,
  },
  {
    id: "deployment",
    label: "Deployment & Infrastructure",
    lucideIcon: Boxes,
    isGroup: true,
    children: [
      { id: "templates", label: "Templates", lucideIcon: Layers },
      { id: "harbor-images", label: "Harbor Images", lucideIcon: Container },
      { id: "optional-components", label: "Optional Components", lucideIcon: Puzzle },
    ],
  },
  {
    id: "config",
    label: "Configuration & Security",
    lucideIcon: Shield,
    isGroup: true,
    children: [
      { id: "jupyterhub-config", label: "JupyterHub Config", lucideIcon: Sliders },
      { id: "secrets", label: "Secrets", lucideIcon: Lock },
      { id: "api-tokens", label: "API Tokens", lucideIcon: Key },
    ],
  },
];

export default function VerticalNavDemoPage() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TkPageWrapper
      title="Vertical Navigation Demo"
      description="Interactive demo of TkVerticalNav — the same component used by the style guide sidebar"
    >
      <div className="grid lg:grid-cols-[auto_1fr] gap-6">
        <div className="h-[500px] border border-border overflow-hidden">
          <TkVerticalNav
            items={demoItems}
            activeItem={activeItem}
            onItemClick={setActiveItem}
            logoText="Thinkube"
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
          />
        </div>

        <div className="space-y-6">
          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Active: {activeItem}</TkCardTitle>
              <TkCardDescription>Click items in the nav to change active state</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="text-sm text-muted-foreground">
              <p>This demo uses the exact same <code className="text-xs bg-muted px-1 py-0.5">TkVerticalNav</code> component
              that powers this style guide&apos;s sidebar navigation.</p>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Features</TkCardTitle>
            </TkCardHeader>
            <TkCardContent className="space-y-2 text-sm">
              <div>Collapsible sidebar with smooth transitions</div>
              <div>Expandable groups with chevron indicators</div>
              <div>Active state with left border accent</div>
              <div>Brand icon support via CSS mask-image</div>
              <div>Router-agnostic via <code className="text-xs bg-muted px-1 py-0.5">renderLink</code> prop</div>
              <div>Dark mode support built-in</div>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Usage</TkCardTitle>
            </TkCardHeader>
            <TkCardContent>
              <pre className="text-xs bg-muted p-3 overflow-x-auto">
{`<TkVerticalNav
  items={navigationItems}
  activeItem={activeItem}
  onItemClick={setActiveItem}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  renderLink={({ to, className, children }) => (
    <Link to={to} className={className}>{children}</Link>
  )}
/>`}
              </pre>
            </TkCardContent>
          </TkCard>
        </div>
      </div>
    </TkPageWrapper>
  );
}
