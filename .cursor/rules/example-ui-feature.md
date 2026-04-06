# Example: UI Feature Implementation

This is a realistic example of building a new user-facing feature from scratch. Use this as a reference when adding new pages, components, or interactive features.

---

## Human's Task

> Add a newsletter signup form. Visitors should be able to enter their email, see inline validation, and get a success confirmation after subscribing.

---

## The Plan

### Phase 0: Investigation (Complete)

#### Problem Analysis

- **Request**: New feature - newsletter signup form
- **Source**: Feature request
- **Scope**: Form component, validation, API route, success state

#### Research

- **Existing patterns**: Check `frontend/components/` for existing form components and patterns
- **UI library**: Check what component primitives are available
- **Validation**: Zod schemas for type-safe validation

#### Technical Design

**Approach**: React Hook Form + Zod validation, API route for subscription handling, success/error states.

**Alternative considered**: Third-party embed (Mailchimp form). Rejected because:
1. Custom form gives full control over branding and UX
2. Can validate server-side before passing to email provider
3. Consistent with the rest of the codebase

---

### Phase 1: Setup and Tracking

#### 1. Create Linear Ticket

- **Title**: `Add newsletter signup form`
- **Priority**: Medium
- **Labels**: Feature

#### 2. Create Feature Branch

```bash
git fetch origin && git checkout main && git pull origin main
git checkout -b cp-XXX-newsletter-signup-form
```

---

### Phase 2: Implementation

#### Step 1: Define Zod Schema

**RED**: Write tests for the newsletter signup schema:

```typescript
// frontend/lib/newsletter-schema.test.ts
import { describe, test, expect } from "bun:test";
import { newsletterSchema } from "./newsletter-schema";

describe("newsletterSchema", () => {
  test("accepts valid email", () => { /* ... */ });
  test("rejects invalid email", () => { /* ... */ });
  test("rejects empty email", () => { /* ... */ });
});
```

**GREEN**: Create `frontend/lib/newsletter-schema.ts`:

```typescript
import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
```

**VERIFY**: Run `bun test` and confirm tests pass. Break the implementation to confirm they fail.

#### Step 2: Create Newsletter Signup Component

**RED**: Write component test for form submission.

**GREEN**: Create `frontend/components/newsletter-signup.tsx`:

- Use React Hook Form with Zod resolver
- Add inline validation errors
- Add loading state during submission
- Add success state after subscription
- Add error state if API returns error

**VERIFY**: Tests pass. Browser shows form validates and displays success/error states.

#### Step 3: Add API Route

Create `frontend/app/api/newsletter/route.ts` to accept POST with validated email, subscribe to list, return success/error response.

**VERIFY**: Browser testing - submit form and verify API receives data, returns appropriate response.

---

### Phase 3: Local Verification

#### 4. Run All Checks

```bash
cd frontend
bun run format:fix && bun run lint:fix && bun run knip && bun run typecheck && bun test
```

#### 5. Browser Testing

1. Navigate to `http://localhost:3000` and find the newsletter section
2. Submit empty form - verify validation error shows
3. Submit invalid email - verify inline error
4. Submit valid email - verify success state
5. Test responsive layout (mobile and desktop)

---

### Phase 4: Pull Request

#### 6. Commit and Push

```bash
git add -A
git commit -m "feat: add newsletter signup form [CP-XXX]

Implements CP-XXX

Visitors can now subscribe via a newsletter signup form with inline
validation, loading state, and success/error feedback.

Changes:
- Add Zod schema for newsletter form (lib/newsletter-schema.ts)
- Add NewsletterSignup component with React Hook Form
- Add /api/newsletter route with validation
- Add unit tests for schema validation"

git push -u origin cp-XXX-newsletter-signup-form
```

#### 7. Create Pull Request and Link to Linear

---

### Phase 5: CI Monitoring

Wait for CI, handle bug bot comments, repeat until clean.

---

## Completion Criteria

- [ ] Linear ticket created and linked
- [ ] Zod schema for newsletter form with tests
- [ ] NewsletterSignup component with validation and states
- [ ] API route handles validated submissions
- [ ] All CI checks green
- [ ] Browser testing confirms form works
- [ ] No unresolved bug bot comments
- [ ] PR linked to Linear ticket
- [ ] Linear ticket set to Done
