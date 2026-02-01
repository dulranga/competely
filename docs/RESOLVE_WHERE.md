# Dynamic Query Filtering with `resolveWhere`

The `resolveWhere` utility is a pattern we use to dynamically build database `WHERE` clauses based on a user's permission level. It ensures that data fetching logic remains secure and dry.

## Core Principles

1.  **First-Match Logic**: The function iterates through an array of checks. The first check that evaluates to `true` determines the resulting `WHERE` clause.
2.  **Priority Matters**: You must define checks from **highest to lowest** access level (e.g., Administrator -> Owner -> Public).
3.  **Strict Security**: If none of the permission checks pass, the function throws a `No Permission` error, preventing any data from being leaked.

## Example: Filtering Forms

In this example, we want to fetch forms. An admin should see all forms for a user, but a regular user should only see their own.

```typescript
import { eq, and } from "drizzle-orm";
import { forms } from "~/db/schema";
import { resolveWhere } from "~/lib/access-control/resolveWhere";
import { hasPermissionServer } from "~/lib/access-control/permissions.server";

export async function getForms(targetUserId: string, currentUser: { id: string }) {
    const whereClause = await resolveWhere([
        // 1. HIGHEST ACCESS: Admin can see any user's forms
        [hasPermissionServer("forms:manage_all"), eq(forms.userId, targetUserId)],

        // 2. MEDIUM ACCESS: User can see their own forms
        [
            hasPermissionServer("forms:manage_own"),
            and(eq(forms.userId, targetUserId), eq(forms.userId, currentUser.id)),
        ],
    ]);

    // 3. The query uses the securely resolved where clause
    return await db.select().from(forms).where(whereClause);
}
```

## How it works

- **Admin Case**: If `hasPermissionServer("forms:manage_all")` is true, the function immediately returns `eq(forms.userId, targetUserId)`. The rest of the checks are ignored.
- **Owner Case**: If the first check fails but `hasPermissionServer("forms:manage_own")` is true, it returns the more restrictive clause where the user ID must match both the target and the current user.
- **Fail Case**: If the user has neither permission, an Error is thrown, and the `db.select()` never executes.

## Use Cases

- **Listings**: Show all items to staff, but only "published" items to delegates.
- **Management**: Allow OC members to see all registrations for a competition, while delegates only see their own.
- **Soft Deletes**: Automatically append `isNull(deletedAt)` logic for certain roles but not for auditors.
