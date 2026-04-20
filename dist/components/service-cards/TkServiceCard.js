import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TkCard, TkCardHeader, TkCardContent, TkCardFooter } from "../../components/cards-data";
import { TkBadge, TkButton, TkGpuBadge } from "../../components/buttons-badges";
import { TkSwitch } from "../../components/forms-inputs";
import { TkTooltip } from "../../components/modals-overlays";
import { TkBrandIcon } from "../../components/brand-icons";
/**
 * TkServiceCard - Comprehensive service card matching Thinkube dashboard design
 * Thinkube-approved component from thinkube-style
 */
export function TkServiceCard({ name, description, icon, lucideIcon: LucideIconComponent, status, enabled = true, onToggle, badges = [], gpuCount, metrics = [], actions = [], className = "", }) {
    const statusColors = {
        healthy: "var(--color-success)",
        unhealthy: "var(--color-error)",
        pending: "var(--color-warning)",
    };
    const statusBadgeVariants = {
        healthy: "success",
        unhealthy: "destructive",
        pending: "warning",
    };
    const borderClass = status === "healthy"
        ? "border-primary/20"
        : status === "unhealthy"
            ? "border-destructive/50"
            : "";
    return (_jsxs(TkCard, { className: `${borderClass} ${className}`, children: [_jsx(TkCardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [icon && _jsx(TkBrandIcon, { icon: icon, alt: name, size: 20 }), LucideIconComponent && !icon && (_jsx(LucideIconComponent, { className: `w-5 h-5 ${status === "unhealthy" ? "opacity-50" : ""}` })), _jsx("h3", { className: "text-xl font-semibold", children: name }), _jsx(TkTooltip, { content: status === "healthy"
                                                ? "All health checks passing"
                                                : status === "unhealthy"
                                                    ? "Service is not responding"
                                                    : "Service is starting", children: _jsx("div", { className: "h-2 w-2 rounded-full", style: { backgroundColor: statusColors[status] } }) })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: description })] }), _jsx(TkBadge, { variant: statusBadgeVariants[status], children: status === "healthy" ? "Healthy" : status === "unhealthy" ? "Unhealthy" : "Pending" })] }) }), _jsxs(TkCardContent, { className: "pb-3", children: [_jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [badges.map((badge, idx) => (_jsx(TkBadge, { variant: badge.variant || "outline", children: badge.label }, idx))), gpuCount && gpuCount > 0 && _jsx(TkGpuBadge, { gpuCount: gpuCount })] }), metrics.length > 0 && (_jsx("div", { className: "space-y-2 text-sm text-muted-foreground", children: metrics.map((metric, idx) => (_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { children: [metric.label, ":"] }), _jsx("span", { className: metric.variant === "success"
                                        ? "text-[var(--color-success)]"
                                        : metric.variant === "warning"
                                            ? "text-[var(--color-warning)]"
                                            : metric.variant === "error"
                                                ? "text-[var(--color-error)]"
                                                : "text-foreground", children: metric.value })] }, idx))) }))] }), (actions.length > 0 || onToggle) && (_jsxs(TkCardFooter, { className: "flex-col gap-3 pt-3", children: [actions.length > 0 && (_jsx("div", { className: "flex gap-2 w-full", children: actions.map((action, idx) => (_jsx(TkTooltip, { content: action.label, children: _jsx(TkButton, { size: "sm", variant: action.variant || "outline", className: "flex-1", onClick: action.onClick, children: _jsx(action.icon, { className: "h-4 w-4" }) }) }, idx))) })), onToggle && (_jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsx("span", { className: "text-sm font-medium", children: "Service Enabled" }), _jsx(TkSwitch, { checked: enabled, onCheckedChange: onToggle })] }))] }))] }));
}
//# sourceMappingURL=TkServiceCard.js.map