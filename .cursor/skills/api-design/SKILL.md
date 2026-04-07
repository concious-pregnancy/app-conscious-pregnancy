---
name: api-design
description: Guide for creating and modifying Next.js API routes following project conventions. Use when creating new API routes, modifying existing endpoints, or implementing request validation with Zod.
---

# Next.js API Route Design

## Core Principles

- **Zod** for request validation
- Consistent response envelope
- Proper HTTP status codes and error responses

## Route Handler Pattern

API routes live in `frontend/app/api/*/route.ts` and export named functions for HTTP methods:

```typescript
// app/api/subscribe/route.ts
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Handle POST request
}
```

## Response Envelope

### Success

```json
{
  "success": true,
  "data": { "..." },
  "message": "Optional message"
}
```

### Error

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable description"
}
```

### Helper Pattern

```typescript
function successResponse(data: unknown, status = 200) {
  return Response.json({ success: true, data }, { status });
}

function errorResponse(error: string, message: string, status: number) {
  return Response.json({ success: false, error, message }, { status });
}
```

## Request Validation with Zod

```typescript
import { z } from "zod";

const subscribeBodySchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100).optional(),
  stage: z.enum(["trying-to-conceive", "pregnant", "postpartum"]).optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid Request", "Invalid JSON body", 400);
  }

  const parsed = subscribeBodySchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse("Validation Error", parsed.error.message, 400);
  }

  const { email, firstName, stage } = parsed.data;
  // ... process subscription
}
```

## External API Integration

### Pattern for Proxying External APIs (e.g., email service)

```typescript
// app/api/subscribe/route.ts
export async function POST(request: NextRequest) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch("https://api.emailservice.com/subscribe", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.EMAIL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return errorResponse(
        "Upstream Error",
        `Email service returned ${response.status}`,
        502
      );
    }

    const data = await response.json();
    return Response.json({ success: true, data });
  } catch (error) {
    clearTimeout(timeout);

    if (error instanceof DOMException && error.name === "AbortError") {
      return errorResponse("Timeout", "Email service request timed out", 504);
    }

    throw error;
  }
}
```

### Key Practices

- **Timeout**: Always set `AbortController` timeouts for external API calls (15s recommended)
- **Error mapping**: Map external API errors to appropriate HTTP status codes (502 for upstream errors)
- **Caching**: Set `Cache-Control` headers for cacheable responses
- **Secrets**: Keep API keys in environment variables, never expose to client

## HTTP Status Codes

| Code | Meaning                | Use When                                |
| ---- | ---------------------- | --------------------------------------- |
| 200  | OK                     | Successful GET, PATCH                   |
| 201  | Created                | Successful POST that creates a resource |
| 400  | Bad Request            | Validation error                        |
| 401  | Unauthorized           | Missing or invalid auth                 |
| 403  | Forbidden              | Authenticated but not authorized        |
| 404  | Not Found              | Resource doesn't exist                 |
| 502  | Bad Gateway            | External API error                      |
| 504  | Gateway Timeout        | External API timeout                    |

## Anti-Patterns

- **Don't wrap in try/catch unless you handle specific errors** - let Next.js handle unexpected errors
- **Don't use `any` for request/response types** - use Zod schemas
- **Don't call external APIs from client components** - always proxy through API routes
- **Don't hardcode API URLs** - use environment variables
- **Don't forget timeouts** - external APIs can hang indefinitely
