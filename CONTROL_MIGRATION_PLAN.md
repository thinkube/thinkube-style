# Thinkube Control Migration Plan

**Last Updated:** 2025-11-05

## Overview

This document outlines the specific plan for migrating thinkube-control from Vue to React/Next.js, focusing on complete functionality migration and proper component usage.

**Context:** Control is a web-based management dashboard for Thinkube clusters with Keycloak authentication, state management, and more complex UI than the installer.

---

## Architecture Overview

### Current (Vue + Vite)

```
thinkube-control/
├── frontend/
│   ├── src/
│   │   ├── components/   (14 Vue components)
│   │   ├── views/        (11 Vue views)
│   │   ├── stores/       (6 Pinia stores)
│   │   ├── layouts/      (MainLayout.vue)
│   │   └── App.vue
│   ├── package.json
│   └── vite.config.mjs
├── backend/              (Python FastAPI - KEEP UNCHANGED)
├── ansible/              (Playbooks)
└── k8s/                  (Kubernetes manifests)
```

### Target (React + Next.js)

```
thinkube-control-react/
├── frontend/
│   ├── app/             (11 Next.js pages)
│   ├── components/      (Page-specific utilities ONLY)
│   ├── stores/          (6 Zustand stores)
│   ├── lib/             (Utilities, axios config)
│   └── public/          (Static assets)
├── backend/             (Python FastAPI - UNCHANGED)
├── ansible/             (Playbooks - UNCHANGED)
└── k8s/                 (Kubernetes manifests - UNCHANGED)
```

---

## Complexity Analysis

### Component Count

| Category | Vue Files | React Target |
|----------|-----------|--------------|
| Views (Pages) | 11 | 11 |
| Components | 14 | 0 (use thinkube-style) |
| Stores | 6 Pinia | 6 Zustand |
| Layouts | 1 | Use AppLayout from thinkube-style |
| **Total LOC** | ~6,400 lines | Similar |

### Compared to Installer

| Aspect | Installer | Control | Difference |
|--------|-----------|---------|------------|
| Pages | 15 | 11 | Control has fewer pages |
| Components | 0 | 14 | Control has many components to convert |
| State Management | None | 6 stores | NEW: Major complexity |
| Authentication | None | Keycloak | NEW: OAuth/OIDC |
| Backend Type | Tauri (bundled) | Separate service | Easier (no Tauri complexity) |
| Modals | Few | 4+ Harbor modals | More modal decisions |
| Special Features | Hardware detection | Charts, Harbor images | Different domains |

**Key Differences:**
- ✅ **Easier:** No Tauri complexity, standard web app
- ✅ **Easier:** Established patterns from installer
- ❌ **Harder:** 6 Pinia stores need migration
- ❌ **Harder:** Keycloak OAuth integration
- ❌ **Harder:** More modals to evaluate

---

## Critical Rules for Control Migration

### Rule 1: 100% Functionality Migration

**EVERY feature must be migrated completely. No placeholders.**

#### Harbor Images Feature (Example)

**Vue Implementation:**
- Main page: `HarborImages.vue`
- 4 modals: AddImageModal, BuildExecutor, CreateCustomImageModal, ViewImageModal
- API calls: List images, add custom image, build image, view details
- Filtering: Search by name, filter by type

**React Migration Requirements:**
- ✅ Main page with ALL API calls
- ✅ ALL 4 modals (or inline equivalents)
- ✅ Search AND filter functionality
- ✅ Build executor with streaming logs (like PlaybookExecutorStream)
- ✅ All buttons and actions functional

**Verification:**
```bash
# Count Vue modal components
grep -c "Modal" frontend/src/views/HarborImages.vue  # Result: 4

# Count React modal/dialog usage
grep -c "TkDialog\|inline" frontend/app/harbor-images/page.tsx  # Must be: 4

# Verify all API endpoints called
grep -o "axios\." frontend-vue/src/views/HarborImages.vue | wc -l
grep -o "axios\." frontend/app/harbor-images/page.tsx | wc -l
# Counts should match!
```

#### Optional Components Feature (Example)

**Vue Implementation:**
```typescript
const components = [
  { name: 'jupyterhub', enabled: true },
  { name: 'mlflow', enabled: true },
  // { name: 'cvat', enabled: true },  // Temporarily disabled for ARM64
]
```

