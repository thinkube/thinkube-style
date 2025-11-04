"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkBadge } from "@/components/buttons-badges";
import { TkButton } from "@/components/buttons-badges";
import { TkTooltip } from "@/components/modals-overlays";
import { TkBrandIcon } from "@/components/brand-icons";
import { TkServiceCard } from "@/components/service-cards";
import { ExternalLink, RotateCw, Activity, Info, Heart, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ServiceCardDemoPage() {
  const [jupyterEnabled, setJupyterEnabled] = useState(true);
  const [postgresEnabled, setPostgresEnabled] = useState(true);
  const [redisEnabled, setRedisEnabled] = useState(false);

  return (
    <PageWrapper
      title="Service TkCard Demo"
      description="Realistic service cards matching your current Thinkube applications"
    >
      <div className="mb-6 p-4 rounded-lg bg-muted">
        <p className="text-sm">
          These cards recreate the exact design and functionality from your <strong>thinkube-control</strong> dashboard.
          They include all the features: health status, GPU badges, action buttons with tooltips, and enable/disable toggles.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* JupyterHub - Healthy User App with GPUs */}
        <TkServiceCard
          name="JupyterHub"
          description="Interactive notebooks for data science"
          icon="tk_ai"
          status="healthy"
          enabled={jupyterEnabled}
          onToggle={setJupyterEnabled}
          gpuCount={4}
          badges={[
            { label: "Python", variant: "outline" },
            { label: "Jupyter", variant: "outline" },
            { label: "User App", variant: "warning" },
          ]}
          metrics={[
            { label: "Pods", value: "2 / 2 Running" },
            { label: "Memory", value: "4.2 GB / 8 GB" },
          ]}
          actions={[
            { icon: ExternalLink, label: "Open service", onClick: () => {} },
            { icon: RotateCw, label: "Restart service", onClick: () => {} },
            { icon: Activity, label: "Health check", onClick: () => {} },
            { icon: Heart, label: "Add to favorites", onClick: () => {} },
            { icon: Info, label: "View details", onClick: () => {} },
          ]}
        />

        {/* PostgreSQL - Healthy Core Service */}
        <TkServiceCard
          name="PostgreSQL"
          description="Primary database service"
          icon="tk_data"
          status="healthy"
          enabled={postgresEnabled}
          onToggle={setPostgresEnabled}
          badges={[
            { label: "Database", variant: "outline" },
            { label: "PostgreSQL 15", variant: "outline" },
            { label: "Core", variant: "default" },
          ]}
          metrics={[
            { label: "Pods", value: "1 / 1 Running" },
            { label: "Connections", value: "47 / 100" },
          ]}
          actions={[
            { icon: RotateCw, label: "Restart service", onClick: () => {} },
            { icon: Activity, label: "Health check", onClick: () => {} },
            { icon: Info, label: "View details", onClick: () => {} },
          ]}
        />

        {/* Redis - Unhealthy Optional Service */}
        <TkServiceCard
          name="Redis Cache"
          description="In-memory cache service"
          icon="tk_observability"
          status="unhealthy"
          enabled={redisEnabled}
          onToggle={setRedisEnabled}
          badges={[
            { label: "Cache", variant: "outline" },
            { label: "Redis 7", variant: "outline" },
            { label: "Optional", variant: "secondary" },
          ]}
          metrics={[
            { label: "Pods", value: "0 / 1 Running", variant: "error" },
            { label: "Last Seen", value: "5 minutes ago" },
          ]}
          actions={[
            { icon: RotateCw, label: "Attempt to restart", onClick: () => {}, variant: "default" },
            { icon: Info, label: "View logs", onClick: () => {} },
            { icon: Trash2, label: "Delete service", onClick: () => {}, variant: "destructive" },
          ]}
        />

        {/* Compact Favorite TkCard Example */}
        <TkCard className="border-accent">
          <TkCardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TkBrandIcon icon="tk_code" alt="Code" size={16} />
                <TkCardTitle className="text-base">FastAPI Backend</TkCardTitle>
              </div>
              <TkBadge variant="success" className="text-xs">Up</TkBadge>
            </div>
          </TkCardHeader>
          <TkCardContent className="pb-2">
            <div className="flex gap-1 mb-2">
              <TkBadge variant="outline" className="text-xs">FastAPI</TkBadge>
              <TkBadge variant="outline" className="text-xs">Python</TkBadge>
            </div>
            <div className="flex gap-1">
              <TkTooltip content="Open">
                <TkButton size="icon" variant="ghost" className="h-7 w-7">
                  <ExternalLink className="h-3 w-3" />
                </TkButton>
              </TkTooltip>
              <TkTooltip content="Details">
                <TkButton size="icon" variant="ghost" className="h-7 w-7">
                  <Info className="h-3 w-3" />
                </TkButton>
              </TkTooltip>
            </div>
          </TkCardContent>
        </TkCard>
      </div>

      {/* Comparison Section */}
      <TkCard className="mt-8 bg-muted/50">
        <TkCardHeader>
          <TkCardTitle>Migration Benefits</TkCardTitle>
          <TkCardDescription>What you gain with React + shadcn/ui</TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-success)]">✓ Improved</h3>
              <ul className="space-y-1 text-sm">
                <li>• More granular control over styling</li>
                <li>• Better accessibility out of the box</li>
                <li>• Smaller bundle size with tree-shaking</li>
                <li>• Type-safe component props</li>
                <li>• Better IDE support and autocomplete</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">→ Maintained</h3>
              <ul className="space-y-1 text-sm">
                <li>• Same visual design language</li>
                <li>• Identical functionality</li>
                <li>• All tooltips and interactions</li>
                <li>• Theme switching (light/dark)</li>
                <li>• Responsive behavior</li>
              </ul>
            </div>
          </div>
        </TkCardContent>
      </TkCard>
    </PageWrapper>
  );
}
