import { relations, sql } from "drizzle-orm";
import { boolean, check, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { competitions } from "./competitions-schema";
import { files } from "./files-schema";

// 1. Competition Rounds
export const competitionRounds = pgTable(
    "competition_rounds",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        competitionId: uuid("competition_id")
            .notNull()
            .references(() => competitions.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [index("competition_rounds_competition_id_idx").on(table.competitionId)],
);

export const competitionRoundsRelations = relations(competitionRounds, ({ one, many }) => ({
    competition: one(competitions, {
        fields: [competitionRounds.competitionId],
        references: [competitions.id],
    }),
    events: many(competitionEvents),
}));

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
        startDate: timestamp("start_date"),
        endDate: timestamp("end_date"),
        notificationEnabled: boolean("notification_enabled").default(true).notNull(),
        addToTimeline: boolean("add_to_timeline").default(true).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [index("competition_events_round_id_idx").on(table.roundId)],
);

export const competitionEventsRelations = relations(competitionEvents, ({ one, many }) => ({
    round: one(competitionRounds, {
        fields: [competitionEvents.roundId],
        references: [competitionRounds.id],
    }),
    resources: many(competitionEventResources),
}));

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

export const competitionEventResourcesRelations = relations(
    competitionEventResources,
    ({ one }) => ({
        event: one(competitionEvents, {
            fields: [competitionEventResources.eventId],
            references: [competitionEvents.id],
        }),
        file: one(files, {
            fields: [competitionEventResources.fileId],
            references: [files.id],
        }),
    }),
);