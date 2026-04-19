"use client";

import { useState } from "react";
import { TkBadge } from "@/components/buttons-badges";
import { TkButton } from "@/components/buttons-badges";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { ChevronLeft, ChevronRight, Key, Lock, LayoutDashboard, Boxes, Layers, Container, Puzzle, Shield, Sliders } from "lucide-react";

export default function VerticalNavDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["deployment", "config"]);

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev =>
      prev.includes(group)
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      lucideIcon: LayoutDashboard,
      href: "/",
    },
    {
      id: "deployment",
      label: "Deployment & Infrastructure",
      lucideIcon: Boxes,
      isGroup: true,
      children: [
        { id: "templates", label: "Templates", lucideIcon: Layers, href: "/templates" },
        { id: "harbor-images", label: "Harbor Images", lucideIcon: Container, href: "/harbor-images" },
        { id: "optional-components", label: "Optional Components", lucideIcon: Puzzle, href: "/optional-components" },
      ],
    },
    {
      id: "config",
      label: "Configuration & Security",
      lucideIcon: Shield,
      isGroup: true,
      children: [
        { id: "jupyterhub-config", label: "JupyterHub Config", lucideIcon: Sliders, href: "/jupyterhub-config" },
        { id: "secrets", label: "Secrets", lucideIcon: Lock, href: "/secrets" },
        { id: "api-tokens", label: "API Tokens", lucideIcon: Key, href: "/tokens" },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Vertical Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-card border-r border-border flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img src="/icons/tk_logo.svg" alt="Thinkube" className="w-8 h-8 dark:hidden" />
              <img src="/icons/tk_logo_inverted.svg" alt="Thinkube" className="w-8 h-8 hidden dark:block" />
              <span className="font-semibold">Thinkube</span>
            </div>
          )}
          {collapsed && (
            <img src="/icons/tk_logo.svg" alt="Thinkube" className="w-8 h-8 mx-auto dark:hidden" />
          )}
          {collapsed && (
            <img src="/icons/tk_logo_inverted.svg" alt="Thinkube" className="w-8 h-8 mx-auto hidden dark:block" />
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-2">
          {navigationItems.map((item) => (
            <div key={item.id} className="mb-1">
              {!item.isGroup ? (
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 transition-colors ${
                    activeItem === item.id
                      ? "bg-primary/10 text-primary border-l-4"
                      : "text-muted-foreground hover:bg-hover/25 hover:text-primary"
                  }`}
                  style={activeItem === item.id ? { borderLeftColor: '#008899' } : undefined}
                >
                  {item.lucideIcon && <item.lucideIcon className="w-5 h-5 flex-shrink-0" />}
                  {!collapsed && <span className="text-sm font-medium text-left">{item.label}</span>}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => toggleGroup(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-hover/25 hover:text-primary transition-colors ${
                      collapsed ? "" : "justify-between"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.lucideIcon && <item.lucideIcon className="w-5 h-5 flex-shrink-0" />}
                      {!collapsed && <span className="text-sm font-medium text-left">{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          expandedGroups.includes(item.id) ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </button>
                  {!collapsed && expandedGroups.includes(item.id) && item.children && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => setActiveItem(child.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 transition-colors ${
                            activeItem === child.id
                              ? "bg-primary/10 text-primary border-l-4"
                              : "text-muted-foreground hover:bg-hover/25 hover:text-primary"
                          }`}
                          style={activeItem === child.id ? { borderLeftColor: '#008899' } : undefined}
                        >
                          {child.lucideIcon && <child.lucideIcon className="w-4 h-4 flex-shrink-0" />}
                          <span className="text-sm text-left">{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-border">
          <TkButton
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span className="ml-2">Collapse</span>}
          </TkButton>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Horizontal Top Nav */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Thinkube Control</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Cluster:</span>
              <TkBadge variant="outline">production-01</TkBadge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TkButton variant="ghost" size="sm">Notifications</TkButton>
            <TkButton variant="ghost" size="sm">Settings</TkButton>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                JD
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Vertical Navigation Demo</h1>
              <p className="text-muted-foreground">
                This shows how the vertical sidebar and horizontal top bar work together
              </p>
            </div>

          <div className="grid md:grid-cols-2 gap-6">
            <TkCard>
              <TkCardHeader>
                <TkCardTitle>Features</TkCardTitle>
                <TkCardDescription>What this navigation provides</TkCardDescription>
              </TkCardHeader>
              <TkCardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <TkBadge>✓</TkBadge>
                  <span className="text-sm">Collapsible sidebar for more workspace</span>
                </div>
                <div className="flex items-start gap-2">
                  <TkBadge>✓</TkBadge>
                  <span className="text-sm">Icon-first design with your brand icons</span>
                </div>
                <div className="flex items-start gap-2">
                  <TkBadge>✓</TkBadge>
                  <span className="text-sm">Expandable groups for organization</span>
                </div>
                <div className="flex items-start gap-2">
                  <TkBadge>✓</TkBadge>
                  <span className="text-sm">Active state highlighting</span>
                </div>
                <div className="flex items-start gap-2">
                  <TkBadge>✓</TkBadge>
                  <span className="text-sm">Dark mode support built-in</span>
                </div>
              </TkCardContent>
            </TkCard>

            <TkCard>
              <TkCardHeader>
                <TkCardTitle>Structure</TkCardTitle>
                <TkCardDescription>Matches your current navigation</TkCardDescription>
              </TkCardHeader>
              <TkCardContent className="space-y-2 text-sm">
                <div><strong>Dashboard</strong> - Main overview</div>
                <div><strong>Deployment & Infrastructure</strong></div>
                <ul className="ml-4 space-y-1 text-muted-foreground">
                  <li>• Templates</li>
                  <li>• Harbor Images</li>
                  <li>• Optional Components</li>
                </ul>
                <div><strong>Configuration & Security</strong></div>
                <ul className="ml-4 space-y-1 text-muted-foreground">
                  <li>• JupyterHub Config</li>
                  <li>• Secrets</li>
                  <li>• API Tokens</li>
                </ul>
              </TkCardContent>
            </TkCard>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
