---
name: database
description: Database schema design, PostgreSQL conventions, and ORM patterns. Use when creating tables, migrations, or working with database models. Note: Conscious Pregnancy is currently a content/marketing site; database integration may be added for email capture, article CMS, or user accounts.
---

# Database & Models

## Current State

Conscious Pregnancy is primarily a content platform. Database integration is planned for:

- **Email / waitlist signups** - Store subscriber records
- **Contact inquiries** - Store visitor messages
- **Article CMS** - Optional if moving content to a managed database vs. MDX files
- **User accounts** - If personalization or saved content is added

When adding database support, follow these conventions.

## Core Philosophy

**Don't reinvent database features.** Use PostgreSQL's built-in capabilities:
- Cascade deletes -> `ON DELETE CASCADE`, not application code
- UUID generation -> `gen_random_uuid()` default, not application code
- Timestamps -> `DEFAULT NOW()`, not application code
- Validation -> ENUM types or CHECK constraints, not application code

## Required Columns

Every table must have:

| Column        | Type           | Default                    |
| ------------- | -------------- | -------------------------- |
| `created_at`  | `TIMESTAMPTZ`  | `NOW()`                    |
| `modified_at` | `TIMESTAMPTZ`  | `NOW()`                    |
| `deleted_at`  | `TIMESTAMPTZ`  | `NULL` (for soft deletes)  |

## Primary Keys

| Scenario           | Key Type                     |
| ------------------ | ---------------------------- |
| Internal only      | Auto-increment `SERIAL`      |
| Public-facing      | `UUID` (gen_random_uuid())   |

**Never expose auto-increment IDs externally** - reveals data counts, enables enumeration attacks.

## Example Schema

```sql
-- subscribers table
CREATE TABLE subscribers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        VARCHAR(320) NOT NULL UNIQUE,
  first_name   VARCHAR(100),
  stage        VARCHAR(30), -- 'trying-to-conceive', 'pregnant', 'postpartum'
  source       VARCHAR(100), -- how they found us
  confirmed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  modified_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at   TIMESTAMPTZ
);
```

## Schema Design

- Foreign keys for all relationships with explicit cascade behavior
- `NOT NULL` unless column genuinely needs nulls
- Size VARCHAR to expected data (e.g., `VARCHAR(320)` for email)
- ENUM or VARCHAR with CHECK constraint for fixed value sets
- Comments on tables and non-obvious columns

## Migrations

**NEVER hand-edit migration files.** Generate them with Drizzle:

```zsh
cd frontend && bun run db:generate   # Generate migration from schema changes
cd frontend && bun run db:migrate    # Apply pending migrations
```

## Anti-Patterns

- Generating UUIDs in application code
- Implementing cascades in application code
- Setting timestamps in application code
- Hard deletes on subscriber or user data
- Exposing auto-increment IDs
- VARCHAR without length limits
- Missing foreign key constraints
