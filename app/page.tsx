import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkBadge } from "@/components/buttons-badges";
import { CheckCircle2, Palette, Shield, Layers } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Palette,
      title: "Design Tokens",
      description: "OKLch color palette with teal primary, warm backgrounds, and proven semantic colors for status indicators",
    },
    {
      icon: Shield,
      title: "Semantic APIs",
      description: "Intent-based buttons, status-driven badges, and opinionated defaults that prevent UI inconsistency",
    },
    {
      icon: Layers,
      title: "Component Library",
      description: "Cards, tables, alerts, modals, forms, progress indicators, and navigation — all dark-mode ready",
    },
    {
      icon: CheckCircle2,
      title: "Two Consumers",
      description: "Shared between thinkube-control (dashboard) and thinkube-installer (Tauri app)",
    },
  ];

  const inventory = [
    { category: "Buttons & Badges", count: "Intent + Status APIs" },
    { category: "Forms & Inputs", count: "10+ input types" },
    { category: "Cards & Data Display", count: "Cards, tables, stats" },
    { category: "Navigation", count: "TkVerticalNav + layout" },
    { category: "Feedback", count: "Alerts, toasts, status dots" },
    { category: "Modals & Overlays", count: "Dialogs, tooltips, sheets" },
  ];

  return (
    <TkPageWrapper
      title="Thinkube Style Guide"
      description="Design system reference for Thinkube applications"
    >
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>About This Guide</TkCardTitle>
          <TkCardDescription>
            Reference implementation for the Thinkube design system
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <p>
            This application documents the component library shared by
            {" "}<TkBadge>thinkube-control</TkBadge> and <TkBadge>thinkube-installer</TkBadge>.
            Every component shown here is the real component — the demo eats its own dog food.
          </p>
          <p>
            Built on React 19, Tailwind CSS 4, shadcn/ui, and Radix UI primitives.
            Fonts: Poppins (headings) and Noto Sans Mono (code).
          </p>
        </TkCardContent>
      </TkCard>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <TkCard key={feature.title}>
              <TkCardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <TkCardTitle className="text-lg">{feature.title}</TkCardTitle>
                </div>
              </TkCardHeader>
              <TkCardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </TkCardContent>
            </TkCard>
          );
        })}
      </div>

      <TkCard>
        <TkCardHeader>
          <TkCardTitle>Component Inventory</TkCardTitle>
          <TkCardDescription>
            Browse all components organized by category
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between p-4 border border-border hover:bg-secondary/50 transition-colors"
              >
                <span className="font-medium">{item.category}</span>
                <TkBadge appearance="outlined">{item.count}</TkBadge>
              </div>
            ))}
          </div>
        </TkCardContent>
      </TkCard>

      <TkCard className="mt-8 border-primary/50">
        <TkCardHeader>
          <TkCardTitle>Usage Rules</TkCardTitle>
        </TkCardHeader>
        <TkCardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p>Use <code className="text-xs bg-muted px-1 py-0.5">intent</code> on buttons — one primary per section, secondary for supporting, danger for destructive</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p>Use <code className="text-xs bg-muted px-1 py-0.5">status</code> on badges for health indicators — color is determined by meaning, not choice</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p>Use TkAppLayout with TkVerticalNav for consistent app chrome across both applications</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p>Check the Colors page for the full token reference and icon color examples</p>
          </div>
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
