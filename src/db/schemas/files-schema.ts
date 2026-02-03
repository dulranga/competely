import { integer, pgTable, text, timestamp, uuid, varchar, index } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";
import { fileCategoryEnum } from "../enums";
import { relations } from "drizzle-orm";

export const files = pgTable(
    "files",
    {
        id: uuid().defaultRandom().primaryKey(),
        fileName: varchar({ length: 255 }).notNull(),
        fileKey: varchar({ length: 255 }).notNull().unique(),
        mimeType: varchar({ length: 100 }).notNull(),
        fileCategory: fileCategoryEnum("file_category").notNull(),
        size: integer().notNull(),
        user_id: text()
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        uploadedAt: timestamp({ withTimezone: true }).defaultNow(),
    },
    (table) => [index("files_user_id_idx").on(table.user_id), index("files_file_key_idx").on(table.fileKey)],
);

export const filesRelations = relations(files, ({ one }) => ({
    user: one(users, {
        fields: [files.user_id],
        references: [users.id],
    }),
}));
