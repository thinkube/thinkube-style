# DaisyUI → shadcn/ui Component Mapping

## Purpose
This document maps every DaisyUI component used in thinkube-installer and thinkube-control to their shadcn/ui equivalents in thinkube-style.

**Rule:** If a component is marked ❌ MISSING, it MUST be created before migration starts.

---

## Button Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `btn` | Base button | `<Button>` | ✅ EXISTS | `/components/ui/button.tsx` |
| `btn-primary` | Primary action | `<Button variant="default">` | ✅ EXISTS | |
| `btn-secondary` | Secondary action | `<Button variant="secondary">` | ✅ EXISTS | |
| `btn-ghost` | Subtle button | `<Button variant="ghost">` | ✅ EXISTS | |
| `btn-outline` | Outlined button | `<Button variant="outline">` | ✅ EXISTS | |
| `btn-error` / `btn-danger` | Destructive | `<Button variant="destructive">` | ✅ EXISTS | |
| `btn-success` | Success action | `<Button className="bg-success">` | ✅ EXISTS | Uses semantic color |
| `btn-warning` | Warning action | `<Button className="bg-warning">` | ✅ EXISTS | Uses semantic color |
| `btn-info` | Info action | `<Button className="bg-info">` | ✅ EXISTS | Uses semantic color |
| `btn-sm` | Small size | `<Button size="sm">` | ✅ EXISTS | |
| `btn-lg` | Large size | `<Button size="lg">` | ✅ EXISTS | |
| `btn-block` | Full width | `<Button className="w-full">` | ✅ EXISTS | Use Tailwind directly |
| `btn-disabled` | Disabled state | `<Button disabled>` | ✅ EXISTS | |
| `loading` | Loading spinner | `<Button disabled><Loader2 />` | ✅ EXISTS | Use lucide-react icon |

---

## Card Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `card` | Container | `<Card>` | ✅ EXISTS | `/components/ui/card.tsx` |
| `card-body` | Content area | `<CardContent>` | ✅ EXISTS | |
| `card-title` | Title | `<CardTitle>` | ✅ EXISTS | |
| `card-actions` | Action buttons | `<CardFooter>` or custom div | ✅ EXISTS | |
| `card-compact` | Reduced padding | `<Card className="p-4">` | ✅ EXISTS | Use Tailwind |
| `card-bordered` | With border | `<Card className="border">` | ✅ EXISTS | Default has border |

---

## Alert Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `alert` | Base alert | `<Alert>` | ✅ EXISTS | `/components/ui/alert.tsx` |
| `alert-info` | Information | `<Alert variant="default">` | ✅ EXISTS | |
| `alert-success` | Success message | `<Alert className="bg-success/10 text-success">` | ✅ EXISTS | Use semantic colors |
| `alert-warning` | Warning | `<Alert className="bg-warning/10 text-warning">` | ✅ EXISTS | |
| `alert-error` | Error message | `<Alert variant="destructive">` | ✅ EXISTS | |

---

## Modal/Dialog Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `modal` | Modal overlay | `<Dialog>` | ✅ EXISTS | `/components/ui/dialog.tsx` |
| `modal-box` | Modal content | `<DialogContent>` | ✅ EXISTS | |
| `modal-open` | Open state | `<Dialog open={true}>` | ✅ EXISTS | Controlled component |
| `modal-action` | Action buttons | `<DialogFooter>` | ✅ EXISTS | |
| `modal-backdrop` | Backdrop | Automatic in Dialog | ✅ EXISTS | Built-in |

---

## Form Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `input` | Text input | `<Input>` | ✅ EXISTS | `/components/ui/input.tsx` |
| `input-bordered` | With border | `<Input>` (default) | ✅ EXISTS | |
| `textarea` | Multi-line input | `<Textarea>` | ✅ EXISTS | `/components/ui/textarea.tsx` |
| `select` | Dropdown | `<Select>` | ✅ EXISTS | `/components/ui/select.tsx` |
| `checkbox` | Checkbox | `<Checkbox>` | ✅ EXISTS | `/components/ui/checkbox.tsx` |
| `radio` | Radio button | `<RadioGroup>` | ✅ EXISTS | `/components/ui/radio-group.tsx` |
| `toggle` | Toggle switch | `<Switch>` | ✅ EXISTS | `/components/ui/switch.tsx` |
| `label` | Form label | `<Label>` | ✅ EXISTS | `/components/ui/label.tsx` |
| `form-control` | Form wrapper | `<div className="space-y-2">` | ✅ EXISTS | Use Tailwind |

---

