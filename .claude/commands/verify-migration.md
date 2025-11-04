# Verify Vue to React Migration

You are tasked with systematically verifying that all React components match their Vue originals in terms of:

1. **API Endpoints**: Ensure React components call the exact same backend endpoints as Vue
2. **Component Architecture**: Verify special components (like PlaybookExecutorStream) are used correctly
3. **WebSocket Usage**: Check that WebSocket connections match the original implementation
4. **Data Flow**: Ensure props, state, and data transformations are equivalent

## Process

### Step 1: Identify All Page Components
Find all pages in both Vue and React versions:
- Vue: `/home/alexmc/thinkube-installer-react/frontend-vue-backup/src/views/*.vue`
- React: `/home/alexmc/thinkube-installer-react/frontend/app/*/page.tsx`

### Step 2: For Each Component, Compare:

#### A. API Endpoint Calls
Extract all axios/fetch calls from both versions and compare:
- Vue: Search for `axios.get`, `axios.post`, etc.
- React: Search for `axios.get`, `axios.post`, etc.
- **Verify**: Endpoints match exactly (including `/api` prefix)

#### B. Special Component Usage
Check if Vue uses special components and verify React does too:
- `PlaybookExecutorStream` - streaming playbook execution via WebSocket
- `PlaybookExecutor` - non-streaming playbook execution
- Any other shared components

#### C. WebSocket Connections
- Vue: Search for `new WebSocket` or `ws://`
- React: Verify same WebSocket usage
- **Verify**: WebSocket URLs and protocols match

### Step 3: Generate Report

Create a detailed report in `/home/alexmc/thinkube-installer-react/MIGRATION_VERIFICATION_REPORT.md` with:

```markdown
# Migration Verification Report

## Summary
- Total components checked: X
- Components with issues: Y
- Critical issues: Z

## Component-by-Component Analysis

### [Component Name]
**Status**: ✅ PASS / ⚠️ WARNINGS / ❌ FAIL

**Vue Location**: `path/to/vue/component`
**React Location**: `path/to/react/component`

#### API Endpoints
| Vue Endpoint | React Endpoint | Status | Notes |
|--------------|----------------|--------|-------|
| `/api/foo`   | `/api/foo`     | ✅     | Match |
| `/api/bar`   | `/api/playbooks/bar` | ❌ | React uses non-existent endpoint |

#### Component Architecture
- [ ] Uses PlaybookExecutorStream correctly
- [x] All special components properly migrated

#### Issues Found
1. **CRITICAL**: React calls `/api/playbooks/setup-ssh-keys` which doesn't exist
   - Vue uses: PlaybookExecutorStream with playbook name "setup-ssh-keys"
   - Fix: Replace axios call with PlaybookExecutorStream component

2. **WARNING**: Missing error handling in React version

#### Recommended Fixes
```typescript
// Change from:
axios.post("/api/playbooks/setup-ssh-keys", ...)

// To:
<PlaybookExecutorStream
  ref={ref}
  playbookName="setup-ssh-keys"
  onComplete={handler}
/>
```
```

### Step 4: Identify Backend API Truth
Before comparing, fetch the actual backend API spec:
```bash
curl -s http://localhost:8000/openapi.json
```

Extract all available endpoints to use as the source of truth.

## Known Issues to Check For

Based on previous problems found:

1. **Axios imports**: Should use `@/utils/axios`, not `import axios from "axios"`
2. **Playbook execution**: Should use `PlaybookExecutorStream` component, not direct API calls
3. **API prefixes**: All endpoints should have `/api` prefix
4. **WebSocket CSP**: Verify `ws://localhost:*` is in CSP policy

## Components to Check

Priority order (most likely to have issues):

1. `ssh-setup/page.tsx` ← Already found issues here
2. `hardware-detection/page.tsx`
3. `gpu-driver-check/page.tsx`
4. `configuration/page.tsx`
5. `network-configuration/page.tsx`
6. `server-discovery/page.tsx`
7. `node-configuration/page.tsx`
8. `requirements/page.tsx` ← Already verified working
9. `sudo-password/page.tsx`
10. `welcome/page.tsx`

And any other pages found.

## Output

Generate a complete verification report and create a summary showing:
- Critical issues that will cause 404/500 errors
- Warnings about potential issues
- Passed components that are correctly migrated

Be thorough and methodical. This is critical to ensure the migration is reliable.
