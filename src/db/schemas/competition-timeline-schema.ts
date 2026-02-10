import { sql } from "drizzle-orm";
import { boolean, check, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { competitions } from "./competitions-schema";
import { files } from "./files-schema";
import { forms } from "./forms-schema";

// 1. Competition Rounds
export const competitionRounds = pgTable(
    "competition_rounds",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        competitionId: uuid("competition_id")
            .notNull()
            .references(() => competitions.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        isSystem: boolean("is_system").default(false).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [index("competition_rounds_competition_id_idx").on(table.competitionId)],
);

export const announcements = pgTable(
    "competition_round_announcements",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        roundId: uuid("round_id")
            .notNull()
            .references(() => competitionRounds.id, { onDelete: "cascade" }),
        title: text("title").notNull(),
        content: text("content").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [index("competition_round_announcements_round_id_idx").on(table.roundId)],
);

// 2. Competition Events
export const competitionEvents = pgTable(
    "competition_events",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        roundId: uuid("round_id")
            .notNull()
            .references(() => competitionRounds.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        type: text("type").notNull(),
        description: text("description"), // nullable
        location: text("location"), // nullable
        startDate: timestamp("start_date"),
        endDate: timestamp("end_date"),
        notificationEnabled: boolean("notification_enabled").default(true).notNull(),
        addToTimeline: boolean("add_to_timeline").default(true).notNull(),
        isSystem: boolean("is_system").default(false).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        formId: uuid("form_id").references(() => forms.id),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [index("competition_events_round_id_idx").on(table.roundId)],
);

// 3. Competition Event Resources
export const competitionEventResources = pgTable(
    "competition_event_resources",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        eventId: uuid("event_id")
            .notNull()
            .references(() => competitionEvents.id, { onDelete: "cascade" }),
        label: text("label").notNull(),
        url: text("url"), // nullable
        fileId: uuid("file_id").references(() => files.id), // nullable
        type: text("type").notNull(), // 'document' or 'url'
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        index("competition_event_resources_event_id_idx").on(table.eventId),
        check(
            "event_resource_type_check",
            sql`(${table.type} = 'document' AND ${table.fileId} IS NOT NULL) OR (${table.type} = 'url' AND ${table.url} IS NOT NULL)`,
        ),
    ],
);

// 4. Competition Hashtags - REMOVED per user request (switched to array) but I should make sure I don't leave it if I haven't removed it yet.
// Oh, I already removed it in Step 133/134. But I should double check if any relation leftover text exists.
// The relations.ts I created DOES include `competitionHashtags` and its relations.
// WAIT. I removed `competitionHashtags` table in Step 133!
// So `relations.ts` (Step 210) importing `competitionHashtags` will FAIL if it's not exported!
// I must Fix `relations.ts` after this or assume I need to remove it from `relations.ts` too.
// I will just NOT write it here.
