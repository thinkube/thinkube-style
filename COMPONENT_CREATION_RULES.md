# Component Creation Rules

**Last Updated:** 2025-11-05

## Overview

This document defines the MANDATORY process for creating UI components in Thinkube applications. **Components must NEVER be created in applications** - they must be implemented in `thinkube-style` first.

## Critical Rule: thinkube-style First

**NEVER create custom components directly in applications (installer, control, template).**

### The Process

```
Need Component → Implement in thinkube-style → Get Approval → Publish to npm → Use in Application
```

**Not:**
```
Need Component → Create in app → ❌ WRONG!
```

---

## Why This Rule Exists

### Problem: Component Proliferation

Without this rule:
- Installer creates `CustomModal.tsx`
- Control creates `CustomModal.tsx` (slightly different)
- Template creates `CustomModal.tsx` (another variant)
- Result: 3 different modals, no consistency, no reusability

### Solution: Single Source of Truth

With this rule:
- One `TkDialog` component in thinkube-style
- All apps use the same component
- One place to fix bugs
- Consistent UX across all Thinkube apps
- Design system integrity maintained

---

## The Correct Process

### Step 1: Identify the Need

During migration or development, you realize you need a component that doesn't exist in thinkube-style.

**Examples:**
- "I need a modal for displaying playbook results"
- "I need a card with a loading spinner"
- "I need a custom button variant for destructive actions"

### Step 2: Check if Component Already Exists

Before requesting new component, verify it doesn't already exist:

```bash
# Search thinkube-style components
ls thinkube-style/components/*/

# Check component mapping
cat thinkube-style/COMPONENT_MAPPING.md

# Search for similar patterns
grep -r "modal\|dialog" thinkube-style/components/
```

**Common mistake:** Requesting a component that already exists under a different name.

**Example:**
- Want: "ResultModal"
- Actually exists: `TkDialog` (can be used for results)

### Step 3: Document Requirements

Create a clear specification:

````markdown
## Component Request: TkAppHeader

**Purpose:** Simple application header with logo and theme switcher (no sidebar navigation)

**Use Case:** Installer app needs header without full AppLayout complexity

**API:**
```typescript
interface TkAppHeaderProps {
  logo?: string
  appName: string
  showThemeToggle?: boolean
}
```

**Usage Example:**
```typescript
<TkAppHeader
  appName="Thinkube Installer"
  showThemeToggle={true}
/>
```

**Why not existing component:**
- AppLayout includes sidebar navigation (too heavy for installer)
- Need just header + theme toggle
- Simpler component for simpler use cases
````

### Step 4: Get Approval

**Contact project owner** with your specification.

**Wait for approval before implementing.**

Approval ensures:
- Component truly needed (not duplicate)
- API design is correct
- Fits with design system
- Reusable across apps

### Step 5: Implement in thinkube-style

**Only after approval**, implement in `thinkube-style`:

```bash
cd thinkube-style

# Create component file
touch components/utilities/TkAppHeader.tsx

# Add to exports
# Edit components/utilities/index.ts
```

**Component Structure:**
```typescript
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react"

export interface TkAppHeaderProps {
  appName: string
  logo?: string
  showThemeToggle?: boolean
}

export function TkAppHeader({
  appName,
  logo,
  showThemeToggle = true
}: TkAppHeaderProps) {
  return (
    <header className="border-b">
      {/* Implementation */}
    </header>
  )
}
```

**Add to category exports:**
```typescript
// components/utilities/index.ts
export { TkAppHeader } from "./TkAppHeader"
export type { TkAppHeaderProps } from "./TkAppHeader"
```

### Step 6: Test in thinkube-style

Test the component in the demo app:

```bash
cd demo
# Add component to demo page
# Verify it works correctly
npm run dev
```

### Step 7: Commit and Publish

```bash
# In thinkube-style
git add .
git commit -m "Add TkAppHeader component for simple app headers"
git push

# npm publish happens automatically (or manually if needed)
```

### Step 8: Update thinkube-style in Application

```bash
# In application (installer, control, etc.)
npm update thinkube-style
```

### Step 9: Use in Application

**Only now can you use the component:**

```typescript
// frontend/app/layout.tsx
import { TkAppHeader } from "thinkube-style/components/utilities"

export default function RootLayout({ children }) {
  return (
    <>
      <TkAppHeader appName="Thinkube Installer" />
      {children}
    </>
  )
}
```

---

## What Counts as a "Component"

### These require thinkube-style-first approach:

✅ **UI Components:**
- Buttons, cards, modals, forms, inputs
- Navigation elements (headers, sidebars, menus)
- Data display (tables, lists, stat cards)
- Feedback (alerts, toasts, progress bars)

✅ **Layout Components:**
- Page wrappers, containers, grids
- Headers, footers, sidebars
- Responsive layouts

✅ **Composite Components:**
- Search bars, date pickers, file uploaders
- Anything reusable across >1 page

### These can be in applications:

❌ **Page-Specific Logic:**
- Page components (e.g., `app/deploy/page.tsx`)
- Route handlers
- API integration code

❌ **Utility Functions:**
- Helper functions (e.g., `formatDate()`, `validateIP()`)
- API client configuration
- Data transformation logic

**Rule of Thumb:** If it renders UI and could be used in >1 place, it's a component → thinkube-style.

---

## Common Violations and Fixes

### Violation #1: Custom Modal in App

**Wrong:**
```typescript
// frontend/components/ResultModal.tsx  ❌
export function ResultModal({ result }) {
  return (
    <div className="modal">
      {/* Custom modal implementation */}
    </div>
  )
}
```

