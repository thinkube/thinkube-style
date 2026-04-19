import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './globals.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/noto-sans-mono/400.css';
import '@fontsource/noto-sans-mono/500.css';
import '@fontsource/noto-sans-mono/600.css';
import '@fontsource/noto-sans-mono/700.css';

import { TkThemeProvider } from '@/components/theme/theme-provider';
import { TkAppLayout } from '@/components/TkAppLayout';
import type { TkNavItem } from '@/components/TkAppLayout';
import { TkThemeToggle } from '@/components/theme';
import { TkToaster } from '@/components/feedback';
import { LayoutDashboard, Component, Shield, Palette, FileText, Bell, Layers, Container, Sliders, Settings, Activity, BarChart3, Wrench, Rocket, Droplets, Ruler } from 'lucide-react';

import HomePage from './page';
import ButtonsBadgesPage from './buttons-badges/page';
import FormsInputsPage from './forms-inputs/page';
import CardsDataPage from './cards-data/page';
import NavigationPage from './navigation/page';
import FeedbackPage from './feedback/page';
import ModalsOverlaysPage from './modals-overlays/page';
import BrandIconsPage from './brand-icons/page';
import ProgressPage from './progress/page';
import DataVizPage from './data-viz/page';
import UtilitiesPage from './utilities/page';
import VerticalNavDemoPage from './vertical-nav-demo/page';
import InstallationProgressDemoPage from './installation-progress-demo/page';
import InstallerWelcomePage from './installer-welcome/page';
import ColorsPage from './colors/page';
import TestMinimalPage from './test-minimal/page';

const navigationItems: TkNavItem[] = [
  {
    id: "overview",
    label: "Overview",
    lucideIcon: LayoutDashboard,
    href: "/",
  },
  {
    id: "components",
    label: "Components",
    lucideIcon: Component,
    isGroup: true,
    children: [
      { id: "buttons-badges", label: "Buttons & Badges", lucideIcon: Palette, href: "/buttons-badges" },
      { id: "forms-inputs", label: "Forms & Inputs", lucideIcon: FileText, href: "/forms-inputs" },
      { id: "cards-data", label: "Cards & Data", lucideIcon: Layers, href: "/cards-data" },
      { id: "navigation", label: "Navigation", lucideIcon: Sliders, href: "/navigation" },
      { id: "feedback", label: "Feedback", lucideIcon: Bell, href: "/feedback" },
      { id: "modals-overlays", label: "Modals & Overlays", lucideIcon: Container, href: "/modals-overlays" },
      { id: "progress", label: "Progress", lucideIcon: Activity, href: "/progress" },
      { id: "data-viz", label: "Data Viz", lucideIcon: BarChart3, href: "/data-viz" },
      { id: "utilities", label: "Utilities", lucideIcon: Wrench, href: "/utilities" },
      { id: "colors", label: "Colors", lucideIcon: Droplets, href: "/colors" },
    ],
  },
  {
    id: "demos",
    label: "Demos",
    lucideIcon: Shield,
    isGroup: true,
    children: [
      { id: "brand-icons", label: "Brand Icons", lucideIcon: Palette, href: "/brand-icons" },
      { id: "vertical-nav-demo", label: "Vertical Nav", lucideIcon: Sliders, href: "/vertical-nav-demo" },
      { id: "installation-progress", label: "Installation Progress", lucideIcon: Settings, href: "/installation-progress-demo" },
      { id: "installer-welcome", label: "Installer Welcome", lucideIcon: Rocket, href: "/installer-welcome" },
    ],
  },
];

function DemoAppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pathname = location.pathname;

  const getActiveItem = () => {
    if (pathname === "/") return "overview";
    for (const item of navigationItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.href === pathname) return child.id;
        }
      }
      if (item.href === pathname) return item.id;
    }
    return pathname.replace("/", "");
  };

  return (
    <TkAppLayout
      navigationItems={navigationItems}
      activeItem={getActiveItem()}
      renderLink={({ to, className, children }) => (
        <Link to={to} className={className}>{children}</Link>
      )}
      logoText="Thinkube"
      topBarTitle="Thinkube Style Guide"
      topBarContent={<TkThemeToggle />}
    >
      {children}
    </TkAppLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TkThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BrowserRouter>
        <DemoAppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buttons-badges" element={<ButtonsBadgesPage />} />
            <Route path="/forms-inputs" element={<FormsInputsPage />} />
            <Route path="/cards-data" element={<CardsDataPage />} />
            <Route path="/navigation" element={<NavigationPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/modals-overlays" element={<ModalsOverlaysPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/data-viz" element={<DataVizPage />} />
            <Route path="/utilities" element={<UtilitiesPage />} />
            <Route path="/colors" element={<ColorsPage />} />
            <Route path="/brand-icons" element={<BrandIconsPage />} />
            <Route path="/vertical-nav-demo" element={<VerticalNavDemoPage />} />
            <Route path="/installation-progress-demo" element={<InstallationProgressDemoPage />} />
            <Route path="/installer-welcome" element={<InstallerWelcomePage />} />
            <Route path="/test-minimal" element={<TestMinimalPage />} />
          </Routes>
        </DemoAppLayout>
        <TkToaster />
      </BrowserRouter>
    </TkThemeProvider>
  </React.StrictMode>
);
