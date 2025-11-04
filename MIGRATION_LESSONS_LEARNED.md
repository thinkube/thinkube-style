# Migration Lessons Learned - Thinkube Installer Vue → React

## Issues Discovered During thinkube-installer Migration

### 1. ❌ Axios Configuration Not Used
**Problem**: All migrated components imported `axios` directly from the package instead of using the configured instance.

**Impact**:
- Components couldn't connect to backend API
- No Tauri protocol detection
- Missing base URL configuration

**Files Affected**: 9 pages
- `app/requirements/page.tsx`
- `app/gpu-driver-check/page.tsx`
- `app/node-configuration/page.tsx`
- `app/sudo-password/page.tsx`
- `app/hardware-detection/page.tsx`
- `app/configuration/page.tsx`
- `app/ssh-setup/page.tsx`
- `app/network-configuration/page.tsx`
- `app/server-discovery/page.tsx`

**Fix**:
```typescript
// ❌ Wrong
import axios from "axios"

// ✅ Correct
import axios from "@/utils/axios"
```

**Root Cause**: Migration agents didn't check for utility configurations in the source project.

---

### 2. ❌ Google Fonts in Offline App
**Problem**: Layout used `next/font/google` which requires internet connection.

**Impact**: Fonts won't load in Tauri desktop app (offline).

**Fix**: Remove Google Fonts, use system fonts
```typescript
// ❌ Wrong
import { Geist, Geist_Mono } from "next/font/google";

// ✅ Correct
// Remove font imports, rely on tailwind defaults
```

---

### 3. ❌ Missing Static Assets
**Problem**: Logo SVG files weren't copied from Vue public folder.

**Files Missing**:
- `tk_full_logo.svg`
- `logo.svg`
- `logo-inverted.svg`
- `icon-devops.svg`

**Fix**: Copy all assets from `frontend-vue-backup/public/` to `frontend/public/`

---

### 4. ❌ SSR-Unsafe Axios Configuration
**Problem**: Original `utils/axios.js` accessed `window` without SSR guard.

**Impact**: Build fails during static site generation.

**Fix**: Add SSR guard in axios config
```typescript
const getBaseURL = () => {
  if (typeof window === 'undefined') {
    return ''
  }
  // ... rest of config
}
```

---

### 5. ❌ Next.js Config Issues for Tauri
**Problem**: Initial config had `assetPrefix: './'` which broke routing.

**Impact**:
- JavaScript chunks returned HTML instead of JS
- "Unexpected token '<'" errors
- Blank pages

**Fix**: Remove `assetPrefix`, let Tauri handle asset protocol
```typescript
// ❌ Wrong
{
  output: 'export',
  assetPrefix: './',
}

// ✅ Correct
{
  output: 'export',
  // No assetPrefix for Tauri v2
}
```

---

### 6. ❌ Root Page Redirect Implementation
**Problem**: Used server-side `redirect()` which caused filter errors in static export.

**Fix**: Use client-side redirect with useEffect
```typescript
// ❌ Wrong (causes "undefined is not an object (evaluating 'a.filter')")
import { redirect } from 'next/navigation';
export default function Home() {
  redirect('/welcome');
}

// ✅ Correct
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/welcome');
  }, [router]);
  return null;
}
```

---

### 7. ❌ Helper Function Initialization Order
**Problem**: NetworkConfiguration had helper functions defined AFTER useMemo hooks that used them.

**Impact**: `ReferenceError: Cannot access 'ae' before initialization` during SSR.

**Fix**: Move pure helper functions outside component
```typescript
// ❌ Wrong
export default function Component() {
  const result = useMemo(() => {
    return isValidIP(value) // Function used here
  }, [])

  const isValidIP = (ip: string) => { ... } // Defined after
}

// ✅ Correct
function isValidIP(ip: string) { ... } // Define outside

export default function Component() {
  const result = useMemo(() => {
    return isValidIP(value)
  }, [])
}
```

