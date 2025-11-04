#!/bin/bash
# Pre-Commit Hook for Migration Quality
# Validates no DaisyUI classes in React code or Vue syntax remnants

echo "🔍 Running code quality checks..."

# 1. Check for DaisyUI remnants
echo "Checking for DaisyUI classes..."
if grep -r "class.*\(btn\|card\|modal\|badge\|alert\|drawer\|menu\|navbar\|footer\|hero\|stats\|steps\)" frontend/src --include="*.tsx" --include="*.jsx" 2>/dev/null; then
  echo "❌ ERROR: DaisyUI classes found!"
  echo "See COMPONENT_MAPPING.md for shadcn/ui equivalents"
  exit 1
fi

# 2. Check for Vue syntax
echo "Checking for Vue syntax..."
if grep -r "\(v-if\|v-for\|v-model\|v-show\|v-bind\|v-on\|@click\|:class\)" frontend/src --include="*.tsx" --include="*.jsx" 2>/dev/null; then
  echo "❌ ERROR: Vue syntax found!"
  exit 1
fi

# 3. Check for Vue imports
echo "Checking for Vue imports..."
if grep -r "from ['\"]vue['\"]" frontend/src --include="*.tsx" --include="*.jsx" 2>/dev/null; then
  echo "❌ ERROR: Vue imports found!"
  exit 1
fi

# 4. Check for Pinia imports
echo "Checking for Pinia imports..."
if grep -r "from ['\"]pinia['\"]" frontend/src --include="*.tsx" --include="*.jsx" 2>/dev/null; then
  echo "❌ ERROR: Pinia imports found! Use Zustand instead"
  exit 1
fi

# 5. Check for console.log (warn only)
echo "Checking for console statements..."
if grep -r "console\.\(log\|debug\)" frontend/src --include="*.tsx" --include="*.jsx" 2>/dev/null; then
  echo "⚠️  WARNING: console.log found (will be caught by ESLint)"
fi

# 6. Check for TODO/FIXME comments
echo "Checking for TODO/FIXME..."
TODO_COUNT=$(grep -r "\(TODO\|FIXME\)" frontend/src --include="*.tsx" --include="*.jsx" 2>/dev/null | wc -l)
if [ "$TODO_COUNT" -gt 10 ]; then
  echo "⚠️  WARNING: $TODO_COUNT TODO/FIXME comments found"
  echo "Consider creating GitHub issues for these"
fi

# 7. Check for .vue files (shouldn't exist)
echo "Checking for .vue files..."
if find frontend/src -name "*.vue" 2>/dev/null | grep .; then
  echo "❌ ERROR: .vue files still exist! Should be converted to .tsx"
  exit 1
fi

# 8. Check for dead imports (TypeScript will catch this, but double-check)
echo "Running TypeScript check..."
if [ -d "frontend" ]; then
  cd frontend && npx tsc --noEmit 2>&1
  if [ $? -ne 0 ]; then
    echo "❌ ERROR: TypeScript errors found!"
    exit 1
  fi
  cd ..
fi

echo "✅ All code quality checks passed!"
exit 0
