---
name: validate-migration
description: Validate a React component follows migration standards. Checks for DaisyUI remnants, Vue syntax, TypeScript types, theme colors, and CODE_QUALITY_RULES.md compliance.
---

# Validate Migration

Check if a React component follows migration standards and quality rules.

## Input
- React component file path (.tsx)

## Validation Checks

### 1. No DaisyUI Remnants
Check for DaisyUI class names:
- `btn`, `btn-*` variants
- `card`, `card-body`, `card-title`, `card-actions`
- `modal`, `modal-box`, `modal-action`
- `badge`, `badge-*` variants
- `alert`, `alert-*` variants
- `input`, `input-bordered`
- `stat`, `stat-title`, `stat-value`
- `steps`, `step`, `step-primary`
- `table-zebra`, `table-compact`
- `drawer`, `navbar`, `menu`

**Expected:** All replaced with shadcn/ui components

### 2. All Imports Use shadcn/ui
Check imports are from:
- `@/components/ui/*` (shadcn/ui components)
- `@/lib/*` (utilities like ansible-log-utils, use-copy-to-clipboard)
- NOT from: `vue`, `daisyui`, `pinia`, `vue-router`

### 3. Uses Theme Semantic Colors
Check for hardcoded colors:
- ❌ `text-green-500`, `bg-red-600`, `text-blue-400`
- ✅ `text-success`, `text-warning`, `text-destructive`, `text-info`

For Ansible logs specifically, check uses `getAnsibleLogClassName()` from ansible-log-utils

### 4. Follows DESIGN_PATTERNS.md
Verify correct pattern usage:
- **Modals:** Used for actions requiring focus, not for read-only info
- **Cards vs Tables:** Tables for comparison (4+ columns), Cards for rich content
- **StatCards:** Used for dashboard metrics (not raw Card components)
- **Progress:** Uses one of the 5 documented patterns

### 5. TypeScript Types Defined
Check:
- Props interface defined
- State types specified
- No `any` types (unless absolutely necessary with comment)
- Event handlers properly typed

### 6. No Vue Syntax Remnants
Check for:
- `ref()`, `computed()`, `watch()`, `onMounted()`
- `v-if`, `v-for`, `v-model`, `v-show`, `v-bind`, `v-on`
- `@click`, `@input`, `:class`, `:style` (Vue shorthand)
- `{{ }}` template syntax

### 7. Code Quality (from CODE_QUALITY_RULES.md)
- No `console.log` or `console.debug` statements
- No commented-out code blocks > 5 lines
- No unused imports
- No TODO/FIXME comments (should be GitHub issues)

### 8. Proper shadcn/ui Usage
Verify components used correctly:
- `<Dialog>` with `<DialogContent>`, `<DialogHeader>`, etc.
- `<Card>` with `<CardHeader>`, `<CardContent>`, `<CardFooter>`
- `<Button>` with correct variants (default, secondary, destructive, outline, ghost)
- `<Badge>` with correct variants (default, secondary, destructive, outline, success, warning)

## Output

Generate a validation report:

```markdown
## Validation Report: [ComponentName]

### ✅ Passed Checks
- No DaisyUI classes found
- All imports from shadcn/ui
- TypeScript types properly defined
- Follows design patterns

### ⚠️ Warnings
- [Line 45] Consider using StatCard instead of raw Card for metrics
- [Line 89] TODO comment should be converted to GitHub issue

### ❌ Failed Checks
- [Line 23] DaisyUI class 'btn-primary' found, use <Button variant="default">
- [Line 67] Hardcoded color 'text-green-500', use 'text-success'
- [Line 102] Vue syntax 'v-if' found, convert to {condition && ...}

### Summary
Status: PASS / PASS WITH WARNINGS / FAIL
Issues: [count] critical, [count] warnings
```

## Actions
- If FAIL: List all issues that must be fixed
- If PASS WITH WARNINGS: Suggest improvements
- If PASS: Component ready for commit
