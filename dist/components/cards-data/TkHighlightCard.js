import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
/**
 * TkHighlightCard - Card with primary border and optional icon
 * Thinkube-approved component from thinkube-style
 */
export function TkHighlightCard({ title, icon: Icon, children, className = "" }) {
    return (_jsxs(Card, { className: `border-primary ${className}`, children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [Icon && _jsx(Icon, { className: "h-5 w-5 text-primary" }), title] }) }), _jsx(CardContent, { children: children })] }));
}
//# sourceMappingURL=TkHighlightCard.js.map