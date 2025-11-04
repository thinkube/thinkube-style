# Claude Code Tooling Strategy for Migration

**Purpose:** Document how to use Claude Code features (sub-agents, skills, hooks, plugins) to accelerate and validate the Vue → React migration.

**Problem:** Without tooling strategy, migration is manual, error-prone, and loses knowledge between sessions.

---

## Claude Code Features Available

### 1. Sub-Agents
**What:** Launch specialized agents in parallel to work on different tasks simultaneously
**When to use:** Migrating multiple independent components at once

### 2. Skills
**What:** Reusable prompts/workflows that can be invoked by name
**When to use:** Repetitive migration patterns (e.g., "convert Vue component")

### 3. Hooks
**What:** Shell commands that run automatically on events (pre-commit, post-tool-use, etc.)
**When to use:** Validation, linting, ensuring migration rules are followed

### 4. Plugins (MCP Servers)
**What:** External tools/services that extend Claude Code capabilities
**When to use:** Specialized tasks (database access, API testing, etc.)

---

## Migration Tooling Plan

### Phase 1: Setup & Verification

#### A. Create Skills (`.claude/skills/`)

**Skill 1: `migrate-vue-component`**
- Input: Vue component file path
- Output: React component with all DaisyUI → shadcn/ui conversions
- Location: `.claude/skills/migrate-vue-component.md`

```markdown
# Migrate Vue Component to React

Given a Vue component file path, convert it to React + shadcn/ui:

1. Read the Vue component
2. Identify all DaisyUI classes
3. Map to shadcn/ui equivalents using COMPONENT_MAPPING.md
4. Convert Vue syntax to React:
   - `<template>` → JSX
   - `ref()` → `useState()`
   - `computed()` → `useMemo()`
   - `onMounted()` → `useEffect()`
   - `v-if` → `{condition && ...}`
   - `v-for` → `.map()`
   - `@click` → `onClick`
5. Apply DESIGN_PATTERNS.md criteria (modal vs inline, etc.)
6. Write React component
7. Report what was changed
```

**Skill 2: `validate-migration`**
- Input: React component file path
- Output: Validation report (missing imports, DaisyUI remnants, etc.)
- Location: `.claude/skills/validate-migration.md`

```markdown
# Validate Migration

Check if a React component follows migration standards:

1. No DaisyUI classes remain (btn, card, modal, etc.)
2. All imports use shadcn/ui components
3. Uses Ansible log utils (not hardcoded colors)
4. Follows DESIGN_PATTERNS.md (correct modal/card usage)
5. TypeScript types defined
6. No Vue syntax remnants (`ref`, `computed`, `v-if`, etc.)
7. Report any issues found
```

**Skill 3: `copy-backend-unchanged`**
- Input: Backend file path from Vue app
- Output: Copy to React app (backend stays same)
- Location: `.claude/skills/copy-backend-unchanged.md`

```markdown
# Copy Backend Files Unchanged

Backend Python/FastAPI code doesn't need migration:

1. Read backend file from Vue app
2. Copy to exact same path in React app
3. Verify no frontend dependencies
4. Report copied file
```

#### B. Create Hooks (`.claude/hooks/`)

**Hook 1: Pre-Commit Validation**
Location: `.claude/hooks/pre-commit.sh`

```bash
#!/bin/bash
# Validate no DaisyUI classes in React code

echo "Checking for DaisyUI remnants..."

# Search for DaisyUI classes in React components
if grep -r "class.*btn\|class.*card\|class.*modal\|class.*badge" frontend/src --include="*.tsx" --include="*.jsx"; then
  echo "❌ ERROR: DaisyUI classes found in React code!"
  echo "Use shadcn/ui components instead. See COMPONENT_MAPPING.md"
  exit 1
fi

# Check for Vue syntax
if grep -r "v-if\|v-for\|v-model\|ref()\|computed()" frontend/src --include="*.tsx" --include="*.jsx"; then
  echo "❌ ERROR: Vue syntax found in React code!"
  exit 1
fi

echo "✅ Pre-commit validation passed"
exit 0
```

**Hook 2: Post-Tool-Use Reminder**
Location: `.claude/hooks/post-tool-use.sh`

```bash
#!/bin/bash
# Remind about documentation after file changes

if [ "$TOOL_NAME" = "Write" ] || [ "$TOOL_NAME" = "Edit" ]; then
  echo "📝 Remember to:"
  echo "  - Check COMPONENT_MAPPING.md for correct component"
  echo "  - Apply DESIGN_PATTERNS.md criteria"
  echo "  - Run validation with /validate-migration skill"
fi
```

#### C. Plugins/MCP Servers

**Plugin 1: Filesystem MCP** (if available)
- Bulk file operations
- Directory comparisons (Vue vs React structure)

**Plugin 2: Testing MCP** (if available)
- Run Vitest automatically after migration
- Report test coverage

**Plugin 3: Git MCP** (if available)
- Commit migration milestones automatically
- Compare branches (main vs react-migration)

---

## Phase 2: Verification Tests

