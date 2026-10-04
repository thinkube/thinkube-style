import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { cn } from '../../lib/utils';
/**
 * TkHealthChart - Health status history visualization
 *
 * Displays health check history as a bar chart with color-coded status indicators.
 * Each bar represents a health check at a point in time.
 *
 * @example
 * ```tsx
 * <TkHealthChart
 *   data={healthHistory}
 *   height="200px"
 *   showLegend={true}
 * />
 * ```
 */
export function TkHealthChart({ data, className, showLegend = true, height = '200px', }) {
    const barWidth = useMemo(() => {
        const count = data?.length ?? 0;
        return count > 0 ? `${100 / count}%` : '0%';
    }, [data?.length]);
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };
    const getBarColor = (status) => {
        switch (status) {
            case 'healthy':
                return 'bg-success';
            case 'unhealthy':
                return 'bg-destructive';
            case 'unknown':
                return 'bg-muted-foreground';
            case 'disabled':
                return 'bg-muted';
            default:
                return 'bg-muted-foreground';
        }
    };
    return (_jsxs("div", { className: cn('flex flex-col', className), children: [_jsx("div", { className: "flex items-end gap-0 mb-4", style: { height }, children: data?.map((item, index) => (_jsx("div", { className: cn('h-full transition-opacity hover:opacity-80 cursor-pointer', getBarColor(item.status)), style: { width: barWidth }, title: `${item.status} - ${formatTime(item.checked_at)}` }, index))) }), showLegend && (_jsxs("div", { className: "flex gap-4 justify-center text-xs", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-success" }), _jsx("span", { children: "Healthy" })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-destructive" }), _jsx("span", { children: "Unhealthy" })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-muted-foreground" }), _jsx("span", { children: "Unknown" })] })] }))] }));
}
//# sourceMappingURL=TkHealthChart.js.map