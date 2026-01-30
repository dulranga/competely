import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";
import { relations } from "drizzle-orm";

export const userInterests = pgTable(
    "user_interests",
    {
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        interest: text("interest").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.userId, table.interest] }),
    ]
);

export const userInterestsRelations = relations(userInterests, ({ one }) => ({
    user: one(users, {
        fields: [userInterests.userId],
        references: [users.id],
    }),
}));
