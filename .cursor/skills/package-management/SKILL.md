---
name: package-management
description: Dependency management for Conscious Pregnancy. Use when adding, removing, or updating packages.
---

# Dependencies

## Package Manager

Use **Bun** for all dependency management. Do NOT use `npm`, `pnpm`, or `yarn`.

## Commands

Run from the `frontend/` directory:

```zsh
bun add package@1.2.3        # Production dependency (exact version)
bun add -D package@1.2.3     # Dev dependency (exact version)
bun remove package            # Remove a dependency
bun install                   # Install all dependencies from lockfile
```

## Rules

- **Do not edit `package.json` manually** - use Bun CLI commands
- **Lock file** (`bun.lockb`) must be committed to version control
- **Use exact versions** (no `^` or `~` ranges) to prevent surprise upgrades
- **Check for existing packages** before adding new ones that overlap in functionality

## Quick Reference

| Action            | Command                        |
| ----------------- | ------------------------------ |
| Add production    | `bun add pkg@1.2.3`           |
| Add dev           | `bun add -D pkg@1.2.3`        |
| Remove            | `bun remove pkg`              |
| Install all       | `bun install`                  |

## Adding shadcn/ui Components

shadcn/ui components are added via CLI, not as npm packages:

```zsh
cd frontend && bunx shadcn@latest add <component-name>
```

This copies the component source into `frontend/components/ui/`. These are source files you own and can modify.

## Key Existing Packages

Notable packages already in use in this project:

| Package        | Purpose                                    |
| -------------- | ------------------------------------------ |
| `gsap`         | Scroll and entrance animations             |
| `lenis`        | Smooth scroll behavior                     |
| `next`         | Framework (Next.js 16, App Router)         |
| `react`        | UI library (React 19)                      |
| `zod`          | Runtime validation for API routes          |
| `tailwindcss`  | Utility-first CSS                          |
