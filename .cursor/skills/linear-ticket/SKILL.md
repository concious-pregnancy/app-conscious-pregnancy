---
name: linear-ticket
description: Creating well-structured Linear tickets for tracking work on Conscious Pregnancy. Use when investigating bugs or starting new features that need tracking.
---

# Linear Tickets

## Before Creating a Ticket

**CRITICAL**: Before creating a new Linear ticket, ask the user:

> "Is there an existing Linear ticket for this work?"

- **If YES**: Get the ticket ID and reference it in your plan and PR
- **If NO**: Create a ticket following this skill before proceeding
- **If UNSURE**: Ask the user to clarify before creating a duplicate

## How to Create Tickets

**NEVER use the Linear MCP connector.** Use the project CLI script:

```zsh
./scripts/linear-multi.sh create-issue --team "Dfp Personal projects" --title "..."
```

Or use the GraphQL mutation directly via `./scripts/linear-multi.sh`.

## Ticket Structure

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| **Title**    | Follow the title format below                  |
| **Priority** | Based on severity (Urgent/High/Medium/Low)     |
| **Labels**   | Bug, Feature, Enhancement, etc.               |
| **Team**     | Dfp Personal projects (Conscious Pregnancy)   |

## Title Format

### For Bugs

```
[Bug] <component/route name> <brief error description>
```

Examples:
- `[Bug] /api/subscribe returns 500 on duplicate email`
- `[Bug] Article page crashes when slug is not found`

### For Features/Other Work

```
<brief description of the work>
```

Examples:
- `Add email waitlist signup form`
- `Build article topic pillar pages`
- `Add Sentry error monitoring`

## Required Sections

### 1. Problem Summary

1-2 sentences describing what's happening or what needs to be built.

### 2. Sentry Issues (if applicable)

Links to all related Sentry errors:

```markdown
**Sentry Issues**:
- [NEXTJS-5S](https://sentry.io/issues/...) - API route 500 error
```

### 3. Error Details (for bugs)

- **Error**: The exact error message
- **Location**: File path where error occurs
- **Occurrences**: How many times, date range
- **Environment**: Production, staging, etc.
- **Severity**: Priority level with justification

### 4. Root Cause

Analysis of why the error is occurring. Be specific about the code path.

### 5. Impact

Who/what is affected by this issue.

## Optional Sections

- **Additional Issues** - Related problems discovered during investigation
- **Reproduction Steps** - How to reproduce locally (if known)
- **Suggested Solution** - High-level approach (but NOT implementation details)

## What NOT to Include

- Detailed implementation plan (that goes in the plan document)
- Code snippets of the fix (that goes in the PR)
- Time estimates

## After PR is Created

Add a comment to the Linear ticket linking to the PR:

```markdown
**Pull Request**: https://github.com/.../conscious-pregnancy/pull/XXX

Fix submitted - <brief description of what the PR does>.
```

## Cross-Reference Traceability

| From           | Links To                                    |
| -------------- | ------------------------------------------- |
| Linear ticket  | Sentry errors (for context)                 |
| Linear ticket  | PR (for code changes)                       |
| PR             | Linear ticket (for tracking)                |
| PR             | Sentry errors (for context)                 |
| Branch name    | Ticket ID (e.g., `cp-41-...`)               |
| Commit message | Ticket ID (e.g., `Fixes CP-41`)             |
