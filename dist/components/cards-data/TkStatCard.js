/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { TkCard } from "./TkCard";
import { TkCardContent } from "./TkCardContent";
/**
 * TkStatCard - Statistics card with trends, icons, and variants
 * Thinkube-approved component from thinkube-style
 */
const TkStatCard = React.forwardRef(({ title, value, description, icon: Icon, trend, variant = "default", badge, className, ...props }, ref) => {
    const variantStyles = {
        default: "",
        primary: "border-primary/50 bg-primary/5",
        success: "border-success/50 bg-success/5",
        warning: "border-warning/50 bg-warning/5",
        destructive: "border-destructive/50 bg-destructive/5",
    };
    const iconColorStyles = {
        default: "text-muted-foreground",
        primary: "text-primary",
        success: "text-success",
        warning: "text-warning",
        destructive: "text-destructive",
    };
    const getTrendColor = (direction) => {
        switch (direction) {
            case "up":
                return "text-success";
            case "down":
                return "text-destructive";
            case "neutral":
                return "text-muted-foreground";
        }
    };
    const getTrendIcon = (direction) => {
        switch (direction) {
            case "up":
                return ArrowUp;
            case "down":
                return ArrowDown;
            case "neutral":
                return null;
        }
    };
    const TrendIcon = trend ? getTrendIcon(trend.direction) : null;
    return (_jsx(TkCard, { ref: ref, className: cn("transition-all duration-200 hover:shadow-md", variantStyles[variant], className), ...props, children: _jsx(TkCardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: title }), _jsxs("div", { className: "mt-2 flex items-baseline gap-2", children: [_jsx("h3", { className: "text-3xl font-bold tracking-tight", children: value }), trend && (_jsxs("div", { className: cn("flex items-center gap-1 text-sm font-medium", getTrendColor(trend.direction)), children: [TrendIcon && _jsx(TrendIcon, { className: "w-4 h-4" }), _jsxs("span", { children: [trend.value, "%"] })] }))] }), (description || trend?.label) && (_jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: trend?.label || description })), badge && (_jsx("div", { className: "mt-2", children: badge }))] }), Icon && (_jsx("div", { className: cn("p-3 rounded-lg bg-background/50", iconColorStyles[variant]), children: _jsx(Icon, { className: "w-6 h-6" }) }))] }) }) }));
});
TkStatCard.displayName = "TkStatCard";
export { TkStatCard };
//# sourceMappingURL=TkStatCard.js.map