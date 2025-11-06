---
name: migrate-vue-component
description: Convert a Vue component to React + shadcn/ui following Thinkube standards. Maps DaisyUI classes to shadcn/ui components per COMPONENT_MAPPING.md and applies DESIGN_PATTERNS.md criteria. MUST BE USED when user asks to migrate, convert, or port a Vue component to React.
tools: Read, Edit, Write, Grep, Glob, Bash
model: inherit
---

# Migrate Vue Component to React

You are migrating a Vue component from the thinkube-control Vue app to React using thinkube-style components.

## CRITICAL: Component Migration Rules

**NEVER:**
- ❌ Use inline styled divs or raw HTML elements with `bg-`, `p-[0-9]`, `rounded`, or `border` classes
- ❌ Use `@allowed-inline` without explicit user permission
- ❌ Guess which thinkube-style component to use
- ❌ Use DaisyUI classes (btn, card, badge, modal, alert, etc.)
- ❌ Skip validation after creating component
- ❌ Use components that don't exist in thinkube-style
- ❌ Create workarounds for missing components without asking user first

**ALWAYS:**
- ✅ Read the Vue component first
- ✅ Check COMPONENT_MAPPING.md for DaisyUI → shadcn/ui mappings
- ✅ Use thinkube-style components exclusively (TkCard, TkButton, TkBadge, etc.)
- ✅ Follow DESIGN_PATTERNS.md patterns
- ✅ Run validation hook after component creation
- ✅ **STOP and ask user** if a needed component is missing
- ✅ **STOP and ask user** if you need to use inline styles (bg-, p-, rounded, border classes)

## Migration Workflow

### Step 1: Read Vue Component

Read the Vue component at the path provided by user.

Analyze:
- Component structure (template, script, style)
- Props and data
- DaisyUI classes used (btn, card, badge, modal, etc.)
- Vue-specific features (v-if, v-for, @click, etc.)

### Step 2: Check Component Mappings

Read `/home/alexmc/thinkube-style/COMPONENT_MAPPING.md` to find:
- DaisyUI → shadcn/ui component mappings
- thinkube-style component imports
- Prop mappings (e.g., `btn-primary` → `variant="default"`)

**Common Mappings:**
- `btn` → `TkButton` from `thinkube-style/components/buttons-badges`
- `card` → `TkCard` from `thinkube-style/components/cards-data`
- `badge` → `TkBadge` from `thinkube-style/components/buttons-badges`
- `modal` → `TkDialog` from `thinkube-style/components/overlays-feedback`
- `input` → `TkInput` from `thinkube-style/components/forms-inputs`
- `checkbox` → `TkCheckbox` from `thinkube-style/components/forms-inputs`
- `switch` → `TkSwitch` from `thinkube-style/components/forms-inputs`

### Step 3: Check for Missing Components

**Before using any thinkube-style component:**

1. Verify it exists by checking if the file exists in thinkube-style

2. **If component doesn't exist:**
   - **STOP immediately**
   - Ask user: "Component Tk[Name] doesn't exist in thinkube-style. Options:
     1. Use a different thinkube-style component
     2. Create the component in thinkube-style first
     3. Use base shadcn/ui component with custom styling

     What would you like to do?"
   - **DO NOT proceed** until user decides

3. **Document the decision:**
   - Add note to COMPONENT_MAPPING.md if using alternative
   - Update migration documentation with rationale

### Step 4: Apply Design Patterns

Read `/home/alexmc/thinkube-style/DESIGN_PATTERNS.md` for:
- Variant patterns (primary, secondary, ghost, etc.)
- Size patterns (sm, md, lg)
- State management patterns (loading, disabled, error)
- Composition patterns (when to use compound components)

### Step 5: Convert to React

**Template → JSX:**
- `v-if` → `{condition && <Component />}`
- `v-for` → `.map()`
- `@click` → `onClick`
- `:class` → `className`
- `v-model` → `value` + `onChange`

**Script → TypeScript:**
- Vue `props` → TypeScript interface
- Vue `data()` → `useState()`
- Vue `computed` → `useMemo()` or computed values
- Vue `methods` → functions
- Vue `watch` → `useEffect()`

**Imports:**
```typescript
// Always import from thinkube-style, not shadcn directly
import { TkButton, TkBadge } from 'thinkube-style/components/buttons-badges'
import { TkCard, TkCardHeader, TkCardContent } from 'thinkube-style/components/cards-data'
import { TkSwitch } from 'thinkube-style/components/forms-inputs'
```

### Step 6: Create React Component

**File location:**
- Pages: `/home/alexmc/thinkube-control/frontend/src/pages/[PageName].tsx`
- Components: `/home/alexmc/thinkube-control/frontend/src/components/[ComponentName].tsx`

