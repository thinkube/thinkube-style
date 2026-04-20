/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react"
import {
  Star,
  ExternalLink,
  Info,
  RotateCw,
  Heart,
  Server,
  Code,
  BarChart3,
  Shield,
  Database,
  Cpu,
  FileText,
  Box,
} from "lucide-react"
import { TkCard, TkCardHeader, TkCardTitle, TkCardContent, TkCardFooter } from "@/components/cards-data"
import { TkButton, TkBadge, TkGpuBadge } from "@/components/buttons-badges"
import { TkSwitch } from "@/components/forms-inputs"
import { TkTooltip } from "@/components/modals-overlays"
import { TkBrandIcon } from "@/components/brand-icons"
import { TkStatusIndicator } from "@/components/feedback"

// ---------------------------------------------------------------------------
// Data interface
// ---------------------------------------------------------------------------

export interface TkServiceData {
  name: string
  displayName?: string
  description?: string
  icon?: string // path like "/icons/tk_ai.svg" or icon key like "tk_ai"
  url?: string
  type: "core" | "optional" | "user_app"
  category?: string
  version?: string
  isEnabled: boolean
  isFavorite?: boolean
  canBeDisabled?: boolean
  gpuCount?: number
  healthStatus: "healthy" | "unhealthy" | "unknown" | "disabled"
  podStatus?: string
  lastChecked?: string
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface TkServiceCardProps<T extends TkServiceData = TkServiceData> {
  service: T
  layout?: "full" | "compact"
  onToggleFavorite?: (service: T) => void
  onShowDetails?: (service: T) => void
  onRestart?: (service: T) => void
  onToggleEnabled?: (service: T, enabled: boolean) => void
  onHealthCheck?: (service: T) => void
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map health status to the TkStatusIndicator status prop. */
const healthToIndicatorStatus = {
  healthy: "healthy",
  unhealthy: "unhealthy",
  unknown: "warning",
  disabled: "pending",
} as const

/** Map health status to TkBadge status prop. */
const healthToBadgeStatus = {
  healthy: "healthy",
  unhealthy: "unhealthy",
  unknown: "warning",
  disabled: "pending",
} as const

const healthLabel: Record<string, string> = {
  healthy: "Healthy",
  unhealthy: "Unhealthy",
  unknown: "Unknown",
  disabled: "Disabled",
}

const typeBadgeCategoryMap = {
  core: "core",
  optional: "optional",
  user_app: "user",
} as const

const typeLabel: Record<string, string> = {
  core: "Core",
  optional: "Optional",
  user_app: "User App",
}

/** Only surface URLs the user can actually open in a browser. */
function isWebUrl(url?: string): boolean {
  if (!url) return false
  if (!url.startsWith("http://") && !url.startsWith("https://")) return false
  if (url.includes(".svc.cluster.local") || url.includes("internal")) return false
  return true
}

/** Category-to-icon fallback map (lucide). */
const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  infrastructure: Server,
  development: Code,
  monitoring: BarChart3,
  security: Shield,
  storage: Database,
  ai: Cpu,
  documentation: FileText,
  application: Box,
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TkServiceCard<T extends TkServiceData>({
  service,
  layout = "full",
  onToggleFavorite,
  onShowDetails,
  onRestart,
  onToggleEnabled,
  onHealthCheck,
}: TkServiceCardProps<T>) {
  const [toggling, setToggling] = useState(false)
  const [restarting, setRestarting] = useState(false)
  const [checkingHealth, setCheckingHealth] = useState(false)

  const { healthStatus } = service
  const displayName = service.displayName || service.name

  // Border styling based on health
  const borderClass =
    healthStatus === "healthy"
      ? "border-primary/20"
      : healthStatus === "unhealthy"
        ? "border-destructive/50"
        : ""

  // Resolve icon
  const hasCustomIcon = service.icon?.startsWith("/") ?? false
  const IconComponent = hasCustomIcon
    ? null
    : categoryIconMap[service.category?.toLowerCase() || ""] || Server

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------

  const handleToggle = async (checked: boolean) => {
    if (!onToggleEnabled) return
    setToggling(true)
    try {
      await onToggleEnabled(service, checked)
    } finally {
      setToggling(false)
    }
  }

  const handleRestart = async () => {
    if (!onRestart) return
    setRestarting(true)
    try {
      await onRestart(service)
    } finally {
      setTimeout(() => setRestarting(false), 1000)
    }
  }

  const handleHealthCheck = async () => {
    if (!onHealthCheck) return
    setCheckingHealth(true)
    try {
      await onHealthCheck(service)
    } finally {
      setCheckingHealth(false)
    }
  }

  // -----------------------------------------------------------------------
  // Compact layout
  // -----------------------------------------------------------------------

  if (layout === "compact") {
    return (
      <TkCard className={`h-full ${service.isFavorite ? "border-accent" : ""}`}>
        <TkCardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hasCustomIcon ? (
                <TkBrandIcon
                  icon={service.icon!.replace("/icons/", "").replace(".svg", "")}
                  alt={displayName}
                  size={16}
                />
              ) : IconComponent ? (
                <IconComponent className="h-4 w-4" />
              ) : null}
              <TkCardTitle className="text-base">{displayName}</TkCardTitle>
            </div>
            <TkBadge status={healthToBadgeStatus[healthStatus]} className="text-xs">
              {healthLabel[healthStatus] || "Unknown"}
            </TkBadge>
          </div>
        </TkCardHeader>
        <TkCardContent className="pb-2">
          {/* GPU Badge */}
          {service.gpuCount != null && service.gpuCount > 0 && (
            <div className="mb-2">
              <TkGpuBadge gpuCount={service.gpuCount} size="sm" />
            </div>
          )}

          <div className="flex gap-1">
            {/* Open Service */}
            {service.isEnabled && isWebUrl(service.url) && (
              <TkTooltip content="Open service">
                <TkButton size="icon" intent="ghost" className="h-7 w-7" asChild>
                  <a href={service.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TkButton>
              </TkTooltip>
            )}

            {/* Details */}
            {onShowDetails && (
              <TkTooltip content="View details">
                <TkButton
                  size="icon"
                  intent="ghost"
                  className="h-7 w-7"
                  onClick={() => onShowDetails(service)}
                >
                  <Info className="h-3 w-3" />
                </TkButton>
              </TkTooltip>
            )}
          </div>
        </TkCardContent>
      </TkCard>
    )
  }

  // -----------------------------------------------------------------------
  // Full layout
  // -----------------------------------------------------------------------

  return (
    <TkCard className={`h-full ${borderClass} flex flex-col`}>
      <TkCardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {hasCustomIcon ? (
                <TkBrandIcon
                  icon={service.icon!.replace("/icons/", "").replace(".svg", "")}
                  alt={displayName}
                  size={20}
                />
              ) : IconComponent ? (
                <IconComponent
                  className={`w-5 h-5 ${healthStatus === "unhealthy" ? "opacity-50" : ""}`}
                />
              ) : null}
              <h3 className="text-xl font-semibold">{displayName}</h3>
              <TkTooltip
                content={
                  healthStatus === "healthy"
                    ? "All health checks passing"
                    : healthStatus === "unhealthy"
                      ? "Service is not responding"
                      : healthStatus === "disabled"
                        ? "Service is disabled"
                        : "Health status unknown"
                }
              >
                <TkStatusIndicator
                  status={healthToIndicatorStatus[healthStatus]}
                  size="sm"
                />
              </TkTooltip>
            </div>
            {service.description && (
              <p className="text-sm text-muted-foreground">{service.description}</p>
            )}
          </div>
          <div className="flex items-start gap-2">
            <TkBadge status={healthToBadgeStatus[healthStatus]}>
              {healthLabel[healthStatus] || "Unknown"}
            </TkBadge>
            {onToggleFavorite && (
              <TkTooltip content={service.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                <TkButton
                  intent="ghost"
                  size="icon"
                  onClick={() => onToggleFavorite(service)}
                >
                  <Star
                    className={`h-4 w-4 ${service.isFavorite ? "fill-warning text-warning" : ""}`}
                  />
                </TkButton>
              </TkTooltip>
            )}
          </div>
        </div>
      </TkCardHeader>

      <TkCardContent className="pb-3 flex-grow">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <TkBadge category={typeBadgeCategoryMap[service.type]}>
            {typeLabel[service.type] || service.type}
          </TkBadge>
          {service.category && <TkBadge appearance="outlined">{service.category}</TkBadge>}
          {service.version && <TkBadge appearance="outlined">v{service.version}</TkBadge>}
          {service.gpuCount != null && service.gpuCount > 0 && (
            <TkGpuBadge gpuCount={service.gpuCount} />
          )}
        </div>

        {/* Metrics */}
        {service.podStatus && (
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Pods:</span>
              <span
                className={
                  service.podStatus.includes("Running")
                    ? "text-[var(--color-success)]"
                    : "text-[var(--color-error)]"
                }
              >
                {service.podStatus}
              </span>
            </div>
            {service.lastChecked && (
              <div className="flex justify-between">
                <span>Last Checked:</span>
                <span className="text-foreground">
                  {new Date(service.lastChecked).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}
      </TkCardContent>

      <TkCardFooter className="flex-col gap-3 pt-3">
        {/* Actions */}
        <div className="flex gap-2 w-full">
          {service.isEnabled && isWebUrl(service.url) && (
            <TkTooltip content="Open service">
              <TkButton size="sm" className="flex-1" asChild>
                <a href={service.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </TkButton>
            </TkTooltip>
          )}

          {onShowDetails && (
            <TkTooltip content="View details">
              <TkButton
                size="sm"
                intent="secondary"
                className="flex-1"
                onClick={() => onShowDetails(service)}
              >
                <Info className="h-4 w-4" />
              </TkButton>
            </TkTooltip>
          )}

          {service.isEnabled && onRestart && (
            <TkTooltip content="Restart service">
              <TkButton
                size="sm"
                intent="secondary"
                className="flex-1"
                onClick={handleRestart}
                disabled={restarting}
              >
                <RotateCw className={`h-4 w-4 ${restarting ? "animate-spin" : ""}`} />
              </TkButton>
            </TkTooltip>
          )}

          {service.isEnabled && onHealthCheck && (
            <TkTooltip content="Check health">
              <TkButton
                size="sm"
                intent="secondary"
                className="flex-1"
                onClick={handleHealthCheck}
                disabled={checkingHealth}
              >
                <Heart className={`h-4 w-4 ${checkingHealth ? "animate-pulse text-destructive" : ""}`} />
              </TkButton>
            </TkTooltip>
          )}
        </div>

        {/* Toggle */}
        {service.canBeDisabled && onToggleEnabled && (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium">Service Enabled</span>
            <TkSwitch
              checked={service.isEnabled}
              onCheckedChange={handleToggle}
              disabled={toggling}
            />
          </div>
        )}
      </TkCardFooter>
    </TkCard>
  )
}
