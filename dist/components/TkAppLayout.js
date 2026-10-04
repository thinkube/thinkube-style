"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TkVerticalNav } from "./navigation/TkVerticalNav";
/**
 * TkAppLayout - Application layout with sidebar navigation and top bar
 * Thinkube-approved component from thinkube-style
 */
export function TkAppLayout({ children, navigationItems, activeItem, onItemClick, logoIcon = "tk_logo", logoText = "Thinkube", topBarTitle = "Thinkube", topBarLeftContent, topBarContent, }) {
    const [collapsed, setCollapsed] = useState(false);
    return (_jsxs("div", { className: "flex h-screen bg-background", children: [_jsx(TkVerticalNav, { items: navigationItems, activeItem: activeItem, onItemClick: onItemClick, logoIcon: logoIcon, logoText: logoText, collapsed: collapsed, onCollapsedChange: setCollapsed }), _jsxs("main", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsxs("header", { className: "h-16 border-b border-border bg-card flex items-center justify-between px-6", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsx("h1", { className: "text-lg font-semibold", children: topBarTitle }) }), _jsxs("div", { className: "flex items-center gap-3", children: [topBarLeftContent, topBarContent] })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: children })] })] }));
}
//# sourceMappingURL=TkAppLayout.js.map