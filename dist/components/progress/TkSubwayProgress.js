import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Badge } from "../../components/ui/badge";
import { Check, Loader2 } from "lucide-react";
/**
 * TkSubwayProgress - Subway/metro line style progress indicator
 * Thinkube-approved component from thinkube-style
 */
export function TkSubwayProgress({ steps, current, isRunning = false, className = "", }) {
    const totalSteps = steps.length;
    return (_jsxs("div", { className: `space-y-3 ${className}`, children: [_jsxs("div", { className: "flex items-center justify-between px-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [current >= totalSteps ? (_jsx(Check, { className: "h-4 w-4 text-[var(--color-success)]" })) : isRunning ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin text-primary" })) : null, _jsx("span", { className: "text-sm font-medium", children: current >= totalSteps
                                    ? "Complete!"
                                    : current > 0
                                        ? steps[current - 1]
                                        : "Ready to start" })] }), _jsxs(Badge, { variant: "outline", children: [current, " / ", totalSteps] })] }), _jsxs("div", { className: "relative px-4 py-6", children: [_jsx("div", { className: "absolute top-1/2 left-4 right-4 h-0.5 bg-border -translate-y-1/2" }), _jsx("div", { className: "absolute top-1/2 left-4 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500", style: {
                            width: current >= totalSteps
                                ? "calc(100% - 2rem)"
                                : `calc(${(current / totalSteps) * 100}% - 1rem)`,
                        } }), _jsx("div", { className: "relative flex justify-between", children: steps.map((step, index) => {
                            const stepNumber = index + 1;
                            const isComplete = stepNumber < current;
                            const isCurrent = stepNumber === current;
                            const isPending = stepNumber > current;
                            return (_jsxs("div", { className: "flex flex-col items-center relative group cursor-help", children: [_jsx("div", { className: `w-3 h-3 rounded-full border-2 transition-all duration-300 ${isComplete
                                            ? "bg-primary border-primary"
                                            : isCurrent
                                                ? "bg-primary border-primary ring-4 ring-primary/20 scale-125"
                                                : "bg-background border-border"}` }), _jsxs("div", { className: "absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10", children: [_jsx("div", { className: "bg-primary text-primary-foreground text-xs px-2 py-1 rounded whitespace-nowrap", children: step }), _jsx("div", { className: "w-2 h-2 bg-primary rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1" })] })] }, index));
                        }) })] })] }));
}
//# sourceMappingURL=TkSubwayProgress.js.map