**❌ WRONG React Migration:**
```typescript
const components = [
  { name: 'jupyterhub', enabled: true },
  { name: 'mlflow', enabled: true },
]
// CVAT deleted - WRONG!
```

**✅ CORRECT React Migration:**
```typescript
const components = [
  { name: 'jupyterhub', enabled: true },
  { name: 'mlflow', enabled: true },
  // { name: 'cvat', enabled: true },  // Temporarily disabled for ARM64 support
]
// Commented code preserved - CORRECT!
```

**Why Critical:** When ARM64 solution is found, simply uncomment - no re-migration needed.

---

### Rule 2: Component Creation - thinkube-style First

**NEVER create custom components in Control app.**

#### Common Temptations in Control

**Temptation #1: Custom Service Card**
```typescript
// ❌ WRONG - Creating in app
// frontend/components/CustomServiceCard.tsx
export function CustomServiceCard({ service }) {
  return <div className="border rounded p-4">...</div>
}
```

**✅ CORRECT:**
1. Check if TkCard can be composed for this
2. If not, request new component in thinkube-style
3. Wait for approval and implementation
4. Then use in Control

**Temptation #2: Custom Chart Component**
```typescript
// ❌ WRONG - Wrapping Chart.js in custom component
// frontend/components/HealthChart.tsx
export function HealthChart({ data }) {
  return <canvas id="chart">...</canvas>
}
```

**✅ CORRECT:**
- Use existing chart library (Recharts or Chart.js) directly
- Or request TkChart component in thinkube-style if pattern is reusable

---

### Rule 3: Migrate Commented Code

**ALL commented code must be migrated.**

#### Categories in Control

**1. Temporarily Disabled Features:**
```typescript
// CVAT component (ARM64 issue)
// Experimental features
// Beta functionality
```

**2. Platform-Specific Code:**
```typescript
// GPU-specific features
// Linux vs Windows differences
```

**3. Optional Features:**
```typescript
// Enterprise-only features
// Optional components
```

**Verification:**
```bash
# Find all commented code in Vue
grep -rn "//.*disabled\|//.*temporary\|//.*TODO" frontend/src/

# Verify same comments exist in React
grep -rn "//.*disabled\|//.*temporary\|//.*TODO" frontend/app/

# Counts should match or be explained!
```

---

## State Management Strategy

### Pinia → Zustand Migration

**6 Stores to Convert:**

1. **auth.js** → `useAuthStore()` (Zustand)
   - User info, tokens, login/logout
   - Simple enough for Zustand

2. **services.js** → `useServicesStore()` (Zustand)
   - Service CRUD operations
   - Health status polling
   - Complex state with actions

3. **harborImages.js** → `useHarborStore()` (Zustand)
   - Image list with filtering
   - Build status tracking
   - Complex state

4. **tokens.js** → `useTokensStore()` (Zustand)
   - API token CRUD
   - Standard Zustand pattern

5. **optionalComponents.js** → `useComponentsStore()` (Zustand)
   - Component enable/disable state
   - Configuration management

6. **dashboards.js** → `useDashboardStore()` (Zustand)
   - Dashboard data fetching
   - Data caching

### Zustand Store Template

```typescript
// stores/useServicesStore.ts
import { create } from 'zustand'
import axios from '@/lib/axios'

interface Service {
  name: string
  status: string
  health: string
}

interface ServicesState {
  services: Service[]
  loading: boolean
  error: string | null

  // Actions
  fetchServices: () => Promise<void>
  updateService: (name: string, updates: Partial<Service>) => Promise<void>
  deleteService: (name: string) => Promise<void>
}

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: [],
  loading: false,
  error: null,

  fetchServices: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/api/services')
      set({ services: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  updateService: async (name, updates) => {
    try {
      await axios.patch(`/api/services/${name}`, updates)
      set(state => ({
        services: state.services.map(s =>
          s.name === name ? { ...s, ...updates } : s
        )
      }))
    } catch (error) {
      set({ error: error.message })
    }
  },

  deleteService: async (name) => {
    try {
      await axios.delete(`/api/services/${name}`)
      set(state => ({
        services: state.services.filter(s => s.name !== name)
      }))
    } catch (error) {
      set({ error: error.message })
    }
  }
}))
```

### Using in Components

```typescript
// app/services/page.tsx
import { useServicesStore } from '@/stores/useServicesStore'

export default function Services() {
  const { services, loading, fetchServices } = useServicesStore()

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  if (loading) return <TkProgress />

  return (
    <div>
      {services.map(service => (
        <ServiceCard key={service.name} service={service} />
      ))}
    </div>
  )
}
```

