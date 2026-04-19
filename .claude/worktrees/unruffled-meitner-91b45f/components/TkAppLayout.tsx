"use client";

import { useState, ReactNode } from "react";
import { TkVerticalNav } from "./navigation/TkVerticalNav";
import { LucideIcon } from "lucide-react";

export interface TkNavItem {
  id: string;
  label: string;
  lucideIcon?: LucideIcon;
  brandIcon?: string;
  href?: string;
  isGroup?: boolean;
  children?: TkNavItem[];
}

interface TkAppLayoutProps {
  children: ReactNode;
  navigationItems: TkNavItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  logoIcon?: string;
  logoText?: string;
  topBarTitle?: string;
  topBarLeftContent?: ReactNode;
  topBarContent?: ReactNode;
}

/**
 * TkAppLayout - Application layout with sidebar navigation and top bar
 * Thinkube-approved component from thinkube-style
 */
export function TkAppLayout({
  children,
  navigationItems,
  activeItem,
  onItemClick,
  logoIcon = "tk_logo",
  logoText = "Thinkube",
  topBarTitle = "Thinkube",
  topBarLeftContent,
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
            {topBarLeftContent}
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
