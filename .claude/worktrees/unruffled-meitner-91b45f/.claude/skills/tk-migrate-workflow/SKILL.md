---
name: tk-migrate-workflow
description: Automates batch Vue to React migration for thinkube-control. Use when user says "migrate workflow", "start migration", or "batch migrate".
allowed-tools: Task
---

# Migrate Workflow

## Instructions

1. Invoke the tk-migration-orchestrator subagent using the Task tool
2. Pass it a prompt to start the full migration workflow
3. Wait for the subagent to complete all migrations
4. Report the subagent's summary back to the user

## Implementation

Use Task tool:
```
Task(
  subagent_type="tk-migration-orchestrator",
  description="Batch migrate Vue to React",
  prompt="Execute the full Vue to React migration workflow for thinkube-control. Discover all pending components, migrate them in batch, and report the results."
)
```

## Examples

**User:** "migrate workflow"
**Action:** Invoke tk-migration-orchestrator subagent, which will:
- Load/create migration-tasks.json
- Discover all Vue components
- Check for existing React equivalents
- Batch migrate all pending components
- Save progress after each component
- Return summary with success/failure counts

**User:** "start migration"
**Action:** Same as above

**User:** "batch migrate"
**Action:** Same as above

## Notes

- The subagent handles all the heavy lifting in its own context
- Main session context is preserved
- Progress is saved incrementally in `.claude/migration-tasks.json`
- Workflow is resumable - re-run to continue if interrupted
- Failed components are logged but don't stop the workflow