---

## Migration Order (4 Phases)

### Phase 1: Foundation (Day 1-2)

**Setup:**
1. Create Next.js project (use installer as template)
2. Copy backend Python code unchanged
3. Setup Zustand stores (6 stores)
4. Setup Keycloak auth provider
5. Configure axios with base URL

**Verification:**
- [ ] `npm run dev` works
- [ ] Backend API accessible
- [ ] Keycloak redirects work
- [ ] Store hooks callable (empty data OK)

---

### Phase 2: Layout & Navigation (Day 2-3)

**Components:**
1. Use AppLayout from thinkube-style
2. Implement navigation (NavBar → AppLayout sidebar)
3. ProfileDropdown → User menu in AppLayout
4. Auth routes (Login, AuthCallback)

**Files:**
- `app/layout.tsx` - Root layout with AppLayout
- `app/login/page.tsx` - Keycloak redirect
- `app/auth/callback/page.tsx` - OAuth callback
- `lib/auth.tsx` - Keycloak provider

**Verification:**
- [ ] Login redirects to Keycloak
- [ ] Callback returns with token
- [ ] Navigation works
- [ ] User menu shows profile

---

### Phase 3: Core Pages (Day 3-5)

**Pages (in order):**

1. **Dashboard** (`app/dashboard/page.tsx`)
   - Stat cards (use TkCard from thinkube-style)
   - Service overview
   - Health status
   - **Completeness:** ALL stats from Vue version

2. **Templates** (`app/templates/page.tsx`)
   - Template list (TkTable or cards based on count)
   - Template parameter form (dynamic form generation)
   - **Completeness:** ALL template parameters, validation

3. **Secrets** (`app/secrets/page.tsx`)
   - Secret CRUD (TkTable + forms)
   - **Completeness:** All secret types, validation

4. **API Tokens** (`app/tokens/page.tsx`)
   - Token CRUD (TkTable + actions)
   - **Completeness:** All token scopes, expiration

5. **Optional Components** (`app/components/page.tsx`)
   - Component enable/disable (checkboxes + forms)
   - **CRITICAL:** Migrate CVAT commented lines!
   - **Completeness:** ALL components including commented ones

**Verification for Each Page:**
- [ ] Line count similar to Vue (±20%)
- [ ] All API calls present
- [ ] All buttons functional
- [ ] All forms validate
- [ ] Commented code preserved
- [ ] Zero TODOs/placeholders

---

### Phase 4: Advanced Features (Day 5-7)

**Complex Pages:**

1. **Harbor Images** (`app/harbor/page.tsx`)
   - Main list view
   - 4 modals (decide: keep modal or inline)
   - **AddImageModal:** Form to add custom image
   - **CreateCustomImageModal:** Form with Dockerfile
   - **ViewImageModal:** Display image details (could be inline)
   - **BuildExecutor:** Streaming build logs (use PlaybookExecutorStream pattern)
   - **Completeness:**
     - [ ] All 4 modal functionalities present
     - [ ] Image list with search and filter
     - [ ] Build logs streaming
     - [ ] All API endpoints called

2. **Health History Chart** (`app/health/page.tsx`)
   - Chart.js or Recharts for historical data
   - Time range selector
   - **Completeness:** ALL chart data points, zoom, export

3. **Image Mirror Deployment** (`app/image-mirror/page.tsx`)
   - Mirror configuration
   - **Completeness:** ALL mirror options

4. **JupyterHub Config** (`app/jupyterhub/page.tsx`)
   - JupyterHub configuration forms
   - **Completeness:** ALL config options

**Verification:**
- [ ] All Harbor modals work (or inline equivalents)
- [ ] Build executor streams logs like installer
- [ ] Charts display data correctly
- [ ] All configuration options present

---

## Completeness Verification Checklist

### Per-Page Verification

For **EVERY** migrated page:

