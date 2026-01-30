import { relations } from "drizzle-orm";
import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { formFieldTypeEnum } from "../enums";
import { users } from "./auth-schema";

export const forms = pgTable("forms", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
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

export const formsRelations = relations(forms, ({ many, one }) => ({
    fields: many(formFields),
    user: one(users, {
        fields: [forms.userId],
        references: [users.id],
    }),
}));

export const formFieldsRelations = relations(formFields, ({ one }) => ({
    form: one(forms, {
        fields: [formFields.formId],
        references: [forms.id],
    }),
}));
