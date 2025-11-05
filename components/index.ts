/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * IMPORTANT: Barrel exports are currently disabled to avoid circular dependency issues
 *
 * Issue: Some components (like TkServiceCard) import other Tk components via barrel exports,
 * which creates circular dependencies causing "Element type is invalid: got undefined" errors.
 *
 * WORKAROUND: Import components directly from their specific files:
 *
 * Examples:
 *   import { TkButton } from "@/components/buttons-badges/TkButton"
 *   import { TkCard } from "@/components/cards-data/TkCard"
 *   import { TkInput } from "@/components/forms-inputs/TkInput"
 *   import { TkServiceCard } from "@/components/service-cards/TkServiceCard"
 *
 * Or import from category barrel exports (if no circular dependencies exist):
 *   import { TkButton, TkBadge } from "@/components/buttons-badges"
 *   import { TkCard, TkCardHeader } from "@/components/cards-data"
 *
 * TODO: To fix this properly, we need to:
 * 1. Update TkServiceCard and other complex components to use direct imports
 * 2. Re-enable barrel exports in this file
 * 3. Update all consuming code to use the main barrel export
 */

// Feedback components
export { TkProgress, TkLoader, TkInfoAlert, TkSuccessAlert, TkWarningAlert, TkErrorAlert } from "./feedback"

// Brand Icons
export { TkBrandIcon } from "./brand-icons"

// Progress Indicators
export { TkProgressBar, TkProgressBarWithRecentSteps, TkSubwayProgress, TkStepList, TkDotProgress } from "./progress"

// Modals & Overlays - Complex components that don't have circular dependencies
export { TkDialog, TkConfirmDialog, TkTooltip } from "./modals-overlays"

// Navigation - Complex components that don't have circular dependencies
export { TkVerticalNav, TkBreadcrumbs, TkDropdownMenu, TkTabs } from "./navigation"

// Layout - Application layout wrapper
export { TkAppLayout } from "./TkAppLayout"

/*
 * COMMENTED OUT: Wrapper components causing circular dependency issues
 * These must be imported directly from their files or category barrel exports
 */

// Buttons & Badges
// export { TkButton } from "./buttons-badges/TkButton"
// export { TkBadge } from "./buttons-badges/TkBadge"
// export { TkLoadingButton } from "./buttons-badges/TkLoadingButton"
// export { TkIconButton } from "./buttons-badges/TkIconButton"
// export { TkSuccessBadge } from "./buttons-badges/TkSuccessBadge"
// export { TkWarningBadge } from "./buttons-badges/TkWarningBadge"
// export { TkErrorBadge } from "./buttons-badges/TkErrorBadge"

// Cards
// export { TkCard, TkCardHeader, TkCardTitle, TkCardDescription, TkCardContent, TkCardFooter, TkStatsCard, TkHighlightCard } from "./cards-data"

// Tables
// export { TkTable, TkTableHeader, TkTableBody, TkTableRow, TkTableCell, TkTableHead } from "./tables"

// Forms & Inputs
// export {
//   TkInput,
//   TkTextarea,
//   TkLabel,
//   TkPasswordInput,
//   TkSelect,
//   TkSelectTrigger,
//   TkSelectValue,
//   TkSelectContent,
//   TkSelectItem,
//   TkSelectGroup,
//   TkSelectLabel,
//   TkCheckbox,
//   TkRadioGroup,
//   TkRadioGroupItem,
//   TkSwitch,
//   TkFileInput
// } from "./forms-inputs"

// Utilities
// export { TkSeparator, TkAvatar } from "./utilities"

// NOTE: TkServiceCard is NOT exported from main index to avoid circular dependencies
// Import it directly: import { TkServiceCard } from "@/components/service-cards"