---

### 8. ❌ WebSocket CSP Blocked
**Problem**: Content Security Policy didn't allow WebSocket connections.

**Error**: `Refused to connect to ws://localhost:8000/ws because it does not appear in the connect-src directive`

**Impact**: WebSocket connections for real-time updates (like installation progress) were blocked.

**Fix**: Add WebSocket protocol to CSP connect-src
```json
// ❌ Wrong
"csp": "... connect-src 'self' http://localhost:*"

// ✅ Correct
"csp": "... connect-src 'self' http://localhost:* ws://localhost:*"
```

---

### 9. ❌ Playbook Execution Architecture Completely Changed
**Problem**: React migration invented non-existent API endpoints instead of using the streaming playbook executor component.

**Impact**:
- SSH setup page called `/api/playbooks/setup-ssh-keys` which doesn't exist (404)
- Removed WebSocket-based streaming playbook execution
- Invented direct axios POST calls that don't match backend

**Files Affected**:
- `app/ssh-setup/page.tsx` - completely broken API calls

**Root Cause**: Migration agents didn't understand the Vue component architecture and invented a new (non-functional) approach.

**Fix**: Use the properly migrated `PlaybookExecutorStream` component
```typescript
// ❌ Wrong - invented non-existent endpoint
const response = await axios.post("/api/playbooks/setup-ssh-keys", { ... })

// ✅ Correct - use streaming component
<PlaybookExecutorStream
  ref={playbookExecutorRef}
  title="SSH Key Setup"
  playbookName="setup-ssh-keys"
  onComplete={handlePlaybookComplete}
/>

// Trigger execution
playbookExecutorRef.current?.startExecution({
  environment: { ... },
  extra_vars: { ... }
})
```

**Backend Architecture**:
- WebSocket endpoint: `ws://localhost:8000/ws/playbook/{playbookName}`
- Available playbooks: `setup-ssh-keys`, `test-ssh-connectivity`, etc.
- The PlaybookExecutorStream component handles WebSocket connection and streaming output

---

### 10. ❌ CRITICAL: Migrated Unused Vue File, Created Hallucinated Page
**Problem**: Migration agent found `NodeConfiguration.vue` in Vue `views/` folder and migrated it, but this file was NEVER part of the Vue router. It was old LXD/container code that should have been deleted long ago.

**Impact**:
- Created a completely hallucinated `/node-configuration` page with 792 lines of code
- Added complex LXD container management UI that was never in the actual app
- Broke navigation flow: role-assignment → node-configuration (WRONG) instead of role-assignment → configuration (CORRECT)
- User reported seeing UI that never existed in the Vue app

**Files Affected**:
- `app/node-configuration/page.tsx` (792 lines) - **COMPLETELY HALLUCINATED**
- `app/role-assignment/page.tsx` - navigated to wrong page

**Root Cause**:
- Migration agent scanned `views/` folder and migrated ALL `.vue` files
- Didn't check Vue router to see which files were actually used
- The `NodeConfiguration.vue` file existed but was not in `router/index.js`

**Fix**:
1. Delete the hallucinated page: `rm -rf app/node-configuration`
2. Fix role-assignment navigation: `router.push('/configuration')` not `'/node-configuration'`

**How to Prevent**:
```bash
# Before migration, check which Vue files are actually routed
grep -r "component:" frontend-vue-backup/src/router/

# Compare with files in views/
ls frontend-vue-backup/src/views/

# Only migrate files that appear in router!
```

**Lesson**: ALWAYS validate source files against router configuration before migration. Dead code in source will create hallucinated features.

---

### 11. ❌ CRITICAL: React State Timing Bug - Deploy Page Shows "Complete" Immediately
**Problem**: Deploy page immediately showed "Deployment Complete!" without executing any playbooks.

**Impact**:
- User clicks "Start Deployment" on review page
- Deploy page loads and shows "Deployment Complete!" in 500ms
- No playbooks execute
- Installation completely broken

