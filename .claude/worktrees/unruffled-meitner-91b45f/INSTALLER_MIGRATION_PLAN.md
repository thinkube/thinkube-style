# Thinkube Installer Migration Plan

**Date:** 2025-11-03
**Target:** Migrate thinkube-installer from Vue + Vite + Tauri to Vite + Tauri

---

## Current Architecture

```
thinkube-installer/
├── frontend/
│   ├── src/               (Vue 3 + TypeScript)
│   ├── src-tauri/
│   │   ├── backend/       (Python FastAPI - KEEP UNCHANGED)
│   │   ├── src/           (Rust Tauri wrapper)
│   │   └── tauri.conf.json
│   ├── package.json       (Vite + Vue)
│   └── vite.config.js
├── assets/
└── docs/
```

---

## Target Architecture

```
thinkube-installer/
├── frontend/
│   ├── src/               (Vite + TypeScript - NEW)
│   ├── src/               (Vite app router - NEW)
│   ├── components/        (React + shadcn/ui - NEW)
│   ├── lib/               (utilities - NEW)
│   ├── src-tauri/
│   │   ├── backend/       (Python FastAPI - UNCHANGED)
│   │   ├── src/           (Rust Tauri wrapper - MOSTLY UNCHANGED)
│   │   └── tauri.conf.json (update paths)
│   ├── package.json       (Vite dependencies - NEW)
│   └── vite.config.ts     (NEW)
├── assets/                (KEEP)
└── docs/                  (KEEP)
```

---

## What Changes

### ✅ Frontend (Complete Rewrite)
- Vue 3 → React 18
- Vite → Vite
- DaisyUI → shadcn/ui
- Vue Router → Vite React Router
- Pinia → Zustand (if needed for state)

### ✅ Components (20 files to migrate)
See INSTALLER_COMPONENTS.md for full list

### ❌ Backend (UNCHANGED)
- `src-tauri/backend/main.py` - Keep as-is
- `src-tauri/backend/src/` - Keep as-is
- Python dependencies - Keep as-is
- FastAPI endpoints - Keep as-is

### ⚠️ Tauri Configuration (Minor Updates)
- Update `tauri.conf.json` to point to Vite output
- Rust code in `src-tauri/src/` - Minimal changes (if any)
- Keep Cargo.toml, build scripts unchanged

---

## Migration Steps

### Phase 1: Setup (Current)
1. ✅ Git worktree created (`thinkube-installer-react`)
2. ⏭️ Initialize Vite in worktree
3. ⏭️ Copy shadcn/ui components from thinkube-style
4. ⏭️ Configure Tauri to work with Vite

### Phase 2: Backend Verification
1. Copy Python backend unchanged
2. Verify FastAPI runs independently
3. Document API endpoints for frontend

### Phase 3: Component Migration (Use Sub-Agents)
1. Simple components first (Welcome, Summary, SSHSetup)
2. Form components (NetworkConfiguration, NodeConfiguration)
3. Complex components (PlaybookExecutorStream, HardwareDetection)
4. Layout components (App.vue → RootLayout)

### Phase 4: Integration
1. Connect React frontend to FastAPI backend
2. Test Tauri packaging
3. Verify WebSocket connections (PlaybookExecutorStream)
4. Test full installer flow

### Phase 5: Validation
1. Run CODE_QUALITY_RULES.md checks
2. Verify no Vue/DaisyUI remnants
3. Test on target hardware
4. Verify .deb packaging works

---

## Key Differences from Web Apps

| Aspect | Installer (Tauri) | Control/Template (Web) |
|--------|------------------|------------------------|
| **Routing** | Vite React Router (SPA mode) | Vite React Router (SSR) |
| **Backend** | Python FastAPI (bundled) | Python FastAPI (separate server) |
| **Build Output** | Static export for Tauri | Server-side rendering |
| **State** | May need Zustand | Context/props sufficient |
| **WebSockets** | Local FastAPI server | Remote server |

---

## Tauri + Vite Integration

### vite.config.ts Configuration
```js
module.exports = {
  output: 'export',  // Static export for Tauri
  images: {
    unoptimized: true  // Tauri doesn't support Vite image optimization
  },
  assetPrefix: './',
  trailingSlash: true
}
```

### tauri.conf.json Updates
```json
{
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devPath": "http://localhost:3000",  // Vite dev server
    "distDir": "../out"  // Vite static export output
  }
}
```

---

## Backend API (Unchanged)

Python FastAPI serves:
- Hardware detection endpoints
- Network discovery endpoints
- Ansible playbook execution (WebSocket)
- Configuration validation
- SSH key management

**Port:** 8001 (or configured)
**Base URL:** `http://localhost:8001`

---

## Component Count

**Total:** 20 Vue components → 20 React components
- Simple: 8 components (~100-300 lines each)
- Medium: 7 components (~300-600 lines each)
- Complex: 5 components (600+ lines, WebSocket, forms)

**Estimated Time with Sub-Agents:** 3-4 hours

---

## Testing Strategy

1. **Unit Tests:** Convert Vitest tests (if any)
2. **Integration Tests:** Full installer flow
3. **Hardware Tests:** Run on actual target machines
4. **Packaging Tests:** Verify .deb builds and installs

---

## Success Criteria

- ✅ All 20 components migrated
- ✅ Python backend unchanged and functional
- ✅ Tauri packaging works
- ✅ Full installer flow works (12 steps)
- ✅ WebSocket playbook execution works
- ✅ No Vue/DaisyUI remnants (pre-commit hook passes)
- ✅ TypeScript compiles without errors
- ✅ .deb package builds successfully

---

## Next Action

Initialize Vite in the worktree with Tauri-compatible configuration.
