"use client";

import { useState, useEffect } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkButton } from "@/components/buttons-badges";
import { Check, Loader2, Circle } from "lucide-react";
import { TkBadge } from "@/components/buttons-badges";

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

  const progress = (currentStep / installationSteps.length) * 100;
  const totalSteps = installationSteps.length;

  return (
    <PageWrapper
      title="Installation Progress Indicators"
      description="Compact progress indicators for multi-step processes like Ansible playbook execution"
    >
      <div className="mb-6 flex gap-3">
        <TkButton onClick={startDemo} disabled={isRunning}>
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            "Start Demo"
          )}
        </TkButton>
        {currentStep > 0 && (
          <TkButton variant="outline" onClick={() => { setCurrentStep(0); setIsRunning(false); }}>
            Reset
          </TkButton>
        )}
      </div>

      {/* Subway/Metro Line Style */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>Subway Line Progress Indicator</TkCardTitle>
          <TkCardDescription>Clean, minimal - perfect for installation progress</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="space-y-3">
            {/* Current Step Info - Above the line */}
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                {currentStep >= totalSteps ? (
                  <Check className="h-4 w-4 text-success" />
                ) : isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : null}
                <span className="text-sm font-medium">
                  {currentStep >= totalSteps
                    ? "Installation Complete!"
                    : currentStep > 0
                    ? installationSteps[currentStep - 1]
                    : "Ready to start"}
                </span>
              </div>
              <TkBadge variant="outline">
                {currentStep} / {totalSteps}
              </TkBadge>
            </div>

            {/* The Line with Stations */}
            <div className="relative px-4 py-6 group">
              {/* Background line */}
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border -translate-y-1/2" />

              {/* Progress line */}
              <div
                className="absolute top-1/2 left-4 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500"
                style={{
                  width: currentStep >= totalSteps
                    ? 'calc(100% - 2rem)'
                    : `calc(${(currentStep / totalSteps) * 100}% - 1rem)`
                }}
              />

              {/* Stations/Circles */}
              <div className="relative flex justify-between">
                {Array.from({ length: totalSteps }).map((_, index) => {
                  const stepNumber = index + 1;
                  const isComplete = stepNumber < currentStep;
                  const isCurrent = stepNumber === currentStep;
                  const isPending = stepNumber > currentStep;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center relative group/station cursor-help"
                    >
                      {/* Circle */}
                      <div
                        className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                          isComplete
                            ? "bg-primary border-primary"
                            : isCurrent
                            ? "bg-primary border-primary ring-4 ring-primary/20 scale-125"
                            : "bg-background border-border"
                        }`}
                      />

                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover/station:opacity-100 transition-opacity pointer-events-none z-10">
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 whitespace-nowrap">
                          {installationSteps[index]}
                        </div>
                        <div className="w-2 h-2 bg-primary rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Compact Progress Bar + Current Step */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>Option 2: Progress Bar + Current Step</TkCardTitle>
          <TkCardDescription>Alternative: simple progress bar</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                Step {currentStep} of {installationSteps.length}
              </span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {currentStep > 0 && currentStep <= installationSteps.length && (
            <div className="flex items-center gap-2 text-sm">
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <Check className="h-4 w-4 text-success" />
              )}
              <span className={isRunning ? "text-foreground" : "text-success"}>
                {installationSteps[currentStep - 1]}
              </span>
            </div>
          )}
        </TkCardContent>
      </TkCard>

      {/* Compact Step List - Scrollable */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>Option 3: Compact Scrollable List</TkCardTitle>
          <TkCardDescription>Shows all steps, scrolls to current, good for detailed view</TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {installationSteps.map((step, index) => {
              const stepNumber = index + 1;
              const isComplete = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const isPending = stepNumber > currentStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-2 py-1 text-sm transition-colors ${
                    isCurrent ? "bg-primary/10 text-primary font-medium" : ""
                  } ${isComplete ? "text-muted-foreground" : ""} ${
                    isPending ? "text-muted-foreground/50" : ""
                  }`}
                >
                  {isComplete && <Check className="h-3 w-3 text-success flex-shrink-0" />}
                  {isCurrent && <Loader2 className="h-3 w-3 animate-spin text-primary flex-shrink-0" />}
                  {isPending && <Circle className="h-3 w-3 flex-shrink-0" />}
                  <span className="flex-1">{step}</span>
                  <span className="text-xs text-muted-foreground">{stepNumber}</span>
                </div>
              );
            })}
          </div>
        </TkCardContent>
      </TkCard>

      {/* Minimal Dots Progress */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>Option 4: Dot Progress Indicator</TkCardTitle>
          <TkCardDescription>Very compact, visual representation of progress</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">Installation Progress</span>
            <TkBadge>{currentStep} / {installationSteps.length}</TkBadge>
          </div>
          <div className="flex flex-wrap gap-1">
            {installationSteps.map((_, index) => {
              const stepNumber = index + 1;
              const isComplete = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <div
                  key={index}
                  className={`h-2 w-2 transition-all ${
                    isComplete
                      ? "bg-success"
                      : isCurrent
                      ? "bg-primary animate-pulse"
                      : "bg-border"
                  }`}
                  title={installationSteps[index]}
                />
              );
            })}
          </div>
          {currentStep > 0 && currentStep <= installationSteps.length && (
            <div className="flex items-center gap-2 text-sm pt-2 border-t">
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <Check className="h-4 w-4 text-success" />
              )}
              <span>{installationSteps[currentStep - 1]}</span>
            </div>
          )}
        </TkCardContent>
      </TkCard>

      {/* Hybrid: Bar + Recent Steps */}
      <TkCard>
        <TkCardHeader>
          <TkCardTitle>Option 5: Progress Bar + Recent Steps</TkCardTitle>
          <TkCardDescription>Best of both: overall progress + context of recent steps</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Installing Thinkube</span>
              <span className="text-muted-foreground">
                {currentStep} / {installationSteps.length}
              </span>
            </div>
            <div className="h-2 bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Last 3 Steps */}
          <div className="space-y-1">
            {installationSteps
              .slice(Math.max(0, currentStep - 3), currentStep)
              .map((step, index) => {
                const actualIndex = Math.max(0, currentStep - 3) + index;
                const isCurrent = actualIndex === currentStep - 1;

                return (
                  <div
                    key={actualIndex}
                    className={`flex items-center gap-2 px-2 py-1 text-sm ${
                      isCurrent ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {isCurrent && isRunning ? (
                      <Loader2 className="h-3 w-3 animate-spin text-primary flex-shrink-0" />
                    ) : (
                      <Check className="h-3 w-3 text-success flex-shrink-0" />
                    )}
                    <span>{step}</span>
                  </div>
                );
              })}
          </div>
        </TkCardContent>
      </TkCard>
    </PageWrapper>
  );
}
