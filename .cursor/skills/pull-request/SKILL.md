---
name: pull-request
description: Creating comprehensive pull request descriptions with proper cross-linking. Use when creating or updating PRs.
---

# Pull Request Descriptions

## Title Format

```
<type>: <description> [<ticket-id>]
```

**Types:**
- `fix:` - Bug fixes
- `feat:` - New features
- `docs:` - Documentation only
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
- `fix: handle subscribe API duplicate email gracefully [CP-41]`
- `feat: add email waitlist signup form [CP-123]`
- `feat: build prenatal nutrition topic page [CP-456]`

## Branch Naming

Include the ticket ID in lowercase:

```
<ticket-id>-<brief-description>
```

Example: `cp-41-subscribe-api-duplicate-email`

## Required Sections

Every PR description must have these sections:

### 1. Problem

What issue are you fixing or what are you building? Be specific.

### 2. Linear Issue

Link to the tracking ticket:

```markdown
**Linear Issue**: [CP-41](https://linear.app/...)
```

### 3. Sentry Issues (if applicable)

Links to related production errors:

```markdown
**Sentry Issues**:
- [NEXTJS-5S](https://sentry.io/issues/...) - API route 500 error
```

### 4. Root Cause

For bug fixes: explain why the problem occurred. For features: describe the design decision.

### 5. Solution

Describe what you built or fixed. Include code snippets if helpful.

### 6. Changes

List files and functionality changed:

```markdown
# Changes

- `frontend/app/api/subscribe/route.ts`:
  - Added duplicate email handling (returns 409 with user-friendly message)
  - Added Zod validation for email format
- `frontend/components/subscribe-form.tsx`:
  - Added error state for duplicate email
- `frontend/app/api/subscribe/route.test.ts`:
  - Added test for duplicate email scenario
```

### 7. To Test

How reviewers can verify the fix:

```markdown
# To test

1. Run `cd frontend && bun test` - all tests should pass
2. Start dev server: `cd frontend && bun dev`
3. Navigate to `/` and try submitting the waitlist form twice with the same email
4. Verify the second attempt shows a "You're already signed up" message
```

### 8. Checklist (optional)

```markdown
# To do

- [x] Write the source code
- [x] Add/modify tests
- [x] Complete PR description
```

## Example PR Description

```markdown
# Problem

The subscribe API returns a 500 error when the same email is submitted twice,
instead of returning a helpful message to the user.

**Linear Issue**: [CP-41](https://linear.app/...)

## Root Cause

The `INSERT INTO subscribers` query throws a unique constraint violation when
the email already exists. The API route has no handling for this specific error
type, so it falls through to Next.js's default 500 handler.

## Solution

Added a check for `23505` PostgreSQL error code (unique_violation) and returns
a 409 Conflict with a user-friendly message instead.

# Changes

- `frontend/app/api/subscribe/route.ts`:
  - Added unique constraint error handling (returns 409)
- `frontend/app/api/subscribe/route.test.ts`:
  - Added test for duplicate email scenario

# To test

1. Run `cd frontend && bun test` - all tests should pass
2. The new test `subscribe.test.ts > duplicate email` verifies the fix
```

## Cross-Linking Checklist

After creating the PR:

1. **Update Linear ticket** with PR link
2. **Verify branch name** includes ticket ID (`cp-41-...`)
3. **Verify commit messages** reference ticket ID (`Fixes CP-41`)
4. **Verify PR title** includes ticket ID in brackets
