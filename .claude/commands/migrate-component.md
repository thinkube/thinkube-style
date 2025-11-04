---
description: Convert a Vue component to React + shadcn/ui following Thinkube standards
argument-hint: <vue-file-path>
---

# Migrate Vue Component to React

Convert the Vue component at `$ARGUMENTS` to React + shadcn/ui following Thinkube standards.

## Process

1. **Read the Vue component** at `$ARGUMENTS` and analyze its structure
2. **Identify all DaisyUI classes** used in the template
3. **Map to shadcn/ui equivalents** using `/home/alexmc/thinkube-style/COMPONENT_MAPPING.md`
4. **Convert Vue syntax to React:**
   - `<template>` → JSX return statement
   - `<script setup>` → React function component
   - `ref()` → `useState()`
   - `computed()` → `useMemo()` or derived state
   - `watch()` → `useEffect()`
   - `onMounted()` → `useEffect(() => {...}, [])`
   - `onUnmounted()` → `useEffect(() => { return () => {...} }, [])`
   - `v-if="condition"` → `{condition && ...}`
   - `v-else` → ternary or separate condition
   - `v-for="item in items"` → `{items.map(item => ...)}`
   - `v-model` → `value` + `onChange` (controlled component)
   - `@click` → `onClick`
   - `@input` → `onInput` or `onChange`
   - `:class` → `className` with cn() helper
   - `:style` → `style` object
5. **Apply DESIGN_PATTERNS.md criteria:**
   - Check if modal is needed or should be inline content
   - Choose Card vs Table vs List based on decision tree
   - Use correct progress indicator pattern (5 options available)
6. **Apply CODE_QUALITY_RULES.md:**
   - No console.log statements
   - No commented-out code
   - Remove all Vue imports
   - Use proper TypeScript types
   - Use theme semantic colors (not hardcoded)
7. **Special Cases:**
   - **Ansible logs:** Use `/home/alexmc/thinkube-style/lib/ansible-log-utils.ts`
   - **Copy to clipboard:** Use `/home/alexmc/thinkube-style/lib/use-copy-to-clipboard.ts`
   - **Stats display:** Use `<StatCard>` component
   - **Progress indicators:** Use patterns from installation-progress-demo (recommend Subway Line for installer)
8. **Write the React component** to the appropriate location in `/home/alexmc/thinkube-installer-react/frontend/`
9. **Report what was changed:**
   - List of DaisyUI classes replaced
   - List of Vue patterns converted
   - Any design decisions made (modal vs inline, etc.)
   - Any issues or uncertainties

## Output
- New React .tsx file
- Summary of changes
- Any warnings or notes for manual review

## Important Rules
- NO mixing of DaisyUI and shadcn/ui
- NO Vue syntax remnants
- Use semantic colors from theme (success, warning, destructive, info)
- Follow existing component patterns in thinkube-style
- Add proper TypeScript types for all props and state
