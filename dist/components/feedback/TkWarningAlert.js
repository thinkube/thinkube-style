import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertTriangle } from "lucide-react";
/**
 * TkWarningAlert - Amber warning alert
 * Thinkube-approved component from thinkube-style
 */
export function TkWarningAlert({ title, children, className = "" }) {
    if (!title) {
        return (_jsxs(Alert, { className: `border-[var(--color-warning)]/40 bg-[var(--color-warning)]/5 ${className}`, children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-[var(--color-warning)]" }), _jsx(AlertDescription, { className: "text-[var(--color-warning)]", children: children })] }));
    }
    return (_jsxs(Alert, { className: `border-[var(--color-warning)]/40 bg-[var(--color-warning)]/5 ${className}`, children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-[var(--color-warning)]" }), _jsx(AlertTitle, { className: "text-[var(--color-warning)]", children: title }), _jsx(AlertDescription, { className: "text-[var(--color-warning)]", children: children })] }));
}
//# sourceMappingURL=TkWarningAlert.js.map