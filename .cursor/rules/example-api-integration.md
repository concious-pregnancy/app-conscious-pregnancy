# Example: API Integration

This is a realistic example of integrating a new API endpoint. Use this as a reference when adding form submission APIs, contact endpoints, or other backend integrations.

---

## Human's Task

> Add a contact form API so visitors can send inquiries. The form should validate input and send an email or store the inquiry.

---

## The Plan

### Phase 0: Investigation (Complete)

#### Problem Analysis

- **Request**: New API - contact form submission
- **Source**: Feature request
- **Scope**: API route, Zod validation, form integration

#### Research

- **Existing pattern**: `frontend/app/api/` (check for existing route patterns)
- **Email options**: Resend, SendGrid, or nodemailer for sending emails
- **Response format**: Consistent `{ success: boolean, error?: string }` envelope

#### Technical Design

**Approach**: API route receives POST, Zod validates body, process and return response.

**Alternative considered**: Client-side only (no API). Rejected because:
1. Need server-side validation for security
2. Need to send email or store data server-side
3. Keeps API keys and secrets server-side

---

### Phase 1: Setup and Tracking

#### 1. Create Linear Ticket

- **Title**: `Add contact form API`
- **Priority**: Medium
- **Labels**: Feature

#### 2. Create Feature Branch

```bash
git fetch origin && git checkout main && git pull origin main
git checkout -b cp-XXX-contact-form-api
```

---

### Phase 2: Implementation

#### Step 1: Define Contact Schema and Types

**RED**: Write tests for the contact form schema:

```typescript
// frontend/lib/contact-schema.test.ts
import { describe, test, expect } from "bun:test";
import { contactFormSchema } from "./contact-schema";

describe("contactFormSchema", () => {
  test("accepts valid contact data", () => { /* ... */ });
  test("rejects invalid email", () => { /* ... */ });
  test("rejects message that is too short", () => { /* ... */ });
});
```

**GREEN**: Create `frontend/lib/contact-schema.ts`:

```typescript
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

**VERIFY**: Run `bun test` - confirm tests pass, then break to confirm they fail.

#### Step 2: Create API Route

**GREEN**: Create `frontend/app/api/contact/route.ts`:

```typescript
import { NextRequest } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { success: false, error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;

  // TODO: Send email via Resend/SendGrid, or store in database
  // For now, log and return success
  console.info("Contact form submission", { name, email, messageLength: message.length });

  return Response.json({ success: true });
}
```

**VERIFY**: Start dev server, test with `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","message":"Hello, I have a question."}'`

#### Step 3: Integrate Contact Form Component

Create or update a contact form component that:
- Uses React Hook Form with Zod resolver
- Submits to `/api/contact`
- Shows success/error feedback

**VERIFY**: Browser testing - navigate to contact section and submit form.

---

### Phase 3: Local Verification

#### 5. Run All Checks

```bash
cd frontend
bun run format:fix && bun run lint:fix && bun run typecheck && bun test
```

#### 6. Browser Testing

1. Navigate to `http://localhost:3000` and find the contact form
2. Submit valid data - verify success message
3. Submit invalid data - verify validation errors

---

### Phase 4: Pull Request

#### 7. Commit and Push

```bash
git add -A
git commit -m "feat: add contact form API [CP-XXX]

Implements CP-XXX

Adds /api/contact endpoint for visitor inquiries.
Request body is validated with Zod before processing.

Changes:
- Add contact form Zod schema (lib/contact-schema.ts)
- Add /api/contact route with validation
- Integrate contact form component
- Add unit tests for schema validation"

git push -u origin cp-XXX-contact-form-api
```

#### 8. Create Pull Request and Link to Linear

---

### Phase 5: CI Monitoring

Wait for CI, handle bug bot comments, repeat until clean.

---

## Data Flow After Implementation

```
Contact Form Component
    │
    └── POST /api/contact
            │
            ├── Zod validation
            ├── Process (email/store)
            └── Return { success: true } or { success: false, error }
```

## Completion Criteria

- [ ] Linear ticket created and linked
- [ ] Zod schema for contact form
- [ ] API route with validation and error handling
- [ ] Contact form component integrated
- [ ] Unit tests for schema validation
- [ ] All CI checks green
- [ ] Browser testing confirms form works
- [ ] No unresolved bug bot comments
- [ ] PR linked to Linear ticket
- [ ] Linear ticket set to Done
