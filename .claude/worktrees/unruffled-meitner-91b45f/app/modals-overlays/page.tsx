"use client";

import { useState } from "react";
import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkButton } from "@/components/buttons-badges";
import { TkInput, TkLabel, TkTextarea } from "@/components/forms-inputs";
import { TkDialog, TkConfirmDialog, TkControlledConfirmDialog, TkTooltip } from "@/components/modals-overlays";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, HelpCircle, Info, Settings, Trash2, Eye, RefreshCw } from "lucide-react";

export default function ModalsOverlaysPage() {
  const [showRestartDialog, setShowRestartDialog] = useState(false);
  const [serviceName, setServiceName] = useState("JupyterHub");
  return (
    <TkPageWrapper
      title="Modals & Overlays"
      description="Dialogs, modals, tooltips, and overlay components"
    >
      {/* Dialogs / Modals */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Dialogs / Modals</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TkCard>
            <TkCardHeader>
              <TkCardTitle className="text-base">Simple Dialog</TkCardTitle>
              <TkCardDescription>Basic dialog with message</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkConfirmDialog
                trigger={<TkButton variant="outline">Open Dialog</TkButton>}
                title="Are you sure?"
                description="This action cannot be undone. This will permanently delete your data."
                onConfirm={() => {}}
              />
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle className="text-base">Form Dialog</TkCardTitle>
              <TkCardDescription>Dialog with form inputs</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkDialog
                trigger={<TkButton>Create Item</TkButton>}
                title="Create New Item"
                description="Add a new item to your collection."
                footer={
                  <>
                    <TkButton variant="outline">Cancel</TkButton>
                    <TkButton>Save</TkButton>
                  </>
                }
              >
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <TkLabel htmlFor="name">Name</TkLabel>
                    <TkInput id="name" placeholder="Enter name" />
                  </div>
                  <div className="space-y-2">
                    <TkLabel htmlFor="description">Description</TkLabel>
                    <TkTextarea id="description" placeholder="Enter description" />
                  </div>
                </div>
              </TkDialog>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle className="text-base">Confirmation Dialog</TkCardTitle>
              <TkCardDescription>Destructive action confirmation</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkConfirmDialog
                trigger={
                  <TkButton variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Service
                  </TkButton>
                }
                title="Delete Service"
                description="Are you sure you want to delete this service? This action cannot be undone."
                variant="destructive"
                confirmText="Delete"
                onConfirm={() => {}}
              />
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle className="text-base">Controlled Dialog</TkCardTitle>
              <TkCardDescription>Programmatically controlled with state</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkButton
                variant="destructive"
                onClick={() => setShowRestartDialog(true)}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Restart {serviceName}
              </TkButton>

              <TkControlledConfirmDialog
                open={showRestartDialog}
                onOpenChange={setShowRestartDialog}
                title="Restart Service"
                description={`Are you sure you want to restart ${serviceName}? This will temporarily interrupt the service.`}
                variant="destructive"
                confirmText="Restart"
                onConfirm={() => {
                  setShowRestartDialog(false);
                  alert(`${serviceName} restarted!`);
                }}
              />
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle className="text-base">Large Dialog</TkCardTitle>
              <TkCardDescription>Dialog with more content</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkDialog
                trigger={
                  <TkButton variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Service Details
                  </TkButton>
                }
                title="Service Details"
                description="Comprehensive information about this service"
                maxWidth="2xl"
                footer={
                  <>
                    <TkButton variant="outline">Close</TkButton>
                    <TkButton>Open Service</TkButton>
                  </>
                }
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <TkLabel className="text-sm font-medium">Name</TkLabel>
                      <p className="text-sm text-muted-foreground">JupyterHub</p>
                    </div>
                    <div>
                      <TkLabel className="text-sm font-medium">Status</TkLabel>
                      <p className="text-sm text-[var(--color-success)]">Healthy</p>
                    </div>
                    <div>
                      <TkLabel className="text-sm font-medium">Type</TkLabel>
                      <p className="text-sm text-muted-foreground">User Application</p>
                    </div>
                    <div>
                      <TkLabel className="text-sm font-medium">Pods</TkLabel>
                      <p className="text-sm text-muted-foreground">2 / 2 Running</p>
                    </div>
                  </div>
                  <div>
                    <TkLabel className="text-sm font-medium">Description</TkLabel>
                    <p className="text-sm text-muted-foreground mt-1">
                      Multi-user notebook environment for data science and machine learning workflows.
                      Provides isolated Python environments with GPU support.
                    </p>
                  </div>
                </div>
              </TkDialog>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle className="text-base">Scrollable Content</TkCardTitle>
              <TkCardDescription>Dialog with long content</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkDialog
                trigger={
                  <TkButton variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Logs
                  </TkButton>
                }
                title="Container Logs"
                description="Real-time logs from the service container"
                maxWidth="3xl"
                maxHeight="max-h-[80vh]"
                footer={
                  <>
                    <TkButton variant="outline">Download</TkButton>
                    <TkButton>Close</TkButton>
                  </>
                }
              >
                <div className="bg-muted p-4 rounded-md font-mono text-xs space-y-1">
                  <div>[2025-11-03 09:15:23] INFO: Starting service...</div>
                  <div>[2025-11-03 09:15:24] INFO: Loading configuration from /etc/config.yaml</div>
                  <div>[2025-11-03 09:15:25] INFO: Connecting to database...</div>
                  <div>[2025-11-03 09:15:26] INFO: Database connection established</div>
                  <div>[2025-11-03 09:15:27] INFO: Initializing API endpoints...</div>
                  <div>[2025-11-03 09:15:28] INFO: Server listening on port 8000</div>
                  <div>[2025-11-03 09:15:29] INFO: Health check endpoint: /health</div>
                  <div>[2025-11-03 09:15:30] INFO: Service ready</div>
                  <div>[2025-11-03 09:16:01] INFO: GET /api/status - 200</div>
                  <div>[2025-11-03 09:16:15] INFO: POST /api/data - 201</div>
                  <div>[2025-11-03 09:16:30] INFO: GET /health - 200</div>
                </div>
              </TkDialog>
            </TkCardContent>
          </TkCard>
        </div>
      </div>

      {/* Tooltips */}
      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">Tooltips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Basic Tooltips</TkCardTitle>
              <TkCardDescription>Hover over items for more info</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <TkTooltip content="Information">
                  <TkButton variant="outline">
                    <Info className="h-4 w-4" />
                  </TkButton>
                </TkTooltip>

                <TkTooltip content="Settings">
                  <TkButton variant="outline">
                    <Settings className="h-4 w-4" />
                  </TkButton>
                </TkTooltip>

                <TkTooltip content="Help & Documentation">
                  <TkButton variant="outline">
                    <HelpCircle className="h-4 w-4" />
                  </TkButton>
                </TkTooltip>

                <TkTooltip content="Delete permanently">
                  <TkButton variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </TkButton>
                </TkTooltip>
              </div>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Tooltip on Text</TkCardTitle>
              <TkCardDescription>Tooltips can be on any element</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <TooltipProvider>
                <div className="space-y-2">
                  <p className="text-sm">
                    Hover over the{" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="underline decoration-dotted cursor-help text-primary">
                          technical term
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          This is a detailed explanation of the technical term that provides
                          additional context to help users understand.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    {" "}to see more information.
                  </p>

                  <p className="text-sm">
                    Service status: {" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center gap-1 cursor-help">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
                          <span className="text-[var(--color-success)]">Healthy</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>All health checks passing</p>
                        <p className="text-xs text-muted-foreground">Last checked: 2 minutes ago</p>
                      </TooltipContent>
                    </Tooltip>
                  </p>
                </div>
              </TooltipProvider>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Service TkCard Actions</TkCardTitle>
              <TkCardDescription>Example from your service cards</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <div className="flex gap-2">
                <TkTooltip content="Open service">
                  <TkButton size="icon" variant="outline">
                    <Eye className="h-4 w-4" />
                  </TkButton>
                </TkTooltip>

                <TkTooltip content="Restart service">
                  <TkButton size="icon" variant="outline">
                    <Settings className="h-4 w-4" />
                  </TkButton>
                </TkTooltip>

                <TkTooltip content="Health check">
                  <TkButton size="icon" variant="outline">
                    <AlertCircle className="h-4 w-4" />
                  </TkButton>
                </TkTooltip>

                <TkTooltip content="View details">
                  <TkButton size="icon" variant="outline">
                    <Info className="h-4 w-4" />
                  </TkButton>
                </TkTooltip>
              </div>
            </TkCardContent>
          </TkCard>
        </div>
      </div>
    </TkPageWrapper>
  );
}
