---
name: development-commands
description: Reference for all development commands including testing, linting, and running development servers. Use when running tests, checking code quality, or starting dev servers.
---

# Development Commands Reference

## Development Server

```zsh
# Start the Next.js dev server (with Turbopack)
cd frontend && bun dev
```

The app runs at `http://localhost:3000`.

## Code Quality Checks

Run from the `frontend/` directory.

### Individual Checks

```zsh
bun run format        # Formatting check (oxfmt)
bun run format:fix    # Auto-fix formatting
bun run lint          # Linting (oxlint)
bun run lint:fix      # Auto-fix lint issues
bun run typecheck     # Type checking (tsgo)
bun run knip          # Dead code detection
```

## Testing

Run from the `frontend/` directory.

```zsh
bun test                  # Run all unit tests (Bun test runner)
bun run test:e2e          # Run Playwright E2E tests (if configured)
```

## Build

```zsh
cd frontend && bun run build    # Production build (Next.js)
cd frontend && bun run start    # Start production server
```

## Package Management

```zsh
cd frontend
bun install              # Install all dependencies
bun add <package>        # Add a dependency
bun add -D <package>     # Add a dev dependency
```

## Git: Update Branch with Main

When SSH is unavailable (e.g. in devcontainer), use the GitHub CLI with `GH_TOKEN`:

```zsh
gh auth setup-git
git remote set-url origin https://github.com/OWNER/REPO.git
git fetch origin main && git merge origin/main --no-edit
git remote set-url origin git@github.com:OWNER/REPO.git
```

## Pre-Commit Workflow

**CRITICAL**: Run ALL of these checks before committing code. Do NOT skip any.

```zsh
cd frontend
bun run format:fix && bun run lint:fix && bun run knip && bun run typecheck && bun test
```

The order matters: format first (auto-fixes files), then lint, knip, typecheck, and test.

## CI Pipeline

The CI pipeline (`.github/workflows/ci.yml`) runs:

1. `bun run format` - Formatting check
2. `bun run lint` - Linting
3. `bun run knip` - Dead code check
4. `bun run typecheck` - Type checking
5. `bun test` - Unit tests
6. `bun run build` - Build verification

All must pass for CI to be green.
