"use client";

import { useMemo } from "react";
import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkHealthChart, type HealthCheckData } from "@/components/data-viz";

function generateHistory(
  count: number,
  pattern: "mostly-healthy" | "flapping" | "degrading" | "mixed"
): HealthCheckData[] {
  const now = Date.now();
  const minute = 60 * 1000;

  return Array.from({ length: count }, (_, i) => {
    const checked_at = new Date(now - (count - i) * minute).toISOString();
    let status: HealthCheckData["status"];

    switch (pattern) {
      case "mostly-healthy":
        status = i === Math.floor(count * 0.6) || i === Math.floor(count * 0.85) ? "unhealthy" : "healthy";
        break;
      case "flapping":
        status = i % 3 === 0 ? "unhealthy" : i % 5 === 0 ? "unknown" : "healthy";
        break;
      case "degrading":
        status = i < count * 0.4 ? "healthy" : i < count * 0.7 ? "unknown" : "unhealthy";
        break;
      case "mixed":
        if (i < count * 0.2) status = "disabled";
        else if (i < count * 0.3) status = "unknown";
        else if (i === Math.floor(count * 0.55)) status = "unhealthy";
        else status = "healthy";
        break;
    }

    return { status, checked_at };
  });
}

export default function DataVizPage() {
  const mostlyHealthy = useMemo(() => generateHistory(60, "mostly-healthy"), []);
  const flapping = useMemo(() => generateHistory(60, "flapping"), []);
  const degrading = useMemo(() => generateHistory(60, "degrading"), []);
  const mixed = useMemo(() => generateHistory(120, "mixed"), []);

  return (
    <TkPageWrapper
      title="Data Visualization"
      description="Charts and visual data components"
    >
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkHealthChart — mostly healthy</TkCardTitle>
          <TkCardDescription>
            Typical view for a healthy service. Each bar is one health check at a point in time — hover for status + timestamp.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkHealthChart data={mostlyHealthy} height="160px" />
        </TkCardContent>
      </TkCard>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <TkCard>
          <TkCardHeader>
            <TkCardTitle>Flapping service</TkCardTitle>
            <TkCardDescription>Alternating healthy / unhealthy / unknown states</TkCardDescription>
          </TkCardHeader>
          <TkCardContent>
            <TkHealthChart data={flapping} height="140px" />
          </TkCardContent>
        </TkCard>

        <TkCard>
          <TkCardHeader>
            <TkCardTitle>Degrading over time</TkCardTitle>
            <TkCardDescription>Healthy → unknown → unhealthy progression</TkCardDescription>
          </TkCardHeader>
          <TkCardContent>
            <TkHealthChart data={degrading} height="140px" />
          </TkCardContent>
        </TkCard>
      </div>

      <TkCard>
        <TkCardHeader>
          <TkCardTitle>Longer history, no legend</TkCardTitle>
          <TkCardDescription>
            Dense chart (120 checks) without legend — useful when the chart is a secondary element in a dashboard.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <TkHealthChart data={mixed} height="120px" showLegend={false} />
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
