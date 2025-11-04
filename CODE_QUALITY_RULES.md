# Code Quality Rules for Migration

**Purpose:** Ensure the React codebase is clean, with no remnants from Vue or garbage code left behind.

**Problem:** During migration, it's easy to leave behind:
- Unused imports
- Commented-out Vue code
- Dead files that aren't referenced
- DaisyUI classes mixed with shadcn/ui
- Console.log statements
- TODO comments that should be GitHub issues

---

## Pre-Migration Cleanup Rules

### What to Remove from Vue Code Before Converting

1. **Console.log statements** (use proper logging if needed)
2. **Commented-out code** (if it's in git history, don't need it)
3. **Dead imports** (unused components)
4. **Temporary fixes** (marked with TODO/FIXME)
5. **Debug code** (hardcoded values for testing)

---

## During Migration Rules

### What NOT to Migrate

❌ **Don't migrate:**
- `/node_modules/` (obviously)
- `.env.local` files (regenerate fresh)
- Build artifacts (`dist/`, `.next/`, etc.)
- IDE files (`.vscode/`, `.idea/`)
- Vue-specific files:
  - `vite.config.js` (create new for Next.js)
  - `vue.config.js`
  - `.vue` files (convert to `.tsx`, then delete originals)
  - `router/` directory (use Next.js routing)
  - `pinia/stores/` (convert to Zustand, then delete)

✅ **Do migrate:**
- Backend Python code (unchanged)
- Assets (images, icons, fonts)
- Configuration files (adjust for React)
- Tests (convert to Vitest)
- Documentation

---

## Post-Migration Validation

### Automated Checks (via Hooks/Linters)

**1. ESLint Rules**
```json
// .eslintrc.json
{
  "rules": {
    "no-console": "error",  // No console.log
    "no-debugger": "error",
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          "**/vue",           // No Vue imports
          "daisyui",          // No DaisyUI
          "pinia",            // No Pinia
          "vue-router"        // No Vue Router
        ]
      }
    ]
  }
}
```

**2. Pre-Commit Hook - Extended**
```bash
#!/bin/bash
# .claude/hooks/pre-commit.sh

echo "🔍 Running code quality checks..."

# 1. Check for DaisyUI remnants
echo "Checking for DaisyUI classes..."
if grep -r "class.*\(btn\|card\|modal\|badge\|alert\|drawer\|menu\|navbar\|footer\|hero\|stats\|steps\)" frontend/src --include="*.tsx" --include="*.jsx"; then
  echo "❌ ERROR: DaisyUI classes found!"
  echo "See COMPONENT_MAPPING.md for shadcn/ui equivalents"
  exit 1
fi

# 2. Check for Vue syntax
echo "Checking for Vue syntax..."
if grep -r "\(v-if\|v-for\|v-model\|v-show\|v-bind\|v-on\|@click\|:class\)" frontend/src --include="*.tsx" --include="*.jsx"; then
  echo "❌ ERROR: Vue syntax found!"
  exit 1
fi

# 3. Check for Vue imports
echo "Checking for Vue imports..."
if grep -r "from ['\"]vue['\"]" frontend/src --include="*.tsx" --include="*.jsx"; then
  echo "❌ ERROR: Vue imports found!"
  exit 1
fi

# 4. Check for Pinia imports
echo "Checking for Pinia imports..."
if grep -r "from ['\"]pinia['\"]" frontend/src --include="*.tsx" --include="*.jsx"; then
  echo "❌ ERROR: Pinia imports found! Use Zustand instead"
  exit 1
fi

# 5. Check for console.log (warn only)
echo "Checking for console statements..."
if grep -r "console\.\(log\|debug\)" frontend/src --include="*.tsx" --include="*.jsx"; then
  echo "⚠️  WARNING: console.log found (will be caught by ESLint)"
fi

# 6. Check for TODO/FIXME comments
echo "Checking for TODO/FIXME..."
TODO_COUNT=$(grep -r "\(TODO\|FIXME\)" frontend/src --include="*.tsx" --include="*.jsx" | wc -l)
if [ "$TODO_COUNT" -gt 10 ]; then
  echo "⚠️  WARNING: $TODO_COUNT TODO/FIXME comments found"
  echo "Consider creating GitHub issues for these"
fi

# 7. Check for .vue files (shouldn't exist)
echo "Checking for .vue files..."
if find frontend/src -name "*.vue" | grep .; then
  echo "❌ ERROR: .vue files still exist! Should be converted to .tsx"
  exit 1
fi

# 8. Check for dead imports (TypeScript will catch this, but double-check)
echo "Running TypeScript check..."
cd frontend && npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ ERROR: TypeScript errors found!"
  exit 1
fi

echo "✅ All code quality checks passed!"
exit 0
```

**3. GitHub Actions CI (if using GitHub)**
```yaml
# .github/workflows/code-quality.yml
name: Code Quality

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: cd frontend && npm ci

      - name: ESLint
        run: cd frontend && npm run lint

      - name: TypeScript check
        run: cd frontend && npx tsc --noEmit

      - name: Check for Vue remnants
        run: |
          if grep -r "from ['\"]vue['\"]" frontend/src; then
            echo "Vue imports found!"
            exit 1
          fi

      - name: Check for DaisyUI remnants
        run: |
          if grep -r "class.*btn" frontend/src --include="*.tsx"; then
            echo "DaisyUI classes found!"
            exit 1
          fi
```

