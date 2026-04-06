# Example: Sentry Error Triage

This is a realistic example of investigating and fixing production errors reported in Sentry. Use this as a reference when the root cause isn't immediately obvious and requires deep diagnosis.

---

## Human's Task

> I'm seeing 500 errors on the contact API route in Sentry. Users are seeing "Failed to send message" when they try to contact us. Please investigate and fix.

---

## The Plan

### Phase 0: Investigation (Complete)

#### Problem Analysis

- **Error**: `TypeError: Cannot read properties of undefined (reading 'email')` in `/api/contact` route
- **Source**: Sentry NEXTJS-5S (12 events over 2 hours)
- **Root Cause**: Request body parsing fails when Content-Type is missing or malformed; the route assumes `body.email` exists without validating the parsed body
- **Why This Happens**: The API route destructures `body.email` directly without validating the request body shape. When the client sends malformed JSON or wrong Content-Type, the destructuring silently returns `undefined`, which then fails when accessing nested properties

#### Prior Art Research

- No previous PRs touched the contact route body parsing
- Next.js Request.json() can throw or return unexpected values for malformed requests
- Zod validation should be applied before accessing any body properties

---

### Phase 1: Setup and Tracking

#### 1. Create Linear Ticket

- **Title**: `[Sentry Error] /api/contact returns 500 when request body is malformed`
- **Description**: Include Sentry link, root cause analysis
- **Priority**: High (blocks users from contacting us)

#### 2. Create Feature Branch

```bash
git fetch origin
git checkout main
git pull origin main
git checkout -b cp-XXX-contact-api-validation-fix
```

---

### Phase 2: Implementation

#### 3. RED: Write Failing Test

Add test in `frontend/lib/contact-schema.test.ts` or `frontend/app/api/contact/route.test.ts` that:

- Tests parsing valid request body
- Tests rejection of malformed/missing body
- Tests that invalid Content-Type returns 400 (not 500)

#### 4. GREEN: Fix the API Route

File: `frontend/app/api/contact/route.ts`

Changes:

1. Add Zod schema to validate the request body
2. Use `safeParse` and return 400 with clear error message when validation fails
3. Add try/catch around `request.json()` to handle parse errors
4. Never access body properties before validation

```typescript
const contactBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = contactBodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { success: false, error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;
  // ...
}
```

#### 5. VERIFY: Confirm Test Can Fail

Temporarily revert the fix, confirm test fails, restore fix.

---

### Phase 3: Local Verification

#### 6. Run All Checks

```bash
cd frontend
bun run format:fix && bun run lint:fix && bun run typecheck && bun test
```

#### 7. Browser Testing

Start the dev server and verify:

```bash
cd frontend && bun dev
```

1. Navigate to `http://localhost:3000` and find the contact form
2. Verify form submits successfully with valid data
3. Test with invalid data - verify 400 response and user-friendly error

---

### Phase 4: Pull Request

#### 8. Commit and Push

```bash
git add -A
git commit -m "fix: validate contact API request body to prevent 500 errors [CP-XXX]

Fixes CP-XXX / Sentry NEXTJS-5S

The contact API route accessed request body properties without validation.
Malformed or missing request bodies caused 500 errors.

Changes:
- Add Zod validation for request body
- Return 400 with clear errors for invalid input
- Add try/catch for JSON parse errors"

git push -u origin cp-XXX-contact-api-validation-fix
```

#### 9. Create Pull Request

Follow Pull Request Skill with:

- Problem description with Sentry link
- Root cause analysis
- Solution explanation
- Testing instructions for reviewer

#### 10. Link PR to Linear Ticket

Add comment on Linear ticket with PR URL.

---

### Phase 5: CI Monitoring

#### 11. Wait for CI Checks

```bash
sleep 180 && gh pr checks
```

#### 12. Handle Bug Bot Comments

Read all Cursor bug bot comments and address every issue raised.

---

### Phase 6: Post-Merge Verification

#### 13. Monitor Sentry

Watch for new `/api/contact` errors over the next 24 hours. Should see zero new occurrences.

#### 14. Close Out

- Resolve Sentry issue
- Update Linear ticket status to Done

---

## Completion Criteria

- [ ] Linear ticket created with Sentry link
- [ ] Feature branch from latest main
- [ ] Zod validation added to API route
- [ ] Failing test written and passing
- [ ] All local checks pass
- [ ] Browser testing confirms fix
- [ ] PR created with proper description
- [ ] PR linked to Linear ticket
- [ ] All CI checks green
- [ ] No unresolved bug bot comments
- [ ] Sentry monitoring shows no new errors
- [ ] Linear ticket set to Done
