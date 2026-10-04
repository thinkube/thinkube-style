import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Info } from "lucide-react";
/**
 * TkInfoAlert - Blue informational alert
 * Thinkube-approved component from thinkube-style
 */
export function TkInfoAlert({ title, children, className = "" }) {
    if (!title) {
        // Simple alert without title
        return (_jsxs(Alert, { className: `border-[var(--color-info)]/40 bg-[var(--color-info)]/5 ${className}`, children: [_jsx(Info, { className: "h-4 w-4 text-[var(--color-info)]" }), _jsx(AlertDescription, { className: "text-[var(--color-info)]", children: children })] }));
    }
    // Alert with title
    return (_jsxs(Alert, { className: `border-[var(--color-info)]/40 bg-[var(--color-info)]/5 ${className}`, children: [_jsx(Info, { className: "h-4 w-4 text-[var(--color-info)]" }), _jsx(AlertTitle, { className: "text-[var(--color-info)]", children: title }), _jsx(AlertDescription, { className: "text-[var(--color-info)]", children: children })] }));
}
// Export Alert primitives with Tk prefix
export { Alert as TkAlert } from "../../components/ui/alert";
export { AlertDescription as TkAlertDescription } from "../../components/ui/alert";
export { AlertTitle as TkAlertTitle } from "../../components/ui/alert";
//# sourceMappingURL=TkInfoAlert.js.map