**Correct:**
Use existing `TkDialog` from thinkube-style:
```typescript
// frontend/app/deploy/page.tsx  ✅
import { TkDialog } from "thinkube-style/components/modals-overlays"

export default function Deploy() {
  return (
    <TkDialog open={showResult}>
      {/* Use existing component */}
    </TkDialog>
  )
}
```

**Or if TkDialog doesn't fit:** Request new component in thinkube-style with specific requirements.

### Violation #2: Custom Button Variant

**Wrong:**
```typescript
// frontend/components/DestructiveButton.tsx  ❌
export function DestructiveButton({ children, onClick }) {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

**Correct:**
Extend `TkButton` in thinkube-style:
```typescript
// thinkube-style/components/buttons-badges/TkButton.tsx  ✅
// Add new variant to existing component
variant: "default" | "destructive" | "outline" | "secondary" | "ghost"
```

Then use in app:
```typescript
<TkButton variant="destructive">Delete</TkButton>
```

### Violation #3: Custom Card Layout

**Wrong:**
```typescript
// frontend/components/StatCard.tsx  ❌
export function StatCard({ title, value, icon }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center">
        {icon}
        <h3>{title}</h3>
      </div>
      <p className="text-2xl">{value}</p>
    </div>
  )
}
```

**Correct:**
Check if TkCard can be composed to achieve this:
```typescript
// frontend/app/dashboard/page.tsx  ✅
import { TkCard, TkCardContent, TkCardHeader } from "thinkube-style/components/cards-data"

<TkCard>
  <TkCardHeader>
    <div className="flex items-center">
      {icon}
      <h3>{title}</h3>
    </div>
  </TkCardHeader>
  <TkCardContent>
    <p className="text-2xl">{value}</p>
  </TkCardContent>
</TkCard>
```

**If composition doesn't work:** Request `TkStatCard` component in thinkube-style.

---

## Exception: Page Components

Page-level components in `app/` directory are allowed because they are not reusable UI components:

**Allowed:**
```typescript
// frontend/app/deploy/page.tsx  ✅
export default function Deploy() {
  // Page-specific logic and layout
  // Uses thinkube-style components internally
  return (
    <TkPageWrapper title="Deploy">
      <TkCard>...</TkCard>
      <TkButton>...</TkButton>
    </TkPageWrapper>
  )
}
```

**Not allowed:**
```typescript
// frontend/components/DeployCard.tsx  ❌
// This is a reusable component → should be in thinkube-style
export function DeployCard({ title, children }) {
  return <div className="deploy-card">...</div>
}
```

---

## How to Identify Violations During Code Review

### Red Flags:

1. **New files in `frontend/components/` that aren't pages**
   ```bash
   ls frontend/components/
   # Should be mostly empty or page-specific utilities only
   ```

2. **Custom className strings** (not using thinkube-style components)
   ```typescript
   // ❌ Red flag
   <div className="border rounded-lg shadow-md p-4 bg-white">

   // ✅ Should be
   <TkCard>
   ```

3. **Reinventing existing components**
   ```typescript
   // ❌ Red flag - TkButton already exists!
   export function CustomButton({ children }) {
     return <button className="...">
   ```

4. **Component exports from app code**
   ```typescript
   // frontend/components/index.ts
   export { CustomModal } from "./CustomModal"  // ❌ Red flag!
   ```

### Approval Process During Code Review:

**Reviewer must ask:**
1. Is this a UI component? → Should be in thinkube-style
2. Could this be reused in another app? → Should be in thinkube-style
3. Does a similar component already exist? → Use existing, don't create new
4. Was this component approved? → Check approval trail

**If violations found:**
1. Stop the PR
2. Request thinkube-style implementation first
3. Only approve app code after thinkube-style component is published

---

## Enforcement

### Pre-Migration Review

Before starting migration of any page, check:
- [ ] Does Vue component use custom components?
- [ ] Can those components be mapped to thinkube-style components?
- [ ] If not, request thinkube-style components BEFORE migrating

**Don't:** Start migration and create custom components mid-way.

### During Development

If you realize you need a component:
1. Stop coding
2. Document component requirements
3. Request approval
4. Wait for thinkube-style implementation
5. Continue after component is available

### Code Review Checklist

Reviewer must verify:
- [ ] No new component files in `frontend/components/` (except page utilities)
- [ ] All UI elements use thinkube-style components
- [ ] No custom `className` strings that reinvent existing components
- [ ] No component exports from app code

---

## Benefits of This Approach

### 1. Consistency

All Thinkube apps look and behave the same:
- Installer button = Control button = Template button
- One brand, one experience

### 2. Maintainability

Bug fix in one place:
```bash
# Fix button bug in thinkube-style
git commit -m "Fix TkButton disabled state"

# All apps get the fix automatically
npm update thinkube-style  # in each app
```

### 3. Development Speed

Once component library is mature:
- New pages are just composition of existing components
- No need to create custom UI
- Focus on business logic, not UI implementation

### 4. Design System Integrity

Design decisions made centrally:
- Color schemes
- Typography
- Spacing
- Interactions

All enforced through thinkube-style.

---

## Summary

**Golden Rule:** If it's a UI component that renders something visual, it belongs in `thinkube-style`, not in applications.

**Process:**
1. Need component
2. Check if exists
3. If not, document requirements
4. Get approval
5. Implement in thinkube-style
6. Test and publish
7. Use in application

**Never create UI components in applications. Period.**
