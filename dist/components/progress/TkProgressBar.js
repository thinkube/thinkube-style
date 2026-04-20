import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Check, Loader2 } from "lucide-react";
/**
 * TkProgressBar - Simple progress bar with current step display
 * Thinkube-approved component from thinkube-style
 */
export function TkProgressBar({ current, total, currentLabel, showPercentage = true, isRunning = false, className = "", }) {
    const progress = (current / total) * 100;
    return (_jsxs("div", { className: `space-y-2 ${className}`, children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "font-medium", children: ["Step ", current, " of ", total] }), showPercentage && (_jsxs("span", { className: "text-muted-foreground", children: [Math.round(progress), "%"] }))] }), _jsx("div", { className: "h-2 bg-secondary overflow-hidden rounded-full", children: _jsx("div", { className: "h-full bg-primary transition-all duration-300", style: { width: `${progress}%` } }) }), currentLabel && current > 0 && current <= total && (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [isRunning ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin text-primary" })) : (_jsx(Check, { className: "h-4 w-4 text-[var(--color-success)]" })), _jsx("span", { className: isRunning ? "text-foreground" : "text-[var(--color-success)]", children: currentLabel })] }))] }));
}
/**
 * TkProgressBarWithRecentSteps - Progress bar showing recent completed steps
 * Thinkube-approved component from thinkube-style
 */
export function TkProgressBarWithRecentSteps({ steps, current, isRunning = false, title = "Progress", className = "", }) {
    const progress = (current / steps.length) * 100;
    const recentSteps = steps.slice(Math.max(0, current - 3), current);
    return (_jsxs("div", { className: `space-y-4 ${className}`, children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "font-medium", children: title }), _jsxs("span", { className: "text-muted-foreground", children: [current, " / ", steps.length] })] }), _jsx("div", { className: "h-2 bg-secondary overflow-hidden rounded-full", children: _jsx("div", { className: "h-full bg-primary transition-all duration-300", style: { width: `${progress}%` } }) })] }), recentSteps.length > 0 && (_jsx("div", { className: "space-y-1", children: recentSteps.map((step, index) => {
                    const actualIndex = Math.max(0, current - 3) + index;
                    const isCurrent = actualIndex === current - 1;
                    return (_jsxs("div", { className: `flex items-center gap-2 px-2 py-1 text-sm ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`, children: [isCurrent && isRunning ? (_jsx(Loader2, { className: "h-3 w-3 animate-spin text-primary flex-shrink-0" })) : (_jsx(Check, { className: "h-3 w-3 text-[var(--color-success)] flex-shrink-0" })), _jsx("span", { children: step })] }, actualIndex));
                }) }))] }));
}
//# sourceMappingURL=TkProgressBar.js.map