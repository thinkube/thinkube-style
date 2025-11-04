"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkBrandIcon } from "@/components/brand-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BrandIconsPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const icons = [
    { name: "AI", file: "tk_ai" },
    { name: "Artifact", file: "tk_artifact" },
    { name: "Code", file: "tk_code" },
    { name: "Dashboard", file: "tk_dashboard" },
    { name: "Data", file: "tk_data" },
    { name: "Design", file: "tk_design" },
    { name: "DevOps", file: "tk_devops" },
    { name: "Docs", file: "tk_docs" },
    { name: "G330", file: "tk_g330" },
    { name: "Observability", file: "tk_observability" },
    { name: "Search", file: "tk_search" },
    { name: "Vector", file: "tk_vector" },
  ];

  const logos = [
    { name: "Logo", file: "tk_logo", size: 80 },
    { name: "Full Logo", file: "tk_full_logo", size: 120 },
    { name: "Text Logo", file: "tk_text_logo", size: 120 },
  ];

  return (
    <PageWrapper
      title="Thinkube Brand Icons"
      description="Your custom brand iconography with light and dark mode support"
    >
      {/* Logos */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Thinkube Logos</TkCardTitle>
          <TkCardDescription>Primary brand marks with automatic theme switching</TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <div className="grid md:grid-cols-3 gap-8">
            {logos.map((logo) => (
              <div key={logo.name} className="flex flex-col items-center gap-4 p-6 border rounded-lg">
                <TkBrandIcon icon={logo.file} alt={logo.name} size={logo.size} />
                <span className="text-sm font-medium">{logo.name}</span>
              </div>
            ))}
          </div>
        </TkCardContent>
      </TkCard>

      {/* Icon Grid */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Service & Feature Icons</TkCardTitle>
          <TkCardDescription>
            All icons automatically switch between light and dark variants based on theme
          </TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {icons.map((icon) => (
              <div
                key={icon.name}
                className="flex flex-col items-center gap-3 p-4 border rounded-lg hover:bg-hover/25 hover:border-primary transition-colors cursor-pointer"
              >
                <TkBrandIcon icon={icon.file} alt={icon.name} size={48} />
                <span className="text-xs font-medium text-center">{icon.name}</span>
              </div>
            ))}
          </div>
        </TkCardContent>
      </TkCard>

      {/* Usage Examples */}
      <TkCard>
        <TkCardHeader>
          <TkCardTitle>Usage Examples</TkCardTitle>
          <TkCardDescription>How these icons integrate with your components</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-6">
          {/* In TkCard Headers */}
          <div>
            <h3 className="text-sm font-semibold mb-3">In TkCard Headers</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <TkCard>
                <TkCardHeader>
                  <div className="flex items-center gap-2">
                    <TkBrandIcon icon="tk_ai" alt="AI" size={20} />
                    <TkCardTitle className="text-lg">AI Service</TkCardTitle>
                  </div>
                </TkCardHeader>
                <TkCardContent>
                  <p className="text-sm text-muted-foreground">Machine learning workloads</p>
                </TkCardContent>
              </TkCard>

              <TkCard>
                <TkCardHeader>
                  <div className="flex items-center gap-2">
                    <TkBrandIcon icon="tk_data" alt="Data" size={20} />
                    <TkCardTitle className="text-lg">Database</TkCardTitle>
                  </div>
                </TkCardHeader>
                <TkCardContent>
                  <p className="text-sm text-muted-foreground">PostgreSQL cluster</p>
                </TkCardContent>
              </TkCard>

              <TkCard>
                <TkCardHeader>
                  <div className="flex items-center gap-2">
                    <TkBrandIcon icon="tk_devops" alt="DevOps" size={20} />
                    <TkCardTitle className="text-lg">CI/CD</TkCardTitle>
                  </div>
                </TkCardHeader>
                <TkCardContent>
                  <p className="text-sm text-muted-foreground">Deployment pipeline</p>
                </TkCardContent>
              </TkCard>
            </div>
          </div>

          {/* In Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-3">In Navigation</h3>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-hover/25 hover:border-primary transition-colors cursor-pointer">
                <TkBrandIcon icon="tk_dashboard" alt="Dashboard" size={16} />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-hover/25 hover:border-primary transition-colors cursor-pointer">
                <TkBrandIcon icon="tk_search" alt="Search" size={16} />
                <span className="text-sm font-medium">Search</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-hover/25 hover:border-primary transition-colors cursor-pointer">
                <TkBrandIcon icon="tk_docs" alt="Docs" size={16} />
                <span className="text-sm font-medium">Documentation</span>
              </div>
            </div>
          </div>

          {/* With Backgrounds */}
          <div>
            <h3 className="text-sm font-semibold mb-3">With Background Accents</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="p-2 bg-primary/20 rounded">
                  <TkBrandIcon icon="tk_vector" alt="Vector" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">Vector Database</p>
                  <p className="text-xs text-muted-foreground">Embeddings storage</p>
                </div>
              </div>
            </div>
          </div>
        </TkCardContent>
      </TkCard>
    </PageWrapper>
  );
}
