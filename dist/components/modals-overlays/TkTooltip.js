import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../components/ui/tooltip";
/**
 * TkTooltip - Thinkube tooltip wrapper with consistent styling
 * Thinkube-approved component from thinkube-style
 */
export function TkTooltip({ children, content, side = "top", className = "" }) {
    return (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: children }), _jsx(TooltipContent, { side: side, className: className, children: typeof content === "string" ? _jsx("p", { children: content }) : content })] }) }));
}
// Export Tooltip primitives with Tk prefix
export { Tooltip as TkTooltipRoot } from "../../components/ui/tooltip";
export { TooltipContent as TkTooltipContent } from "../../components/ui/tooltip";
export { TooltipProvider as TkTooltipProvider } from "../../components/ui/tooltip";
export { TooltipTrigger as TkTooltipTrigger } from "../../components/ui/tooltip";
//# sourceMappingURL=TkTooltip.js.map