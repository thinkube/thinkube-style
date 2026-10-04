export interface HealthCheckData {
    status: 'healthy' | 'unhealthy' | 'unknown' | 'disabled';
    checked_at: string;
    [key: string]: any;
}
export interface TkHealthChartProps {
    data: HealthCheckData[];
    className?: string;
    showLegend?: boolean;
    height?: string | number;
}
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
export declare function TkHealthChart({ data, className, showLegend, height, }: TkHealthChartProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TkHealthChart.d.ts.map