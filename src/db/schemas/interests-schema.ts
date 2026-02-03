import { boolean, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";
import { relations } from "drizzle-orm";
import { competitions } from "./competitions-schema";

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

export const bookmarks = pgTable(
    "bookmarks",
    {
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        competitionId: uuid("competition_id")
            .notNull()
            .references(() => competitions.id, { onDelete: "cascade" }),
        isBookmarked: boolean("is_bookmarked").default(true).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.userId, table.competitionId] }),
    ]
);

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
    user: one(users, {
        fields: [bookmarks.userId],
        references: [users.id],
    }),
    competition: one(competitions, {
        fields: [bookmarks.competitionId],
        references: [competitions.id],
    }),
}));
