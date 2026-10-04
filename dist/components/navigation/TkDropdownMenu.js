import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../components/ui/dropdown-menu";
/**
 * TkDropdownMenu - Thinkube dropdown menu with groups and icons
 * Thinkube-approved component from thinkube-style
 */
export function TkDropdownMenu({ trigger, groups, width = "w-56", className = "" }) {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: trigger }), _jsx(DropdownMenuContent, { className: `${width} ${className}`, children: groups.map((group, groupIndex) => (_jsxs("div", { children: [group.label && _jsx(DropdownMenuLabel, { children: group.label }), _jsx(DropdownMenuGroup, { children: group.items.map((item, itemIndex) => (_jsxs(DropdownMenuItem, { onClick: item.onClick, className: item.variant === "destructive" ? "text-destructive" : "", children: [item.icon && _jsx(item.icon, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: item.label })] }, itemIndex))) }), groupIndex < groups.length - 1 && _jsx(DropdownMenuSeparator, {})] }, groupIndex))) })] }));
}
// Export DropdownMenu primitives with Tk prefix
export { DropdownMenu as TkDropdownMenuRoot } from "../../components/ui/dropdown-menu";
export { DropdownMenuContent as TkDropdownMenuContent } from "../../components/ui/dropdown-menu";
export { DropdownMenuGroup as TkDropdownMenuGroup } from "../../components/ui/dropdown-menu";
export { DropdownMenuItem as TkDropdownMenuItem } from "../../components/ui/dropdown-menu";
export { DropdownMenuLabel as TkDropdownMenuLabel } from "../../components/ui/dropdown-menu";
export { DropdownMenuSeparator as TkDropdownMenuSeparator } from "../../components/ui/dropdown-menu";
export { DropdownMenuTrigger as TkDropdownMenuTrigger } from "../../components/ui/dropdown-menu";
//# sourceMappingURL=TkDropdownMenu.js.map