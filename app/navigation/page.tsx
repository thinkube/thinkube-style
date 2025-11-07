"use client";

import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkButton } from "@/components/buttons-badges";
import { TkDropdownMenu, TkTabs, TkBreadcrumbs, TkFolderTabs, TkFolderTabsList, TkFolderTabsTrigger, TkFolderTabsContent } from "@/components/navigation";
import { useState } from "react";
import { ChevronDown, User, Settings, LogOut, FileText, HelpCircle, Home, RefreshCw, Eye, AlertCircle, StopCircle } from "lucide-react";

export default function NavigationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("day");

  return (
    <TkPageWrapper
      title="Navigation & Menus"
      description="Navigation patterns, dropdown menus, and tabs"
    >
      {/* Dropdown Menus */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Dropdown Menus</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Basic Dropdown</TkCardTitle>
              <TkCardDescription>Simple dropdown menu</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkDropdownMenu
                trigger={
                  <TkButton variant="outline">
                    Open Menu
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </TkButton>
                }
                groups={[
                  {
                    items: [
                      { label: "Option 1" },
                      { label: "Option 2" },
                      { label: "Option 3" },
                    ],
                  },
                ]}
              />
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Profile Dropdown</TkCardTitle>
              <TkCardDescription>User menu with icons and groups</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkDropdownMenu
                trigger={
                  <TkButton variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    Account
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </TkButton>
                }
                groups={[
                  {
                    label: "My Account",
                    items: [
                      { label: "Profile", icon: User },
                      { label: "Settings", icon: Settings },
                    ],
                  },
                  {
                    items: [
                      { label: "Log out", icon: LogOut },
                    ],
                  },
                ]}
              />
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Actions Dropdown</TkCardTitle>
              <TkCardDescription>Service or resource actions</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkDropdownMenu
                trigger={
                  <TkButton>
                    Actions
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </TkButton>
                }
                groups={[
                  {
                    items: [
                      { label: "Start Service", icon: RefreshCw },
                      { label: "Restart Service", icon: RefreshCw },
                    ],
                  },
                  {
                    items: [
                      { label: "View Logs", icon: Eye },
                      { label: "View Details", icon: AlertCircle },
                    ],
                  },
                  {
                    items: [
                      { label: "Stop Service", icon: StopCircle },
                    ],
                  },
                ]}
              />
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Grouped Dropdown</TkCardTitle>
              <TkCardDescription>Menu with multiple sections</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkDropdownMenu
                trigger={
                  <TkButton variant="outline">
                    Help
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </TkButton>
                }
                groups={[
                  {
                    label: "Documentation",
                    items: [
                      { label: "User Guide", icon: FileText },
                      { label: "API Reference", icon: FileText },
                    ],
                  },
                  {
                    label: "Support",
                    items: [
                      { label: "Help Center", icon: HelpCircle },
                      { label: "Contact Support", icon: HelpCircle },
                    ],
                  },
                ]}
              />
            </TkCardContent>
          </TkCard>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Tabs</h2>
        <TkCard>
          <TkCardHeader>
            <TkCardTitle>Tab Navigation</TkCardTitle>
            <TkCardDescription>Organize content into sections (used in Dashboard)</TkCardDescription>
          </TkCardHeader>
          <TkCardContent>
            <TkTabs
              defaultValue="all"
              tabs={[
                {
                  value: "all",
                  label: "All Services",
                  content: (
                    <p className="text-sm text-muted-foreground">
                      All services would be displayed here, including core, optional, and user applications.
                    </p>
                  ),
                },
                {
                  value: "favorites",
                  label: "Favorites",
                  content: (
                    <p className="text-sm text-muted-foreground">
                      Your favorited services for quick access. Drag to reorder.
                    </p>
                  ),
                },
                {
                  value: "core",
                  label: "Core",
                  content: (
                    <p className="text-sm text-muted-foreground">
                      Core system services like PostgreSQL, Redis, and essential infrastructure.
                    </p>
                  ),
                },
                {
                  value: "optional",
                  label: "Optional",
                  content: (
                    <p className="text-sm text-muted-foreground">
                      Optional services that can be enabled or disabled as needed.
                    </p>
                  ),
                },
              ]}
            />
          </TkCardContent>
        </TkCard>
      </div>

      {/* Tab with Icons */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Tabs with Icons</h2>
        <TkCard>
          <TkCardHeader>
            <TkCardTitle>Enhanced Tabs</TkCardTitle>
            <TkCardDescription>Tabs with icons for better visual hierarchy</TkCardDescription>
          </TkCardHeader>
          <TkCardContent>
            <TkTabs
              defaultValue="overview"
              tabs={[
                {
                  value: "overview",
                  label: "Overview",
                  icon: Home,
                  content: (
                    <div className="p-4 rounded-lg bg-muted">
                      <h3 className="font-semibold mb-2">Service Overview</h3>
                      <p className="text-sm text-muted-foreground">
                        General information and status of your services.
                      </p>
                    </div>
                  ),
                },
                {
                  value: "settings",
                  label: "Settings",
                  icon: Settings,
                  content: (
                    <div className="p-4 rounded-lg bg-muted">
                      <h3 className="font-semibold mb-2">Configuration Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage service configuration and preferences.
                      </p>
                    </div>
                  ),
                },
                {
                  value: "docs",
                  label: "Documentation",
                  icon: FileText,
                  content: (
                    <div className="p-4 rounded-lg bg-muted">
                      <h3 className="font-semibold mb-2">Documentation</h3>
                      <p className="text-sm text-muted-foreground">
                        Read the documentation for this service.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </TkCardContent>
        </TkCard>
      </div>

      {/* Folder-Style Tabs */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Folder-Style Tabs</h2>
        <TkCard>
          <TkCardHeader>
            <TkCardTitle>Modern Folder Tabs</TkCardTitle>
            <TkCardDescription>Clean tab pattern where active tab appears "in front" and connects to content</TkCardDescription>
          </TkCardHeader>
          <TkCardContent>
            <TkFolderTabs value={activeTab} onValueChange={setActiveTab}>
              <TkFolderTabsList>
                <TkFolderTabsTrigger value="overview">Overview</TkFolderTabsTrigger>
                <TkFolderTabsTrigger value="metrics">Metrics</TkFolderTabsTrigger>
                <TkFolderTabsTrigger value="logs">Logs</TkFolderTabsTrigger>
                <TkFolderTabsTrigger value="settings">Settings</TkFolderTabsTrigger>
              </TkFolderTabsList>
              <TkFolderTabsContent value="overview">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Service Overview</h3>
                  <p className="text-sm text-muted-foreground">
                    View general information, health status, and key metrics at a glance.
                  </p>
                </div>
              </TkFolderTabsContent>
              <TkFolderTabsContent value="metrics">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Performance Metrics</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor CPU, memory, network usage, and other performance indicators.
                  </p>
                </div>
              </TkFolderTabsContent>
              <TkFolderTabsContent value="logs">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Application Logs</h3>
                  <p className="text-sm text-muted-foreground">
                    View and search through recent application logs and events.
                  </p>
                </div>
              </TkFolderTabsContent>
              <TkFolderTabsContent value="settings">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Configuration</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage service configuration, environment variables, and deployment settings.
                  </p>
                </div>
              </TkFolderTabsContent>
            </TkFolderTabs>
          </TkCardContent>
        </TkCard>

        {/* Time Range Filter Example */}
        <TkCard className="mt-6">
          <TkCardHeader>
            <div className="flex items-center justify-between">
              <div>
                <TkCardTitle>Health History</TkCardTitle>
                <TkCardDescription>Folder tabs as filter controls (like in Service Details)</TkCardDescription>
              </div>
              <TkFolderTabs value={timeRange} onValueChange={setTimeRange}>
                <TkFolderTabsList>
                  <TkFolderTabsTrigger value="hour">Last Hour</TkFolderTabsTrigger>
                  <TkFolderTabsTrigger value="day">Last Day</TkFolderTabsTrigger>
                  <TkFolderTabsTrigger value="week">Last Week</TkFolderTabsTrigger>
                </TkFolderTabsList>
              </TkFolderTabs>
            </div>
          </TkCardHeader>
          <TkCardContent>
            <div className="h-32 flex items-center justify-center bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                Health chart for <strong>{timeRange === 'hour' ? 'Last Hour' : timeRange === 'day' ? 'Last Day' : 'Last Week'}</strong>
              </p>
            </div>
          </TkCardContent>
        </TkCard>
      </div>

      {/* Breadcrumbs */}
      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">Breadcrumbs</h2>
        <TkCard>
          <TkCardHeader>
            <TkCardTitle>Navigation Breadcrumbs</TkCardTitle>
            <TkCardDescription>Show current location in hierarchy</TkCardDescription>
          </TkCardHeader>
          <TkCardContent className="space-y-4">
            <TkBreadcrumbs
              items={[
                { label: "Home", href: "#" },
                { label: "Services", href: "#" },
                { label: "JupyterHub" },
              ]}
            />

            <TkBreadcrumbs
              items={[
                { label: "Dashboard", href: "#" },
                { label: "Configuration", href: "#" },
                { label: "Network", href: "#" },
                { label: "SSH Setup" },
              ]}
            />
          </TkCardContent>
        </TkCard>
      </div>
    </TkPageWrapper>
  );
}
