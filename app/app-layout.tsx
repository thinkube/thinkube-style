"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Key, Lock, LayoutDashboard, Boxes, Layers, Container, Puzzle, Shield, Sliders, Palette, Component, FileText, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    lucideIcon: LayoutDashboard,
    href: "/",
  },
  {
    id: "components",
    label: "Components",
    lucideIcon: Component,
    isGroup: true,
    children: [
      { id: "buttons-badges", label: "Buttons & Badges", lucideIcon: Palette, href: "/buttons-badges" },
      { id: "forms-inputs", label: "Forms & Inputs", lucideIcon: FileText, href: "/forms-inputs" },
      { id: "cards-data", label: "Cards & Data", lucideIcon: Layers, href: "/cards-data" },
      { id: "navigation", label: "Navigation", lucideIcon: Sliders, href: "/navigation" },
      { id: "feedback", label: "Feedback", lucideIcon: Bell, href: "/feedback" },
      { id: "modals-overlays", label: "Modals & Overlays", lucideIcon: Container, href: "/modals-overlays" },
    ],
  },
  {
    id: "demos",
    label: "Demos",
    lucideIcon: Shield,
    isGroup: true,
    children: [
      { id: "brand-icons", label: "Brand Icons", lucideIcon: Palette, href: "/brand-icons" },
      { id: "service-card-demo", label: "Service Cards", lucideIcon: Layers, href: "/service-card-demo" },
      { id: "vertical-nav-demo", label: "Vertical Nav", lucideIcon: Sliders, href: "/vertical-nav-demo" },
      { id: "installation-progress", label: "Installation Progress", lucideIcon: Settings, href: "/installation-progress-demo" },
    ],
  },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["components", "demos"]);

  const toggleGroup = (group: string) => {
    // If collapsed, expand the sidebar first
    if (collapsed) {
      setCollapsed(false);
      setExpandedGroups(prev => [...prev, group]);
    } else {
      setExpandedGroups(prev =>
        prev.includes(group)
          ? prev.filter(g => g !== group)
          : [...prev, group]
      );
    }
  };

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
            <>
              <img src="/icons/tk_logo.svg" alt="Thinkube" className="w-8 h-8 mx-auto dark:hidden" />
              <img src="/icons/tk_logo_inverted.svg" alt="Thinkube" className="w-8 h-8 mx-auto hidden dark:block" />
            </>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-2">
          {navigationItems.map((item) => (
            <div key={item.id} className="mb-1">
              {!item.isGroup ? (
                <Link
                  href={item.href || "#"}
                  className={`w-full flex items-center gap-3 px-3 py-2 transition-colors ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary border-l-4"
                      : "text-muted-foreground hover:bg-hover/25 hover:text-primary"
                  }`}
                  style={pathname === item.href ? { borderLeftColor: '#008899' } : undefined}
                >
                  {item.lucideIcon && <item.lucideIcon className="w-5 h-5 flex-shrink-0" />}
                  {!collapsed && <span className="text-sm font-medium text-left">{item.label}</span>}
                </Link>
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
                        <Link
                          key={child.id}
                          href={child.href || "#"}
                          className={`w-full flex items-center gap-3 px-3 py-2 transition-colors ${
                            pathname === child.href
                              ? "bg-primary/10 text-primary border-l-4"
                              : "text-muted-foreground hover:bg-hover/25 hover:text-primary"
                          }`}
                          style={pathname === child.href ? { borderLeftColor: '#008899' } : undefined}
                        >
                          {child.lucideIcon && <child.lucideIcon className="w-4 h-4 flex-shrink-0" />}
                          <span className="text-sm text-left">{child.label}</span>
                        </Link>
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Horizontal Top Nav */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Thinkube Style Guide</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
