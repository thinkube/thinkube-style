/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { LucideIcon } from "lucide-react"
import { TkCard, TkCardHeader, TkCardContent, TkCardFooter } from "@/components/cards-data"
import { TkBadge, TkButton, TkGpuBadge } from "@/components/buttons-badges"
import { TkSwitch } from "@/components/forms-inputs"
import { TkTooltip } from "@/components/modals-overlays"
import { TkBrandIcon } from "@/components/brand-icons"

interface TkServiceCardProps {
  name: string
  description: string
  icon?: string
  lucideIcon?: LucideIcon
  status: "healthy" | "unhealthy" | "pending"
  enabled?: boolean
  onToggle?: (enabled: boolean) => void
  badges?: Array<{
    label: string
    variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning"
  }>
  gpuCount?: number
  metrics?: Array<{
    label: string
    value: string
    variant?: "default" | "success" | "warning" | "error"
  }>
  actions?: Array<{
    icon: LucideIcon
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "destructive" | "ghost"
  }>
  className?: string
}

/**
 * TkServiceCard - Comprehensive service card matching Thinkube dashboard design
 * Thinkube-approved component from thinkube-style
 */
export function TkServiceCard({
  name,
  description,
  icon,
  lucideIcon: LucideIconComponent,
  status,
  enabled = true,
  onToggle,
  badges = [],
  gpuCount,
  metrics = [],
  actions = [],
  className = "",
}: TkServiceCardProps) {
  const statusColors = {
    healthy: "var(--color-success)",
    unhealthy: "var(--color-error)",
    pending: "var(--color-warning)",
  }

  const statusBadgeVariants = {
    healthy: "success" as const,
    unhealthy: "destructive" as const,
    pending: "warning" as const,
  }

  const borderClass = status === "healthy"
    ? "border-primary/20"
    : status === "unhealthy"
    ? "border-destructive/50"
    : ""

  return (
    <TkCard className={`${borderClass} ${className}`}>
      <TkCardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {icon && <TkBrandIcon icon={icon} alt={name} size={20} />}
              {LucideIconComponent && !icon && (
                <LucideIconComponent
                  className={`w-5 h-5 ${status === "unhealthy" ? "opacity-50" : ""}`}
                />
              )}
              <h3 className="text-xl font-semibold">{name}</h3>
              <TkTooltip
                content={
                  status === "healthy"
                    ? "All health checks passing"
                    : status === "unhealthy"
                    ? "Service is not responding"
                    : "Service is starting"
                }
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: statusColors[status] }}
                />
              </TkTooltip>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <TkBadge variant={statusBadgeVariants[status]}>
            {status === "healthy" ? "Healthy" : status === "unhealthy" ? "Unhealthy" : "Pending"}
          </TkBadge>
        </div>
      </TkCardHeader>

      <TkCardContent className="pb-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge, idx) => (
            <TkBadge key={idx} variant={badge.variant || "outline"}>
              {badge.label}
            </TkBadge>
          ))}
          {gpuCount && gpuCount > 0 && <TkGpuBadge gpuCount={gpuCount} />}
        </div>

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="space-y-2 text-sm text-muted-foreground">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{metric.label}:</span>
                <span
                  className={
                    metric.variant === "success"
                      ? "text-[var(--color-success)]"
                      : metric.variant === "warning"
                      ? "text-[var(--color-warning)]"
                      : metric.variant === "error"
                      ? "text-[var(--color-error)]"
                      : "text-foreground"
                  }
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </TkCardContent>

      {(actions.length > 0 || onToggle) && (
        <TkCardFooter className="flex-col gap-3 pt-3">
          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex gap-2 w-full">
              {actions.map((action, idx) => (
                <TkTooltip key={idx} content={action.label}>
                  <TkButton
                    size="sm"
                    variant={action.variant || "outline"}
                    className="flex-1"
                    onClick={action.onClick}
                  >
                    <action.icon className="h-4 w-4" />
                  </TkButton>
                </TkTooltip>
              ))}
            </div>
          )}

          {/* Toggle */}
          {onToggle && (
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium">Service Enabled</span>
              <TkSwitch checked={enabled} onCheckedChange={onToggle} />
            </div>
          )}
        </TkCardFooter>
      )}
    </TkCard>
  )
}