---

## Manual Cleanup Checklist

After migration, manually verify:

### Frontend Cleanup
- [ ] No `.vue` files remain
- [ ] No `vue-router` directory
- [ ] No `pinia/stores` directory
- [ ] No DaisyUI imports in `package.json`
- [ ] No Vue imports in `package.json`
- [ ] `vite.config.js` removed (if not needed)
- [ ] All components in `frontend/src/components` are `.tsx`
- [ ] No commented-out code blocks > 5 lines
- [ ] No `console.log` statements
- [ ] All TODOs converted to GitHub issues

### Backend Cleanup (Even though unchanged)
- [ ] No unused Python dependencies
- [ ] No debug print statements
- [ ] No hardcoded credentials (use .env)
- [ ] Remove any frontend-serving code (Next.js handles this now)

### Configuration Cleanup
- [ ] `.gitignore` updated for Next.js (`.next/`, etc.)
- [ ] `package.json` cleaned (no Vue deps)
- [ ] `tsconfig.json` for React, not Vue
- [ ] ESLint config for React, not Vue
- [ ] Removed DaisyUI from Tailwind config

### Asset Cleanup
- [ ] Remove unused icons/images
- [ ] Optimize large images (use Next.js Image component)
- [ ] Remove Vue-specific SVGs if any

---

## Dead Code Detection

### Find Unused Components
```bash
# Find all component files
find frontend/src -name "*.tsx" -type f > components.txt

# For each component, check if it's imported anywhere
while read component; do
  name=$(basename "$component" .tsx)
  if ! grep -r "import.*$name" frontend/src --exclude="$component" > /dev/null; then
    echo "⚠️  Possibly unused: $component"
  fi
done < components.txt
```

### Find Unused Utilities
```bash
# Check if utility functions are actually used
grep -r "export function\|export const" frontend/src/lib --include="*.ts" | while read -r line; do
  func_name=$(echo "$line" | sed -E 's/.*export (function|const) ([a-zA-Z0-9_]+).*/\2/')
  if ! grep -r "$func_name" frontend/src --exclude-dir=lib > /dev/null; then
    echo "⚠️  Possibly unused: $func_name"
  fi
done
```

---

## Garbage Patterns to Watch For

### Pattern 1: Copy-Paste Leftovers
```tsx
// ❌ Bad: Vue comments in React code
// This was v-if="showModal" in Vue
{showModal && <Dialog>...</Dialog>}

// ✅ Good: Clean comment or none
{showModal && <Dialog>...</Dialog>}
```

### Pattern 2: Mixed Libraries
```tsx
// ❌ Bad: Mixing DaisyUI and shadcn/ui
<div className="card">
  <Button>Click</Button>  {/* shadcn/ui */}
</div>

// ✅ Good: Pure shadcn/ui
<Card>
  <CardContent>
    <Button>Click</Button>
  </CardContent>
</Card>
```

### Pattern 3: Dead State
```tsx
// ❌ Bad: Unused state from Vue conversion
const [unused, setUnused] = useState(null);  // Was ref() in Vue, never used

// ✅ Good: Remove it
// (nothing)
```

### Pattern 4: Orphaned Types
```tsx
// ❌ Bad: Type defined but never used
interface OldVueProps {
  // ...
}

// ✅ Good: Remove unused types
// (nothing)
```

---

## Quality Gates

Before declaring migration "complete" for a component:

1. ✅ **Compiles** - No TypeScript errors
2. ✅ **Lints** - ESLint passes
3. ✅ **Tests pass** - All tests green
4. ✅ **No Vue syntax** - Pre-commit hook passes
5. ✅ **No DaisyUI** - Pre-commit hook passes
6. ✅ **No console.log** - ESLint catches it
7. ✅ **Imports clean** - No unused imports
8. ✅ **Follows patterns** - Matches DESIGN_PATTERNS.md

**Only then** mark the component as "migrated" in MIGRATION_LOG.md

---

## Continuous Cleanup Strategy

### During Migration
- Clean as you go (don't leave for later)
- Each commit should pass all quality checks
- Use pre-commit hook to enforce

### After Migration
- Run dead code detection scripts
- Review all TODO comments (create issues)
- Final manual audit of 10 random files
- Remove any temporary migration notes

---

## Tools to Install

```bash
# Frontend quality tools
cd frontend
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier
npm install -D @trivago/prettier-plugin-sort-imports

# Dead code detection (optional)
npm install -D ts-prune  # Finds unused exports
npm install -D depcheck  # Finds unused dependencies
```

Run before final merge:
```bash
cd frontend
npx ts-prune          # Show unused exports
npx depcheck          # Show unused dependencies
npm run lint          # ESLint
npx tsc --noEmit      # TypeScript check
```

---

## Success Criteria

Migration is "clean" when:

- ✅ 0 Vue files remain
- ✅ 0 DaisyUI classes in React code
- ✅ 0 ESLint errors
- ✅ 0 TypeScript errors
- ✅ 0 console.log statements
- ✅ < 10 TODO comments (rest are GitHub issues)
- ✅ All unused imports removed (ts-prune shows nothing critical)
- ✅ `package.json` has no Vue/DaisyUI dependencies
- ✅ Pre-commit hook passes on all files

---

## Status: 📝 RULES DEFINED

These rules will be enforced via hooks and linters during migration.

**Next:** Implement hooks in `.claude/hooks/` when creating worktree.
