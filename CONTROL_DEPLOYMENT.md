# Thinkube Control - Deployment Process

**Last Updated:** 2025-11-05

## Overview

This document explains how thinkube-control is deployed in the production environment and how this impacts the React migration strategy.

---

## Deployment Architecture

### Template Instantiation Chain

```
Copier Template (thinkube-control repository)
  ↓ instantiated with copier
Gitea (user's control instance)
  ↓ webhook triggers
Argo Workflow (builds container image)
  ↓ pushes to
Harbor Registry (thinkube-control:tag)
  ↓ webhook triggers
Webhook Adapter (listens for new images)
  ↓ triggers
ArgoCD Sync (deploys to Kubernetes)
  ↓
Running Control Instance
```

**Critical Point:** Repository name "thinkube-control" is embedded throughout this chain. Renaming would break:
- Gitea webhook configuration
- Argo Workflow job names
- Harbor image repository path
- Webhook adapter configuration
- ArgoCD application definition

**Migration Strategy:** Work in main repository, keep name unchanged ✅

---

## Deployment Scripts Location

### Thinkube Installer Repository

**Location:** `/tmp/thinkube-installer`

**Note:** Despite the name "thinkube-installer", this repository contains:
- Ansible playbooks for deploying ALL Thinkube components
- Including thinkube-control deployment playbooks
- Inventory configurations
- Deployment scripts

**Structure:**
```
/tmp/thinkube-installer/
├── ansible/
│   └── 40_thinkube/
│       └── core/
│           └── thinkube-control/
│               ├── 12_deploy.yaml         # Full deployment (recreates databases)
│               ├── 12_deploy_dev.yaml     # Incremental update (preserves data)
│               └── 12_deploy_dev_test.yaml # Test variant
├── scripts/
│   └── run_ansible.sh         # Ansible execution wrapper
└── inventory/
    └── [inventory files]
```

**⚠️ SECURITY REQUIREMENT:**

The deployment script requires `ANSIBLE_BECOME_PASSWORD` environment variable:

```bash
# REQUIRED: Set password before running ansible
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"

# Then run deployment
cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml
```

**NEVER hardcode this password in scripts or documents!**

---

## Deployment Playbooks

### 1. Full Deployment: `12_deploy.yaml`

**Purpose:** Complete deployment from scratch

**What it does:**
- Deletes existing thinkube-control deployment
- **Drops and recreates all databases**
- Deploys new thinkube-control version
- Re-initializes all data

**When to use:**
- First-time installation
- Database schema changes
- Major version upgrades with breaking changes
- After migrations that modify database structure

**Command:**
```bash
# Set password first
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"

cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy.yaml
```

**⚠️ WARNING:** Destroys all existing data!

---

### 2. Incremental Update: `12_deploy_dev.yaml`

**Purpose:** Update application code without touching databases

**What it does:**
- Pulls latest code from Gitea
- Rebuilds container image
- Updates Kubernetes deployment
- **Preserves all databases and data**
- Restarts application pods

**When to use:**
- Code changes without DB schema changes
- Bug fixes
- UI updates
- **React migration (no DB changes expected)**

**Command:**
```bash
# Set password first
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"

cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml
```

**✅ SAFE:** Preserves user data

---

## Migration Deployment Strategy

### For React Migration

**Recommended Approach:** Use `12_deploy_dev.yaml` (incremental update)

**Rationale:**
1. React migration is **frontend-only** - no database schema changes
2. Backend API remains unchanged (Python/FastAPI)
3. Database models remain unchanged
4. User data should be preserved
5. Faster deployment (no DB recreation)
6. Rollback possible (redeploy Vue version if needed)

**Deployment Steps:**

```bash
# 1. Ensure main branch has React code
cd /path/to/thinkube-control
git status
# Should show React frontend, not Vue

# 2. Commit and push to Gitea
git add .
git commit -m "Migrate frontend from Vue to React"
git push origin main

# 3. Deploy incremental update
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"
cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml

# 4. Verify deployment
# - Check ArgoCD for sync status
# - Check Harbor for new image
# - Test application in browser
```

---

## Migration Workflow

### Phase 1: Backup (Before Migration)

