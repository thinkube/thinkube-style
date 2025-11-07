---
name: create-subagent
description: Create new Claude Code subagents. Use when user says "create a subagent", "create an agent", "make a subagent".
allowed-tools: Write, AskUserQuestion
---

# Create Subagent

## Step 1: Ask Questions

Use AskUserQuestion to gather:

1. **What will this subagent do?** (specialized task)
2. **What's its role/expertise?** (e.g., "security auditor", "code reviewer")
3. **Where to save?**
   - Project: `.claude/agents/` (team via git)
   - Personal: `~/.claude/agents/` (you only)
4. **Which tools?** (Read, Write, Bash, Grep, Glob - or "all")
5. **Which model?** (sonnet=default, haiku=fast, opus=powerful)

## Step 2: Generate Name

From role, create lowercase-with-hyphens name

## Step 3: Create Agent File

Use this template:

```markdown
---
name: {agent-name}
description: {role description}
tools: {tool1}, {tool2}
model: {model}
---

# Role

You are a {role} specializing in {expertise}.

# Task

When invoked:

1. {step 1}
2. {step 2}
3. {step 3}

# Checklist

- [ ] {requirement 1}
- [ ] {requirement 2}

# Output Format

## Summary
{what to include}

## Findings
{what to include}

## Recommendations
{what to include}

# Constraints

- {constraint 1}
- {constraint 2}
```

## Step 4: Write File

Write to: `{location}/agents/{agent-name}.md`

## Checklist

- [ ] Name is lowercase-with-hyphens
- [ ] System prompt is detailed and specific
- [ ] Includes clear output format
- [ ] Tools list only what's needed (or omit for all tools)
- [ ] File written to correct location

## Step 5: Tell User to Restart

After creating the subagent, inform the user:

**Restart Claude Code to load the new subagent:**
```bash
claude -c
```

Subagents only load at session start. The new subagent won't be available until you restart.
