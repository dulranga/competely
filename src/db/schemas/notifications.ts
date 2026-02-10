import { boolean, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";

export const notifications = pgTable(
    "notifications",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        // Core Content
        title: text("title").notNull(),
        message: text("message").notNull(), // Supports long text

        // Categorization
        type: text("type", { enum: ["delegate", "oc", "system"] }).notNull(),

        // Status
        isRead: boolean("is_read").default(false).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),

        // Navigation
        link: text("link"), // Optional URL
        linkLabel: text("link_label"), // Optional Text for the link
    },
    (table) => [index("notifications_user_id_idx").on(table.userId)]
);