# Control Migration Decisions Log

**Last Updated:** 2025-11-05

## Session Context

This document tracks all decisions made during the Control migration planning phase to ensure nothing is lost to context compaction.

---

## 1. Timeline Correction

### Decision: Update effort estimates based on actual installer migration duration

**Finding:**
- Original assessment estimated installer took "4 weeks"
- **Actual duration: 1-2 days** (Nov 3-4, 2025)
- Assessment was off by factor of ~14-28x

**Impact:**
- All time estimates in CONTROL_ASSESSMENT.md need revision
- Control migration likely much faster than 7-9 weeks estimate

**Action Items:**
- [ ] Update CONTROL_ASSESSMENT.md with corrected timeline
- [ ] Recalculate Control estimates based on 1-2 day installer baseline
- [ ] Adjust effort estimates to realistic timeframes

---

## 2. Dead Code Analysis

### Decision: Minimal dead code found - no major impact

**Findings:**
- Only 134 LOC dead code (1.77% of codebase)
- **Login.vue** (79 LOC) - Not in router, app uses Keycloak SSO
- **DashboardCard.vue** (55 LOC) - Never imported

**User's Concern:**
- Suspected PlaybookExecutor and BuildExecutor were dead code

**Verification Results:**
- ✅ **PlaybookExecutor (678 LOC) - HEAVILY USED** in 3 locations
- ✅ **BuildExecutor (344 LOC) - USED** in HarborImages
- ✅ All modal components actively used
- ✅ All executors are critical components

**Impact:**
- Dead code removal saves only ~1-2 hours
- Original complexity assessment was accurate

**Action Items:**
- [ ] Delete Login.vue and DashboardCard.vue before migration
- [ ] Delete Login.test.js (111 LOC test for dead component)

---

## 3. Simplification Decisions

### ✅ APPROVED Simplifications (43-53 hours saved)

#### 3.1. Merge ServiceCard + FavoriteServiceCard
**Savings:** 20-25 hours
**Rationale:** 85% code duplication, merge with `variant` prop
**Risk:** Low - improves maintainability
**Status:** Approved for implementation

#### 3.2. Replace Element Plus with Simpler Alternatives
**Savings:** 15-20 hours
**Current:** 14 usages of ElMessage/ElMessageBox
**Target:** Use sonner (toast) or native alerts
**Risk:** Low - notifications are non-critical UI
**Status:** Approved for implementation

#### 3.3. Flatten ServiceDetailsModal to Separate Routes
**Savings:** 30-35 hours
**Current:** 3-level nested modals (main → pod describe → container logs)
**Target:** Separate routes `/services/:id`, `/services/:id/pods/:podName`
**User Requirement:** NO browser tabs, use SPA navigation
**Clarification:** "Tabs" meant UI tabs within modal (rejected), not browser tabs
**Decision:** Use separate routes (Option A)
**Risk:** Medium - changes UX flow, but cleaner architecture
**Status:** Approved for implementation

### ❌ REJECTED Simplifications

#### 3.4. Remove Harbor Images Tree View
**Potential Savings:** 25-30 hours
**User Reasoning:** Tree view shows impact analysis for image rebuilds
**Example:** If base image changes, tree shows all affected child images
**Decision:** KEEP tree view - visual impact analysis is valuable for production
**Status:** Rejected

#### 3.5. Merge auth + tokens Stores
**Potential Savings:** 3-5 hours
**User Reasoning:** Two different concepts:
  - Auth tokens: User login/session (future multiuser support)
  - API tokens: External service access
**Decision:** KEEP SEPARATE for conceptual clarity and future flexibility
**Status:** Rejected

