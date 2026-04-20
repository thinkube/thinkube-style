import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { CheckCircle2 } from "lucide-react";
/**
 * TkSuccessAlert - Green success alert
 * Thinkube-approved component from thinkube-style
 */
export function TkSuccessAlert({ title, children, className = "" }) {
    if (!title) {
        return (_jsxs(Alert, { className: `border-[var(--color-success)]/40 bg-[var(--color-success)]/5 ${className}`, children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-[var(--color-success)]" }), _jsx(AlertDescription, { className: "text-[var(--color-success)]", children: children })] }));
    }
    return (_jsxs(Alert, { className: `border-[var(--color-success)]/40 bg-[var(--color-success)]/5 ${className}`, children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-[var(--color-success)]" }), _jsx(AlertTitle, { className: "text-[var(--color-success)]", children: title }), _jsx(AlertDescription, { className: "text-[var(--color-success)]", children: children })] }));
}
//# sourceMappingURL=TkSuccessAlert.js.map