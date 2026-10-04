import { jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { TkBadge } from "./TkBadge";
/**
 * TkGpuBadge - Specialized badge for displaying GPU count with accent styling
 * Thinkube-approved component from thinkube-style
 */
export function TkGpuBadge({ gpuCount, size = "base", className = "" }) {
    const sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        base: "text-base px-3 py-1",
    };
    return (_jsxs(TkBadge, { className: `${sizeClasses[size]} border-accent/40 bg-accent/10 text-accent font-semibold ${className}`, children: [gpuCount, " GPU", gpuCount > 1 ? "s" : ""] }));
}
//# sourceMappingURL=TkGpuBadge.js.map