"use client";

import { useState, ReactNode } from "react";
import { TkVerticalNav } from "./navigation/TkVerticalNav";
import type { TkNavItem } from "./navigation/TkVerticalNav";
import { LucideIcon } from "lucide-react";

interface TkAppLayoutProps {
  children: ReactNode;
  navigationItems: TkNavItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  renderLink?: (props: { to: string; className: string; children: ReactNode }) => ReactNode;
  logoIcon?: string;
  logoText?: string;
  topBarTitle?: string;
  topBarLeftContent?: ReactNode;
  topBarContent?: ReactNode;
}

export function TkAppLayout({
  children,
  navigationItems,
  activeItem,
  onItemClick,
  renderLink,
  logoIcon = "tk_logo",
  logoText = "Thinkube",
  topBarTitle = "Thinkube",
  topBarLeftContent,
  topBarContent,
}: TkAppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <TkVerticalNav
        items={navigationItems}
        activeItem={activeItem}
        onItemClick={onItemClick}
        renderLink={renderLink}
        logoIcon={logoIcon}
        logoText={logoText}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {topBarLeftContent}
            <h1 className="text-lg font-semibold">{topBarTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            {topBarContent}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export type { TkNavItem, TkAppLayoutProps };
