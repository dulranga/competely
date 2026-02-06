import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";

export const notifications = pgTable(
    "notifications",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        message: text("message").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        // Adding read status is common, but user didn't ask for it. 
        // I'll stick to strict requirements: id, message, user id.
    },
    (table) => [index("notifications_user_id_idx").on(table.userId)]
);