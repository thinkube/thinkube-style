#!/bin/bash
# Pre-Commit Hook for React Migration Quality
# Validates proper thinkube-style component usage and no Vue remnants

echo "🔍 Running code quality checks..."

# 1. Check for DaisyUI remnants (still shouldn't exist in React!)
echo "Checking for DaisyUI classes..."
if grep -rE "class.*\(btn\|card\|modal\|badge\|alert\|drawer\|menu\|navbar\|footer\|hero\|stats\|steps\)" frontend/src frontend/app --include="*.tsx" --include="*.jsx" 2>/dev/null; then
  echo "❌ ERROR: DaisyUI classes found!"
  echo "See COMPONENT_MAPPING.md for shadcn/ui equivalents"
  exit 1
fi

# 2. Check for inline styled divs/buttons (should use Tk components)
echo "Checking for inline styled elements..."
if grep -rE 'className="[^"]*\s+(bg-|p-[0-9]|rounded|border|flex|grid)[^"]*"' frontend/app frontend/components --include="*.tsx" --include="*.jsx" 2>/dev/null | grep -v "// @allowed-inline" | grep -v "Loading..." | grep -v "flex h-screen"; then
  echo "❌ ERROR: Inline styled elements found!"
  echo "Use thinkube-style components instead:"
  echo "  - Use TkCard instead of <div className='bg-card p-4 rounded border'>"
  echo "  - Use TkButton instead of <button className='...'>"
  echo "  - Use TkProgress for loading states"
  echo "Add '// @allowed-inline' comment if truly needed for layout wrappers"
  exit 1
fi

# 3. Check for raw <button> elements (should use TkButton)
echo "Checking for raw button elements..."
if grep -r "<button" frontend/app frontend/components --include="*.tsx" --include="*.jsx" 2>/dev/null | grep -v "TkButton" | grep -v "// @allowed-button"; then
  echo "❌ ERROR: Raw <button> elements found!"
  echo "Use TkButton from thinkube-style instead"
  exit 1
fi

# 4. Check for custom styled components (potential violation)
echo "Checking for custom component definitions..."
CUSTOM_COMPS=$(grep -rE "^(export )?(function|const) [A-Z][a-zA-Z]*.*Card|.*Modal|.*Button" frontend/app frontend/components --include="*.tsx" 2>/dev/null | grep -v "Page\|Content\|Provider\|Layout" || true)
if [ -n "$CUSTOM_COMPS" ]; then
  echo "⚠️  WARNING: Potential custom visual components found:"
  echo "$CUSTOM_COMPS"
  echo "Ensure these use thinkube-style components internally, not custom styling"
fi

# 5. Check for Vue syntax
echo "Checking for Vue syntax..."
if grep -rE "\(v-if|v-for|v-model|v-show|v-bind|v-on|@click|:class\)" frontend/src frontend/app --include="*.tsx" --include="*.jsx" 2>/dev/null; then
  echo "❌ ERROR: Vue syntax found!"
  exit 1
fi

# 6. Check for Vue imports
echo "Checking for Vue imports..."
if grep -r "from ['\"]vue['\"]" frontend/src frontend/app --include="*.tsx" --include="*.jsx" 2>/dev/null; then
  echo "❌ ERROR: Vue imports found!"
  exit 1
fi

# 7. Check for Pinia imports (should use Zustand)
echo "Checking for Pinia imports..."
if grep -r "from ['\"]pinia['\"]" frontend/src frontend/app frontend/stores --include="*.ts" --include="*.tsx" 2>/dev/null; then
  echo "❌ ERROR: Pinia imports found! Use Zustand instead"
  exit 1
fi

# 8. Check for console.log (warn only)
echo "Checking for console statements..."
if grep -r "console\.\(log\|debug\)" frontend/src frontend/app --include="*.tsx" --include="*.ts" 2>/dev/null; then
  echo "⚠️  WARNING: console.log found (should use proper logging or remove)"
fi

# 9. Check for TODO/FIXME comments (ZERO tolerance per MIGRATION_COMPLETENESS_RULES.md)
echo "Checking for TODO/FIXME..."
TODO_COUNT=$(grep -r "\(TODO\|FIXME\|PLACEHOLDER\)" frontend/src frontend/app --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l)
if [ "$TODO_COUNT" -gt 0 ]; then
  echo "❌ ERROR: $TODO_COUNT TODO/FIXME/PLACEHOLDER comments found"
  echo "Per MIGRATION_COMPLETENESS_RULES.md: NO placeholders allowed!"
  echo "Remove all TODO/FIXME/PLACEHOLDER before committing"
  exit 1
fi

# 10. Check for .vue files (shouldn't exist in React project)
echo "Checking for .vue files..."
if find frontend/src frontend/app frontend/components -name "*.vue" 2>/dev/null | grep .; then
  echo "❌ ERROR: .vue files still exist! Should be converted to .tsx"
  exit 1
fi

# 11. TypeScript check
echo "Running TypeScript check..."
if [ -d "frontend" ]; then
  cd frontend && npx tsc --noEmit 2>&1 > /dev/null
  TSC_EXIT=$?
  cd ..
  if [ $TSC_EXIT -ne 0 ]; then
    echo "❌ ERROR: TypeScript errors found!"
    exit 1
  fi
fi

echo "✅ All code quality checks passed!"
exit 0
