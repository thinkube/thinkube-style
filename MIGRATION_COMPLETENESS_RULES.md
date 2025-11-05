# Migration Completeness Rules

**Last Updated:** 2025-11-05

## Overview

This document defines CRITICAL rules to ensure 100% functionality is migrated from Vue to React applications. Incomplete migrations create broken features, user confusion, and wasted effort.

**Context:** During the thinkube-installer migration, the deploy page was migrated with only 3 out of 23 playbooks implemented, with the rest as placeholders. This resulted in a completely broken deployment system that appeared to work but failed silently.

## Critical Rule #1: 100% Functionality Migration

**NEVER use placeholders or skip features during migration.**

### The Problem

```typescript
// ❌ WRONG - Incomplete migration
const buildQueue = async (): Promise<Playbook[]> => {
  const queue: Playbook[] = []

  queue.push({ id: 'env-setup', title: 'Setting up Environment', ... })
  queue.push({ id: 'python-setup', title: 'Setting up Python', ... })
  queue.push({ id: 'k8s', title: 'Installing Kubernetes', ... })

  // TODO: Add remaining 20 playbooks

  return queue
}
```

**Impact:**
- Deploy appeared to work but executed only 3/23 steps
- No error messages - silent failure
- User thought deployment was complete when it wasn't
- Broke entire installation workflow

### The Solution

```typescript
// ✅ CORRECT - Complete migration
const buildQueue = async (): Promise<Playbook[]> => {
  const queue: Playbook[] = []

  // Phase 1: Initial Setup
  queue.push({ id: 'env-setup', ... })
  queue.push({ id: 'python-setup', ... })
  queue.push({ id: 'github-cli', ... })

  // Phase 2: Networking
  if (networkMode === 'overlay') {
    if (overlayProvider === 'zerotier') {
      queue.push({ id: 'zerotier-setup', ... })
    } else if (overlayProvider === 'tailscale') {
      queue.push({ id: 'tailscale-setup', ... })
    }
  }

  // Phase 3: Kubernetes Infrastructure
  queue.push({ id: 'setup-python-k8s', ... })
  queue.push({ id: 'k8s', ... })

  // Conditional: Worker nodes
  if (hasWorkers) {
    queue.push({ id: 'k8s-join-workers', ... })
  }

  // Conditional: GPU operator
  if (needsGPUOperator) {
    queue.push({ id: 'gpu-operator', ... })
  }

  queue.push({ id: 'dns-server', ... })
  queue.push({ id: 'coredns', ... })
  // ... ALL remaining playbooks

  return queue
}
```

### How to Prevent

**Before marking migration "complete":**

1. **Compare Line Counts**
   ```bash
   # Vue source
   wc -l frontend-vue-backup/src/views/Deploy.vue
   # Output: 450 lines

   # React migrated
   wc -l frontend/src/deploy/[ComponentName].tsx
   # Output: 200 lines  ❌ TOO SMALL - missing functionality!
   ```

2. **Check Function Completeness**
   - Find the Vue function: `buildPlaybookQueue()`
   - Count items in Vue array: 23 playbooks
   - Count items in React array: 23 playbooks ✅

3. **Verify Conditional Logic**
   - GPU operator logic: `if (hasGPU)` - ✅ migrated
   - Worker nodes logic: `if (hasWorkers)` - ✅ migrated
   - Network mode logic: `if (networkMode === 'overlay')` - ✅ migrated

4. **Search for Placeholders**
   ```bash
   grep -r "TODO\|FIXME\|PLACEHOLDER" frontend/src/deploy/
   # Should return ZERO results for completed migration
   ```

---

## Critical Rule #2: Migrate Commented Code

**ALL commented code must be migrated, including temporarily disabled features.**

### The Problem

In thinkube-control, the CVAT component is temporarily excluded for ARM64 architecture support:

