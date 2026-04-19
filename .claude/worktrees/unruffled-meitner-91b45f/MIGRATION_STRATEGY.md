# Thinkube Vue → React Migration Strategy

## Overview
Migrating three separate Vue + DaisyUI applications to React + shadcn/ui:
1. **thinkube-installer** (20 components, Tauri desktop app) - **START HERE**
2. **thinkube-control** (27 components, web dashboard)
3. **tkt-webapp template** (sample deployable app)

## Timeline
- **Aggressive:** 3-4 weeks
- **Approach:** Big Bang with git worktrees
- **Quality:** Automated + Manual QA

## Shared Component Library Strategy
- **Name:** @thinkube/ui (or components/ folder in each project)
- **Base:** shadcn/ui components already built in thinkube-style
- **Purpose:** Ensure consistent UI across all three apps
- **Location:** Copy from thinkube-style to each project initially, extract to shared package later if needed

## Key Principle
**NO FRANKENSTEIN:** Every DaisyUI component must have a clean shadcn/ui equivalent defined BEFORE migration starts.

## Migration Order
1. **Installer** (simplest, 20 components, no auth, no Pinia complexity)
2. **Control** (more complex, 27 components, Keycloak auth, 6 Pinia stores)
3. **Template** (TBD - need to analyze)

## Success Criteria
- All DaisyUI components mapped 1:1 to shadcn/ui
- Consistent design language across all three apps
- No mixed component libraries (pure shadcn/ui, no DaisyUI remnants)
- Theme system working in all apps (light/dark mode)
- All functionality preserved from Vue versions