```bash
# 1. Line Count Check
wc -l frontend-vue/src/views/YourPage.vue
wc -l frontend/app/your-page/page.tsx
# Should be within ±20%

# 2. API Call Count
grep -c "axios\." frontend-vue/src/views/YourPage.vue
grep -c "axios\." frontend/app/your-page/page.tsx
# Should match

# 3. Component Count (modals, cards, buttons)
grep -c "<.*Modal\|<Card\|<Button" frontend-vue/src/views/YourPage.vue
grep -c "<Tk.*Dialog\|<TkCard\|<TkButton" frontend/app/your-page/page.tsx
# Should match

# 4. Placeholder Check
grep -rn "TODO\|FIXME\|PLACEHOLDER" frontend/app/your-page/
# Should return ZERO results

# 5. Commented Code Preservation
grep -c "//.*disabled\|//.*temporary" frontend-vue/src/views/YourPage.vue
grep -c "//.*disabled\|//.*temporary" frontend/app/your-page/page.tsx
# Should match
```

### Final Verification

Before marking Control migration "complete":

- [ ] **All 11 pages migrated** with zero placeholders
- [ ] **All 6 stores migrated** to Zustand
- [ ] **Keycloak auth working** (login, logout, token refresh)
- [ ] **All API endpoints called** (compare with Vue)
- [ ] **All modals functional** (or inline equivalents)
- [ ] **CVAT commented code migrated** (temporarily disabled features)
- [ ] **All Harbor modals work** (4 modals)
- [ ] **Build executor streams logs** (like PlaybookExecutorStream)
- [ ] **Charts display data** (health history)
- [ ] **All optional components** listed (including commented)
- [ ] **Line counts reasonable** (all pages within ±20% of Vue)
- [ ] **Zero TODOs/FIXMEs/PLACEHOLDERs** in migrated code
- [ ] **Code review passed** by second person
- [ ] **E2E testing passed** on actual cluster

---

## Risk Areas & Mitigation

### Risk #1: Incomplete Harbor Migration

**Risk:** Harbor has 4 modals, easy to skip one.

**Mitigation:**
1. List all 4 modals explicitly before starting
2. Create checklist with all modal features
3. Test each modal individually
4. Verify build executor streaming works

### Risk #2: CVAT Commented Code Deleted

**Risk:** Deleting CVAT instead of migrating commented lines.

**Mitigation:**
1. Explicitly check for CVAT in Vue code
2. Verify CVAT comments present in React code
3. Add to verification checklist

### Risk #3: Store Migration Incomplete

**Risk:** Missing store actions or state properties.

**Mitigation:**
1. Document all Pinia store properties and actions
2. Create Zustand equivalent with same API
3. Test all store actions individually

### Risk #4: Conditional Logic Not Migrated

**Risk:** Optional components, GPU features, etc. not migrated.

**Mitigation:**
1. Identify all `if` statements in Vue
2. Verify all conditionals in React
3. Test with features enabled AND disabled

---

## Timeline Estimate

| Phase | Duration | Tasks |
|-------|----------|-------|
| Setup | 1 day | Next.js, stores, auth, axios |
| Layout & Nav | 1 day | AppLayout, login, navigation |
| Core Pages | 3 days | Dashboard, templates, secrets, tokens, components |
| Advanced Features | 2-3 days | Harbor (4 modals), charts, mirror, jupyterhub |
| Testing & QA | 2 days | E2E tests, completeness verification |
| **Total** | **9-10 days** | vs 4 days for installer |

**Why Longer Than Installer:**
- 6 state stores to migrate (installer had none)
- Keycloak auth integration (installer had none)
- 4 Harbor modals (installer had simple modals)
- Charts component (installer had none)
- More conditional logic to verify

---

## Success Criteria

Control migration is "complete" when:

1. ✅ **100% functionality migrated** - No placeholders, no missing features
2. ✅ **All pages functional** - All 11 pages work with real data
3. ✅ **All stores working** - 6 Zustand stores with all actions
4. ✅ **Auth working** - Keycloak login/logout/token refresh
5. ✅ **Commented code preserved** - CVAT and all temporary disablements migrated
6. ✅ **Zero placeholders** - No TODO/FIXME/PLACEHOLDER anywhere
7. ✅ **All modals functional** - 4 Harbor modals (or inline equivalents) working
8. ✅ **Build executor streaming** - Like PlaybookExecutorStream in installer
9. ✅ **Line counts reasonable** - All pages within ±20% of Vue
10. ✅ **Code review passed** - Second person verified completeness
11. ✅ **E2E tests passed** - On actual cluster with real data
12. ✅ **No custom components** - All UI from thinkube-style

**Remember:** Control migration must be as complete as installer migration was intended to be. Learn from installer mistakes and verify 100% completeness.
