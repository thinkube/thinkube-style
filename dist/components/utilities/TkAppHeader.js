/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TkThemeToggle } from "../theme";
export function TkAppHeader({ title = "Thinkube", logo = "/logo.svg", logoAlt = "Thinkube", children }) {
    return (_jsx("header", { className: "sticky top-0 z-50 shadow-lg bg-background border-b border-border", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: logo, alt: logoAlt, className: "h-8 w-8" }), _jsx("h1", { className: "text-xl font-bold", children: title })] }), _jsx("div", { className: "flex-1 flex justify-center", children: children }), _jsx("div", { children: _jsx(TkThemeToggle, {}) })] }) }) }));
}
//# sourceMappingURL=TkAppHeader.js.map