```bash
# Create backup worktree for reference
cd /path/to/thinkube-control
git worktree add ../thinkube-control-vue-backup main

# Verify backup exists
ls ../thinkube-control-vue-backup/frontend/src/
```

**Purpose:** Vue code accessible for reference during migration

---

### Phase 2: Development (During Migration)

```bash
# Work in main repository
cd /path/to/thinkube-control

# Migrate components one by one
# Test locally during development
npm run dev

# Commit frequently
git add .
git commit -m "Migrate Dashboard component to React"
```

**Testing:**
- Local development with `npm run dev`
- Backend API at `http://localhost:8000/api/v1`
- Test authentication flows
- Test all features before deploying

---

### Phase 3: Deployment (After Migration Complete)

```bash
# 1. Final commit
cd /path/to/thinkube-control
git add .
git commit -m "Complete React migration - frontend production ready"
git push origin main

# 2. Deploy to production
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"
cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml

# 3. Monitor deployment
# - Watch ArgoCD sync
# - Check pod logs: kubectl logs -n thinkube-control -l app=control
# - Verify no errors

# 4. Smoke test
# - Login to control interface
# - Test critical flows:
#   - Dashboard loads
#   - Service details modal
#   - Template deployment
#   - Harbor images
#   - PlaybookExecutor works
```

---

### Phase 4: Cleanup (After Verification)

```bash
# Only after migration is stable!

# Remove backup worktree
cd /path/to/thinkube-control
git worktree remove ../thinkube-control-vue-backup

# Optional: Tag the migration completion
git tag v2.0.0-react-migration
git push origin v2.0.0-react-migration
```

---

## Rollback Strategy

### If React Migration Has Issues

```bash
# 1. Checkout Vue version
cd /path/to/thinkube-control
git log --oneline  # Find commit before migration
git reset --hard <commit-hash-before-migration>

# 2. Force push to Gitea (⚠️ DANGEROUS - use with caution)
git push origin main --force

# 3. Deploy Vue version
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"
cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml

# 4. Verify Vue version restored
```

**Alternative (Safer Rollback):**
```bash
# Use backup worktree
cp -r ../thinkube-control-vue-backup/* .
git add .
git commit -m "Rollback to Vue version"
git push origin main

# Deploy
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"
cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml
```

---

## Database Migrations

### Current Status: NO Migration System

**Important:** thinkube-control does NOT have a database migration system like Alembic or Django migrations.

**Implications:**
- Any database schema change requires `12_deploy.yaml` (full deployment)
- Full deployment **DELETES ALL DATA**
- React migration should NOT change database schema

**For React Migration:**
- ✅ Frontend changes only - no DB changes
- ✅ Use `12_deploy_dev.yaml` (preserves data)
- ✅ No migration scripts needed

**Future Consideration:**
If database changes are needed, options:
1. Implement Alembic migrations (proper solution)
2. Accept data loss with full deployment
3. Manual SQL migration scripts (risky)

---

## Testing Strategy

### Local Testing

```bash
# Backend (Python/FastAPI)
cd /path/to/thinkube-control/backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend (React/Vite)
cd /path/to/thinkube-control/frontend
npm run dev

# Access:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8000/api/v1
# - API docs: http://localhost:8000/docs
```

### Dev Deployment Testing

```bash
# Deploy to dev environment
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"
cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml

# Monitor deployment
kubectl get pods -n thinkube-control -w

# Check logs
kubectl logs -n thinkube-control -l app=control --tail=100 -f

# Test in browser
# Navigate to control.yourdomain.com
```

### Production Deployment

```bash
# Same as dev, but with production inventory
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"
cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy.yaml  # Only if DB changes
# OR
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml  # For code-only updates
```

---

## Checklist for React Migration Deployment

### Pre-Deployment

- [ ] All React components migrated and tested locally
- [ ] Authentication flows tested (Keycloak login, token refresh)
- [ ] All critical features working (Dashboard, Templates, Harbor, etc.)
- [ ] No database schema changes
- [ ] Backend API unchanged
- [ ] Build succeeds without errors (`npm run build`)
- [ ] No console errors in browser
- [ ] Backup worktree created (for reference)
- [ ] Git committed and pushed to main branch

### Deployment

