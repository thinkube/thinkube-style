import { useMemo } from 'react'
import { cn } from '@/lib/utils'

export interface HealthCheckData {
  status: 'healthy' | 'unhealthy' | 'unknown' | 'disabled'
  checked_at: string
  [key: string]: any
}

export interface TkHealthChartProps {
  data: HealthCheckData[]
  className?: string
  showLegend?: boolean
  height?: string | number
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
export function TkHealthChart({
  data,
  className,
  showLegend = true,
  height = '200px',
}: TkHealthChartProps) {
  const barWidth = useMemo(() => {
    const count = data.length
    return count > 0 ? `${100 / count}%` : '0%'
  }, [data.length])

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getBarColor = (status: HealthCheckData['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-success'
      case 'unhealthy':
        return 'bg-destructive'
      case 'unknown':
        return 'bg-muted-foreground'
      case 'disabled':
        return 'bg-muted'
      default:
        return 'bg-muted-foreground'
    }
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Chart Container */}
      <div
        className="flex items-end gap-0 mb-4"
        style={{ height }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={cn(
              'h-full transition-opacity hover:opacity-80 cursor-pointer',
              getBarColor(item.status)
            )}
            style={{ width: barWidth }}
            title={`${item.status} - ${formatTime(item.checked_at)}`}
          />
        ))}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex gap-4 justify-center text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <span>Healthy</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span>Unhealthy</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />
            <span>Unknown</span>
          </div>
        </div>
      )}
    </div>
  )
}
