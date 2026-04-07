---
name: error-handling-logging
description: Error handling, Sentry integration, and logging best practices. Use when writing try/catch blocks, logging statements, or handling exceptions.
---

# Error Handling & Logging

## Error Handling Philosophy

**Let frameworks handle errors.** Next.js automatically catches errors, renders error boundaries, reports to Sentry (if configured), and returns proper responses.

**Don't catch exceptions unless you can recover from them.** If you can't recover, let it propagate to the framework.

### The Danger of Catching

Catching and "swallowing" errors is the worst outcome:
- Not logged
- Not reported to Sentry
- No one knows something went wrong

**A silent failure is far worse than a loud crash.**

### If You Must Catch

1. Log with context: `console.error("message", { context })`
2. Send to Sentry: `Sentry.captureException(error)` with relevant context (if Sentry is configured)
3. Re-throw or return appropriate error response

### Catch Specific Errors Only

```typescript
// BAD - catches everything
try {
  await submitSubscription();
} catch (error) {
  console.log("Error");
}

// GOOD - catch specific, re-throw unknown
try {
  await submitSubscription();
} catch (error) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return Response.json({ error: "Request timeout" }, { status: 504 });
  }
  throw error; // Let framework handle unknown errors
}
```

## Next.js Error Handling

### Error Boundaries

Next.js App Router has built-in error handling via special files:

| File               | Purpose                                    |
| ------------------ | ------------------------------------------ |
| `error.tsx`        | Catches errors in a route segment          |
| `global-error.tsx` | Catches errors in the root layout          |
| `not-found.tsx`    | Handles 404 responses                     |

**Don't wrap your own try/catch around component rendering.** Let these boundaries do their job.

### API Route Error Handling

In API routes (`app/api/*/route.ts`), return proper HTTP error responses:

```typescript
// GOOD - explicit error responses
export async function POST(request: Request) {
  const res = await fetch("https://api.emailservice.com/subscribe");

  if (!res.ok) {
    return Response.json(
      { success: false, error: `Email service returned ${res.status}` },
      { status: 502 }
    );
  }

  const data = await res.json();
  return Response.json({ success: true, data });
}
```

### Server Components

Errors in Server Components automatically trigger `error.tsx`. Don't suppress them:

```typescript
// BAD - swallows the error
export default async function ArticlePage() {
  try {
    const article = await fetchArticle(slug);
    return <ArticleContent article={article} />;
  } catch {
    return <div>Something went wrong</div>; // Sentry never sees this
  }
}

// GOOD - let error.tsx handle it
export default async function ArticlePage() {
  const article = await fetchArticle(slug);
  return <ArticleContent article={article} />;
}
```

## Logging

### Log Levels

| Level   | Use For                                     |
| ------- | ------------------------------------------- |
| `error` | Failures needing attention                  |
| `warn`  | Unexpected but handled conditions            |
| `info`  | Significant events (use sparingly)          |
| `debug` | Detailed diagnostics (dev use)              |

### Guidelines

- **Include context** - request type, endpoint, subscriber email (hashed if needed for privacy)
- **Be specific** - avoid "Error occurred" or "Something went wrong"
- Don't flood logs with routine per-request messages

```typescript
// BAD - no context
console.error("Subscription failed");

// GOOD - actionable context
console.error("Subscribe API call failed", {
  status: response.status,
  endpoint: "/api/subscribe",
  duration: Date.now() - startTime,
});
```

### Verify Your Logs (CRITICAL)

**If you write a log line, you MUST execute the code and observe the output.**

1. Trigger the code path that produces the log
2. Watch stdout and verify the log appears
3. Read the log as if you have no context - would an engineer understand what happened?

## Anti-Patterns

- Catching exceptions just to log them (let the framework do it)
- Bare `catch {}` blocks that swallow everything
- Logging without ever seeing the output
- Vague messages without identifiers
- Using logging as a substitute for error handling
- Wrapping entire components in try/catch