## Badge Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `badge` | Label/tag | `<Badge>` | ✅ EXISTS | `/components/ui/badge.tsx` |
| `badge-primary` | Primary badge | `<Badge variant="default">` | ✅ EXISTS | |
| `badge-secondary` | Secondary | `<Badge variant="secondary">` | ✅ EXISTS | |
| `badge-outline` | Outlined | `<Badge variant="outline">` | ✅ EXISTS | |
| `badge-success` | Success | `<Badge variant="success">` | ✅ EXISTS | |
| `badge-warning` | Warning | `<Badge variant="warning">` | ✅ EXISTS | |
| `badge-error` | Error | `<Badge variant="destructive">` | ✅ EXISTS | |
| `badge-info` | Info | `<Badge className="bg-info">` | ✅ EXISTS | |

---

## Progress Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `progress` | Progress bar | `<Progress>` | ✅ EXISTS | `/components/ui/progress.tsx` |
| `loading` | Spinner | `<Loader2 className="animate-spin">` | ✅ EXISTS | Use lucide-react |
| `loading-spinner` | Spinner | `<Loader2 className="animate-spin">` | ✅ EXISTS | |
| `loading-dots` | Dots | Custom component | ⚠️ OPTIONAL | Nice-to-have |

---

## Navigation Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `navbar` | Top navigation | Custom AppLayout | ✅ EXISTS | `/components/app-layout.tsx` |
| `menu` | Menu list | Custom nav structure | ✅ EXISTS | In AppLayout |
| `menu-item` | Menu item | `<Link>` with styling | ✅ EXISTS | |
| `dropdown` | Dropdown menu | `<DropdownMenu>` | ✅ EXISTS | `/components/ui/dropdown-menu.tsx` |
| `drawer` | Side drawer | `<Sheet>` | ✅ EXISTS | `/components/ui/sheet.tsx` |
| `tabs` | Tab navigation | `<Tabs>` | ✅ EXISTS | `/components/ui/tabs.tsx` |
| `tab` | Tab item | `<TabsList><TabsTrigger>` | ✅ EXISTS | |

---

## Steps/Stepper Components (Installer-Specific)

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `steps` | Step indicator | Subway Line Progress | ✅ EXISTS | `/app/installation-progress-demo` |
| `step` | Individual step | Progress indicator patterns | ✅ EXISTS | 5 different options available |
| `step-primary` | Active step | Active state in progress | ✅ EXISTS | Built into progress patterns |

**Available Options (choose during migration):**
1. Subway Line Progress (compact, visual)
2. Progress Bar + Current Step (simple)
3. Compact Scrollable List (detailed)
4. Dot Progress Indicator (minimal)
5. Progress Bar + Recent Steps (contextual)

---

## Data Display Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `stat` | Statistic | `<StatCard>` | ✅ EXISTS | `/components/ui/stat-card.tsx` (20+ uses in Vue apps) |
| `stat-title` | Stat label | StatCard title prop | ✅ EXISTS | |
| `stat-value` | Stat value | StatCard value prop | ✅ EXISTS | |
| `mockup-code` | Code display | Ansible log utils | ✅ EXISTS | `/lib/ansible-log-utils.ts` + copy hook |
| `divider` | Separator | `<Separator>` | ✅ EXISTS | `/components/ui/separator.tsx` |
| `tooltip` | Tooltip | `<Tooltip>` | ✅ EXISTS | `/components/ui/tooltip.tsx` |

**Completed:**
1. Created `<StatCard>` component with icons, trends, and variants
2. Created Ansible log utilities (semantic coloring + copy hook) - no component needed

---

## Table Components (Control-Specific)

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `table` | Data table | `<Table>` | ✅ EXISTS | `/components/ui/table.tsx` |
| `table-zebra` | Striped rows | Table with className | ✅ EXISTS | |
| `table-compact` | Dense table | Table with className | ✅ EXISTS | |

---

## Feedback Components

| DaisyUI Class | Usage | shadcn/ui Equivalent | Status | Notes |
|--------------|-------|---------------------|--------|-------|
| `toast` | Toast notification | `<Toast>` | ✅ EXISTS | `/components/ui/toast.tsx` |
| `alert` (toast-like) | Notification | `<Toast>` | ✅ EXISTS | |

---

## Element Plus Components (Control Only)

