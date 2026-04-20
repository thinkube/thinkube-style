/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Theme
export { TkThemeProvider, useTkTheme, TkThemeToggle } from "./theme"

// Buttons & Badges
export { TkButton, TkBadge, TkLoadingButton, TkGpuBadge } from "./buttons-badges"

// Cards & Data
export { TkCard, TkCardHeader, TkCardTitle, TkCardDescription, TkCardContent, TkCardFooter, TkStatCard } from "./cards-data"

// Tables
export { TkTable, TkTableHeader, TkTableBody, TkTableRow, TkTableCell, TkTableHead } from "./tables"

// Forms & Inputs
export {
  TkInput,
  TkTextarea,
  TkLabel,
  TkPasswordInput,
  TkSelect,
  TkSelectTrigger,
  TkSelectValue,
  TkSelectContent,
  TkSelectItem,
  TkSelectGroup,
  TkSelectLabel,
  TkCheckbox,
  TkRadioGroup,
  TkRadioGroupItem,
  TkSwitch,
  TkFileInput,
} from "./forms-inputs"

// Feedback
export { TkProgress, TkLoader, TkInfoAlert, TkSuccessAlert, TkWarningAlert, TkErrorAlert, TkStatusIndicator, TkCodeBlock, TkAlert, TkAlertTitle, TkAlertDescription, TkToaster, tkToast } from "./feedback"

// Brand Icons
export { TkBrandIcon } from "./brand-icons"

// Progress Indicators
export { TkProgressBar, TkProgressBarWithRecentSteps, TkSubwayProgress, TkStepList, TkDotProgress } from "./progress"

// Modals & Overlays
export { TkDialog, TkConfirmDialog, TkTooltip } from "./modals-overlays"

// Navigation
export { TkVerticalNav, TkBreadcrumbs, TkDropdownMenu, TkTabs } from "./navigation"

// Utilities
export { TkSeparator, TkAvatar, TkPageWrapper } from "./utilities"

// Service Cards
export { TkServiceCard } from "./service-cards"
export type { TkServiceData, TkServiceCardProps } from "./service-cards"

// Component Cards
export { TkComponentCard } from "./component-cards"
export type { TkComponentData, TkComponentCardProps } from "./component-cards"

// Data Visualization
export { TkHealthChart, TkSemicircularGauge, TkMetricsCard } from "./data-viz"
export type { TkHealthChartProps, HealthCheckData, TkSemicircularGaugeProps, TkMetricGauge, TkMetricItem, TkMetricsCardProps } from "./data-viz"

// Playbook Executor
export { TkPlaybookExecutor } from "./playbook-executor"
export type { TkPlaybookExecutorProps, TkPlaybookExecutorHandle, TkPlaybookLogEntry, TkPlaybookTaskSummary, TkPlaybookResult } from "./playbook-executor"

// Layout
export { TkAppLayout, type TkNavItem } from "./TkAppLayout"
