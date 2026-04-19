"use client";

import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardHeader, TkCardTitle, TkCardDescription } from "@/components/cards-data";
import {
  TkProgress,
  TkInfoAlert,
  TkSuccessAlert,
  TkWarningAlert,
  TkErrorAlert,
  TkLoader,
  TkCodeBlock,
  TkAlert,
  TkAlertTitle,
  TkAlertDescription,
  tkToast,
} from "@/components/feedback";
import { TkButton, TkLoadingButton } from "@/components/buttons-badges";
import { Download, Terminal, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function FeedbackPage() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <TkPageWrapper
      title="Feedback Components"
      description="Alerts, progress indicators, and loading states"
    >
      {/* Alerts */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Alerts</h2>
        <div className="space-y-4">
          <TkInfoAlert title="Information">
            This is an informational alert. Use it for general notices and tips.
          </TkInfoAlert>

          <TkSuccessAlert title="Success">
            Your changes have been saved successfully. The service has been restarted.
          </TkSuccessAlert>

          <TkWarningAlert title="Warning">
            This action cannot be undone. Please review your changes before proceeding.
          </TkWarningAlert>

          <TkErrorAlert title="Error">
            Failed to connect to the service. Please check your network connection and try again.
          </TkErrorAlert>

          <TkInfoAlert title="Installation Instructions">
            Before proceeding, ensure all servers are accessible via SSH and have the required minimum specs:
            8GB RAM, 50GB disk space, and network connectivity between all nodes.
          </TkInfoAlert>

          <TkInfoAlert>
            This is a simpler alert without a title. Perfect for short messages.
          </TkInfoAlert>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold font-heading mb-4">Progress Indicators</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Animated Progress</TkCardTitle>
              <TkCardDescription>Auto-incrementing progress bar</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <TkProgress value={progress} />
              </div>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Installation Progress</TkCardTitle>
              <TkCardDescription>Example from installer workflow</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Installing Kubernetes...</span>
                  <span className="font-medium">67%</span>
                </div>
                <TkProgress value={67} />
                <p className="text-xs text-muted-foreground">
                  This may take several minutes. Do not close this window.
                </p>
              </div>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Different States</TkCardTitle>
              <TkCardDescription>Progress at various completion levels</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm">25%</span>
                <TkProgress value={25} />
              </div>
              <div className="space-y-2">
                <span className="text-sm">50%</span>
                <TkProgress value={50} />
              </div>
              <div className="space-y-2">
                <span className="text-sm">75%</span>
                <TkProgress value={75} />
              </div>
              <div className="space-y-2">
                <span className="text-sm">100%</span>
                <TkProgress value={100} />
              </div>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Network Scan Progress</TkCardTitle>
              <TkCardDescription>Server discovery example</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Scanning network 192.168.1.0/24...</span>
                  <span className="font-medium">45%</span>
                </div>
                <TkProgress value={45} />
                <p className="text-xs text-muted-foreground">
                  Found 3 servers so far
                </p>
              </div>
            </TkCardContent>
          </TkCard>
        </div>
      </div>

      {/* Loading Spinners */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold font-heading mb-4">Loading Spinners</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <TkCard>
            <TkCardHeader>
              <TkCardTitle>TkLoader Sizes</TkCardTitle>
              <TkCardDescription>sm, md (default), lg</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <div className="flex items-center gap-6 text-primary">
                <TkLoader size="sm" />
                <TkLoader size="md" />
                <TkLoader size="lg" />
              </div>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>TkLoadingButton</TkCardTitle>
              <TkCardDescription>Button with built-in spinner + auto-disable</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="flex flex-wrap gap-3">
              <TkLoadingButton loading>Loading...</TkLoadingButton>
              <TkLoadingButton loading variant="secondary">Processing</TkLoadingButton>
              <TkLoadingButton loading variant="outline">Please wait</TkLoadingButton>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Loading State Demo</TkCardTitle>
              <TkCardDescription>Interactive loading example</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <TkLoadingButton loading={isLoading} onClick={handleLoadingDemo}>
                <Download className="mr-2 h-4 w-4" />
                Start Download
              </TkLoadingButton>
              {isLoading && (
                <p className="text-sm text-muted-foreground">
                  Downloading data... This will take a few seconds.
                </p>
              )}
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Page Loading State</TkCardTitle>
              <TkCardDescription>Full page or section loading</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed">
                <TkLoader size="lg" className="text-primary mb-4" />
                <p className="text-sm font-medium">Loading services...</p>
                <p className="text-xs text-muted-foreground mt-1">Please wait</p>
              </div>
            </TkCardContent>
          </TkCard>
        </div>
      </div>

      {/* TkAlert primitives */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">TkAlert Primitives</h2>
        <p className="text-sm text-muted-foreground mb-4">
          For custom alert styling, compose <code className="text-xs">TkAlert</code>,
          <code className="text-xs"> TkAlertTitle</code> and
          <code className="text-xs"> TkAlertDescription</code> directly. Use
          <code className="text-xs"> TkInfoAlert</code> / <code className="text-xs">TkSuccessAlert</code> etc. when one of the preset semantics fits.
        </p>
        <div className="space-y-4">
          <TkAlert>
            <Sparkles className="h-4 w-4" />
            <TkAlertTitle>Neutral alert</TkAlertTitle>
            <TkAlertDescription>
              Primitive TkAlert with default styling — no semantic color. Use for custom scenarios.
            </TkAlertDescription>
          </TkAlert>

          <TkAlert className="border-primary/40 bg-primary/5">
            <Sparkles className="h-4 w-4 text-primary" />
            <TkAlertTitle className="text-primary">Custom branded alert</TkAlertTitle>
            <TkAlertDescription className="text-primary">
              You can override colors when none of the semantic variants fits.
            </TkAlertDescription>
          </TkAlert>
        </div>
      </div>

      {/* Toasts */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Toast Notifications</h2>
        <TkCard>
          <TkCardHeader>
            <TkCardTitle>TkToaster + tkToast</TkCardTitle>
            <TkCardDescription>
              Mount <code className="text-xs">&lt;TkToaster /&gt;</code> once at the app root, then call
              <code className="text-xs"> tkToast(...)</code> from anywhere.
            </TkCardDescription>
          </TkCardHeader>
          <TkCardContent>
            <div className="flex flex-wrap gap-3">
              <TkButton onClick={() => tkToast("Default toast message")}>
                Default
              </TkButton>
              <TkButton
                variant="secondary"
                onClick={() => tkToast.success("Service started successfully")}
              >
                Success
              </TkButton>
              <TkButton
                variant="outline"
                onClick={() =>
                  tkToast.info("Heads up", {
                    description: "The cluster will be upgraded tonight at 23:00.",
                  })
                }
              >
                Info with description
              </TkButton>
              <TkButton
                variant="outline"
                onClick={() =>
                  tkToast.warning("Low disk space", {
                    description: "Less than 5% free on /var/lib/containerd",
                  })
                }
              >
                Warning
              </TkButton>
              <TkButton
                variant="destructive"
                onClick={() => tkToast.error("Failed to deploy service")}
              >
                Error
              </TkButton>
              <TkButton
                variant="outline"
                onClick={() =>
                  tkToast("Restart required", {
                    action: {
                      label: "Restart",
                      onClick: () => tkToast.success("Restart triggered"),
                    },
                  })
                }
              >
                With action
              </TkButton>
            </div>
          </TkCardContent>
        </TkCard>
      </div>

      {/* TkCodeBlock */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">Code & Logs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <TkCard>
            <TkCardHeader>
              <TkCardTitle className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                TkCodeBlock — solid
              </TkCardTitle>
              <TkCardDescription>Default monospaced block for code snippets</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkCodeBlock maxHeight="h-48">{`$ kubectl get pods -n thinkube-control
NAME                                         READY   STATUS    RESTARTS   AGE
thinkube-control-backend-74c5bf9f48-wxmtq    1/1     Running   0          2d3h
thinkube-control-frontend-7b8f9d5c6c-lhpnb   1/1     Running   0          2d3h
thinkube-control-db-0                        1/1     Running   0          14d`}</TkCodeBlock>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>TkCodeBlock — translucent</TkCardTitle>
              <TkCardDescription>Lower-contrast variant for inline code blocks</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <TkCodeBlock variant="translucent" maxHeight="h-48">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: thinkube-control-backend
  namespace: thinkube-control
spec:
  replicas: 1
  selector:
    matchLabels:
      app: thinkube-control-backend`}</TkCodeBlock>
            </TkCardContent>
          </TkCard>
        </div>
      </div>

      {/* Combined Examples */}
      <div>
        <h2 className="text-2xl font-semibold font-heading mb-4">Combined Feedback</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Deployment Status</TkCardTitle>
              <TkCardDescription>Real-time deployment feedback</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <TkInfoAlert>
                Deployment started. This will take approximately 5 minutes.
              </TkInfoAlert>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Deploying to cluster...</span>
                  <span className="font-medium">73%</span>
                </div>
                <TkProgress value={73} />
              </div>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Error with Recovery</TkCardTitle>
              <TkCardDescription>Error state with action button</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <TkErrorAlert title="Connection Failed">
                Could not connect to the API server. Check your network connection.
              </TkErrorAlert>
              <TkButton variant="outline">
                Retry Connection
              </TkButton>
            </TkCardContent>
          </TkCard>
        </div>
      </div>
    </TkPageWrapper>
  );
}
