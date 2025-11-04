"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { TkCard, TkCardContent, TkCardHeader, TkCardTitle, TkCardDescription } from "@/components/cards-data";
import { TkProgress, TkInfoAlert, TkSuccessAlert, TkWarningAlert, TkErrorAlert } from "@/components/feedback";
import { TkButton } from "@/components/buttons-badges";
import { Loader2, Download } from "lucide-react";
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
    <PageWrapper
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
              <TkCardTitle>Spinner Sizes</TkCardTitle>
              <TkCardDescription>Different spinner sizes</TkCardDescription>
            </TkCardHeader>
            <TkCardContent>
              <div className="flex items-center gap-6">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Loading Buttons</TkCardTitle>
              <TkCardDescription>Buttons with loading states</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="flex flex-wrap gap-3">
              <TkButton disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </TkButton>
              <TkButton variant="secondary" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </TkButton>
              <TkButton variant="outline" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </TkButton>
            </TkCardContent>
          </TkCard>

          <TkCard>
            <TkCardHeader>
              <TkCardTitle>Loading State Demo</TkCardTitle>
              <TkCardDescription>Interactive loading example</TkCardDescription>
            </TkCardHeader>
            <TkCardContent className="space-y-4">
              <TkButton onClick={handleLoadingDemo} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Start Download
                  </>
                )}
              </TkButton>
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
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-sm font-medium">Loading services...</p>
                <p className="text-xs text-muted-foreground mt-1">Please wait</p>
              </div>
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
    </PageWrapper>
  );
}