- [ ] Navigate to `/tmp/thinkube-installer`
- [ ] Set password: `export ANSIBLE_BECOME_PASSWORD="your-sudo-password"`
- [ ] Run: `./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml`
- [ ] Monitor ArgoCD sync status
- [ ] Check Harbor for new image
- [ ] Watch pod restart: `kubectl get pods -n thinkube-control -w`
- [ ] Check pod logs for errors

### Post-Deployment Verification

- [ ] Login successful (Keycloak OAuth)
- [ ] Dashboard loads and displays services
- [ ] Service details modal works (including nested pod/logs)
- [ ] Template deployment works (PlaybookExecutor)
- [ ] Harbor images page loads (tree view, custom images)
- [ ] Secrets management works
- [ ] API tokens management works
- [ ] JupyterHub config works
- [ ] Optional components management works
- [ ] Drag-drop favorites works
- [ ] No JavaScript errors in console
- [ ] Token refresh works (test by letting session idle)
- [ ] Session expiration redirects to login properly

### Rollback Plan (If Needed)

- [ ] Document current commit hash
- [ ] Keep backup worktree until stable
- [ ] Test rollback procedure in dev first
- [ ] Communicate downtime window if rollback needed

---

## Common Issues and Solutions

### Issue 1: Image Build Fails

**Symptom:** Argo Workflow fails to build container image

**Solution:**
```bash
# Check build logs in Argo UI
# Common causes:
# - npm build errors (fix in code)
# - Dockerfile issues (verify Dockerfile)
# - Network issues pulling dependencies
```

### Issue 2: Pods CrashLoopBackOff

**Symptom:** Pods restart repeatedly after deployment

**Solution:**
```bash
# Check pod logs
kubectl logs -n thinkube-control <pod-name> --previous

# Common causes:
# - Backend can't connect to database (check connection string)
# - Frontend build artifacts missing (check Dockerfile COPY)
# - Port conflicts (verify ports in deployment)
```

### Issue 3: ArgoCD Sync Fails

**Symptom:** ArgoCD shows "OutOfSync" or errors

**Solution:**
```bash
# Force sync in ArgoCD UI
# Or via CLI:
argocd app sync thinkube-control --force

# Check ArgoCD app status:
argocd app get thinkube-control
```

### Issue 4: Authentication Not Working

**Symptom:** Login redirects fail or session expires immediately

**Solution:**
```bash
# Check Keycloak configuration
# - Client ID correct
# - Redirect URIs include new frontend URL
# - Token expiration settings

# Check frontend env variables
# - KEYCLOAK_URL
# - KEYCLOAK_REALM
# - KEYCLOAK_CLIENT_ID
```

---

## Environment Variables

### Frontend (React/Vite)

Required environment variables (`.env.local` or deployment config):

```bash
# Keycloak Configuration
NEXT_PUBLIC_KEYCLOAK_URL=https://keycloak.yourdomain.com
NEXT_PUBLIC_KEYCLOAK_REALM=thinkube
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=thinkube-control

# API Configuration
NEXT_PUBLIC_API_URL=https://control-api.yourdomain.com/api/v1

# Optional
NEXT_PUBLIC_ENVIRONMENT=production
```

### Backend (Python/FastAPI)

Already configured, no changes needed for React migration.

---

## Script Reference

### run_ansible.sh Usage

```bash
./scripts/run_ansible.sh <playbook-path> [ansible-args]

# Examples:
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy.yaml --check  # Dry run
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml -v   # Verbose
```

**What it does:**
- Sets up Ansible environment
- Loads correct inventory
- Executes playbook with proper variables
- Handles authentication

---

## Summary

**For React Migration:**

1. ✅ Work in main repository (keep name "thinkube-control")
2. ✅ Create backup worktree for Vue reference
3. ✅ Use `12_deploy_dev.yaml` for deployment (preserves data)
4. ✅ No database changes = no full deployment needed
5. ✅ Rollback possible by reverting git and redeploying

**Deployment Command:**
```bash
export ANSIBLE_BECOME_PASSWORD="your-sudo-password"
cd /tmp/thinkube-installer
./scripts/run_ansible.sh ansible/40_thinkube/core/thinkube-control/12_deploy_dev.yaml
```

**Key Benefit:** Zero deployment pipeline changes needed - architecture stays intact!
