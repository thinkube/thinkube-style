"use client";

import { TkPageWrapper } from "@/components/TkTkPageWrapper";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkButton } from "@/components/buttons-badges";
import { TkBadge, TkSuccessBadge, TkWarningBadge, TkErrorBadge } from "@/components/buttons-badges";
import { Heart, Download, Trash2, Plus, Settings, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ButtonsBadgesPage() {
  const [loadingButtons, setLoadingButtons] = useState<Set<string>>(new Set());

  const handleClick = (id: string) => {
    setLoadingButtons(new Set(loadingButtons.add(id)));
    setTimeout(() => {
      const newSet = new Set(loadingButtons);
      newSet.delete(id);
      setLoadingButtons(newSet);
    }, 2000);
  };

  return (
    <TkPageWrapper
      title="Buttons & Badges"
      description="All button variants, sizes, and badge styles from your DaisyUI inventory"
    >
      {/* TkButton Variants */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>TkButton Variants</TkCardTitle>
          <TkCardDescription>
            Primary, secondary, accent, outline, ghost, and destructive buttons
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Solid TkButtons</h3>
            <div className="flex flex-wrap gap-3">
              <TkButton variant="default" onClick={() => handleClick("primary")}>
                {loadingButtons.has("primary") ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading</>
                ) : (
                  "Primary"
                )}
              </TkButton>
              <TkButton variant="secondary">Secondary</TkButton>
              <TkButton variant="destructive">Destructive</TkButton>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Outline & Ghost</h3>
            <div className="flex flex-wrap gap-3">
              <TkButton variant="outline">Outline</TkButton>
              <TkButton variant="ghost">Ghost</TkButton>
              <TkButton variant="link">Link</TkButton>
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* TkButton Sizes */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>TkButton Sizes</TkCardTitle>
          <TkCardDescription>xs, sm, default (md), lg sizes</TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <div className="flex flex-wrap items-center gap-3">
            <TkButton size="sm" variant="outline">Small</TkButton>
            <TkButton size="default">Default</TkButton>
            <TkButton size="lg">Large</TkButton>
            <TkButton size="icon" variant="outline">
              <Settings className="h-4 w-4" />
            </TkButton>
          </div>
        </TkCardContent>
      </TkCard>

      {/* TkButton with Icons */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>TkButtons with Icons</TkCardTitle>
          <TkCardDescription>Icon placement and icon-only buttons</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">With Text</h3>
            <div className="flex flex-wrap gap-3">
              <TkButton>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </TkButton>
              <TkButton variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Download
              </TkButton>
              <TkButton variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </TkButton>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Icon Only (Square & Circle)</h3>
            <div className="flex flex-wrap gap-3">
              <TkButton size="icon" variant="outline">
                <Heart className="h-4 w-4" />
              </TkButton>
              <TkButton size="icon" variant="ghost">
                <Settings className="h-4 w-4" />
              </TkButton>
              <TkButton size="icon" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </TkButton>
              <TkButton size="icon" className="rounded-full" variant="outline">
                <Plus className="h-4 w-4" />
              </TkButton>
              <TkButton size="icon" className="rounded-full">
                <Heart className="h-4 w-4" />
              </TkButton>
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Disabled State */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Disabled State</TkCardTitle>
          <TkCardDescription>Disabled buttons with loading state</TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <div className="flex flex-wrap gap-3">
            <TkButton disabled>Disabled</TkButton>
            <TkButton disabled variant="secondary">Disabled Secondary</TkButton>
            <TkButton disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </TkButton>
          </div>
        </TkCardContent>
      </TkCard>

      {/* TkBadges */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>TkBadge Variants</TkCardTitle>
          <TkCardDescription>All badge colors and styles</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">TkBadge Variants (Subtle & Professional)</h3>
            <div className="flex flex-wrap gap-2">
              <TkBadge>Default</TkBadge>
              <TkBadge variant="secondary">Secondary</TkBadge>
              <TkErrorBadge>Destructive</TkErrorBadge>
              <TkWarningBadge>Warning</TkWarningBadge>
              <TkSuccessBadge>Success</TkSuccessBadge>
              <TkBadge variant="outline">Outline</TkBadge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Custom Color Examples</h3>
            <div className="flex flex-wrap gap-2">
              <TkBadge variant="outline">Neutral</TkBadge>
              <TkBadge variant="outline" className="border-primary text-primary">Primary</TkBadge>
              <TkBadge variant="outline" className="border-[var(--color-warning)] text-[var(--color-warning)]">Warning Outline</TkBadge>
              <TkBadge variant="outline" className="border-[var(--color-success)] text-[var(--color-success)]">Success Outline</TkBadge>
              <TkBadge variant="outline" className="border-destructive text-destructive">Error Outline</TkBadge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">TkBadge Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <TkBadge className="text-xs px-1.5 py-0">XS</TkBadge>
              <TkBadge className="text-xs px-2 py-0.5">Small</TkBadge>
              <TkBadge>Default</TkBadge>
              <TkBadge className="text-sm px-3 py-1">Large</TkBadge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Use Cases (From Your Apps)</h3>
            <div className="flex flex-wrap gap-2">
              <TkBadge>Core Service</TkBadge>
              <TkBadge variant="secondary">Optional</TkBadge>
              <TkWarningBadge>User App</TkWarningBadge>
              <TkSuccessBadge>Healthy</TkSuccessBadge>
              <TkErrorBadge>Unhealthy</TkErrorBadge>
              <TkBadge variant="outline">Vue.js</TkBadge>
              <TkBadge variant="outline">FastAPI</TkBadge>
              <TkBadge variant="outline" className="border-[var(--color-warning)] text-[var(--color-warning)]">GPU</TkBadge>
              <TkBadge className="text-sm px-3 py-1 border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10 text-[var(--color-warning)] font-semibold">4 GPUs</TkBadge>
            </div>
          </div>
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
