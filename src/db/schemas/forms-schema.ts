import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { formFieldTypeEnum } from "../enums";
import { competitions } from "./competitions-schema";

export const forms = pgTable("forms", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    published: boolean("published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    competitionId: uuid("competition_id")
        .notNull()
        .references(() => competitions.id, { onDelete: "cascade" }),
});

export const formFields = pgTable("form_fields", {
    id: uuid("id").defaultRandom().primaryKey(),
    formId: uuid("form_id")
        .notNull()
        .references(() => forms.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    type: formFieldTypeEnum("type").notNull().default("text"),
    required: boolean("required").default(false).notNull(),
    order: integer("order").notNull(),
    config: jsonb("config"), // For options in select/radio, e.g. { options: ["Option 1", "Option 2"] }
});
