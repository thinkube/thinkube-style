import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
/**
 * TkCodeBlock - Thinkube component for displaying code or logs
 *
 * Features:
 * - Monospace font
 * - Scrollable with proper overflow handling
 * - Theme-aware background
 * - Consistent padding and styling
 *
 * @example
 * ```tsx
 * <TkCodeBlock>
 *   {logContent}
 * </TkCodeBlock>
 * ```
 */
export function TkCodeBlock({ children, className, maxHeight = "h-96", variant = "solid", ...props }) {
    return (_jsx("pre", { className: cn("text-xs font-mono overflow-auto whitespace-pre-wrap break-words p-4 rounded-lg", variant === "solid" ? "bg-muted" : "bg-muted/30", maxHeight, className), ...props, children: children }));
}
//# sourceMappingURL=TkCodeBlock.js.map