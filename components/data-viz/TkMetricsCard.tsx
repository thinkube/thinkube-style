/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react'
import {
  TkCard,
  TkCardHeader,
  TkCardTitle,
  TkCardContent,
} from '@/components/cards-data'
import { TkSemicircularGauge } from '@/components/data-viz/TkSemicircularGauge'

export interface TkMetricGauge {
  label: string
  value: number
  max: number
  unit: string
}

export interface TkMetricItem {
  label: string
  value: string
}

export interface TkMetricsCardProps {
  title: string
  icon?: React.ComponentType<{ className?: string }>
  gauges: TkMetricGauge[]
  metrics?: TkMetricItem[]
}

export function TkMetricsCard({
  title,
  icon: Icon,
  gauges,
  metrics,
}: TkMetricsCardProps) {
  return (
    <TkCard>
      <TkCardHeader>
        <TkCardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </TkCardTitle>
      </TkCardHeader>
      <TkCardContent>
        <div className="grid grid-cols-2 gap-6">
          {gauges.map((gauge) => (
            <div key={gauge.label} className="flex flex-col items-center">
              <TkSemicircularGauge
                value={gauge.value}
                max={gauge.max}
                label={gauge.label}
                unit={gauge.unit}
              />
            </div>
          ))}
        </div>

        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
                <div className="text-sm font-medium">{metric.value}</div>
              </div>
            ))}
          </div>
        )}
      </TkCardContent>
    </TkCard>
  )
}
