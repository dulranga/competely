# Conditional Query Building with `resolveFeatureWhere`

The `resolveFeatureWhere` and `getFeatureWhere` utilities are used to build dynamic SQL conditions based on boolean "feature flags" or UI filters (like those in a sidebar).

## Core Concept

This pattern allows you to optionally include SQL fragments in a query based on the state of a boolean variable. If the boolean is `true`, the condition is added; if `false` or `undefined`, it is ignored.

- **`getFeatureWhere(enabled, sql)`**: Returns the SQL condition if `enabled` is strictly true.
- **`resolveFeatureWhere(...conditions)`**: Groups all provided conditions into a single SQL `AND` clause.

## Example: Filtering Competitions

Using the state from a component like [FilterSidebar.tsx](src/components/public/FilterSidebar.tsx), you can build a server-side query filter:

```typescript
import { eq, isNull, and, gte, lte } from "drizzle-orm";
import { competitions } from "~/db/schema";
import { resolveFeatureWhere, getFeatureWhere } from "~/lib/access-control/resolveFeatureWhere";

export async function getFilteredCompetitions(filters: {
    onlyUpcoming?: boolean;
    onlyOnline?: boolean;
    minParticipants?: number;
}) {
    // 1. Combine optional filters into one featureWhere clause
    const featureWhere = resolveFeatureWhere(
        getFeatureWhere(filters.onlyUpcoming, eq(competitions.status, "upcoming")),
        getFeatureWhere(filters.onlyOnline, eq(competitions.mode, "online")),
        getFeatureWhere(
            filters.minParticipants !== undefined,
            gte(competitions.registeredCount, filters.minParticipants ?? 0),
        ),
    );

    // 2. Use it in your query
    return await db.select().from(competitions).where(featureWhere);
}
```

## Advanced: Combining with Access Control

You can combine `resolveFeatureWhere` with [resolveWhere](docs/RESOLVE_WHERE.md) to create highly complex, secure, and filtered queries.

```typescript
const accessWhere = await resolveWhere([...]); // Security layer
const filterWhere = resolveFeatureWhere(...); // UI Filter layer

const finalQuery = await db.select()
    .from(table)
    .where(and(accessWhere, filterWhere));
```

## Why use this?

1.  **Readability**: Avoids deeply nested `if` statements or ternary monsters inside your data access layer.
2.  **Safety**: Ensures that `undefined` or `null` filters don't accidentally break your SQL syntax.
3.  **Composability**: Easily add or remove filterable properties without refactoring the entire query structure.
