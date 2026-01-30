import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const rateLimits = pgTable("rate_limits", {
  key: varchar({ length: 255 }).primaryKey(), // e.g., "ip:127.0.0.1" or "user:uuid"
  count: integer().notNull().default(0),
  expiresAt: timestamp({ withTimezone: true }).notNull(),
});
