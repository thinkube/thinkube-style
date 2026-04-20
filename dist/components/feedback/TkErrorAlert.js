import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle } from "lucide-react";
/**
 * TkErrorAlert - Red error/destructive alert
 * Thinkube-approved component from thinkube-style
 */
export function TkErrorAlert({ title, children, className = "" }) {
    if (!title) {
        return (_jsxs(Alert, { variant: "destructive", className: className, children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: children })] }));
    }
    return (_jsxs(Alert, { variant: "destructive", className: className, children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: title }), _jsx(AlertDescription, { children: children })] }));
}
//# sourceMappingURL=TkErrorAlert.js.map