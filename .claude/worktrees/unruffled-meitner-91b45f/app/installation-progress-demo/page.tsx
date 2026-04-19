"use client";

import { useState, useEffect } from "react";
import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkButton, TkLoadingButton } from "@/components/buttons-badges";
import {
  TkProgressBar,
  TkProgressBarWithRecentSteps,
  TkSubwayProgress,
  TkStepList,
  TkDotProgress,
} from "@/components/progress";

const installationSteps = [
  "Initialize environment",
  "Check system requirements",
  "Install base packages",
  "Configure network settings",
  "Setup storage volumes",
  "Install Docker runtime",
  "Configure container registry",
  "Pull base images",
  "Setup Kubernetes cluster",
  "Install CNI plugins",
  "Configure ingress controller",
  "Setup certificate manager",
  "Install monitoring stack",
  "Configure logging pipeline",
  "Setup JupyterHub",
  "Configure authentication",
  "Install PostgreSQL",
  "Setup Redis cache",
  "Configure backup system",
  "Install optional components",
  "Run security hardening",
  "Validate installation",
  "Finalize configuration",
];

export default function InstallationProgressDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && currentStep < installationSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= installationSteps.length) {
      setIsRunning(false);
    }
  }, [isRunning, currentStep]);

  const startDemo = () => {
    setCurrentStep(0);
    setIsRunning(true);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  const currentLabel =
    currentStep > 0 && currentStep <= installationSteps.length
      ? installationSteps[currentStep - 1]
      : undefined;

  return (
    <TkPageWrapper
      title="Installation Progress Indicators"
      description="Side-by-side comparison of the 5 progress components driving the same installation sequence"
    >
      <div className="mb-6 flex gap-3">
        <TkLoadingButton loading={isRunning} onClick={startDemo}>
          {isRunning ? "Running..." : "Start Demo"}
        </TkLoadingButton>
        {currentStep > 0 && (
          <TkButton variant="outline" onClick={reset}>
            Reset
          </TkButton>
        )}
      </div>

      {/* Option 1: Subway */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>Option 1: TkSubwayProgress</TkCardTitle>
          <TkCardDescription>Subway/metro line — clean and minimal</TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkSubwayProgress
            steps={installationSteps}
            current={currentStep}
            isRunning={isRunning}
          />
        </TkCardContent>
      </TkCard>

      {/* Option 2: Progress bar + current step */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>Option 2: TkProgressBar</TkCardTitle>
          <TkCardDescription>Progress bar with current step label</TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkProgressBar
            current={currentStep}
            total={installationSteps.length}
            currentLabel={currentLabel}
            isRunning={isRunning}
          />
        </TkCardContent>
      </TkCard>

      {/* Option 3: Scrollable step list */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>Option 3: TkStepList</TkCardTitle>
          <TkCardDescription>
            Scrollable list of all steps — best when detail matters more than compactness
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkStepList
            steps={installationSteps}
            current={currentStep}
            isRunning={isRunning}
          />
        </TkCardContent>
      </TkCard>

      {/* Option 4: Dots */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>Option 4: TkDotProgress</TkCardTitle>
          <TkCardDescription>Minimal dot indicator — compact for tight spaces</TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkDotProgress
            steps={installationSteps}
            current={currentStep}
            isRunning={isRunning}
            currentLabel={currentLabel}
            showBadge
          />
        </TkCardContent>
      </TkCard>

      {/* Option 5: Hybrid */}
      <TkCard>
        <TkCardHeader>
          <TkCardTitle>Option 5: TkProgressBarWithRecentSteps</TkCardTitle>
          <TkCardDescription>
            Progress bar plus last 3 completed steps — overall progress with recent context
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkProgressBarWithRecentSteps
            steps={installationSteps}
            current={currentStep}
            isRunning={isRunning}
            title="Installing Thinkube"
          />
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
