"use client";

import { TkPageWrapper, TkSeparator, TkAvatar, TkAppHeader } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkBadge } from "@/components/buttons-badges";

export default function UtilitiesPage() {
  return (
    <TkPageWrapper
      title="Utilities"
      description="Layout primitives and small helpers used across the component library"
    >
      {/* TkAppHeader */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkAppHeader</TkCardTitle>
          <TkCardDescription>
            Sticky top header with logo, title, a centered content slot and a built-in theme toggle.
            Intended for apps that do <em>not</em> use <code className="text-xs">TkAppLayout</code> (which has its own header).
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Preview (rendered inside a bordered frame — note that the real component uses
            <code className="text-xs"> position: sticky</code>):
          </p>
          <div className="overflow-hidden rounded border border-border">
            <TkAppHeader title="My App" logo="/icons/tk_logo.svg" logoAlt="Thinkube">
              <nav className="flex gap-4 text-sm">
                <a className="text-muted-foreground hover:text-primary transition-colors" href="#">
                  Dashboard
                </a>
                <a className="text-muted-foreground hover:text-primary transition-colors" href="#">
                  Services
                </a>
                <a className="text-muted-foreground hover:text-primary transition-colors" href="#">
                  Settings
                </a>
              </nav>
            </TkAppHeader>
            <div className="p-6 bg-background text-sm text-muted-foreground">
              Page content goes here...
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* TkPageWrapper */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkPageWrapper</TkCardTitle>
          <TkCardDescription>
            Standard page container with optional title + description. Every page in this guide uses it.
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <div className="rounded border border-dashed border-border overflow-hidden">
            <div className="-mx-6 -my-8">
              <TkPageWrapper title="Example title" description="Example description for context">
                <p className="text-sm">Wrapped page content.</p>
              </TkPageWrapper>
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* TkSeparator */}
      <TkCard className="mb-6">
        <TkCardHeader>
          <TkCardTitle>TkSeparator</TkCardTitle>
          <TkCardDescription>Horizontal and vertical rules</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Horizontal</h3>
            <div className="space-y-3">
              <p className="text-sm">Content above the separator.</p>
              <TkSeparator />
              <p className="text-sm">Content below the separator.</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Vertical</h3>
            <div className="flex h-10 items-center gap-4 text-sm">
              <span>Item A</span>
              <TkSeparator orientation="vertical" />
              <span>Item B</span>
              <TkSeparator orientation="vertical" />
              <span>Item C</span>
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* TkAvatar */}
      <TkCard>
        <TkCardHeader>
          <TkCardTitle>TkAvatar</TkCardTitle>
          <TkCardDescription>User avatar with image + fallback initials</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">With image (fallback shown while loading)</h3>
            <div className="flex items-center gap-4">
              <TkAvatar src="https://github.com/shadcn.png" fallback="CN" />
              <TkAvatar src="https://github.com/torvalds.png" fallback="LT" />
              <TkAvatar src="https://invalid.example.com/no.png" fallback="AM" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Fallback only (text initials)</h3>
            <div className="flex items-center gap-4">
              <TkAvatar fallback="AM" />
              <TkAvatar fallback="TK" />
              <TkAvatar fallback="JS" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">In context</h3>
            <div className="flex items-center gap-3">
              <TkAvatar fallback="AM" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Alejandro Martínez</span>
                <span className="text-xs text-muted-foreground">Owner</span>
              </div>
              <TkBadge variant="outline" className="ml-auto">Admin</TkBadge>
            </div>
          </div>
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