**Root Cause**: Race condition between state update and function execution
```typescript
// ❌ BROKEN CODE
useEffect(() => {
  const queue = await buildPlaybookQueue()
  setPlaybookQueue(queue)  // State update is ASYNC

  setTimeout(() => {
    executeNextPlaybook()  // Reads playbookQueue state - still [] !
  }, 500)
}, [])

// executeNextPlaybook() function:
if (currentPlaybookIndex >= playbookQueue.length) {  // 0 >= 0 = TRUE
  setDeploymentComplete(true)  // Shows "Complete" immediately
  return
}
```

**Why It Happens**:
1. `setPlaybookQueue(queue)` schedules a state update (doesn't happen immediately)
2. `executeNextPlaybook()` runs 500ms later
3. `playbookQueue` is still the initial empty array `[]`
4. Check `0 >= 0` passes, immediately sets `deploymentComplete = true`

**Fix**: Use separate useEffect that triggers when state actually updates
```typescript
// ✅ CORRECT - wait for state to update
const [initialized, setInitialized] = useState(false)

useEffect(() => {
  const queue = await buildPlaybookQueue()
  setPlaybookQueue(queue)
  setInitialized(true)  // Signal that queue is ready
}, [])

// Separate useEffect waits for BOTH initialized AND playbookQueue
useEffect(() => {
  if (initialized && playbookQueue.length > 0) {
    setTimeout(() => {
      executeNextPlaybook()  // Now playbookQueue has data
    }, 500)
  }
}, [initialized, playbookQueue])
```

**Files Affected**:
- `app/deploy/page.tsx:509-544` - initialization logic

**Lesson**: React state updates are asynchronous. NEVER call a function that depends on state immediately after setting that state. Use a separate useEffect with dependencies instead.

---

## Checklist for Future Migrations

### Pre-Migration
- [ ] Document all utility files and their purpose
- [ ] Identify configured instances (axios, etc.)
- [ ] List all public assets
- [ ] Check for environment-specific code (SSR/CSR)

### During Migration
- [ ] Use configured utility instances, not raw packages
- [ ] Copy all public assets
- [ ] Avoid Google Fonts or external dependencies
- [ ] Extract pure helper functions outside components
- [ ] Use client-side redirects for static export
- [ ] Add SSR guards for window/browser APIs

### Post-Migration Validation
- [ ] Search for `import axios from "axios"` → should be `@/utils/axios`
- [ ] Search for `from "next/font/google"` → remove
- [ ] Verify public assets copied
- [ ] Test build succeeds (`npm run build`)
- [ ] Test in Tauri app, not just browser
- [ ] Check browser console for errors
- [ ] Verify API calls work

### Systematic Fixes
```bash
# Fix all axios imports
find app/ -name "*.tsx" -exec sed -i 's|import axios from "axios"|import axios from "@/utils/axios"|g' {} \;

# Copy public assets
cp frontend-vue-backup/public/*.svg frontend/public/

# Check for Google Fonts
grep -r "next/font/google" app/

# Check for window usage without guards
grep -r "window\." utils/ --include="*.ts" --include="*.tsx"
```

---

## Testing Strategy

1. **Build Test**: `npm run build` must succeed
2. **Static Export Test**: Check `out/` folder has all routes
3. **Tauri Test**: Deploy and test in actual Tauri app
4. **API Test**: Verify backend connections work
5. **Asset Test**: All images/icons load
6. **Navigation Test**: All routes work
7. **Console Test**: No errors in browser console

---

## Key Takeaways

1. **Don't trust parallel agent migrations blindly** - they make systematic mistakes
2. **Utility configurations are critical** - document and enforce them
3. **SSR vs CSR matters** - even for "static" apps
4. **Test in target environment** - browser != Tauri
5. **Validate systematically** - use grep/find to catch patterns
