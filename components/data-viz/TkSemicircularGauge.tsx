/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TkSemicircularGaugeProps {
  value: number
  max: number
  label: string
  unit: string
  size?: number
}

// Color values matching the theme palette (dark mode oklch values)
// success: oklch(65% 0.16 155) ~ #2ec97a
// warning: oklch(75% 0.18 50)  ~ #d4943a
// error/destructive: oklch(63% 0.21 25) ~ #e04b3d
const GAUGE_COLORS = {
  success: 'oklch(0.65 0.16 155)',
  warning: 'oklch(0.75 0.18 50)',
  error: 'oklch(0.63 0.21 25)',
} as const

function getGaugeColor(percentage: number): string {
  if (percentage < 50) return GAUGE_COLORS.success
  if (percentage < 75) return GAUGE_COLORS.warning
  return GAUGE_COLORS.error
}

export function TkSemicircularGauge({
  value,
  max,
  label,
  unit,
  size = 140,
}: TkSemicircularGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = size / 2 - 10
  const circumference = Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference
  const color = getGaugeColor(percentage)

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg width={size} height={size / 2 + 20} className="transform">
          <path
            d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ top: '10px' }}
        >
          <div className="text-3xl font-bold" style={{ color }}>
            {value.toFixed(value >= 10 ? 0 : 1)}
            {unit}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{label}</div>
        </div>
      </div>
    </div>
  )
}
