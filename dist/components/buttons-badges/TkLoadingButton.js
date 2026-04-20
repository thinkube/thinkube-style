import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
/**
 * TkLoadingButton - Button with built-in loading state
 * Thinkube-approved component from thinkube-style
 */
export function TkLoadingButton({ loading, children, disabled, ...props }) {
    return (_jsxs(Button, { disabled: loading || disabled, ...props, children: [loading && _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), children] }));
}
//# sourceMappingURL=TkLoadingButton.js.map