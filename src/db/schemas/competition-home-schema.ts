import { sql } from "drizzle-orm";
import { check, index, pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { socialPlatformEnum } from "../enums";
import { competitions } from "./competitions-schema";
import { files } from "./files-schema";

// 1. Competition Prizes
export const competitionPrizes = pgTable(
    "competition_prizes",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        competitionId: uuid("competition_id")
            .notNull()
            .references(() => competitions.id, { onDelete: "cascade" }),
        title: text("title").notNull(),
        description: text("description"), // nullable
        cashPrize: real("cash_prize").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [index("competition_prizes_competition_id_idx").on(table.competitionId)],
);

// 2. Competition Resources
export const competitionResources = pgTable(
    "competition_resources",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        competitionId: uuid("competition_id")
            .notNull()
            .references(() => competitions.id, { onDelete: "cascade" }),
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
        index("competition_resources_competition_id_idx").on(table.competitionId),
        check(
            "resource_type_check",
            sql`(${table.type} = 'document' AND ${table.fileId} IS NOT NULL) OR (${table.type} = 'url' AND ${table.url} IS NOT NULL)`,
        ),
    ],
);

// 3. Competition Social Links
export const competitionSocialLinks = pgTable(
    "competition_social_links",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        competitionId: uuid("competition_id")
            .notNull()
            .references(() => competitions.id, { onDelete: "cascade" }),
        platform: socialPlatformEnum("platform").notNull(),
        url: text("url").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [index("competition_social_links_competition_id_idx").on(table.competitionId)],
);

// 4. Competition Contacts
export const competitionContacts = pgTable(
    "competition_contacts",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        competitionId: uuid("competition_id")
            .notNull()
            .references(() => competitions.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        role: text("role").notNull(),
        email: text("email").notNull(),
        phone: text("phone"), // nullable
        imageId: uuid("image_id").references(() => files.id), // nullable
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [index("competition_contacts_competition_id_idx").on(table.competitionId)],
);