Before starting migration, create test cases to verify Claude Code setup works:

### Test 1: Skills Work
```bash
# Create a dummy Vue component
echo '<template><div class="btn">Test</div></template>' > test-component.vue

# Invoke skill
/migrate-vue-component test-component.vue

# Expected: Should convert to React with <Button>
```

### Test 2: Hooks Work
```bash
# Try to commit code with DaisyUI
echo 'const x = "class=btn"' > test.tsx
git add test.tsx
git commit -m "test"

# Expected: Hook should REJECT commit with error
```

### Test 3: Sub-Agents Work
```bash
# Launch 2 agents in parallel
# Agent 1: Migrate component A
# Agent 2: Migrate component B

# Expected: Both complete independently
```

---

## Phase 3: Migration Workflow with Tooling

### Example: Migrate PlaybookExecutorStream

**Step 1: Use Sub-Agent for Initial Migration**
```
Launch sub-agent "general-purpose"
Prompt: "Use /migrate-vue-component skill on PlaybookExecutorStream.vue"
```

**Step 2: Human Review**
- Check output matches DESIGN_PATTERNS.md
- Verify WebSocket code translated correctly

**Step 3: Validate with Skill**
```
/validate-migration PlaybookExecutorStream.tsx
```

**Step 4: Commit (Hooks Auto-Run)**
```bash
git add PlaybookExecutorStream.tsx
git commit -m "Migrate PlaybookExecutorStream to React"
# Pre-commit hook validates automatically
```

---

## Parallel Migration Strategy with Sub-Agents

### Scenario: Migrate 5 Components Simultaneously

**Main Agent (You):**
- Orchestrates migration
- Reviews output
- Makes decisions

**Sub-Agent 1: Simple Components**
```
Migrate these 3 simple components:
- SSHSetup.vue
- Welcome.vue
- Summary.vue

Use /migrate-vue-component skill for each.
Report when done.
```

**Sub-Agent 2: Complex Component**
```
Migrate PlaybookExecutorStream.vue (839 lines, WebSocket).
This is complex - take your time.
Use Ansible log utils, not CodeBlock.
```

**Sub-Agent 3: Form Components**
```
Migrate NetworkConfiguration.vue (1,230 lines).
Lots of form inputs - use shadcn/ui form components.
Check DESIGN_PATTERNS.md for form patterns.
```

**Sub-Agent 4: Backend Copy**
```
Copy all Python backend files unchanged.
Use /copy-backend-unchanged skill.
```

All agents work in parallel, report back when done.

---

## Directory Structure for Tooling

```
thinkube-installer-react/
├── .claude/
│   ├── skills/
│   │   ├── migrate-vue-component.md
│   │   ├── validate-migration.md
│   │   └── copy-backend-unchanged.md
│   ├── hooks/
│   │   ├── pre-commit.sh
│   │   └── post-tool-use.sh
│   └── config.json  (if needed)
├── frontend/  (React)
├── backend/   (Python - unchanged)
└── docs/
    ├── COMPONENT_MAPPING.md (copied from thinkube-style)
    ├── DESIGN_PATTERNS.md (copied from thinkube-style)
    └── MIGRATION_LOG.md (track what's been migrated)
```

---

## Validation Checklist

Before declaring tooling "ready":

- [ ] `.claude/skills/` directory exists
- [ ] At least 1 skill works (`/migrate-vue-component`)
- [ ] Pre-commit hook rejects DaisyUI code
- [ ] Can launch sub-agent successfully
- [ ] Documentation accessible (COMPONENT_MAPPING.md, DESIGN_PATTERNS.md)
- [ ] Test component migration works end-to-end

---

## Benefits of This Approach

1. **Speed:** Sub-agents work in parallel (5 components at once)
2. **Consistency:** Skills enforce same conversion pattern
3. **Safety:** Hooks prevent bad commits (DaisyUI remnants)
4. **Knowledge Preservation:** Skills/hooks stay in repo, survive session compacting
5. **Automation:** Less manual "check this, check that"

---

## Estimated Time Savings

**Without Tooling:**
- 20 components × 30 min each = 10 hours
- Manual validation each time = +2 hours
- **Total: 12 hours**

**With Tooling:**
- Setup: 1 hour
- 4 sub-agents × 5 components each in parallel = 2 hours
- Validation automatic (hooks) = 0 hours
- **Total: 3 hours**

**Savings: 9 hours (75% reduction)**

---

## Next Steps

1. Create worktree (`/home/alexmc/thinkube-installer-react`)
2. Initialize Next.js + Tauri in worktree
3. Create `.claude/skills/` and `.claude/hooks/`
4. Write the 3 skills (migrate, validate, copy-backend)
5. Write the 2 hooks (pre-commit, post-tool-use)
6. **TEST**: Verify skills/hooks work with dummy component
7. If tests pass → Start migration with sub-agents
8. If tests fail → Fix tooling first

---

## Status: 📝 DOCUMENTED, NOT YET IMPLEMENTED

This document describes the plan. Next action: Implement and test.
