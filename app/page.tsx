import { TkPageWrapper } from "@/components/TkTkPageWrapper";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkBadge } from "@/components/buttons-badges";
import { CheckCircle2, Package, Palette, Zap } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Palette,
      title: "Thinkube Branding",
      description: "Custom color scheme with teal (#006680) and orange (#FF6B35) matching your existing design",
    },
    {
      icon: Package,
      title: "22+ Components",
      description: "Complete inventory from DaisyUI v5 recreated with shadcn/ui and Radix primitives",
    },
    {
      icon: Zap,
      title: "Latest Tech Stack",
      description: "Next.js 16, React 19.2, Tailwind CSS 4.1, and all 2025 current versions",
    },
    {
      icon: CheckCircle2,
      title: "Interactive Showcase",
      description: "All components fully functional with light/dark themes and realistic examples",
    },
  ];

  const inventory = [
    { category: "Buttons & TkBadges", count: "8+ variants" },
    { category: "Forms & Inputs", count: "10+ types" },
    { category: "TkCards & Data Display", count: "Multiple layouts" },
    { category: "Navigation", count: "Responsive menus" },
    { category: "Feedback", count: "Alerts, Progress, Loading" },
    { category: "Modals & Overlays", count: "Dialogs, Tooltips" },
  ];

  return (
    <TkPageWrapper
      title="Thinkube Style Guide"
      description="React + shadcn/ui component showcase for migrating from Vue + DaisyUI"
    >
      {/* Introduction */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>About This Project</TkCardTitle>
          <TkCardDescription>
            Migration preview for Thinkube applications
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <p>
            This application showcases how all UI components from your three Thinkube applications
            (thinkube-installer, thinkube-control, and tkt-webapp-vue-fastapi) will look when migrated
            from <TkBadge variant="secondary">Vue + DaisyUI v5</TkBadge> to <TkBadge>React + shadcn/ui</TkBadge>.
          </p>
          <p>
            Every component has been inventoried from your current applications and recreated here
            with the same Thinkube branding, including your custom fonts (Poppins, Roboto Slab) and
            color scheme.
          </p>
        </TkCardContent>
      </TkCard>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <TkCard key={feature.title}>
              <TkCardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
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

      {/* Component Inventory */}
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
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-hover/25 hover:border-primary transition-colors cursor-pointer"
              >
                <span className="font-medium">{item.category}</span>
                <TkBadge variant="outline">{item.count}</TkBadge>
              </div>
            ))}
          </div>
        </TkCardContent>
      </TkCard>

      {/* Next Steps */}
      <TkCard className="mt-8 border-primary/50">
        <TkCardHeader>
          <TkCardTitle>How to Use This Guide</TkCardTitle>
        </TkCardHeader>
        <TkCardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p>Browse each category in the navigation to see all component variants</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p>Toggle between light and dark themes to see how components adapt</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p>Interact with all components - buttons click, modals open, forms work</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p>Check the Service TkCard Demo for a realistic example from your applications</p>
          </div>
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
