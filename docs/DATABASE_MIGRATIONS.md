# Database Migrations Guide

This document outlines the standard workflow for making schema changes and managing database migrations in Competely using Drizzle ORM.

## Workflow: Applying Changes

Follow these steps exactly to ensure the database schema stays in sync with the codebase.

### 1. Update Schemas

Add or modify your table definitions in the relevant schema files within the `src/db/schemas/` directory:

- [src/db/schemas/auth-schema.ts](src/db/schemas/auth-schema.ts)
- [src/db/schemas/forms-schema.ts](src/db/schemas/forms-schema.ts)
- [src/db/schemas/interests-schema.ts](src/db/schemas/interests-schema.ts)
- [src/db/schemas/rate-limit-schema.ts](src/db/schemas/rate-limit-schema.ts)

### 2. Generate Migration

After updating the TypeScript schemas, generate the SQL migration files:

```bash
npx drizzle-kit generate --name <migration_name>
```

This creates a new `.sql` file in the `drizzle/` directory and updates the snapshot in `drizzle/meta/`.

### 3. Apply Migration

Run the generated migration against your local or production database:

```bash
npx drizzle-kit migrate
```

---

## ⚠️ Important Rules

- **NEVER use `npx drizzle-kit push`**. This bypasses the migration history and can lead to desynchronization between the database and the codebase. Always use the `generate` and `migrate` workflow.
- **Review SQL**: Always peek into the generated `.sql` file before migrating to ensure the changes are what you expect.

---

## Reverting / Dropping Migrations

If you made a mistake and haven't pushed the migration to a shared environment yet:

### 1. Drop the Migration

To remove the migration record and the snapshot:

```bash
npx drizzle-kit drop
```

Follow the interactive prompt to select the migration you want to remove.

### 2. Manual Cleanup

**Crucial Note**: `drizzle-kit drop` only removes the migration files and metadata. It **does not** undo the changes in the actual database (e.g., it won't drop tables or columns that have already been created by a previous `migrate` command).

- You must manually connect to the database and drop any tables or columns created by the dropped migration.

---

## Troubleshooting

If you encounter merge conflicts in the `drizzle/meta/` files, do not try to fix them manually. Revert to a clean state if possible or ask for assistance, as these files are critical for Drizzle's internal tracking.
