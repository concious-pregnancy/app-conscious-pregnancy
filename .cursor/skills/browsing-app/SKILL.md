---
name: browsing-app
description: Guide for browsing and testing the Conscious Pregnancy website during development. Use when testing UI changes, verifying features in the browser, or debugging user-facing issues.
---

# Browsing the Conscious Pregnancy Website

Use this skill when you need to test UI changes or verify features in the browser.

## Starting the Development Environment

```zsh
# Single terminal - start the Next.js dev server
cd frontend && bun dev
```

The app runs at `http://localhost:3000` with Turbopack enabled for fast hot module replacement.

**Important**: No multi-service setup required. The Next.js dev server handles both frontend rendering and API routes.

## Routes Reference

| Route                  | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `/`                    | Homepage (hero, value proposition, topic pillars, featured articles, sign-up CTA) |
| `/articles/[slug]`     | Individual article pages                         |
| `/topics/[topic]`      | Topic/pillar pages (nutrition, gut-health, etc.) |
| `/waitlist` or `/subscribe` | Email capture / waitlist form              |

More routes are defined in `frontend/app/`. Each directory with a `page.tsx` is a route.

## API Routes

API routes are accessible at `/api/*`:

| Route              | Method | Purpose                        |
| ------------------ | ------ | ------------------------------ |
| `/api/subscribe`   | POST   | Email list / waitlist signup   |
| `/api/contact`     | POST   | Contact or inquiry form        |

## Testing in the Browser

### What to Verify

When testing UI changes:

1. **Visual correctness** - Does it look right? (check brand colors defined in Tailwind config)
2. **Interactivity** - Do clicks, hovers, and inputs work?
3. **Responsive design** - Does it work on mobile, tablet, and desktop?
4. **Dark mode** - Does it look correct in both light and dark themes?
5. **Loading states** - Are skeleton/loading states shown while data loads?
6. **Error states** - What happens when an API call fails?
7. **Empty states** - What shows when there's no data?
8. **Scroll animations** - Does GSAP + Lenis scroll work smoothly?

### Content Safety Check

When reviewing any rendered content:

- No individualized medical advice appearing in UI text
- No specific supplement dosage recommendations framed as personal prescriptions
- Evidence-based framing is maintained (distinguish "well-established" from "emerging")
- No fear-based language about pregnancy risks

### Monitoring for Errors

Watch the terminal running `bun dev` for:

- Server-side errors and stack traces
- API route errors
- Compilation warnings

Also check the browser console (DevTools) for:

- Client-side JavaScript errors
- Failed network requests
- React hydration warnings