#### 3.6. Remove vuedraggable (Drag-Drop Favorites)
**Potential Savings:** 10-15 hours
**User Reasoning:** Good UX, worth keeping
**Compatibility:** Fully compatible with ServiceCard merge (#3.1)
**Decision:** KEEP vuedraggable
**Status:** Rejected

#### 3.7. Defer Custom Images Feature to v1.1
**Potential Savings:** 15-20 hours
**User Response:** "absolutely NO"
**Decision:** Custom Docker image building stays in scope - critical feature
**Status:** Rejected

---

## 4. Authentication/Session Fixes

### Decision: Fix critical auth bugs during React migration

**User Problem Report:**
- Session expires during use
- App becomes unresponsive (doesn't redirect to login)
- Reload sometimes fixes it (becomes responsive)
- Reload doesn't always redirect to login page
- App gets stuck in broken state

**Root Cause Identified:**
- **CRITICAL BUG:** Broken promise queue in axios interceptor (`api.js:75-80`)
- When token expires, queued requests never resolve properly
- UI stays in loading state forever
- Redirect to `/login` (doesn't exist - should use Keycloak)
- Missing error boundaries
- No proactive token refresh
- No timeout protection

**Required Fixes for React Migration:**
1. ✅ Fixed axios interceptor with proper subscriber pattern
2. ✅ Proactive token refresh (at 80% lifetime or 5 min before expiry)
3. ✅ Error boundary to catch unhandled auth errors
4. ✅ 30-second timeout on all API calls
5. ✅ Toast notifications for session expiration
6. ✅ Route middleware for server-side token validation
7. ✅ Proper Keycloak redirect (not /login)
8. ✅ Retry logic with exponential backoff

**Effort Impact:**
- **+8-12 hours** to implement auth fixes properly
- **High Priority:** Critical for production stability
- **Benefit:** Rock-solid authentication that never gets stuck

**Action Items:**
- [ ] Implement fixed axios interceptor pattern
- [ ] Add proactive token refresh hook
- [ ] Create error boundary component
- [ ] Add route protection middleware
- [ ] Implement timeout protection for API calls
- [ ] Add toast notifications for auth events
- [ ] Write comprehensive auth flow tests

---

## 5. Summary of All Action Items

### Documentation Updates
- [ ] Update CONTROL_ASSESSMENT.md with correct timeline (1-2 days installer)
- [ ] Add simplification decisions to migration plan
- [ ] Document auth fixes as critical requirement
- [ ] Update effort estimates based on corrections

### Code Cleanup (Before Migration)
- [ ] Delete Login.vue (79 LOC)
- [ ] Delete DashboardCard.vue (55 LOC)
- [ ] Delete Login.test.js (111 LOC)

### Simplifications to Implement (During Migration)
- [ ] Merge ServiceCard + FavoriteServiceCard (save 20-25h)
- [ ] Replace Element Plus with sonner/alerts (save 15-20h)
- [ ] Flatten ServiceDetailsModal to routes (save 30-35h)

### Auth Fixes to Implement (During Migration)
- [ ] Fixed axios interceptor with subscriber pattern
- [ ] Proactive token refresh hook (useAuth)
- [ ] Error boundary component
- [ ] Route protection middleware
- [ ] API call timeout protection (30s)
- [ ] Toast notifications for auth events
- [ ] Comprehensive auth flow tests

### Features to KEEP (No Simplification)
- ✅ Harbor Images tree view (impact analysis)
- ✅ auth + tokens stores separate (multiuser future)
- ✅ vuedraggable for favorites (good UX)
- ✅ Custom images feature (critical)
- ✅ PlaybookExecutor (well-designed, reusable)
- ✅ TemplateParameterForm core logic (core value)
- ✅ Health history chart (simple CSS, valuable)

---

## 6. Updated Effort Estimate

### Original Assessment (INCORRECT)
- Installer: "4 weeks"
- Control: "7-9 weeks"
- **Problem:** Based on wrong installer timeline

### Corrected Assessment
- Installer actual: **1-2 days** (Nov 3-4)
- Control with simplifications: **TBD** (needs recalculation)
- Auth fixes: **+8-12 hours**
- Simplifications save: **43-53 hours**

**Next Step:** Recalculate realistic Control migration timeline based on actual installer duration.

---

## 7. Questions for User

### Open Questions
1. What is the realistic timeline expectation for Control migration?
2. Should we implement simplifications BEFORE or DURING migration?
3. Priority order for migration phases?
4. Testing requirements and timeline?

### Decisions Pending
- None currently - all decisions documented above

---

## Document History

- **2025-11-05:** Initial creation - Session 1 decisions captured
- **Next update:** After timeline recalculation and user approval

---

## Notes for AI/Future Context

**If this conversation gets compacted and resumed:**
1. Read this file first to understand all decisions
2. Check CONTROL_ASSESSMENT.md for technical details
3. Timeline needs correction (1-2 days for installer, not 4 weeks)
4. Auth fixes are CRITICAL requirement, not optional
5. User rejected all "defer/remove" simplifications except Element Plus replacement
6. User values production-ready features over speed
