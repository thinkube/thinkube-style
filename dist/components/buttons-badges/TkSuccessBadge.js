import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Badge } from "../../components/ui/badge";
/**
 * TkSuccessBadge - Green success badge
 * Thinkube-approved component from thinkube-style
 */
export function TkSuccessBadge({ children, className = "" }) {
    return (_jsx(Badge, { variant: "success", className: className, children: children }));
}
//# sourceMappingURL=TkSuccessBadge.js.map