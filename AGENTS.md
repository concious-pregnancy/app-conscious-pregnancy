# Concsious Pregnancy: Agent Instructions

Canonical agent guide for `projects/cowork-concsious-pregnancy/app/` (this repo). Readers: Claude Code, Cursor, Codex CLI, Gemini CLI, and any agent tool that supports `AGENTS.md`.

`CLAUDE.md` and `GEMINI.md` in this directory are symlinks to this file (single source of truth). Symlinks stay inside the app repo so cloners get them.

## Parent context (optional)

Part of the three-tier cowork monorepo (parent → `cowork-concsious-pregnancy` → this app). If you have the full monorepo, the enclosing cowork project's `CLAUDE.md` adds brand voice, research pointers, and tool routing. **This file is self-sufficient if you cloned just the app repo.**

## Stack

- Next.js (frontend)

## Build / Dev / Test

### Frontend (frontend/)

```bash
npm run dev                # next dev
npm run build              # next build
npm run start              # next start
npm run lint               # oxlint -c oxlint.json --tsconfig tsconfig.json
npm run lint:fix           # oxlint -c oxlint.json --tsconfig tsconfig.json --fix
npm run format             # oxfmt --config ./.oxfmtrc.json --ignore-path ../.gitignor...
npm run format:fix         # oxfmt --config ./.oxfmtrc.json --ignore-path ../.gitignor...
npm run knip               # knip
npm run knip:fix           # knip --fix
npm run typecheck          # tsgo --noEmit
npm run test               # bun test
npm run test:e2e           # playwright test
npm run crawl:clearpath    # playwright test e2e/crawl.clearpath.spec.ts --project=chr...
npm run crawl:clearpath:ui # playwright test e2e/crawl.clearpath.spec.ts --project=chr...
npm run capture:local      # PW_LOCAL=1 playwright test e2e/local.capture.spec.ts --pr...
npm run extract:blueprint  # playwright test e2e/extract.blueprint.spec.ts --project=c...
npm run extract:screenshots # PW_LOCAL=1 playwright test e2e/extract.screenshots.spec.t...
npm run extract:styles     # playwright test e2e/extract.styles.spec.ts --project=chro...
npm run extract:animations # playwright test e2e/extract.animations.spec.ts --project=...
npm run extract:scroll-sequence # playwright test e2e/extract.scroll-sequence.spec.ts --pro...
npm run extract:scroll-sequence:local # PW_LOCAL=1 playwright test e2e/extract.scroll-sequence.sp...
npm run extract:video      # playwright test e2e/extract.video.spec.ts --project=chrom...
npm run extract:all        # playwright test e2e/extract.blueprint.spec.ts e2e/extract...
```

## Directory Conventions

- `frontend/` (Next.js / Remix frontend)

## Style Rules (universal)

- **Never use em dashes (—) or en dashes (–)** as punctuation. Use commas, parentheses, periods, or colons.
- Sound personal yet professional. Avoid AI-phrases: "delve into", "it's worth noting", "in conclusion", "certainly", "absolutely".
- Pre-push checks: run `format:fix`, `lint:fix`, `knip`, `typecheck` (see package.json scripts or Makefile). Fail fast locally, not in CI.
- Git workflow: pull main → feature branch → stage only relevant files → push PR. Never force-push to main. Never apply terraform locally; GitHub Actions handles it.

## For Cursor users

Rule files at `.cursor/rules/` (Cursor auto-loads these based on their frontmatter globs):

- `.cursor/rules/example-api-integration.md`
- `.cursor/rules/example-sentry-error.md`
- `.cursor/rules/example-ui-feature.md`
- `.cursor/rules/outcomes.mdc`
- `.cursor/rules/project-overview.mdc`
- `.cursor/rules/software-architecture.mdc`
- `.cursor/rules/software-development-lifecycle.mdc`

Cursor also has `.cursor/agents/`, `.cursor/skills/`, and `.cursor/mcp.json` for tool-specific agent / MCP configs. Claude Code, Codex, and Gemini ignore those directories; they read only this file.

## MailerLite (contact storage) + Resend (form notifications)

The homepage Contact form posts to `POST /api/contact` (full enquiry, triggers a notification email to Ashley). The footer email subscribe posts to `POST /api/subscribe` (also notifies). Both call `upsertSubscriber()` in `src/lib/mailerlite.ts`, which writes to the "Conscious Pregnancy Contacts" group (ID `197272254592058725`) in the workspace's MailerLite account. Both also call `sendNotificationEmail()` in `src/lib/resend-notify.ts` to alert Ashley.

**Gotcha**: MailerLite silently drops any subscriber field that isn't pre-defined in the account's field schema (same trap as Brevo attributes). Defaults `name`, `last_name`, `phone` already exist; custom fields `lead_source`, `stage`, `message` were created manually via the MailerLite API on 2026-08-30 (`POST /api/fields`). If pointing at a different MailerLite account, recreate those three fields first.

**Gotcha**: Resend requires the sending domain (`goldenlife.care`) to be DNS-verified before `sendNotificationEmail()` will succeed; until then it fails silently (logs an error, doesn't throw, so form submissions still succeed).

Required env vars: `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID`, `RESEND_API_KEY`, `RESEND_NOTIFY_FROM_EMAIL`, `RESEND_NOTIFY_FROM_NAME`, `RESEND_NOTIFY_TO`. Local dev reads from `.env.local`, Vercel reads from project env vars (all three targets).

Superseded Brevo config (`BREVO_*`) is documented in the parent project's root `.env` but no longer read by the app; kept only so the Brevo account itself stays reachable.

## App invariants

_Fill in with one-liners a new engineer would be surprised by; e.g., "all routes are statically generated", "provider data is not fetched at request time", "SEO meta lives in X not Y"._
