---
name: tk-validate-migration
description: Validates migrated React components for Vue syntax remnants that build validation doesn't catch. Use when user says "validate migration", "check for vue syntax", or after migration completes.
allowed-tools: Read, Grep
---

# Validate Migration

Check migrated React components for Vue syntax remnants that npm build validation doesn't catch.

## Instructions

1. **Check for Vue Template Syntax** - Use Grep to search for:
   - `v-if`, `v-for`, `v-model`, `v-bind`, `v-show`, `v-else`
   - Vue event handlers: `@click`, `@input`, `@change`, `@submit`
   - Vue component tags: `<template>`, `<script setup>`

2. **Check for Raw HTML Elements** - Use Grep to search for raw elements that should use Tk components:
   - `<button` (should be TkButton)
   - `<input` (should be TkInput)
   - `<textarea` (should be TkTextarea)

3. **Report findings** with exact line numbers and file paths

## Validation Checks

**Critical Errors (must fix):**
- Any Vue directive syntax (v-*, @*)
- Any Vue component tags (<template>, <script setup>)

**Warnings (should fix):**
- Raw `<button>` elements (should be TkButton)
- Raw `<input>` elements (should be TkInput)

## Examples

**User:** "validate migration"
**Action:** Grep the React component file for Vue syntax patterns, report findings

**User:** "check for vue syntax in ServiceCard"
**Action:** Grep `/home/alexmc/thinkube-control/frontend/src/components/ServiceCard.tsx` for Vue patterns

## Notes

- This validation is COMPLEMENTARY to `npm run build` validation
- Build validation checks: DaisyUI classes, inline styles, thinkube-style imports
- This skill checks: Vue syntax remnants, raw HTML elements
- Both validations should pass for complete migration
