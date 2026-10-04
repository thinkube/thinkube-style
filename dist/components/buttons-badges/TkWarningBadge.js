import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Badge } from "../../components/ui/badge";
/**
 * TkWarningBadge - Amber warning badge
 * Thinkube-approved component from thinkube-style
 */
export function TkWarningBadge({ children, className = "" }) {
    return (_jsx(Badge, { variant: "warning", className: className, children: children }));
}
//# sourceMappingURL=TkWarningBadge.js.map