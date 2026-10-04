/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useEffect, useState, ReactNode, MouseEvent } from "react";
import { Menu } from "lucide-react";
import { TkVerticalNav } from "./navigation/TkVerticalNav";
import type { TkNavItem } from "./navigation/TkVerticalNav";

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

// Whether a media query matches, following changes of the window size.
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/**
 * The page frame: side navigation, top bar and the scrolling page.
 *
 * The navigation fits the window: from 1024px wide it starts open, from
 * 768px it starts collapsed to icons (either can be toggled), and below
 * 768px it leaves the page and opens over it from the menu button in the
 * top bar, closing when a page is chosen.
 */
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
  const isPhone = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const [collapsed, setCollapsed] = useState(isTablet);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => setCollapsed(isTablet), [isTablet]);
  useEffect(() => {
    if (!isPhone) setDrawerOpen(false);
  }, [isPhone]);

  const nav = (
    <TkVerticalNav
      items={navigationItems}
      activeItem={activeItem}
      onItemClick={(id) => {
        onItemClick?.(id);
        if (isPhone && !navigationItems.some((item) => item.id === id && item.isGroup)) setDrawerOpen(false);
      }}
      renderLink={renderLink}
      logoIcon={logoIcon}
      logoText={logoText}
      collapsed={isPhone ? false : collapsed}
      onCollapsedChange={setCollapsed}
      className={isPhone ? "h-full shadow-xl" : ""}
    />
  );

  // A link chosen in the drawer closes it; group headers are buttons and keep it open.
  const closeOnLink = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) setDrawerOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {!isPhone && nav}

      {isPhone && drawerOpen && (
        <div className="fixed inset-0 z-50 flex" onClickCapture={closeOnLink}>
          {nav}
          <button
            type="button"
            aria-label="Close navigation"
            className="flex-1 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
        </div>
      )}

      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <header className="h-16 shadow-lg bg-background border-b border-border flex items-center justify-between gap-2 px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            {isPhone && (
              <button
                type="button"
                aria-label="Open navigation"
                className="p-2 -ml-2 hover:bg-secondary"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            {topBarLeftContent}
            <h1 className="text-lg md:text-xl font-bold truncate">{topBarTitle}</h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
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
