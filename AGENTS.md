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

## Brevo (contact storage + form notifications)

The homepage Contact form posts to `POST /api/contact` (full enquiry, triggers a notification email to Ashley). The footer email subscribe posts to `POST /api/subscribe` (also notifies on the first submission). Both call `upsertContact()` in `src/lib/brevo.ts`, which writes to the workspace's "Conscious Pregnancy Contacts" list.

**Gotcha**: Brevo silently drops any contact attribute that isn't pre-defined in the workspace schema. Before pointing the app at a brand-new Brevo workspace, run the bootstrap once:

```bash
BREVO_API_KEY=xkeysib-... bun run scripts/brevo-bootstrap.ts
```

This creates `SOURCE`, `MESSAGE`, `STAGE` as text attributes (defaults `FIRSTNAME`, `LASTNAME`, `EMAIL`, `SMS` are already present). Script is idempotent.

Required env vars: `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_NOTIFY_FROM_EMAIL`, `BREVO_NOTIFY_FROM_NAME`, `BREVO_NOTIFY_TO`. Local dev reads from `.env.local`, Vercel reads from project env vars (all three targets).

## App invariants

_Fill in with one-liners a new engineer would be surprised by; e.g., "all routes are statically generated", "provider data is not fetched at request time", "SEO meta lives in X not Y"._
