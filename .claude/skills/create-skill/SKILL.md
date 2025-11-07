---
name: create-skill
description: Create new Claude Code agent skills. Use when user says "create a skill", "make a skill", "add a skill".
allowed-tools: Write, AskUserQuestion
---

# Create Skill

## Step 1: Ask Questions

Use AskUserQuestion to gather:

1. **What should this skill do?** (the task/capability)
2. **When should Claude use it?** (keywords/triggers - be specific)
3. **Where to save?**
   - Personal: `~/.claude/skills/` (you only)
   - Project: `.claude/skills/` (team via git)
4. **Which tools needed?** (Read, Write, Edit, Bash, Grep, Glob - or "all")

## Step 2: Generate Name

From the description, create lowercase-with-hyphens name (max 64 chars)

## Step 3: Create SKILL.md

Use this template:

```yaml
---
name: {skill-name}
description: {what it does} and {when to use it}. Use when user says "{keyword1}", "{keyword2}", or "{keyword3}".
allowed-tools: {tools}
---

# {Title}

## Instructions

1. {first step}
2. {second step}
3. {final step}

## Examples

**User:** "{example request}"
**Action:** {what Claude should do}
```

## Step 4: Write File

Write to: `{location}/skills/{skill-name}/SKILL.md`

## Checklist

- [ ] Name is lowercase-with-hyphens
- [ ] Description includes BOTH "what" AND "when"
- [ ] Description has specific keywords users would say
- [ ] Instructions are numbered steps
- [ ] File written to correct location

## Step 5: Tell User to Restart

After creating the skill, inform the user:

**Restart Claude Code to load the new skill:**
```bash
claude -c
```

Skills only load at session start. The new skill won't be available until you restart.
