# Migration Stack Update Summary

**Date:** 2025-11-05
**Change:** Updated all migration documentation from Next.js to Vite + React Router

## Files Updated

All migration documentation files have been updated to reflect Vite + React Router as the target stack instead of Next.js:

1. CLAUDE_CODE_TOOLING.md
2. CODE_QUALITY_RULES.md
3. CONTROL_ASSESSMENT.md
4. CONTROL_AUTH_FIXES.md
5. CONTROL_DEPLOYMENT.md
6. CONTROL_MIGRATION_DECISIONS.md
7. CONTROL_MIGRATION_PLAN.md
8. CONTROL_SIMPLIFICATIONS.md
9. DESIGN_PATTERNS.md
10. INSTALLER_MIGRATION_PLAN.md
11. MIGRATION_LESSONS_LEARNED.md
12. README.md

## Key Replacements Made

### Terminology
- "Next.js" → "Vite"
- "Next.js 16" → "Vite 5"
- "App Router" → "React Router"
- "next build" → "vite build"
- "next dev" → "vite dev"
- "next.config.ts" → "vite.config.ts"

### Directory Structure
- "/app/" directory → "/src/" directory
- "app/your-page/page.tsx" → "src/YourPage.tsx"
- ".next/" build output → "dist/" build output

### Build Concepts
- "standalone output" → "static output"
- "Server-side rendering (SSR)" → "Single Page Application (SPA)"
- "Static site generation (SSG)" → removed or replaced with "SPA"

### Configuration Files
- References to "next.config.js" → "vite.config.ts"
- Next.js-specific configs → Vite equivalents
- ".gitignore" entries: ".next/" → "dist/"

### Components & Routing
- "Next.js routing" → "React Router"
- "Next.js App Router" → "React Router"
- Page-based routing references updated to component-based

### Image Optimization
- "Next.js Image component" → removed (use standard img tags or optimization libraries)

### Scripts & Tooling
- Path references in scripts updated from "app/" to "src/"
- Build commands updated from "next build" to "vite build"
- Dev commands updated from "next dev" to "vite dev"

## Rationale

Vite + React Router provides:
- Simpler architecture for the Control and Template applications
- Faster build times and HMR
- More straightforward routing without file-system conventions
- Better compatibility with existing Tauri-based installer
- Smaller bundle sizes
- Direct control over application structure

## Migration Impact

- **No change to components**: All shadcn/ui and thinkube-style components remain the same
- **No change to state management**: Zustand stores unchanged
- **No change to API integration**: Axios configurations unchanged
- **No change to authentication**: Keycloak integration remains the same
- **Simplified routing**: React Router instead of Next.js App Router conventions

## Next Steps

All documentation now reflects Vite + React Router as the target stack. Future migrations should:

1. Initialize with Vite instead of Next.js
2. Use React Router for routing
3. Follow standard React + Vite patterns
4. Reference vite.config.ts for configuration
5. Use "vite dev" and "vite build" commands

## Documentation Consistency

All references to Next.js have been systematically replaced to ensure:
- Consistent terminology throughout
- Accurate build commands
- Correct directory structures
- Proper tool references
- Updated script examples
