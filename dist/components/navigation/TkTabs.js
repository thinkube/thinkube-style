/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
/**
 * TkTabs - Thinkube tab navigation with optional icons
 * Thinkube-approved component from thinkube-style
 */
export function TkTabs({ tabs, defaultValue, className = "" }) {
    const initialValue = defaultValue || (tabs.length > 0 ? tabs[0].value : "");
    return (_jsxs(Tabs, { defaultValue: initialValue, className: `w-full ${className}`, children: [_jsx(TabsList, { children: tabs.map((tab) => (_jsxs(TabsTrigger, { value: tab.value, children: [tab.icon && _jsx(tab.icon, { className: "h-4 w-4 mr-2" }), tab.label] }, tab.value))) }), tabs.map((tab) => (_jsx(TabsContent, { value: tab.value, className: "mt-4", children: tab.content }, tab.value)))] }));
}
// Export Tabs primitives with Tk prefix
export { Tabs as TkTabsRoot } from "../../components/ui/tabs";
export { TabsContent as TkTabsContent } from "../../components/ui/tabs";
export { TabsList as TkTabsList } from "../../components/ui/tabs";
export { TabsTrigger as TkTabsTrigger } from "../../components/ui/tabs";
//# sourceMappingURL=TkTabs.js.map