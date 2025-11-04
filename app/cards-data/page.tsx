"use client"

import { PageWrapper } from "@/components/page-wrapper";
import { TkCard, TkCardContent, TkCardDescription, TkCardFooter, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkBadge, TkSuccessBadge, TkErrorBadge } from "@/components/buttons-badges";
import { TkButton } from "@/components/buttons-badges";
import { TkSeparator } from "@/components/utilities";
import { TkTable, TkTableBody, TkTableCell, TkTableHead, TkTableHeader, TkTableRow } from "@/components/tables";
import { TkAvatar } from "@/components/utilities";
import { TkStatsCard, TkStatCard, TkHighlightCard } from "@/components/cards-data";
import { Activity, Database, Cpu, HardDrive, Users, Server, Zap } from "lucide-react";

export default function CardsDataPage() {
  return (
    <PageWrapper
      title="TkCards & Data Display"
      description="TkCards, tables, stats, and data presentation components"
    >
      {/* Basic TkCards */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Basic TkCards</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Simple TkCard</TkCardTitle>
              <TkCardDescription>A basic card with title and description</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <p className="text-sm text-muted-foreground">
                This is the card content area. You can place any content here.
              </p>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>TkCard with Footer</TkCardTitle>
              <TkCardDescription>Includes action buttons in footer</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <p className="text-sm">Content goes here with some information.</p>
            </TkCardContent>
            <TkCardFooter className="flex gap-2">
              <TkButton size="sm">Action</TkButton>
              <TkButton size="sm" variant="outline">Cancel</TkButton>
            </TkCardFooter>
          </TkCard>

          <TkHighlightCard
            icon={Activity}
            title="Highlighted TkCard"
          >
            <p className="text-sm">TkCard with colored border and icon</p>
          </TkHighlightCard>
        </div>
      </div>

      {/* Stats TkCards */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Stats Display</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TkStatsCard
            title="Total Services"
            value="42"
            description="+12% from last month"
            icon={Database}
          />

          <TkStatsCard
            title="CPU Usage"
            value="67%"
            description="Normal load"
            icon={Cpu}
          />

          <TkStatsCard
            title="Memory"
            value="24 GB"
            description="of 32 GB used"
            icon={HardDrive}
          />

          <TkStatsCard
            title="Active Users"
            value="156"
            description="+8 in last hour"
            icon={Activity}
          />
        </div>
      </div>

      {/* TkStatCard with Trends */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">TkStatCard with Trends</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TkStatCard
            title="Active Users"
            value="2,543"
            description="Total registered users"
            icon={Users}
            trend={{ value: 12, direction: "up", label: "vs last month" }}
            variant="success"
          />

          <TkStatCard
            title="Server Load"
            value="45%"
            description="Current capacity"
            icon={Server}
            trend={{ value: 8, direction: "down", label: "reduced from peak" }}
            variant="primary"
          />

          <TkStatCard
            title="Response Time"
            value="124ms"
            description="Average latency"
            icon={Zap}
            trend={{ value: 3, direction: "up", label: "slight increase" }}
            variant="warning"
          />

          <TkStatCard
            title="Error Rate"
            value="0.03%"
            description="Last 24 hours"
            icon={Activity}
            trend={{ value: 45, direction: "down", label: "major improvement" }}
            variant="destructive"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <TkStatCard
            title="Database Size"
            value="847 GB"
            description="PostgreSQL primary"
            icon={Database}
            badge={<TkBadge variant="outline">Growing</TkBadge>}
          />

          <TkStatCard
            title="API Calls"
            value="1.2M"
            description="This month"
            trend={{ value: 0, direction: "neutral" }}
          />
        </div>
      </div>

      {/* Service-like TkCards (from inventory) */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Service TkCards</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TkCard>
            <TkCardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <TkCardTitle className="text-lg">JupyterHub</TkCardTitle>
                  <TkCardDescription className="mt-1">Interactive notebooks</TkCardDescription>
                </div>
                <TkSuccessBadge>Healthy</TkSuccessBadge>
              </div>
            </TkCardHeader>
            <TkCardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                <TkBadge variant="outline">Python</TkBadge>
                <TkBadge variant="outline">Jupyter</TkBadge>
                <TkBadge className="border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10 text-[var(--color-warning)] font-semibold">4 GPUs</TkBadge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
                <span>Running</span>
              </div>
            </TkCardContent>
            <TkCardFooter className="flex gap-2">
              <TkButton size="sm" variant="outline" className="flex-1">Open</TkButton>
              <TkButton size="sm" variant="outline" className="flex-1">Details</TkButton>
            </TkCardFooter>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <TkCardTitle className="text-lg">PostgreSQL</TkCardTitle>
                  <TkCardDescription className="mt-1">Database service</TkCardDescription>
                </div>
                <TkSuccessBadge>Healthy</TkSuccessBadge>
              </div>
            </TkCardHeader>
            <TkCardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                <TkBadge variant="outline">Database</TkBadge>
                <TkBadge>Core</TkBadge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
                <span>Running</span>
              </div>
            </TkCardContent>
            <TkCardFooter className="flex gap-2">
              <TkButton size="sm" variant="outline" className="flex-1">Details</TkButton>
              <TkButton size="sm" variant="destructive" className="flex-1">Stop</TkButton>
            </TkCardFooter>
          </TkCard>

          <TkCard className="border-destructive/50">
            <TkCardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <TkCardTitle className="text-lg">Redis Cache</TkCardTitle>
                  <TkCardDescription className="mt-1">In-memory cache</TkCardDescription>
                </div>
                <TkErrorBadge>Unhealthy</TkErrorBadge>
              </div>
            </TkCardHeader>
            <TkCardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                <TkBadge variant="outline">Cache</TkBadge>
                <TkBadge variant="secondary">Optional</TkBadge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-destructive" />
                <span>Stopped</span>
              </div>
            </TkCardContent>
            <TkCardFooter className="flex gap-2">
              <TkButton size="sm" className="flex-1">Restart</TkButton>
              <TkButton size="sm" variant="outline" className="flex-1">Logs</TkButton>
            </TkCardFooter>
          </TkCard>
        </div>
      </div>

      {/* TkTables */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">TkTables</h2>

        <TkCard>
          <TkCardHeader>
            <TkCardTitle>Server List</TkCardTitle>
            <TkCardDescription>SSH servers configuration</TkCardDescription>
          </TkCardHeader>
          <TkCardContent>
            <TkTable>
              <TkTableHeader>
                <TkTableRow>
                  <TkTableHead>Hostname</TkTableHead>
                  <TkTableHead>IP Address</TkTableHead>
                  <TkTableHead>Role</TkTableHead>
                  <TkTableHead>Status</TkTableHead>
                </TkTableRow>
              </TkTableHeader>
              <TkTableBody>
                <TkTableRow>
                  <TkTableCell className="font-medium">master-01</TkTableCell>
                  <TkTableCell>192.168.1.10</TkTableCell>
                  <TkTableCell><TkBadge>Master</TkBadge></TkTableCell>
                  <TkTableCell>
                    <TkSuccessBadge>Active</TkSuccessBadge>
                  </TkTableCell>
                </TkTableRow>
                <TkTableRow>
                  <TkTableCell className="font-medium">worker-01</TkTableCell>
                  <TkTableCell>192.168.1.20</TkTableCell>
                  <TkTableCell><TkBadge variant="secondary">Worker</TkBadge></TkTableCell>
                  <TkTableCell>
                    <TkSuccessBadge>Active</TkSuccessBadge>
                  </TkTableCell>
                </TkTableRow>
                <TkTableRow>
                  <TkTableCell className="font-medium">worker-02</TkTableCell>
                  <TkTableCell>192.168.1.21</TkTableCell>
                  <TkTableCell><TkBadge variant="secondary">GPU Worker</TkBadge></TkTableCell>
                  <TkTableCell>
                    <TkSuccessBadge>Active</TkSuccessBadge>
                  </TkTableCell>
                </TkTableRow>
              </TkTableBody>
            </TkTable>
          </TkCardContent>
        </TkCard>
      </div>

      {/* Dividers and TkSeparators */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Dividers</h2>
        <TkCard>
          <TkCardHeader>
            <TkCardTitle>Section Dividers</TkCardTitle>
          </TkCardHeader>
          <TkCardContent className="space-y-4">
            <div>
              <p className="text-sm">Content above divider</p>
            </div>
            <TkSeparator />
            <div>
              <p className="text-sm">Content below divider</p>
            </div>
            <TkSeparator />
            <div>
              <p className="text-sm">Another section</p>
            </div>
          </TkCardContent>
        </TkCard>
      </div>

      {/* TkAvatar */}
      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">TkAvatars</h2>
        <TkCard>
          <TkCardHeader>
            <TkCardTitle>User TkAvatars</TkCardTitle>
            <TkCardDescription>Profile pictures and initials</TkCardDescription>
          </TkCardHeader>
          <TkCardContent className="flex items-center gap-4">
            <TkAvatar fallback="JD" />
            <TkAvatar fallback="AM" className="h-12 w-12" />
            <TkAvatar fallback="TS" className="h-16 w-16" />
          </TkCardContent>
        </TkCard>
      </div>
    </PageWrapper>
  );
}
