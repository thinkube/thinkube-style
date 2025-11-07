import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

import { ThemeProvider } from '@/components/theme-provider';
import { AppLayout } from '@/components/app-layout-router';

// Import all pages
import HomePage from './page';
import ButtonsBadgesPage from './buttons-badges/page';
import FormsInputsPage from './forms-inputs/page';
import CardsDataPage from './cards-data/page';
import NavigationPage from './navigation/page';
import FeedbackPage from './feedback/page';
import ModalsOverlaysPage from './modals-overlays/page';
import BrandIconsPage from './brand-icons/page';
import ServiceCardDemoPage from './service-card-demo/page';
import VerticalNavDemoPage from './vertical-nav-demo/page';
import InstallationProgressDemoPage from './installation-progress-demo/page';
import InstallerWelcomePage from './installer-welcome/page';
import TestMinimalPage from './test-minimal/page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buttons-badges" element={<ButtonsBadgesPage />} />
            <Route path="/forms-inputs" element={<FormsInputsPage />} />
            <Route path="/cards-data" element={<CardsDataPage />} />
            <Route path="/navigation" element={<NavigationPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/modals-overlays" element={<ModalsOverlaysPage />} />
            <Route path="/brand-icons" element={<BrandIconsPage />} />
            <Route path="/service-card-demo" element={<ServiceCardDemoPage />} />
            <Route path="/vertical-nav-demo" element={<VerticalNavDemoPage />} />
            <Route path="/installation-progress-demo" element={<InstallationProgressDemoPage />} />
            <Route path="/installer-welcome" element={<InstallerWelcomePage />} />
            <Route path="/test-minimal" element={<TestMinimalPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
