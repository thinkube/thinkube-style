"use client";

import { useEffect, useState } from "react";
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

const steps = [
  "Initialize environment",
  "Check system requirements",
  "Install base packages",
  "Configure network",
  "Setup storage",
  "Install Docker runtime",
  "Configure registry",
  "Pull base images",
  "Setup Kubernetes",
  "Install CNI plugins",
  "Configure ingress",
  "Setup certificates",
];

export default function ProgressPage() {
  const [current, setCurrent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    if (current >= steps.length) {
      setIsRunning(false);
      return;
    }
    const timer = setTimeout(() => setCurrent(current + 1), 1200);
    return () => clearTimeout(timer);
  }, [isRunning, current]);

  const start = () => {
    setCurrent(0);
    setIsRunning(true);
  };
  const reset = () => {
    setCurrent(0);
    setIsRunning(false);
  };

  const currentLabel = current > 0 && current <= steps.length ? steps[current - 1] : undefined;

  return (
    <TkPageWrapper
      title="Progress Indicators"
      description="Five progress components for multi-step operations: use the right one for the space and level of detail you need"
    >
      <div className="mb-6 flex gap-3">
        <TkLoadingButton loading={isRunning} onClick={start}>
          {isRunning ? "Running..." : "Start demo"}
        </TkLoadingButton>
        {current > 0 && (
          <TkButton intent="secondary" onClick={reset}>
            Reset
          </TkButton>
        )}
      </div>

      {/* TkSubwayProgress */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkSubwayProgress</TkCardTitle>
          <TkCardDescription>
            Subway/metro line style. Best for installer-like flows with a moderate step count (8-20).
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkSubwayProgress steps={steps} current={current} isRunning={isRunning} />
        </TkCardContent>
      </TkCard>

      {/* TkProgressBar */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkProgressBar</TkCardTitle>
          <TkCardDescription>
            Simple progress bar with current step label. Compact — fits in cards and dialogs.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkProgressBar
            current={current}
            total={steps.length}
            currentLabel={currentLabel}
            isRunning={isRunning}
          />
        </TkCardContent>
      </TkCard>

      {/* TkProgressBarWithRecentSteps */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkProgressBarWithRecentSteps</TkCardTitle>
          <TkCardDescription>
            Progress bar plus the last 3 completed steps. Best when you want overall progress AND recent context.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkProgressBarWithRecentSteps
            steps={steps}
            current={current}
            isRunning={isRunning}
            title="Installing Thinkube"
          />
        </TkCardContent>
      </TkCard>

      {/* TkStepList */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkStepList</TkCardTitle>
          <TkCardDescription>
            Scrollable list of all steps with status icons. Best when detail matters more than compactness.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkStepList steps={steps} current={current} isRunning={isRunning} />
        </TkCardContent>
      </TkCard>

      {/* TkDotProgress */}
      <TkCard>
        <TkCardHeader>
          <TkCardTitle>TkDotProgress</TkCardTitle>
          <TkCardDescription>
            Minimal dot indicator. Best for tight spaces — status bars, card footers, compact summaries.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkDotProgress
            steps={steps}
            current={current}
            isRunning={isRunning}
            currentLabel={currentLabel}
            showBadge
          />
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
