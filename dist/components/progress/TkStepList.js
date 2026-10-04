import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Check, Loader2, Circle } from "lucide-react";
/**
 * TkStepList - Scrollable step list for detailed progress tracking
 * Thinkube-approved component from thinkube-style
 */
export function TkStepList({ steps, current, isRunning = false, maxHeight = "max-h-64", className = "", }) {
    return (_jsx("div", { className: `${maxHeight} overflow-y-auto space-y-1 ${className}`, children: steps.map((step, index) => {
            const stepNumber = index + 1;
            const isComplete = stepNumber < current;
            const isCurrent = stepNumber === current;
            const isPending = stepNumber > current;
            return (_jsxs("div", { className: `flex items-center gap-2 px-2 py-1 text-sm transition-colors ${isCurrent ? "bg-primary/10 text-primary font-medium" : ""} ${isComplete ? "text-muted-foreground" : ""} ${isPending ? "text-muted-foreground/50" : ""}`, children: [isComplete && (_jsx(Check, { className: "h-3 w-3 text-[var(--color-success)] flex-shrink-0" })), isCurrent && (_jsx(Loader2, { className: "h-3 w-3 animate-spin text-primary flex-shrink-0" })), isPending && _jsx(Circle, { className: "h-3 w-3 flex-shrink-0" }), _jsx("span", { className: "flex-1", children: step }), _jsx("span", { className: "text-xs text-muted-foreground", children: stepNumber })] }, index));
        }) }));
}
/**
 * TkDotProgress - Minimal dot-based progress indicator
 * Thinkube-approved component from thinkube-style
 */
export function TkDotProgress({ steps, current, isRunning = false, currentLabel, showBadge = false, className = "", }) {
    return (_jsxs("div", { className: `space-y-3 ${className}`, children: [showBadge && (_jsxs("div", { className: "flex items-center justify-between text-sm mb-2", children: [_jsx("span", { className: "font-medium", children: "Installation Progress" }), _jsxs("span", { className: "text-muted-foreground", children: [current, " / ", steps.length] })] })), _jsx("div", { className: "flex flex-wrap gap-1", children: steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isComplete = stepNumber < current;
                    const isCurrent = stepNumber === current;
                    return (_jsx("div", { className: `h-2 w-2 transition-all ${isComplete
                            ? "bg-[var(--color-success)]"
                            : isCurrent
                                ? "bg-primary animate-pulse"
                                : "bg-border"}`, title: step }, index));
                }) }), currentLabel && current > 0 && current <= steps.length && (_jsxs("div", { className: "flex items-center gap-2 text-sm pt-2 border-t", children: [isRunning ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin text-primary" })) : (_jsx(Check, { className: "h-4 w-4 text-[var(--color-success)]" })), _jsx("span", { children: currentLabel })] }))] }));
}
//# sourceMappingURL=TkStepList.js.map