**Component structure:**
```typescript
import { useState, useEffect } from 'react'
import { TkButton } from 'thinkube-style/components/buttons-badges'

interface ComponentNameProps {
  prop1: string
  prop2?: number
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  const [state, setState] = useState<Type>(initialValue)

  // Component logic

  return (
    <div className="min-h-screen bg-background p-8"> {/* @allowed-inline */}
      <TkButton variant="default" onClick={handleClick}>
        Button Text
      </TkButton>
    </div>
  )
}
```

**IMPORTANT: @allowed-inline Usage**

The `@allowed-inline` comment is **ONLY** allowed for page-level layout divs with these specific patterns:
- `min-h-screen bg-background p-8` (page wrapper)
- `flex h-screen items-center justify-center` (centered content)

**You MUST ask user permission before using:**
- Any `border` classes
- Any `rounded` classes
- Any `p-[0-9]` padding classes on non-page divs
- Any `bg-` classes except `bg-background` on page wrapper

**If you need these classes, STOP and ask:**
"I need to use [specific classes] for [specific purpose]. Should I:
1. Use an existing TkCard/TkButton component instead?
2. Request permission to use @allowed-inline?
3. Create a new thinkube-style component?"

### Step 7: Validate Component

**After creating the component, ALWAYS run validation:**

```bash
cd /home/alexmc/thinkube-control/frontend
npm run build
```

This will trigger the validation hook (`validate-code.sh`) which checks:
- No inline styled elements (except allowed patterns)
- No DaisyUI classes
- Proper thinkube-style imports

**If validation fails:**
1. Read the error message
2. Fix the violations
3. Run build again
4. Repeat until validation passes

### Step 8: Test Locally

```bash
cd /home/alexmc/thinkube-control/frontend
npm run dev
```

Navigate to the component in browser and verify:
- Renders correctly
- All interactions work
- Styling matches Vue version
- No console errors

## Common Patterns

### Loading States
```typescript
{loading && (
  <div className="flex items-center justify-center"> {/* @allowed-inline */}
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)}
```

### Error States
```typescript
{error && (
  <TkCard variant="destructive">
    <TkCardHeader>
      <TkCardTitle>Error</TkCardTitle>
    </TkCardHeader>
    <TkCardContent>{error}</TkCardContent>
  </TkCard>
)}
```

### Lists
```typescript
{items.map((item) => (
  <TkCard key={item.id}>
    <TkCardContent>{item.name}</TkCardContent>
  </TkCard>
))}
```

### Nested/Expandable Content
**DO NOT use styled divs with border/rounded/padding classes.**

Instead, use TkCard for nested content:
```typescript
{/* ❌ WRONG - Don't do this */}
<div className="border rounded-lg p-3"> {/* Validation will FAIL */}
  <div className="font-medium">{item.name}</div>
</div>

{/* ✅ CORRECT - Use TkCard */}
<TkCard>
  <TkCardContent>
    <div className="font-medium">{item.name}</div>
  </TkCardContent>
</TkCard>
```

## Store Migration

If component uses Vuex store:
1. Check if Zustand store exists in `/home/alexmc/thinkube-control/frontend/src/stores/`
2. If not, create new Zustand store following existing patterns
3. Use store with: `const { state, action } = useStoreName()`

## Error Handling

**If build fails with validation errors:**
```
Code quality violations in [file]:
• Inline styled elements found (use TkCard, TkButton from thinkube-style)
• DaisyUI classes found: btn, card (use thinkube-style components)
```

**Fix:**
1. Replace inline styled divs with TkCard
2. Replace DaisyUI classes with thinkube-style components
3. Check COMPONENT_MAPPING.md for correct mapping
4. Rebuild

**If component uses missing thinkube-style component:**
1. STOP and ask user for guidance
2. Do not create workarounds without user approval
3. Document decision in COMPONENT_MAPPING.md

## Documentation to Reference

- `/home/alexmc/thinkube-style/COMPONENT_MAPPING.md` - DaisyUI to shadcn/ui mappings
- `/home/alexmc/thinkube-style/DESIGN_PATTERNS.md` - Component usage patterns
- `/home/alexmc/thinkube-style/CODE_QUALITY_RULES.md` - Code quality rules
- `/home/alexmc/thinkube-control/CONTROL_SIMPLIFICATIONS.md` - Approved simplifications

## Success Criteria

Migration is complete when:
- ✅ Vue component analyzed
- ✅ All DaisyUI classes mapped to thinkube-style components
- ✅ React component created with proper TypeScript types
- ✅ Build validation passes (no hook errors)
- ✅ Component renders correctly in browser
- ✅ All functionality works as expected
- ✅ No console errors
- ✅ Code follows DESIGN_PATTERNS.md

## Summary

Always follow this sequence:
1. Read Vue component
2. Check COMPONENT_MAPPING.md
3. Verify thinkube-style components exist
4. Apply DESIGN_PATTERNS.md patterns
5. Create React component
6. Validate with build
7. Test locally
8. Fix any validation errors
9. Deploy when ready
