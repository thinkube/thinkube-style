import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Loader2 } from "lucide-react";
/**
 * TkLoader - Loader with standardized sizes
 * Thinkube-approved component from thinkube-style
 */
export function TkLoader({ size = "md", className = "", ...props }) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
    };
    return (_jsx(Loader2, { className: `animate-spin ${sizeClasses[size]} ${className}`, ...props }));
}
//# sourceMappingURL=TkLoader.js.map