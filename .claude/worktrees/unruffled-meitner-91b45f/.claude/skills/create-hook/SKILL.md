---
name: create-hook
description: Create new Claude Code hooks. Use when user says "create a hook", "add a hook", "automate validation".
allowed-tools: Write, Bash, AskUserQuestion
---

# Create Hook

## Step 1: Ask Questions

Use AskUserQuestion to gather:

1. **What should the hook do?** (validate, block, format, log, etc.)
2. **Which event?**
   - PreToolUse (before tool runs - can block)
   - PostToolUse (after tool succeeds)
   - UserPromptSubmit (when user submits prompt)
   - SessionStart (session begins)
   - SessionEnd (session ends)
3. **Which tools to match?** (for PreToolUse/PostToolUse only)
   - Specific: "Write", "Edit", "Bash"
   - Multiple: "Write|Edit"
   - All: "*"
4. **Where to save config?**
   - Project: `.claude/settings.json` (team via git)
   - Personal: `~/.claude/settings.json` (you only)
   - Local: `.claude/settings.local.json` (not committed)

## Step 2: Create Hook Script

Bash script template:

```bash
#!/bin/bash
# {Description of what this does}

INPUT=$(cat)

# Extract needed fields
FIELD=$(echo "$INPUT" | jq -r '.field_name')

# Your logic here
if [[ condition ]]; then
  echo "Error message" >&2
  exit 2  # Block
fi

# Success
exit 0
```

Save to: `.claude/hooks/{hook-name}.sh`

Make executable: `chmod +x .claude/hooks/{hook-name}.sh`

## Step 3: Update Settings JSON

**For events WITH matcher** (PreToolUse, PostToolUse):

```json
{
  "hooks": {
    "{EventName}": [
      {
        "matcher": "{ToolPattern}",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/{script}.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**For events WITHOUT matcher** (SessionStart, SessionEnd, etc.):

```json
{
  "hooks": {
    "{EventName}": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/{script}.sh"
          }
        ]
      }
    ]
  }
}
```

## Step 4: Write Files

1. Write script to `.claude/hooks/{name}.sh`
2. Read existing settings JSON
3. Merge hook configuration into settings
4. Write updated settings JSON
5. Make script executable

## Checklist

- [ ] Script reads JSON from stdin
- [ ] Uses exit codes: 0=success, 2=block, other=error
- [ ] All variables quoted: "$VAR"
- [ ] Settings JSON syntax valid
- [ ] Script is executable (chmod +x)
- [ ] Hook event name correct (case-sensitive)

## Step 5: Tell User to Restart

After creating the hook, inform the user:

**Restart Claude Code to load the new hook:**
```bash
claude -c
```

Hooks only load at session start. The new hook won't be active until you restart.

## Exit Codes Reference

- **0** = Success, allow
- **2** = Block with error (stderr to Claude)
- **Other** = Non-blocking error (stderr to user)
