"use client";

import { LayoutDashboard, Boxes, Layers, Container, Sliders, Palette, Component, FileText, Bell, Shield, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { TkAppLayout, type TkNavItem } from "thinkube-style";

const navigationItems: TkNavItem[] = [
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
  const pathname = usePathname();
  const router = useRouter();

  const getActiveItem = () => {
    if (pathname === "/") return "overview";
    const path = pathname.replace("/", "");
    // Check children of groups
    for (const item of navigationItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.href === pathname) return child.id;
        }
      }
      if (item.href === pathname) return item.id;
    }
    return path;
  };

  const handleNavClick = (id: string) => {
    // Find the item by id
    for (const item of navigationItems) {
      if (item.id === id && item.href) {
        router.push(item.href);
        return;
      }
      if (item.children) {
        for (const child of item.children) {
          if (child.id === id && child.href) {
            router.push(child.href);
            return;
          }
        }
      }
    }
  };

  return (
    <TkAppLayout
      navigationItems={navigationItems}
      activeItem={getActiveItem()}
      onItemClick={handleNavClick}
      logoText="Thinkube Style"
      topBarTitle="Thinkube Style Guide"
      topBarContent={<ThemeToggle />}
    >
      {children}
    </TkAppLayout>
  );
}
