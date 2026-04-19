"use client";

import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkButton, TkLoadingButton } from "@/components/buttons-badges";
import { TkBadge, TkGpuBadge } from "@/components/buttons-badges";
import { Heart, Download, Trash2, Plus, Settings, Save, RefreshCw, Pencil } from "lucide-react";
import { useState } from "react";

export default function ButtonsBadgesPage() {
  const [saveLoading, setSaveLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);

  const triggerLoading = (setter: (v: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <TkPageWrapper
      title="Buttons & Badges"
      description="Semantic button intents and badge statuses"
    >
      {/* Button Intents */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkButton — Intent API</TkCardTitle>
          <TkCardDescription>
            Use intent to express purpose. One primary per section, secondary for supporting actions,
            ghost for toolbar/nav, danger for destructive operations.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Intents</h3>
            <div className="flex flex-wrap gap-3">
              <TkButton intent="primary">Primary Action</TkButton>
              <TkButton intent="secondary">Secondary</TkButton>
              <TkButton intent="ghost">Ghost</TkButton>
              <TkButton intent="danger">Danger</TkButton>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">With Icons</h3>
            <div className="flex flex-wrap gap-3">
              <TkButton intent="primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </TkButton>
              <TkButton intent="secondary">
                <Download className="mr-2 h-4 w-4" />
                Download
              </TkButton>
              <TkButton intent="danger">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </TkButton>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Icon Only</h3>
            <div className="flex flex-wrap gap-3">
              <TkButton size="icon" intent="secondary" aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </TkButton>
              <TkButton size="icon" intent="ghost" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </TkButton>
              <TkButton size="icon" intent="danger" aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </TkButton>
              <TkButton size="icon" intent="primary" aria-label="Favorite">
                <Heart className="h-4 w-4" />
              </TkButton>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <TkButton size="sm" intent="secondary">Small</TkButton>
              <TkButton intent="primary">Default</TkButton>
              <TkButton size="lg" intent="primary">Large</TkButton>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Disabled</h3>
            <div className="flex flex-wrap gap-3">
              <TkButton disabled intent="primary">Disabled Primary</TkButton>
              <TkButton disabled intent="secondary">Disabled Secondary</TkButton>
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Loading Button */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkLoadingButton</TkCardTitle>
          <TkCardDescription>
            Built-in loading state with spinner and auto-disable.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <div className="flex flex-wrap gap-3">
            <TkLoadingButton
              loading={saveLoading}
              onClick={() => triggerLoading(setSaveLoading)}
            >
              <Save className="mr-2 h-4 w-4" />
              Save changes
            </TkLoadingButton>
            <TkLoadingButton
              intent="secondary"
              loading={syncLoading}
              onClick={() => triggerLoading(setSyncLoading)}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync now
            </TkLoadingButton>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Badge Status */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkBadge — Status API</TkCardTitle>
          <TkCardDescription>
            Use status for service/health indicators. Color is determined by meaning, not choice.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Status Badges</h3>
            <div className="flex flex-wrap gap-2">
              <TkBadge status="healthy">Healthy</TkBadge>
              <TkBadge status="unhealthy">Unhealthy</TkBadge>
              <TkBadge status="pending">Pending</TkBadge>
              <TkBadge status="warning">Warning</TkBadge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Category Badges</h3>
            <div className="flex flex-wrap gap-2">
              <TkBadge category="core">Core Service</TkBadge>
              <TkBadge category="optional">Optional</TkBadge>
              <TkBadge category="user">User App</TkBadge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">TkGpuBadge</h3>
            <div className="flex flex-wrap items-center gap-2">
              <TkGpuBadge gpuCount={1} size="sm" />
              <TkGpuBadge gpuCount={2} />
              <TkGpuBadge gpuCount={8} />
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Usage Rules */}
      <TkCard>
        <TkCardHeader>
          <TkCardTitle>Usage Rules</TkCardTitle>
        </TkCardHeader>
        <TkCardContent className="space-y-6">
          <div className="p-4 border border-border">
            <h3 className="text-sm font-semibold mb-2">Buttons</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>One <code className="text-xs">intent="primary"</code> per section maximum</li>
              <li>Use <code className="text-xs">intent="secondary"</code> for supporting actions</li>
              <li>Use <code className="text-xs">intent="ghost"</code> for toolbar and navigation</li>
              <li>Use <code className="text-xs">intent="danger"</code> only for destructive operations</li>
              <li>Icon-only buttons always need <code className="text-xs">aria-label</code></li>
            </ul>
          </div>
          <div className="p-4 border border-border">
            <h3 className="text-sm font-semibold mb-2">Badges</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Use <code className="text-xs">status</code> for health/state indicators</li>
              <li>Use <code className="text-xs">category</code> for type classification</li>
              <li>Never pick badge colors manually — use the semantic props</li>
            </ul>
          </div>
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
