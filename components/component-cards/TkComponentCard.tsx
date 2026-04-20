/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Download, Trash2 } from "lucide-react"
import { TkCard, TkCardHeader, TkCardContent } from "@/components/cards-data"
import { TkBadge, TkButton } from "@/components/buttons-badges"
import { TkWarningAlert } from "@/components/feedback"
import { TkBrandIcon } from "@/components/brand-icons"

// ---------------------------------------------------------------------------
// Data interface
// ---------------------------------------------------------------------------

export interface TkComponentData {
  displayName: string
  description: string
  icon?: string
  isInstalled: boolean
  requirements?: string[]
  requirementsMet?: boolean
  missingRequirements?: string[]
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface TkComponentCardProps<T extends TkComponentData = TkComponentData> {
  component: T
  allowForceInstall?: boolean
  onInstall: (component: T) => void
  onUninstall: (component: T) => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TkComponentCard<T extends TkComponentData>({
  component,
  allowForceInstall = false,
  onInstall,
  onUninstall,
}: TkComponentCardProps<T>) {
  const requirementsMet = component.requirementsMet ?? true
  const missingRequirements = component.missingRequirements ?? []

  const isMissingRequirement = (req: string) => {
    return missingRequirements.includes(req)
  }

  return (
    <TkCard className="h-full flex flex-col">
      <TkCardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <TkBrandIcon
              icon={(component.icon ?? "").replace("/icons/", "").replace(".svg", "")}
              alt={component.displayName}
              size={20}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-2">{component.displayName}</h3>
            <div className="flex items-center gap-2">
              {component.isInstalled ? (
                <TkBadge status="healthy" className="gap-1">
                  <Check className="w-3 h-3" />
                  Installed
                </TkBadge>
              ) : (
                <TkBadge appearance="outlined">Not Installed</TkBadge>
              )}
            </div>
          </div>
        </div>
      </TkCardHeader>

      <TkCardContent className="flex flex-col flex-1">
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3">
          {component.description}
        </p>

        {/* Requirements */}
        {component.requirements && component.requirements.length > 0 && (
          <div className="mt-3">
            <div className="text-xs font-semibold text-muted-foreground mb-1">
              Requirements:
            </div>
            <div className="flex flex-wrap gap-1">
              {component.requirements.map((req) => (
                <TkBadge
                  key={req}
                  status={isMissingRequirement(req) ? "unhealthy" : undefined}
                  appearance={isMissingRequirement(req) ? undefined : "outlined"}
                  className="text-xs"
                >
                  {req}
                </TkBadge>
              ))}
            </div>
          </div>
        )}

        {/* Missing requirements alert */}
        {!requirementsMet && missingRequirements.length > 0 && (
          <div className="mt-3">
            <TkWarningAlert>
              <span className="text-xs">
                Missing: {missingRequirements.join(", ")}
              </span>
            </TkWarningAlert>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end mt-auto pt-4">
          {!component.isInstalled ? (
            <TkButton
              onClick={() => onInstall(component)}
              disabled={!requirementsMet && !allowForceInstall}
              intent="secondary"
              size="sm"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Install
            </TkButton>
          ) : (
            <TkButton
              onClick={() => onUninstall(component)}
              intent="secondary"
              size="sm"
              className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4" />
              Uninstall
            </TkButton>
          )}
        </div>
      </TkCardContent>
    </TkCard>
  )
}