| Element Plus | Usage | shadcn/ui Equivalent | Status | Notes |
|-------------|-------|---------------------|--------|-------|
| `ElMessage` | Toast notification | `<Toast>` / `useToast()` | ✅ EXISTS | |
| `ElMessageBox` | Confirm dialog | `<AlertDialog>` | ✅ EXISTS | `/components/ui/alert-dialog.tsx` |
| `ElTable` | Data table | `<Table>` or custom | ✅ EXISTS | May need enhanced table |
| `ElForm` | Form wrapper | react-hook-form | ✅ EXISTS | Use form library |
| `ElDialog` | Dialog | `<Dialog>` | ✅ EXISTS | |

---

## COMPONENT STATUS SUMMARY

### ✅ All Required Patterns Available
1. **Progress/Step Indicators** - ✅ USE EXISTING PATTERNS
   - 5 different progress indicator patterns already available
   - Location: `/app/installation-progress-demo`
   - Choose pattern during migration (recommend Subway Line for installer)
   - **No component** - use implementation patterns

2. **Ansible Log Display** - ✅ UTILITIES CREATED
   - `/lib/ansible-log-utils.ts` - Semantic coloring for log types
   - `/lib/use-copy-to-clipboard.ts` - Copy hook (reusable anywhere)
   - Auto-scroll pattern (3 lines with useEffect + ref)
   - **Usage:** PlaybookExecutorStream in both apps
   - **No component** - utilities + simple markup is cleaner
   - **Future:** For code syntax highlighting, use Shiki/Prism (separate concern)

3. **`<StatCard>` component** - ✅ CREATED & VERIFIED NEEDED
   - Title + value layout with variants
   - Icon support (lucide-react)
   - Trend indicators (up/down/neutral)
   - Location: `/components/ui/stat-card.tsx`
   - **Usage:** 9 files across installer/control with 20+ instances
   - Maps DaisyUI `stat/stat-title/stat-value/stat-desc` pattern
   - **This is a component** because it's used 20+ times (worth the abstraction)

### Optional (Can Create During Migration)
4. **Loading Dots** animation - Alternative to spinner (optional, Loader2 sufficient)
5. **Enhanced Table** - If Element Plus tables need advanced features (evaluate during migration)

---

## Implementation Plan

### Phase 1: Review and Consolidate Components ✅ COMPLETE
1. ✅ Review existing components in thinkube-style
2. ✅ Identified 5 existing progress indicator patterns (use instead of creating new Stepper)
3. ✅ Created Ansible log utilities instead of CodeBlock component (more flexible)
4. ✅ Created `<StatCard>` component (verified: 20+ uses across Vue apps)
5. ✅ Removed dead code (main-nav.tsx, 102 lines)
6. ✅ Deleted CodeBlock component (103 lines) → replaced with utilities (35 lines total)

### Phase 2: Validate Mapping (Current Phase)
1. Audit all DaisyUI usage in installer (use Grep)
2. Verify every usage has a mapped equivalent
3. Update this document with any gaps found during migration

### Phase 3: Begin Migration (Ready to Start)
- Start with thinkube-installer
- Use this mapping as reference
- Copy shadcn/ui components to each project
- Update mapping if new patterns discovered

---

## Migration Rules

1. **NO MIXING:** Never use DaisyUI and shadcn/ui in the same component
2. **ONE-TO-ONE:** Every DaisyUI class must map to exactly one shadcn/ui pattern
3. **DOCUMENT GAPS:** If you find a DaisyUI component not in this list, STOP and update this document first
4. **CONSISTENT VARIANTS:** Use the same variant names across all three apps (e.g., always use "destructive" for errors, never mix with "danger")

---

## Testing Checklist

Before declaring a component "mapped":
- [ ] Renders identically in light mode
- [ ] Renders identically in dark mode
- [ ] Matches DaisyUI spacing/sizing
- [ ] Supports same props/variants
- [ ] Works with existing Tailwind classes
- [ ] Passes accessibility standards

---

## Status: ✅ READY FOR MIGRATION

**Last Updated:** 2025-11-03 (after component review & consolidation)

**Completion:**
- Base Components: 100% (all shadcn/ui primitives in place)
- Progress Indicators: ✅ 5 patterns available (no duplicate Stepper component)
- Ansible Logs: ✅ Utilities created (no CodeBlock component needed)
- StatCard: ✅ Created & verified needed (20+ uses in Vue apps)
- Dead Code: ✅ Removed (main-nav.tsx)
- Bloat Removed: ✅ Deleted CodeBlock (103 lines → 35 lines utilities)
- Component Count: **20 UI components** (lean, consolidated, no duplication)
- Utility Functions: **2 reusable utilities** (more flexible than components)
- Ready for Migration: **YES** - All DaisyUI patterns have shadcn/ui equivalents
