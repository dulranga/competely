import { boolean, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";
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