```python
# Vue backend
optional_components = [
    {"name": "jupyterhub", "enabled": True},
    {"name": "mlflow", "enabled": True},
    # {"name": "cvat", "enabled": True},  # Temporarily disabled for ARM64
]
```

**WRONG Approach:**
```python
# ❌ Skipping commented code during migration
optional_components = [
    {"name": "jupyterhub", "enabled": True},
    {"name": "mlflow", "enabled": True},
]
```

**Impact:**
- When ARM64 solution is found, cannot easily re-enable CVAT
- Lost migration context
- Need to re-migrate commented code later

### The Solution

```python
# ✅ CORRECT - Migrate comments and disabled code
optional_components = [
    {"name": "jupyterhub", "enabled": True},
    {"name": "mlflow", "enabled": True},
    # {"name": "cvat", "enabled": True},  # Temporarily disabled for ARM64
]
```

**Why:** When ARM64 support is added, simply uncomment the line - no re-migration needed.

### How to Identify Commented Code

```bash
# Find all commented logic in Vue files
grep -n "\/\*.*disabled\|\/\/.*temporary\|\/\/.*TODO\|\/\/.*exclude" src/
```

**Categories to migrate:**
1. Temporarily disabled features (like CVAT for ARM64)
2. Platform-specific code (Linux vs Windows vs macOS)
3. Optional features (GPU, workers, networking modes)
4. Future features (marked with TODO comments)

---

## Critical Rule #3: Verify Complete Feature Sets

**Check for conditional logic and ensure ALL branches are migrated.**

### Common Patterns to Check

#### Pattern 1: Conditional Features

```typescript
// Vue
const playbooks = []
if (hasGPU) {
  playbooks.push('install-gpu-operator')
  playbooks.push('configure-gpu-passthrough')
  playbooks.push('test-gpu-functionality')
}
```

**Verification:**
- ✅ All 3 GPU playbooks migrated?
- ✅ Conditional logic preserved?
- ✅ GPU detection logic migrated?

#### Pattern 2: Network Modes

```typescript
// Vue
if (networkMode === 'overlay') {
  if (provider === 'zerotier') {
    playbooks.push('zerotier-setup')
    playbooks.push('zerotier-join-network')
  } else if (provider === 'tailscale') {
    playbooks.push('tailscale-setup')
    playbooks.push('tailscale-configure')
  }
}
```

**Verification:**
- ✅ Both ZeroTier AND Tailscale paths migrated?
- ✅ All playbooks for each provider included?
- ✅ Nested conditionals preserved?

#### Pattern 3: Optional Components

```typescript
// Vue
const components = []
for (const component of optionalComponents) {
  if (component.enabled) {
    components.push({
      name: component.name,
      install: component.installPlaybook,
      configure: component.configurePlaybook
    })
  }
}
```

**Verification:**
- ✅ Loop logic migrated?
- ✅ ALL optional components included (even commented ones)?
- ✅ Both install AND configure playbooks migrated?

---

## Migration Completeness Checklist

Use this checklist for EVERY migrated component:

### Before Starting Migration

