"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, LayoutDashboard, Component, Shield, Palette, FileText, Bell, Layers, Container, Sliders, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { TkThemeToggle } from "./theme";
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
export function AppLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;
    const [expandedGroups, setExpandedGroups] = useState(["components", "demos"]);
    const toggleGroup = (group) => {
        // If collapsed, expand the sidebar first
        if (collapsed) {
            setCollapsed(false);
            setExpandedGroups(prev => [...prev, group]);
        }
        else {
            setExpandedGroups(prev => prev.includes(group)
                ? prev.filter(g => g !== group)
                : [...prev, group]);
        }
    };
    return (_jsxs("div", { className: "flex h-screen bg-background", children: [_jsxs("aside", { className: `${collapsed ? "w-16" : "w-64"} bg-card border-r border-border flex flex-col transition-all duration-300`, children: [_jsxs("div", { className: "h-16 flex items-center justify-between px-4 border-b border-border", children: [!collapsed && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: "/icons/tk_logo.svg", alt: "Thinkube", className: "w-8 h-8 dark:hidden" }), _jsx("img", { src: "/icons/tk_logo_inverted.svg", alt: "Thinkube", className: "w-8 h-8 hidden dark:block" }), _jsx("span", { className: "font-semibold", children: "Thinkube" })] })), collapsed && (_jsxs(_Fragment, { children: [_jsx("img", { src: "/icons/tk_logo.svg", alt: "Thinkube", className: "w-8 h-8 mx-auto dark:hidden" }), _jsx("img", { src: "/icons/tk_logo_inverted.svg", alt: "Thinkube", className: "w-8 h-8 mx-auto hidden dark:block" })] }))] }), _jsx("nav", { className: "flex-1 overflow-y-auto p-2", children: navigationItems.map((item) => (_jsx("div", { className: "mb-1", children: !item.isGroup ? (_jsxs(Link, { to: item.href || "#", className: `w-full flex items-center gap-3 px-3 py-2 transition-colors ${pathname === item.href
                                    ? "bg-primary/10 text-primary border-l-4"
                                    : "text-muted-foreground hover:bg-hover/25 hover:text-primary"}`, style: pathname === item.href ? { borderLeftColor: '#008899' } : undefined, children: [item.lucideIcon && _jsx(item.lucideIcon, { className: "w-5 h-5 flex-shrink-0" }), !collapsed && _jsx("span", { className: "text-sm font-medium text-left", children: item.label })] })) : (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => toggleGroup(item.id), className: `w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-hover/25 hover:text-primary transition-colors ${collapsed ? "" : "justify-between"}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [item.lucideIcon && _jsx(item.lucideIcon, { className: "w-5 h-5 flex-shrink-0" }), !collapsed && _jsx("span", { className: "text-sm font-medium text-left", children: item.label })] }), !collapsed && (_jsx(ChevronRight, { className: `w-4 h-4 transition-transform ${expandedGroups.includes(item.id) ? "rotate-90" : ""}` }))] }), !collapsed && expandedGroups.includes(item.id) && item.children && (_jsx("div", { className: "ml-8 mt-1 space-y-1", children: item.children.map((child) => (_jsxs(Link, { to: child.href || "#", className: `w-full flex items-center gap-3 px-3 py-2 transition-colors ${pathname === child.href
                                                ? "bg-primary/10 text-primary border-l-4"
                                                : "text-muted-foreground hover:bg-hover/25 hover:text-primary"}`, style: pathname === child.href ? { borderLeftColor: '#008899' } : undefined, children: [child.lucideIcon && _jsx(child.lucideIcon, { className: "w-4 h-4 flex-shrink-0" }), _jsx("span", { className: "text-sm text-left", children: child.label })] }, child.id))) }))] })) }, item.id))) }), _jsx("div", { className: "p-2 border-t border-border", children: _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setCollapsed(!collapsed), className: "w-full", children: [collapsed ? _jsx(ChevronRight, { className: "h-4 w-4" }) : _jsx(ChevronLeft, { className: "h-4 w-4" }), !collapsed && _jsx("span", { className: "ml-2", children: "Collapse" })] }) })] }), _jsxs("main", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsxs("header", { className: "h-16 border-b border-border bg-card flex items-center justify-between px-6", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsx("h1", { className: "text-lg font-semibold", children: "Thinkube Style Guide" }) }), _jsx("div", { className: "flex items-center gap-3", children: _jsx(TkThemeToggle, {}) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: children })] })] }));
}
//# sourceMappingURL=app-layout-router.js.map