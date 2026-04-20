import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Badge } from "../../components/ui/badge";
/**
 * TkErrorBadge - Red error/destructive badge
 * Thinkube-approved component from thinkube-style
 */
export function TkErrorBadge({ children, className = "" }) {
    return (_jsx(Badge, { variant: "destructive", className: className, children: children }));
}
//# sourceMappingURL=TkErrorBadge.js.map