- [ ] Read entire Vue source file (don't skim!)
- [ ] Identify all conditional logic branches
- [ ] List all functions and methods
- [ ] Note any commented code or TODOs
- [ ] Count array items (playbooks, components, options)

### During Migration

- [ ] Migrate ALL functions (not just main render)
- [ ] Migrate ALL conditional branches
- [ ] Migrate ALL array items (no placeholders)
- [ ] Migrate commented code with original comments
- [ ] Preserve original logic flow

### After Migration

- [ ] Compare line counts (Vue vs React - should be similar)
- [ ] Search for TODO/FIXME/PLACEHOLDER - should be ZERO
- [ ] Test ALL code paths (not just happy path):
  - [ ] With GPU vs without GPU
  - [ ] With workers vs control plane only
  - [ ] Overlay network vs local network
  - [ ] Each optional component enabled/disabled
- [ ] Verify commented code present with comments
- [ ] Code review by second person

### Verification Commands

```bash
# 1. Check for placeholders
grep -rn "TODO\|FIXME\|PLACEHOLDER" frontend/src/

# 2. Compare line counts
echo "Vue:" && wc -l frontend-vue-backup/src/views/YourComponent.vue
echo "React:" && wc -l frontend/src/your-component/[ComponentName].tsx

# 3. Check for commented code
grep -n "\/\/.*disable\|\/\*.*temporary" frontend-vue-backup/src/views/YourComponent.vue
grep -n "\/\/.*disable\|\/\*.*temporary" frontend/src/your-component/[ComponentName].tsx

# 4. Count conditional branches
grep -c "if.*{" frontend-vue-backup/src/views/YourComponent.vue
grep -c "if.*{" frontend/src/your-component/[ComponentName].tsx

# 5. Count array items (example: playbooks)
grep -o "id: '" frontend-vue-backup/src/views/Deploy.vue | wc -l
grep -o "id: '" frontend/src/deploy/[ComponentName].tsx | wc -l
```

---

## Common Incomplete Migration Patterns

### Anti-Pattern #1: "Placeholder Hell"

```typescript
// ❌ WRONG
const features = [
  'feature1',
  'feature2',
  // TODO: Add remaining features
]
```

**Fix:** Actually add ALL features, no TODOs.

### Anti-Pattern #2: "Conditional Shortcuts"

```typescript
// ❌ WRONG - Only migrated one branch
if (networkMode === 'overlay') {
  setupZeroTier()
  // TODO: Handle Tailscale case
}
```

**Fix:** Migrate ALL conditional branches:
```typescript
// ✅ CORRECT
if (networkMode === 'overlay') {
  if (provider === 'zerotier') {
    setupZeroTier()
  } else if (provider === 'tailscale') {
    setupTailscale()
  }
}
```

### Anti-Pattern #3: "Comment Deletion"

```typescript
// ❌ WRONG - Deleted commented CVAT code during migration
const components = [
  'jupyterhub',
  'mlflow'
  // CVAT code deleted instead of migrated
]
```

**Fix:** Migrate commented code with comments preserved.

### Anti-Pattern #4: "Happy Path Only"

```typescript
// ❌ WRONG - Only tested without GPU
// GPU code path exists but untested and broken
if (hasGPU) {
  // This code was never tested!
  setupGPUOperator() // Typo: should be setupGPU()
}
```

**Fix:** Test ALL code paths, not just the one you have hardware for.

---

## Enforcement

### Pre-Commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "Checking for incomplete migrations..."

# Check for placeholders
PLACEHOLDERS=$(grep -rn "TODO\|FIXME\|PLACEHOLDER" frontend/src/ | grep -v node_modules || true)
if [ -n "$PLACEHOLDERS" ]; then
  echo "❌ Found placeholders in migrated code:"
  echo "$PLACEHOLDERS"
  echo ""
  echo "Remove placeholders and implement complete functionality."
  exit 1
fi

echo "✅ No placeholders found"
```

### Code Review Checklist

Reviewer must verify:
- [ ] Line count reasonable (similar to Vue source)
- [ ] No TODO/FIXME/PLACEHOLDER comments
- [ ] All conditional branches implemented
- [ ] Commented code preserved
- [ ] Array lengths match Vue source (for lists/playbooks/components)

---

## Success Criteria

A migration is considered "complete" when:

1. ✅ ALL functionality from Vue source is implemented in React
2. ✅ Zero placeholders (TODO/FIXME/PLACEHOLDER)
3. ✅ Commented code migrated with original comments
4. ✅ ALL conditional branches implemented and tested
5. ✅ Line count similar to Vue source (±20%)
6. ✅ Code review passed
7. ✅ All code paths tested (not just happy path)

**Remember:** Incomplete migration is worse than no migration. It creates the illusion of working code that fails silently.
