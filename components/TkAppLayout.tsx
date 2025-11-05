"use client";

import { useState, ReactNode } from "react";
import { TkVerticalNav } from "./navigation/TkVerticalNav";
import { ThemeToggle } from "./theme-toggle";
import { LayoutDashboard, Server, Container, Key, Puzzle, Settings } from "lucide-react";

const defaultNavigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    lucideIcon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: "services",
    label: "Services",
    lucideIcon: Server,
    href: "/services",
  },
  {
    id: "harbor",
    label: "Harbor Images",
    lucideIcon: Container,
    href: "/harbor",
  },
  {
    id: "tokens",
    label: "API Tokens",
    lucideIcon: Key,
    href: "/tokens",
  },
  {
    id: "components",
    label: "Optional Components",
    lucideIcon: Puzzle,
    href: "/components",
  },
  {
    id: "settings",
    label: "Settings",
    lucideIcon: Settings,
    href: "/settings",
  },
];

interface TkAppLayoutProps {
  children: ReactNode;
  navigationItems?: typeof defaultNavigationItems;
  activeItem?: string;
  onItemClick?: (id: string) => void;
  logoIcon?: string;
  logoText?: string;
  topBarTitle?: string;
  topBarContent?: ReactNode;
}

/**
 * TkAppLayout - Application layout with sidebar navigation and top bar
 * Thinkube-approved component from thinkube-style
 */
export function TkAppLayout({
  children,
  navigationItems = defaultNavigationItems,
  activeItem,
  onItemClick,
  logoIcon = "/icons/tk_logo.svg",
  logoText = "Thinkube Control",
  topBarTitle = "Thinkube Control",
  topBarContent,
}: TkAppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Vertical Sidebar */}
      <TkVerticalNav
        items={navigationItems}
        activeItem={activeItem}
        onItemClick={onItemClick}
        logoIcon={logoIcon}
        logoText={logoText}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Horizontal Top Nav */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">{topBarTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {topBarContent}
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
