/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TkBrandIcon } from "../brand-icons/TkBrandIcon";
/**
 * TkVerticalNav - Collapsible vertical navigation sidebar
 * Thinkube-approved component from thinkube-style
 */
export function TkVerticalNav({ items, activeItem, onItemClick, logoIcon = "tk_logo", logoText = "Thinkube", collapsed: controlledCollapsed, onCollapsedChange, className = "", }) {
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
    // Initialize expanded groups: all groups expanded by default,
    // and always ensure the group containing the active item is expanded
    const [expandedGroups, setExpandedGroups] = useState(() => {
        return items.filter((item) => item.isGroup).map((item) => item.id);
    });
    // Auto-expand the group containing the active item when activeItem changes
    useEffect(() => {
        if (!activeItem)
            return;
        for (const item of items) {
            if (item.isGroup && item.children) {
                const hasActiveChild = item.children.some((child) => child.id === activeItem);
                if (hasActiveChild && !expandedGroups.includes(item.id)) {
                    setExpandedGroups((prev) => [...prev, item.id]);
                }
            }
        }
    }, [activeItem, items]);
    const handleCollapsedChange = (newCollapsed) => {
        if (onCollapsedChange) {
            onCollapsedChange(newCollapsed);
        }
        else {
            setInternalCollapsed(newCollapsed);
        }
    };
    const toggleGroup = (groupId) => {
        setExpandedGroups((prev) => prev.includes(groupId) ? prev.filter((g) => g !== groupId) : [...prev, groupId]);
    };
    const handleItemClick = (item) => {
        if (item.isGroup) {
            // If collapsed, expand the sidebar and open the group
            if (isCollapsed) {
                handleCollapsedChange(false);
                setExpandedGroups((prev) => prev.includes(item.id) ? prev : [...prev, item.id]);
            }
            else {
                toggleGroup(item.id);
            }
        }
        else {
            if (onItemClick) {
                onItemClick(item.id);
            }
            if (item.onClick) {
                item.onClick();
            }
        }
    };
    return (_jsxs("aside", { className: `${isCollapsed ? "w-16" : "w-64"} bg-card border-r border-border flex flex-col transition-all duration-300 ${className}`, children: [_jsxs("div", { className: "h-16 flex items-center justify-between px-4 border-b border-border", children: [!isCollapsed && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TkBrandIcon, { icon: logoIcon, alt: logoText, size: 32 }), _jsx("span", { className: "font-semibold", children: logoText })] })), isCollapsed && _jsx(TkBrandIcon, { icon: logoIcon, alt: logoText, size: 32, className: "mx-auto" })] }), _jsx("nav", { className: "flex-1 overflow-y-auto p-2", children: items.map((item) => (_jsx("div", { className: "mb-1", children: !item.isGroup ? (_jsxs("button", { onClick: () => handleItemClick(item), className: `w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${activeItem === item.id
                            ? "bg-primary/10 text-primary border-l-4 border-l-[#008899]"
                            : "text-muted-foreground hover:bg-muted hover:text-primary"}`, children: [item.lucideIcon && _jsx(item.lucideIcon, { className: "w-5 h-5 flex-shrink-0" }), item.brandIcon && _jsx(TkBrandIcon, { icon: item.brandIcon, alt: item.label, size: 20 }), !isCollapsed && _jsx("span", { className: "text-sm font-medium text-left", children: item.label })] })) : (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => handleItemClick(item), className: `w-full flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-primary transition-colors ${isCollapsed ? "" : "justify-between"}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [item.lucideIcon && _jsx(item.lucideIcon, { className: "w-5 h-5 flex-shrink-0" }), item.brandIcon && _jsx(TkBrandIcon, { icon: item.brandIcon, alt: item.label, size: 20 }), !isCollapsed && _jsx("span", { className: "text-sm font-medium text-left", children: item.label })] }), !isCollapsed && (_jsx(ChevronRight, { className: `w-4 h-4 transition-transform ${expandedGroups.includes(item.id) ? "rotate-90" : ""}` }))] }), !isCollapsed && expandedGroups.includes(item.id) && item.children && (_jsx("div", { className: "ml-8 mt-1 space-y-1", children: item.children.map((child) => (_jsxs("button", { onClick: () => handleItemClick(child), className: `w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${activeItem === child.id
                                        ? "bg-primary/10 text-primary border-l-4 border-l-[#008899]"
                                        : "text-muted-foreground hover:bg-muted hover:text-primary"}`, children: [child.lucideIcon && _jsx(child.lucideIcon, { className: "w-4 h-4 flex-shrink-0" }), child.brandIcon && _jsx(TkBrandIcon, { icon: child.brandIcon, alt: child.label, size: 16 }), _jsx("span", { className: "text-sm text-left", children: child.label })] }, child.id))) }))] })) }, item.id))) }), _jsx("div", { className: "p-2 border-t border-border", children: _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleCollapsedChange(!isCollapsed), className: "w-full", children: isCollapsed ? (_jsx(ChevronRight, { className: "h-4 w-4" })) : (_jsxs(_Fragment, { children: [_jsx(ChevronLeft, { className: "h-4 w-4" }), _jsx("span", { className: "ml-2", children: "Collapse" })] })) }) })] }));
}
//# sourceMappingURL=TkVerticalNav.js.map