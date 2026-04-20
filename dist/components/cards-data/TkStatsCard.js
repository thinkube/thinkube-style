import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
/**
 * TkStatsCard - Card for displaying statistics with icon
 * Thinkube-approved component from thinkube-style
 */
export function TkStatsCard({ title, value, description, icon: Icon, className = "" }) {
    return (_jsxs(Card, { className: className, children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: title }), Icon && _jsx(Icon, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: value }), description && (_jsx("p", { className: "text-xs text-muted-foreground", children: description }))] })] }));
}
//# sourceMappingURL=TkStatsCard.js.map