---
name: copy-backend-unchanged
description: Copy backend Python/FastAPI files unchanged from Vue app to React app. Remove any frontend-serving code as Next.js handles its own serving.
---

# Copy Backend Files Unchanged

Backend Python/FastAPI code doesn't need migration - copy as-is to the React app.

## Input
- Backend file path from Vue app (e.g., `/home/alexmc/thinkube-installer/backend/main.py`)

## Process

1. **Read backend file** from Vue app
2. **Verify no frontend dependencies:**
   - Check imports don't reference Vue components
   - Check no hardcoded paths to `frontend/dist` (Next.js handles its own build)
   - Check API endpoints don't serve static files (Next.js handles this)
3. **Copy to exact same path** in React app
   - Example: `thinkube-installer/backend/main.py` → `thinkube-installer-react/backend/main.py`
4. **Verify Python dependencies** in requirements.txt/pyproject.toml are unchanged
5. **Report copied file** with any notes

## Special Considerations

### FastAPI Static File Serving
If the backend serves frontend static files:

```python
# ❌ Remove this (Vue-specific)
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="static")

# ✅ Next.js handles its own serving (or use Tauri in desktop mode)
# Remove static file mounting entirely
```

### Environment Variables
Check `.env` files:
- Backend `.env` stays the same (database, API keys, etc.)
- Frontend `.env` may need updates for Next.js conventions:
  - `VITE_API_URL` → `NEXT_PUBLIC_API_URL`

### WebSocket Endpoints
- No changes needed for WebSocket endpoints
- React will connect the same way Vue did
- Verify endpoint paths are documented for frontend migration

## Output
- Copied file(s)
- List of any removed frontend-serving code
- Notes on environment variable changes needed
- Confirmation that backend is unchanged and functional

## Validation
After copying:
- Backend should run independently: `cd backend && uvicorn main:app`
- API endpoints accessible at same URLs
- No references to Vue-specific paths
