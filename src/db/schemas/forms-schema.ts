import { boolean, index, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { formFieldTypeEnum } from "../enums";
import { competitions } from "./competitions-schema";
import { users } from "./auth-schema";

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

export const formResponses = pgTable(
    "form_responses",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        formId: uuid("form_id")
            .notNull()
            .references(() => forms.id, { onDelete: "cascade" }),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        submittedAt: timestamp("submitted_at").defaultNow().notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        index("form_responses_form_id_idx").on(table.formId),
        index("form_responses_user_id_idx").on(table.userId),
    ],
);

export const formResponseAnswers = pgTable(
    "form_response_answers",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        responseId: uuid("response_id")
            .notNull()
            .references(() => formResponses.id, { onDelete: "cascade" }),
        fieldId: uuid("field_id")
            .notNull()
            .references(() => formFields.id, { onDelete: "cascade" }),
        value: jsonb("value").notNull(), // Stores strings, arrays of strings, or arrays of file IDs
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        index("form_response_answers_response_id_idx").on(table.responseId),
        index("form_response_answers_field_id_idx").on(table.fieldId),
    ],
);
